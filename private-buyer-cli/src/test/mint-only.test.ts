import path from 'path';
import * as api from '../api';
import type { PrivateBuyerProviders, DeployedPrivateBuyerContract } from '../common-types';
import { currentDir, UndeployedConfig, PreviewConfig, PreprodConfig, type Config } from '../config';
import { createLogger } from '../logger';
import { createCertificate, createEitherAccount } from './utils/utils';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import 'dotenv/config';

const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';
const TEST_MNEMONIC = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';

const network = process.env.TEST_ENV || 'undeployed';
const logDir = path.resolve(currentDir, '..', 'logs', `test-mint-only-${network}`, `${new Date().toISOString()}.log`);
const logger = await createLogger(logDir);

const timeout = 1000 * 60 * 15; // 15 minutes
const TOKEN_PRICE = 100n;
const TOKEN_ID = BigInt(Math.floor(Math.random() * 900000) + 100000);

function buildConfigFromEnv(): { config: Config; mode: string } {
  const env = process.env.TEST_ENV;
  if (env === 'preview') return { config: new PreviewConfig(), mode: 'preview' };
  if (env === 'preprod') return { config: new PreprodConfig(), mode: 'preprod' };
  return { config: new UndeployedConfig(), mode: 'undeployed' };
}

describe('Mint-only test', () => {
  let wallet: api.WalletContext;
  let providers: PrivateBuyerProviders;
  let contract: DeployedPrivateBuyerContract;
  let coinPublicKey: string;

  beforeAll(async () => {
    api.setLogger(logger);

    const addr = process.env.TEST_CONTRACT_ADDRESS;
    if (!addr) throw new Error('TEST_CONTRACT_ADDRESS is required for mint-only test');

    const { config, mode } = buildConfigFromEnv();
    logger.info(`Mint-only test (${mode}): joining contract at ${addr}`);

    if (mode === 'undeployed') {
      wallet = await api.buildWalletAndWaitForFunds(config, GENESIS_MINT_WALLET_SEED);
    } else {
      const mnemonic = process.env.MY_PREVIEW_MNEMONIC ?? TEST_MNEMONIC;
      const seed = await api.mnemonicToSeed(mnemonic);
      wallet = await api.buildWalletAndWaitForFunds(config, seed);
    }

    providers = await api.configureProviders(wallet, config);
    contract = await api.joinContract(providers, addr);

    const walletProvider = await api.createWalletAndMidnightProvider(wallet);
    coinPublicKey = walletProvider.getCoinPublicKey();
    logger.info(`Wallet coin public key: ${coinPublicKey}`);

    // Log dust state
    const dust = await api.getDustBalance(wallet.wallet);
    logger.info(`DUST: available=${dust.available}, coins=${dust.availableCoins}, pending=${dust.pending}, pendingCoins=${dust.pendingCoins}`);
  }, timeout);

  afterAll(async () => {
    if (wallet) {
      await api.closeWallet(wallet);
    }
  });

  it('should mint a token directly', async () => {
    const account = createEitherAccount(coinPublicKey);
    const certificate = createCertificate(1);

    logger.info(`Attempting mint: tokenId=${TOKEN_ID}, certificate.id=${certificate.id}`);
    logger.info(`Account: is_left=${account.is_left}`);

    const result = await api.mint(contract, account, TOKEN_ID, certificate, TOKEN_PRICE);
    logger.info(`Mint result: txHash=${result.txHash}, blockHeight=${result.blockHeight}`);

    expect(result.txHash).toMatch(/[0-9a-f]{64}/);
    expect(result.blockHeight).toBeGreaterThan(0n);
  }, timeout);
});
