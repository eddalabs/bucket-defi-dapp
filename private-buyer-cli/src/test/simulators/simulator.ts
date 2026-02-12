import { type Config, UndeployedConfig, currentDir, PreviewConfig, PreprodConfig } from '../../config';
import {
  DockerComposeEnvironment,
  GenericContainer,
  type StartedDockerComposeEnvironment,
  type StartedTestContainer,
  Wait,
} from 'testcontainers';
import path from 'path';
import * as api from '../../api';
import type { WalletContext } from '../../api';
import type { PrivateBuyerProviders, DeployedPrivateBuyerContract } from '../../common-types';
import type { Logger } from 'pino';

const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

export interface TestConfiguration {
  mnemonic?: string;
  dappConfig: Config;
  psMode: string;
}

export class LocalTestConfig implements TestConfiguration {
  psMode = 'undeployed';
  dappConfig = new UndeployedConfig();
}

export function parseArgs(required: string[]): TestConfiguration {
  let cfg: Config = new PreviewConfig();
  let psMode = 'undeployed';
  let mnemonic: string | undefined;

  if (required.includes('env')) {
    const env = process.env.TEST_ENV;
    if (env === undefined) {
      throw new Error('TEST_ENV environment variable is not defined.');
    }
    switch (env) {
      case 'preview':
        cfg = new PreviewConfig();
        psMode = 'preview';
        break;
      case 'preprod':
        cfg = new PreprodConfig();
        psMode = 'preprod';
        break;
      default:
        throw new Error(`Unknown env value=${env}`);
    }
    mnemonic = process.env.MY_PREVIEW_MNEMONIC;
    if (!mnemonic) throw new Error('MY_PREVIEW_MNEMONIC is required for preview/preprod');
  }

  return {
    mnemonic,
    dappConfig: cfg,
    psMode,
  };
}

export class TestEnvironment {
  private readonly logger: Logger;
  private env: StartedDockerComposeEnvironment | undefined;
  private dockerEnv: DockerComposeEnvironment | undefined;
  private container: StartedTestContainer | undefined;
  private walletContext: WalletContext | undefined;
  private testConfig: TestConfiguration;

  constructor(logger: Logger) {
    this.logger = logger;
    this.testConfig = new LocalTestConfig();
  }

  start = async (): Promise<TestConfiguration> => {
    if (process.env.RUN_ENV_TESTS === 'true') {
      this.testConfig = parseArgs(['env']);
      this.logger.info('Proof server starting...');
      this.container = await TestEnvironment.getProofServerContainer(this.testConfig.psMode);
      this.testConfig.dappConfig = {
        ...this.testConfig.dappConfig,
        proofServer: `http://${this.container.getHost()}:${this.container.getMappedPort(6300).toString()}`,
      };
    } else {
      this.testConfig = new LocalTestConfig();
      this.logger.info('Test containers starting...');
      const composeFile = process.env.COMPOSE_FILE ?? 'standalone.yml';
      this.logger.info(`Using compose file: ${composeFile}`);
      this.dockerEnv = new DockerComposeEnvironment(path.resolve(currentDir, '..'), composeFile)
        .withWaitStrategy(
          'private-buyer-proof-server',
          Wait.forLogMessage('Actix runtime found; starting in Actix runtime', 1),
        )
        .withWaitStrategy('private-buyer-indexer', Wait.forLogMessage('starting indexing', 1))
        .withWaitStrategy('private-buyer-node', Wait.forLogMessage('Running JSON-RPC server', 1));
      this.env = await this.dockerEnv.up();

      this.testConfig.dappConfig = {
        ...this.testConfig.dappConfig,
        indexer: TestEnvironment.mapContainerPort(this.env, this.testConfig.dappConfig.indexer, 'private-buyer-indexer'),
        indexerWS: TestEnvironment.mapContainerPort(this.env, this.testConfig.dappConfig.indexerWS, 'private-buyer-indexer'),
        node: TestEnvironment.mapContainerPort(this.env, this.testConfig.dappConfig.node, 'private-buyer-node'),
        proofServer: TestEnvironment.mapContainerPort(
          this.env,
          this.testConfig.dappConfig.proofServer,
          'private-buyer-proof-server',
        ),
      };
    }
    this.logger.info(`Configuration:${JSON.stringify(this.testConfig)}`);
    this.logger.info('Test containers started');
    return this.testConfig;
  };

  /**
   * Deploy contract using deployOnly (14 VKs) + insertRemainingVerifierKeys (24 VKs).
   * Returns the deployed contract and its address.
   */
  deployContract = async (
    providers: PrivateBuyerProviders,
    name: string,
    symbol: string,
  ): Promise<{ contract: DeployedPrivateBuyerContract; contractAddress: string }> => {
    this.logger.info('Deploying contract (deployOnly + VK insertion)...');
    const contract = await api.deployOnly(providers, name, symbol);
    const contractAddress = contract.deployTxData.public.contractAddress;
    this.logger.info(`Contract deployed at: ${contractAddress}`);

    this.logger.info('Inserting remaining verifier keys...');
    await api.insertRemainingVerifierKeys(providers, contractAddress, this.walletContext?.wallet);
    this.logger.info('All verifier keys inserted.');

    return { contract, contractAddress };
  };

  static mapContainerPort = (env: StartedDockerComposeEnvironment, url: string, containerName: string) => {
    const mappedUrl = new URL(url);
    const container = env.getContainer(containerName);

    mappedUrl.port = String(container.getFirstMappedPort());

    return mappedUrl.toString().replace(/\/+$/, '');
  };

  static getProofServerContainer = async (_env: string) =>
    await new GenericContainer('midnightntwrk/proof-server:7.0.0')
      .withExposedPorts(6300)
      .withCommand(['midnight-proof-server -v'])
      .withEnvironment({ RUST_BACKTRACE: 'full' })
      .withWaitStrategy(Wait.forLogMessage('Actix runtime found; starting in Actix runtime', 1))
      .start();

  shutdown = async () => {
    if (this.walletContext !== undefined) {
      await api.closeWallet(this.walletContext);
    }
    if (this.env !== undefined) {
      this.logger.info('Test containers closing');
      await this.env.down();
    }
    if (this.container !== undefined) {
      this.logger.info('Test container closing');
      await this.container.stop();
    }
  };

  getWallet = async (): Promise<WalletContext> => {
    this.logger.info('Setting up wallet');

    if (this.testConfig.psMode === 'undeployed') {
      this.walletContext = await api.buildWalletAndWaitForFunds(this.testConfig.dappConfig, GENESIS_MINT_WALLET_SEED);
    } else {
      if (!this.testConfig.mnemonic) throw new Error('MY_PREVIEW_MNEMONIC is required for preview/preprod');
      const seed = await api.mnemonicToSeed(this.testConfig.mnemonic);
      this.walletContext = await api.buildWalletAndWaitForFunds(this.testConfig.dappConfig, seed);
    }

    return this.walletContext;
  };
}
