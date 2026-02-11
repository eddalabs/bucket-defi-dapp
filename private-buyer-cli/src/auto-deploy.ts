import 'dotenv/config';
import { createLogger } from './logger.js';
import { UndeployedConfig, PreprodConfig, PreviewConfig, type Config } from './config.js';
import * as api from './api.js';
import path from 'node:path';
import { currentDir } from './config.js';

// ─── Arg Parsing ────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

const getArg = (name: string): string | undefined => {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
};

const network = getArg('network');
const name = getArg('name');
const symbol = getArg('symbol');
const mnemonicArg = getArg('mnemonic');

if (!network || !name || !symbol) {
  console.error('Usage: npm run auto-deploy -- --network <undeployed|preview|preprod> --name <name> --symbol <symbol> [--mnemonic <phrase>]');
  process.exit(1);
}

if (!['undeployed', 'preview', 'preprod'].includes(network)) {
  console.error(`Invalid network: ${network}. Must be one of: undeployed, preview, preprod`);
  process.exit(1);
}

// ─── Genesis seed for standalone networks ───────────────────────────────────

const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

// ─── Main ───────────────────────────────────────────────────────────────────

const main = async () => {
  // 1. Create config based on --network
  let config: Config;
  switch (network) {
    case 'undeployed':
      config = new UndeployedConfig();
      break;
    case 'preview':
      config = new PreviewConfig();
      break;
    case 'preprod':
      config = new PreprodConfig();
      break;
    default:
      throw new Error(`Unknown network: ${network}`);
  }

  const logDir = path.resolve(currentDir, '..', 'logs', `auto-deploy-${network}`, `${new Date().toISOString()}.log`);
  const logger = await createLogger(logDir);
  api.setLogger(logger);

  console.log(`\n  Auto-Deploy: network=${network}, name="${name}", symbol="${symbol}"\n`);

  // 2. Build wallet from mnemonic, wait for sync + funds + dust
  let seed: string;
  if (network === 'undeployed') {
    seed = GENESIS_MINT_WALLET_SEED;
  } else {
    const mnemonic = mnemonicArg ?? process.env.MY_PREVIEW_MNEMONIC;
    if (!mnemonic) {
      console.error('No mnemonic provided. Use --mnemonic <phrase> or set MY_PREVIEW_MNEMONIC in .env');
      process.exit(1);
    }
    seed = await api.mnemonicToSeed(mnemonic);
  }

  const walletCtx = await api.buildWalletAndWaitForFunds(config, seed);

  try {
    // 3. Configure providers
    const providers = await api.withStatus('Configuring providers', () => api.configureProviders(walletCtx, config));
    console.log('');

    // 4. Deploy using deploy-only compiled contract (14 VKs)
    const contract = await api.withStatus('Deploying contract (14 circuit VKs)', () =>
      api.deployOnly(providers, name!, symbol!),
    );
    const contractAddress = contract.deployTxData.public.contractAddress;
    console.log(`\n  Contract deployed at: ${contractAddress}\n`);

    // 5. Insert remaining 24 VKs via insertRemainingVerifierKeys()
    await api.insertRemainingVerifierKeys(providers, contractAddress);

    console.log(`\n  Auto-deploy complete.`);
    console.log(`  Contract address: ${contractAddress}`);
    console.log(`  Network: ${network}\n`);
  } finally {
    // 6. Stop wallet
    await api.closeWallet(walletCtx);
  }
};

main().catch((err) => {
  console.error('Auto-deploy failed:', err);
  process.exit(1);
});
