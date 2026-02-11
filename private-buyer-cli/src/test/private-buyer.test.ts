import path from 'path';
import * as api from '../api';
import type { PrivateBuyerProviders, DeployedPrivateBuyerContract } from '../common-types';
import { currentDir } from '../config';
import { createLogger } from '../logger';
import { TestEnvironment } from './simulators/simulator';
import { NoDockerTestEnvironment } from './simulators/simulator-no-docker';
import { createCertificate, createEitherAccount, createCoin, randomBytes } from './utils/utils';
import { convertFieldToBytes } from '@midnight-ntwrk/compact-runtime';
import * as Rx from 'rxjs';
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import 'dotenv/config';

// ─── Logger Setup ────────────────────────────────────────────────────────────

const network = process.env.TEST_ENV || 'undeployed';
const logDir = path.resolve(currentDir, '..', 'logs', `test-${network}`, `${new Date().toISOString()}.log`);
const logger = await createLogger(logDir);

// ─── Timeout ─────────────────────────────────────────────────────────────────

const timeout = 1000 * 60 * 45; // 45 minutes

// ─── Role IDs ────────────────────────────────────────────────────────────────

const MINTER_ROLE = convertFieldToBytes(32, 1n, '');
const POOL_OPERATOR_ROLE = convertFieldToBytes(32, 2n, '');
const VERIFIER_ROLE = convertFieldToBytes(32, 3n, '');

// ─── Contract Config ─────────────────────────────────────────────────────────

const CONTRACT_NAME = 'IntegrationTest';
const CONTRACT_SYMBOL = 'IT';
const TOKEN_PRICE = 100n;

// Use a random base so token IDs never collide with previous test runs
const TOKEN_BASE = BigInt(Math.floor(Math.random() * 900000) + 100000);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TX_RETRY_COUNT = 3;
const TX_RETRY_DELAY_MS = 15_000; // 15 seconds between retries

/**
 * Try to unpause a module. Silently succeeds if already unpaused.
 */
async function tryUnpause(name: string, fn: () => Promise<any>): Promise<void> {
  try {
    await fn();
    logger.info(`Unpaused ${name}`);
  } catch (e: any) {
    const msg = e?.message ?? String(e);
    if (msg.includes('not paused') || msg.includes('Pausable')) {
      logger.info(`${name} already unpaused, skipping`);
    } else {
      throw e;
    }
  }
}

// ─── Test Suite ──────────────────────────────────────────────────────────────

/**
 * Wait until the wallet has available DUST coins for transaction fees.
 * Only checks available balance — does NOT wait for pending coins to clear,
 * because failed submissions can leave coins stuck in pending indefinitely.
 */
async function waitForDust(walletFacade: api.WalletContext['wallet']): Promise<void> {
  const dust = await api.getDustBalance(walletFacade);
  logger.info(
    `DUST state: available=${dust.available}, availableCoins=${dust.availableCoins}, pending=${dust.pending}, pendingCoins=${dust.pendingCoins}`,
  );

  if (dust.availableCoins > 0 && dust.available > 0n) return;

  logger.info('Waiting for DUST to regenerate...');
  await Rx.firstValueFrom(
    walletFacade.state().pipe(
      Rx.throttleTime(5_000),
      Rx.filter((s) => s.isSynced),
      Rx.tap((s) => {
        const bal = s.dust.walletBalance(new Date());
        logger.info(
          `  DUST poll: balance=${bal}, available=${s.dust.availableCoins.length}, pending=${s.dust.pendingCoins.length}`,
        );
      }),
      Rx.filter((s) => s.dust.availableCoins.length > 0 && s.dust.walletBalance(new Date()) > 0n),
    ),
  );
  logger.info('DUST available, continuing.');
}

/**
 * Execute a transaction with retry logic.
 * Waits for DUST between retries to handle fee-token depletion.
 */
