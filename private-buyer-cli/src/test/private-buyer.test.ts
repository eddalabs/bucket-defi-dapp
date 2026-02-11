import path from 'path';
import * as api from '../api';
import { type PrivateBuyerProviders } from '../common-types';
import { currentDir } from '../config';
import { createLogger } from '../logger';
import { TestEnvironment } from './simulators/simulator';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import 'dotenv/config';
import * as Rx from 'rxjs';
import { PrivateBuyer } from '@eddalabs/private-buyer-contract';

let logDir: string;
const network = process.env.TEST_ENV || 'undeployed';
if (network === 'undeployed') {
  logDir = path.resolve(currentDir, '..', 'logs', 'test-undeployed', `${new Date().toISOString()}.log`);
} else if (network === 'preprod') {
  logDir = path.resolve(currentDir, '..', 'logs', 'test-preprod', `${new Date().toISOString()}.log`);
} else {
  logDir = path.resolve(currentDir, '..', 'logs', 'test-preview', `${new Date().toISOString()}.log`);
}
const logger = await createLogger(logDir);

describe('API', () => {
  let testEnvironment: TestEnvironment;
  let wallet: api.WalletContext;
  let providers: PrivateBuyerProviders;

  beforeAll(
    async () => {
      api.setLogger(logger);
      testEnvironment = new TestEnvironment(logger);
      const testConfiguration = await testEnvironment.start();
      logger.info(`Test configuration: ${JSON.stringify(testConfiguration)}`);
      wallet = await testEnvironment.getWallet();
      providers = await api.configureProviders(wallet, testConfiguration.dappConfig);
    },
    1000 * 60 * 45,
  );

  afterAll(async () => {
    await testEnvironment.shutdown();
  });

  it('should deploy the contract and verify ledger state [@slow]', async () => {
    const contract = await api.deploy(providers, 'TestNFT', 'TNFT');
    expect(contract).not.toBeNull();

    const { ledger } = await api.displayLedgerSummary(providers, contract);
    expect(ledger).not.toBeNull();
    expect(ledger!.NonFungibleToken__name).toEqual('TestNFT');
    expect(ledger!.NonFungibleToken__symbol).toEqual('TNFT');
    expect(ledger!.NonFungibleToken__certificatesCreatedCounter).toEqual(0n);
    expect(ledger!.NFTPool__purchaseCounter).toEqual(0n);

    const state = await Rx.firstValueFrom(wallet.wallet.state().pipe(Rx.filter((s) => s.isSynced)));
    logger.info({
      section: 'DUST Wallet State',
      dust: state.dust,
    });
    logger.info({
      section: 'Shielded Wallet State',
      shielded: state.shielded,
    });
    logger.info({
      section: 'Unshielded Wallet State',
      unshielded: state.unshielded,
    });
  });

  it('Wallet Functionalities', async () => {
    logger.info({
      section: 'Wallet Context',
      dustSecretKey: wallet.dustSecretKey,
      sshieldedSecretKeys: wallet.shieldedSecretKeys,
      unshieldedKeystore: wallet.unshieldedKeystore,
    });
  });
});
