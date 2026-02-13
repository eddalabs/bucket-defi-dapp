import path from 'path';
import * as api from '../api';
import type { MiniPrivateBuyerProviders, DeployedMiniPrivateBuyerContract } from '../common-types';
import { currentDir, UndeployedConfig, PreviewConfig, PreprodConfig, type Config } from '../config';
import { createLogger } from '../logger';
import { TestEnvironment } from './simulators/simulator';
import { createCertificate, createEitherAccount, createCoin, randomBytes } from './utils/utils';
import * as Rx from 'rxjs';
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import 'dotenv/config';

// ─── Logger Setup ────────────────────────────────────────────────────────────

const network = process.env.TEST_ENV || 'undeployed';
const logDir = path.resolve(currentDir, '..', 'logs', `test-${network}`, `${new Date().toISOString()}.log`);
const logger = await createLogger(logDir);

// ─── Timeout ─────────────────────────────────────────────────────────────────

const timeout = 1000 * 60 * 45; // 45 minutes

// ─── Contract Config ─────────────────────────────────────────────────────────

const CONTRACT_NAME = 'MiniIntegrationTest';
const CONTRACT_SYMBOL = 'MIT';
const TOKEN_PRICE = 100n;

const TOKEN_BASE = BigInt(Math.floor(Math.random() * 900000) + 100000);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TX_RETRY_COUNT = 3;
const TX_RETRY_DELAY_MS = 15_000;

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

const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

function buildConfigFromEnv(): { config: Config; mode: string } {
  const env = process.env.TEST_ENV;
  if (env === 'preview') return { config: new PreviewConfig(), mode: 'preview' };
  if (env === 'preprod') return { config: new PreprodConfig(), mode: 'preprod' };
  return { config: new UndeployedConfig(), mode: 'undeployed' };
}

async function buildWalletForMode(config: Config, mode: string): Promise<api.WalletContext> {
  if (mode === 'undeployed') {
    return await api.buildWalletAndWaitForFunds(config, GENESIS_MINT_WALLET_SEED);
  }
  const mnemonic = process.env.MY_PREVIEW_MNEMONIC;
  if (!mnemonic) throw new Error('MY_PREVIEW_MNEMONIC is required for preview/preprod');
  const seed = await api.mnemonicToSeed(mnemonic);
  return await api.buildWalletAndWaitForFunds(config, seed);
}

// ─── Test Suite ──────────────────────────────────────────────────────────────

describe('Mini Private Buyer Integration Tests', () => {
  let simulator: TestEnvironment | undefined;
  let wallet: api.WalletContext;
  let providers: MiniPrivateBuyerProviders;
  let contract: DeployedMiniPrivateBuyerContract;
  let contractAddress: string;
  let coinPublicKey: string;
  let isFreshDeploy: boolean;

  let initialCertificatesCreated: bigint;
  let initialPurchaseCounter: bigint;

  // ── Setup ────────────────────────────────────────────────────────────────

  beforeAll(async () => {
    api.setLogger(logger);

    const useExisting = process.env.NO_DOCKER === 'true';

    if (useExisting) {
      const addr = process.env.TEST_CONTRACT_ADDRESS;
      if (!addr) throw new Error('TEST_CONTRACT_ADDRESS is required when NO_DOCKER=true');

      const { config, mode } = buildConfigFromEnv();
      logger.info(`Existing infra mode (${mode}): joining contract at ${addr}`);

      wallet = await buildWalletForMode(config, mode);
      providers = await api.configureProviders(wallet, config);
      contract = await api.joinContract(providers, addr);
      contractAddress = addr;
      isFreshDeploy = false;
    } else {
      logger.info('Full mode: deploying fresh contract via testcontainers');
      simulator = new TestEnvironment(logger);
      const testConfig = await simulator.start();
      wallet = await simulator.getWallet();
      providers = await api.configureProviders(wallet, testConfig.dappConfig);
      const deployed = await simulator.deployContract(providers, CONTRACT_NAME, CONTRACT_SYMBOL);
      contract = deployed.contract;
      contractAddress = deployed.contractAddress;
      isFreshDeploy = true;
    }

    const walletProvider = await api.createWalletAndMidnightProvider(wallet);
    coinPublicKey = walletProvider.getCoinPublicKey();
    logger.info(`Wallet coin public key: ${coinPublicKey}`);

    const ledger = await api.getLedgerState(providers, contractAddress as any);
    initialCertificatesCreated = ledger?.NonFungibleToken__certificatesCreatedCounter ?? 0n;
    initialPurchaseCounter = ledger?.NFTPool__purchaseCounter ?? 0n;
    logger.info(`Baseline state: certificates=${initialCertificatesCreated}, purchases=${initialPurchaseCounter}`);
    logger.info(`Token ID base for this run: ${TOKEN_BASE}`);
  }, timeout);

  afterAll(async () => {
    if (simulator) {
      await simulator.shutdown();
    } else if (wallet) {
      await api.closeWallet(wallet);
    }
  });

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
      const coin = createCoin(200n);
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