async function retryTx<T>(name: string, walletFacade: api.WalletContext['wallet'], fn: () => Promise<T>): Promise<T> {
  for (let attempt = 1; attempt <= TX_RETRY_COUNT; attempt++) {
    try {
      return await fn();
    } catch (e: any) {
      if (attempt === TX_RETRY_COUNT) throw e;
      const msg = e?.message ?? String(e);
      logger.warn(`${name} failed (attempt ${attempt}/${TX_RETRY_COUNT}): ${msg}`);
      logger.info(`Waiting ${TX_RETRY_DELAY_MS / 1000}s before retry...`);
      await new Promise((resolve) => setTimeout(resolve, TX_RETRY_DELAY_MS));
      await waitForDust(walletFacade);
    }
  }
  throw new Error('unreachable');
}

describe('Private Buyer Integration Tests', () => {
  let simulator: TestEnvironment | NoDockerTestEnvironment;
  let wallet: api.WalletContext;
  let providers: PrivateBuyerProviders;
  let contract: DeployedPrivateBuyerContract;
  let contractAddress: string;
  let coinPublicKey: string;
  let isFreshDeploy: boolean;

  // Baseline counters read from ledger before tests modify state
  let initialCertificatesCreated: bigint;
  let initialPurchaseCounter: bigint;

  // ── Setup ────────────────────────────────────────────────────────────────

  beforeAll(async () => {
    api.setLogger(logger);

    const noDocker = process.env.NO_DOCKER === 'true';

    if (noDocker) {
      // No-docker mode: instances already running, contract already deployed.
      logger.info('No-docker mode: joining existing contract');
      const noDockerSim = new NoDockerTestEnvironment(logger);
      const { dappConfig } = await noDockerSim.start();
      wallet = await noDockerSim.getWallet();
      providers = await api.configureProviders(wallet, dappConfig);
      const joined = await noDockerSim.joinContract(providers);
      contract = joined.contract;
      contractAddress = joined.contractAddress;
      simulator = noDockerSim;
      isFreshDeploy = false;
    } else {
      // Docker mode: spin up containers, deploy fresh contract
      logger.info('Using Docker simulator (deploying fresh contract)');
      const dockerSim = new TestEnvironment(logger);
      const testConfig = await dockerSim.start();
      wallet = await dockerSim.getWallet();
      providers = await api.configureProviders(wallet, testConfig.dappConfig);
      const deployed = await dockerSim.deployContract(providers, CONTRACT_NAME, CONTRACT_SYMBOL);
      contract = deployed.contract;
      contractAddress = deployed.contractAddress;
      simulator = dockerSim;
      isFreshDeploy = true;
    }

    // Get the wallet's coin public key for role/identity operations
    const walletProvider = await api.createWalletAndMidnightProvider(wallet);
    coinPublicKey = walletProvider.getCoinPublicKey();
    logger.info(`Wallet coin public key: ${coinPublicKey}`);

    // Read baseline ledger state
    const ledger = await api.getLedgerState(providers, contractAddress as any);
    initialCertificatesCreated = ledger?.NonFungibleToken__certificatesCreatedCounter ?? 0n;
    initialPurchaseCounter = ledger?.NFTPool__purchaseCounter ?? 0n;
    logger.info(`Baseline state: certificates=${initialCertificatesCreated}, purchases=${initialPurchaseCounter}`);
    logger.info(`Token ID base for this run: ${TOKEN_BASE}`);
  }, timeout);

  afterAll(async () => {
    if (simulator) {
      await simulator.shutdown();
    }
  });

  // Ensure DUST is available before each transaction test
  beforeEach(async () => {
    if (wallet) {
      await waitForDust(wallet.wallet);
    }
  });

  // ── Contract State ───────────────────────────────────────────────────────

  describe('Contract state', () => {
    it('should have a valid contract address', () => {
      expect(contractAddress).toBeDefined();
      expect(contractAddress).toMatch(/^[0-9a-f]{64}$/);
    });

    it('should have readable ledger state', async () => {
      const ledger = await api.getLedgerState(providers, contractAddress as any);
      expect(ledger).not.toBeNull();
      expect(typeof ledger!.NonFungibleToken__name).toBe('string');
      expect(typeof ledger!.NonFungibleToken__symbol).toBe('string');
      if (isFreshDeploy) {
        expect(ledger!.NonFungibleToken__name).toBe(CONTRACT_NAME);
        expect(ledger!.NonFungibleToken__symbol).toBe(CONTRACT_SYMBOL);
      }
    });
  });

  // ── Preparation: Unpause & Roles ─────────────────────────────────────────

  describe('Preparation: Unpause & Roles', () => {
    it('should unpause all modules', async () => {
      await tryUnpause('AccessControl', () => api.unpauseAccessControl(contract));
      await tryUnpause('Identity', () => api.unpauseIdentity(contract));
      await tryUnpause('Token', () => api.unpauseToken(contract));
      await tryUnpause('NFTPool', () => api.unpauseNFTPool(contract));
    });

    it('should grant minter role (role 1) to admin', async () => {
      const account = createEitherAccount(coinPublicKey);
      const result = await retryTx('grantRole(minter)', wallet.wallet, () =>
        api.grantRole(contract, MINTER_ROLE, account),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
      expect(result.blockHeight).toBeGreaterThan(0n);
    });

    it('should grant pool operator role (role 2) to admin', async () => {
      const account = createEitherAccount(coinPublicKey);
      const result = await retryTx('grantRole(poolOperator)', wallet.wallet, () =>
        api.grantRole(contract, POOL_OPERATOR_ROLE, account),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
      expect(result.blockHeight).toBeGreaterThan(0n);
    });

    it('should grant verifier role (role 3) to admin', async () => {
      const account = createEitherAccount(coinPublicKey);
      const result = await retryTx('grantRole(verifier)', wallet.wallet, () =>
        api.grantRole(contract, VERIFIER_ROLE, account),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
      expect(result.blockHeight).toBeGreaterThan(0n);
    });
  });

  // ── Identity ─────────────────────────────────────────────────────────────

  describe('Identity', () => {
    it('should setUser to whitelist the wallet public key', async () => {
      const user: any = { bytes: new Uint8Array(Buffer.from(coinPublicKey, 'hex')) };
      const result = await retryTx('setUser', wallet.wallet, () => api.setUser(contract, user));
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
      expect(result.blockHeight).toBeGreaterThan(0n);
    });

    it('should assertOwnVerification successfully', async () => {
      const result = await retryTx('assertOwnVerification', wallet.wallet, () =>
        api.assertOwnVerification(contract),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
      expect(result.blockHeight).toBeGreaterThan(0n);
    });
  });

  // ── Token ────────────────────────────────────────────────────────────────

  describe('Token', () => {
    const tokenId1 = TOKEN_BASE + 1n;

    it('should mint token with certificate and price', async () => {
      const account = createEitherAccount(coinPublicKey);
      const certificate = createCertificate(1);
      const result = await retryTx('mint', wallet.wallet, () =>
        api.mint(contract, account, tokenId1, certificate, TOKEN_PRICE),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
      expect(result.blockHeight).toBeGreaterThan(0n);
    });

    it('should have incremented certificatesCreatedCounter', async () => {
      const ledger = await api.getLedgerState(providers, contractAddress as any);
      expect(ledger).not.toBeNull();
      expect(ledger!.NonFungibleToken__certificatesCreatedCounter).toBeGreaterThan(initialCertificatesCreated);
    });

    it('should setTokenPrice to update price', async () => {
      const newPrice = 200n;
      const result = await retryTx('setTokenPrice', wallet.wallet, () =>
        api.setTokenPrice(contract, tokenId1, newPrice),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
      expect(result.blockHeight).toBeGreaterThan(0n);
    });
  });

  // ── NFT Pool ─────────────────────────────────────────────────────────────

  describe('NFT Pool', () => {
    const tokenId1 = TOKEN_BASE + 1n;

    it('should addToPool to list token', async () => {
      const result = await retryTx('addToPool', wallet.wallet, () => api.addToPool(contract, tokenId1));
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
      expect(result.blockHeight).toBeGreaterThan(0n);
    });

    it('should purchaseNFT to buy token', async () => {
      const coin = createCoin(200n); // price was set to 200 in Token tests
      const result = await retryTx('purchaseNFT', wallet.wallet, () =>
        api.purchaseNFT(contract, tokenId1, coin),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
      expect(result.blockHeight).toBeGreaterThan(0n);
    });

    it('should have incremented purchaseCounter', async () => {
      const ledger = await api.getLedgerState(providers, contractAddress as any);
      expect(ledger).not.toBeNull();
      expect(ledger!.NFTPool__purchaseCounter).toBeGreaterThan(initialPurchaseCounter);
    });

    it('should withdrawSellerFunds successfully', async () => {
      const result = await retryTx('withdrawSellerFunds', wallet.wallet, () =>
        api.withdrawSellerFunds(contract),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
      expect(result.blockHeight).toBeGreaterThan(0n);
    });
  });

  // ── Ownership & Burn ─────────────────────────────────────────────────────

  describe('Ownership & Burn', () => {
    const tokenId2 = TOKEN_BASE + 2n;
    const challenge = randomBytes(32);
    const ownerCommitment = randomBytes(32);

    it('should mint token', async () => {
      const account = createEitherAccount(coinPublicKey);
      const certificate = createCertificate(2);
      const result = await retryTx('mint(token2)', wallet.wallet, () =>
        api.mint(contract, account, tokenId2, certificate, TOKEN_PRICE),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
    });

    it('should add token to pool', async () => {
      const result = await retryTx('addToPool(token2)', wallet.wallet, () =>
        api.addToPool(contract, tokenId2),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
    });

    it('should purchase token', async () => {
      const coin = createCoin(TOKEN_PRICE);
      const result = await retryTx('purchaseNFT(token2)', wallet.wallet, () =>
        api.purchaseNFT(contract, tokenId2, coin),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
    });

    it('should proofOwnership with challenge', async () => {
      const result = await retryTx('proofOwnership', wallet.wallet, () =>
        api.proofOwnership(contract, ownerCommitment, challenge),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
      expect(result.blockHeight).toBeGreaterThan(0n);
    });

    it('should burnPurchased with matching challenge', async () => {
      const result = await retryTx('burnPurchased', wallet.wallet, () =>
        api.burnPurchased(contract, ownerCommitment, tokenId2, challenge),
      );
      expect(result.txHash).toMatch(/[0-9a-f]{64}/);
      expect(result.blockHeight).toBeGreaterThan(0n);
    });
  });

  // ── Full Lifecycle E2E ───────────────────────────────────────────────────

  describe('Full lifecycle E2E', () => {
    const tokenId3 = TOKEN_BASE + 3n;
    const challenge = randomBytes(32);
    const ownerCommitment = randomBytes(32);

    it('should complete mint -> pool -> purchase -> prove -> burn -> verify', async () => {
      const account = createEitherAccount(coinPublicKey);
      const certificate = createCertificate(3);

      // Mint
      const mintResult = await retryTx('e2e:mint', wallet.wallet, () =>
        api.mint(contract, account, tokenId3, certificate, TOKEN_PRICE),
      );
      expect(mintResult.txHash).toMatch(/[0-9a-f]{64}/);

      // Add to pool
      const addResult = await retryTx('e2e:addToPool', wallet.wallet, () =>
        api.addToPool(contract, tokenId3),
      );
      expect(addResult.txHash).toMatch(/[0-9a-f]{64}/);

      // Purchase
      const coin = createCoin(TOKEN_PRICE);
      const purchaseResult = await retryTx('e2e:purchaseNFT', wallet.wallet, () =>
        api.purchaseNFT(contract, tokenId3, coin),
      );
      expect(purchaseResult.txHash).toMatch(/[0-9a-f]{64}/);

      // Proof ownership
      const proofResult = await retryTx('e2e:proofOwnership', wallet.wallet, () =>
        api.proofOwnership(contract, ownerCommitment, challenge),
      );
      expect(proofResult.txHash).toMatch(/[0-9a-f]{64}/);

      // Burn purchased
      const burnResult = await retryTx('e2e:burnPurchased', wallet.wallet, () =>
        api.burnPurchased(contract, ownerCommitment, tokenId3, challenge),
      );
      expect(burnResult.txHash).toMatch(/[0-9a-f]{64}/);

      // Verify via ledger state
      const ledger = await api.getLedgerState(providers, contractAddress as any);
      expect(ledger).not.toBeNull();
      expect(ledger!.NonFungibleToken__certificatesCreatedCounter).toBeGreaterThan(initialCertificatesCreated);
    });
  });
});
