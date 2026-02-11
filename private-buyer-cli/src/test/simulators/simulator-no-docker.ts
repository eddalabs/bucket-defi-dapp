import { type Config, UndeployedConfig, PreviewConfig, PreprodConfig } from '../../config';
import * as api from '../../api';
import type { WalletContext } from '../../api';
import type { PrivateBuyerProviders, DeployedPrivateBuyerContract } from '../../common-types';
import type { Logger } from 'pino';

const TEST_MNEMONIC = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

function buildConfig(): { config: Config; mode: string } {
  const env = process.env.TEST_ENV;
  if (env === 'preview') return { config: new PreviewConfig(), mode: 'preview' };
  if (env === 'preprod') return { config: new PreprodConfig(), mode: 'preprod' };
  return { config: new UndeployedConfig(), mode: 'undeployed' };
}

/**
 * Test environment that connects to already-running infrastructure
 * and an already-deployed contract. No Docker management, no deployment.
 *
 * Env vars:
 *   TEST_CONTRACT_ADDRESS — required, the deployed contract address
 *   TEST_ENV              — optional, 'preview' | 'preprod' (defaults to undeployed)
 *   MY_PREVIEW_MNEMONIC   — optional, custom mnemonic for preview/preprod
 *
 * Usage:
 *   TEST_CONTRACT_ADDRESS=<addr> npm run test-no-docker
 */
export class NoDockerTestEnvironment {
  private readonly logger: Logger;
  private readonly contractAddress: string;
  private readonly mode: string;
  private walletContext: WalletContext | undefined;
  private dappConfig: Config;

  constructor(logger: Logger) {
    this.logger = logger;
    const addr = process.env.TEST_CONTRACT_ADDRESS;
    if (!addr) {
      throw new Error('TEST_CONTRACT_ADDRESS environment variable is required for no-docker mode');
    }
    this.contractAddress = addr;
    const { config, mode } = buildConfig();
    this.dappConfig = config;
    this.mode = mode;
  }

  /**
   * Initialize config. No Docker containers are started.
   */
  start = async (): Promise<{ dappConfig: Config }> => {
    this.logger.info(`No-docker mode (${this.mode}): connecting to existing infrastructure`);
    this.logger.info(`Contract address: ${this.contractAddress}`);
    this.logger.info(`Configuration: ${JSON.stringify(this.dappConfig)}`);
    return { dappConfig: this.dappConfig };
  };

  /**
   * Build wallet. Uses genesis seed for undeployed, mnemonic for preview/preprod.
   */
  getWallet = async (): Promise<WalletContext> => {
    this.logger.info(`Setting up wallet (no-docker, mode=${this.mode})`);

    if (this.mode === 'undeployed') {
      this.walletContext = await api.buildWalletAndWaitForFunds(this.dappConfig, GENESIS_MINT_WALLET_SEED);
    } else {
      const mnemonic = process.env.MY_PREVIEW_MNEMONIC ?? TEST_MNEMONIC;
      const seed = await api.mnemonicToSeed(mnemonic);
      this.walletContext = await api.buildWalletAndWaitForFunds(this.dappConfig, seed);
    }

    return this.walletContext;
  };

  /**
   * Join the already-deployed contract.
   */
  joinContract = async (
    providers: PrivateBuyerProviders,
  ): Promise<{ contract: DeployedPrivateBuyerContract; contractAddress: string }> => {
    this.logger.info(`Joining contract at ${this.contractAddress}...`);
    const contract = await api.joinContract(providers, this.contractAddress);
    this.logger.info(`Joined contract at: ${contract.deployTxData.public.contractAddress}`);
    return { contract, contractAddress: this.contractAddress };
  };

  /**
   * Close wallet. No Docker containers to stop.
   */
  shutdown = async () => {
    if (this.walletContext !== undefined) {
      await api.closeWallet(this.walletContext);
    }
  };
}
