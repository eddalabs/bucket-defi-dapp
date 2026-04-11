import { type WalletContext } from './api';
import { stdin as input, stdout as output } from 'node:process';
import { createInterface, type Interface } from 'node:readline/promises';
import { type Logger } from 'pino';
import { type StartedDockerComposeEnvironment, type DockerComposeEnvironment } from 'testcontainers';
import { type MiniPrivateBuyerProviders, type DeployedMiniPrivateBuyerContract } from './common-types';
import { type Config, UndeployedConfig } from './config';
import { MiniPrivateBuyer } from '@eddalabs/mini-private-buyer-contract';
import * as api from './api';

let logger: Logger;

/**
 * This seed gives access to tokens minted in the genesis block of a local development node.
 */
const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

// ─── Display Helpers ────────────────────────────────────────────────────────

const BANNER = `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║              Mini Private Buyer                              ║
║              ─────────────────                               ║
║              A privacy-preserving NFT marketplace            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`;

const DIVIDER = '──────────────────────────────────────────────────────────────';

// ─── Menu Helpers ──────────────────────────────────────────────────────────

const WALLET_MENU = `
${DIVIDER}
  Wallet Setup
${DIVIDER}
  [1] Create a new wallet
  [2] Restore wallet from seed
  [3] Restore wallet from mnemonic
  [4] Use mnemonic from .env file
  [5] Exit
${'─'.repeat(62)}
> `;

/** Build the contract actions menu, showing current DUST balance in the header. */
const contractMenu = (dustBalance: string) => `
${DIVIDER}
  Contract Actions${dustBalance ? `                    DUST: ${dustBalance}` : ''}
${DIVIDER}
  [1] Deploy a new mini-private-buyer contract
  [2] Join an existing contract
  [3] Monitor DUST balance
  [4] Exit
${'─'.repeat(62)}
> `;

/** Build the main actions menu (14 circuits), showing current DUST balance in the header. */
const mainMenu = (dustBalance: string) => `
${DIVIDER}
  Main Actions (14 circuits)${dustBalance ? `            DUST: ${dustBalance}` : ''}
${DIVIDER}
  [1] Mint                        [2] Burn
  [3] Set Token Price             [4] Add to Pool
  [5] Remove from Pool            [6] Purchase NFT
  [7] Withdraw Seller Funds       [8] Proof Ownership
  [9] Burn Purchased Token        [10] Balance Of
  [11] Owner Of                   [12] Token Certificate
  [13] Token Price
  ── Admin ──
  [14] View Ledger State
  [15] Exit
${'─'.repeat(62)}
> `;

// ─── Wallet Setup ───────────────────────────────────────────────────────────

const buildWalletFromSeed = async (config: Config, rli: Interface): Promise<WalletContext> => {
  const seed = await rli.question('Enter your wallet seed: ');
  return await api.buildWalletAndWaitForFunds(config, seed);
};

const buildWalletFromMnemonic = async (config: Config, rli: Interface): Promise<WalletContext> => {
  const mnemonic = await rli.question('Enter your mnemonic phrase: ');
  const seed = await api.mnemonicToSeed(mnemonic);
  return await api.buildWalletAndWaitForFunds(config, seed);
};

const buildWallet = async (config: Config, rli: Interface): Promise<WalletContext | null> => {
  if (config instanceof UndeployedConfig) {
    return await api.buildWalletAndWaitForFunds(config, GENESIS_MINT_WALLET_SEED);
  }

  const envMnemonic = process.env.MY_PREVIEW_MNEMONIC;

  while (true) {
    const choice = await rli.question(WALLET_MENU);
    switch (choice.trim()) {
      case '1':
        return await api.buildFreshWallet(config);
      case '2':
        return await buildWalletFromSeed(config, rli);
      case '3':
        return await buildWalletFromMnemonic(config, rli);
      case '4':
        if (envMnemonic) {
          logger.info('Using mnemonic from .env file...');
          const seed = await api.mnemonicToSeed(envMnemonic);
          return await api.buildWalletAndWaitForFunds(config, seed);
        } else {
          logger.error('MY_PREVIEW_MNEMONIC not found in environment. Set it in your .env file.');
        }
        break;
      case '5':
        return null;
      default:
        logger.error(`Invalid choice: ${choice}`);
    }
  }
};

// ─── Contract Interaction ───────────────────────────────────────────────────

const getDustLabel = async (wallet: api.WalletContext['wallet']): Promise<string> => {
  try {
    const dust = await api.getDustBalance(wallet);
    return dust.available.toLocaleString();
  } catch {
    return '';
  }
};

const joinContract = async (providers: MiniPrivateBuyerProviders, rli: Interface): Promise<DeployedMiniPrivateBuyerContract> => {
  const contractAddress = await rli.question('Enter the contract address (hex): ');
  return await api.joinContract(providers, contractAddress);
};

const startDustMonitor = async (wallet: api.WalletContext['wallet'], rli: Interface): Promise<void> => {
  console.log('');
  const stopPromise = rli.question('  Press Enter to return to menu...\n').then(() => {});
  await api.monitorDustBalance(wallet, stopPromise);
  console.log('');
};

// ─── Helper: parse hex bytes from user input ────────────────────────────────

const readHexBytes = async (rli: Interface, prompt: string): Promise<Uint8Array> => {
  const hex = await rli.question(prompt);
  return new Uint8Array(Buffer.from(hex.trim(), 'hex'));
};

const readBigInt = async (rli: Interface, prompt: string): Promise<bigint> => {
  const val = await rli.question(prompt);
  return BigInt(val.trim());
};

// ─── Sub-menus ──────────────────────────────────────────────────────────────

const deployOrJoin = async (
  providers: MiniPrivateBuyerProviders,
  walletCtx: api.WalletContext,
  rli: Interface,
): Promise<DeployedMiniPrivateBuyerContract | null> => {
  while (true) {
    const dustLabel = await getDustLabel(walletCtx.wallet);
    const choice = await rli.question(contractMenu(dustLabel));
    switch (choice.trim()) {
      case '1':
        try {
          const name = await rli.question('Enter contract name: ');
          const symbol = await rli.question('Enter contract symbol: ');
          const contract = await api.withStatus('Deploying contract (single tx, 14 circuits)', () =>
            api.deploy(providers, name.trim(), symbol.trim()),
          );
          const contractAddress = contract.deployTxData.public.contractAddress;
          console.log(`  Contract deployed at: ${contractAddress}`);
          console.log(`  Deploy complete.\n`);
          return contract;
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          console.log(`\n  ✗ Deploy failed: ${msg}`);
          if (e instanceof Error && e.cause) {
            let cause: unknown = e.cause;
            let depth = 0;
            while (cause && depth < 5) {
              const causeMsg =
                cause instanceof Error
                  ? `${cause.message}\n      ${cause.stack?.split('\n').slice(1, 3).join('\n      ') ?? ''}`
                  : String(cause);
              console.log(`    cause: ${causeMsg}`);
              cause = cause instanceof Error ? cause.cause : undefined;
              depth++;
            }
          }
          if (msg.toLowerCase().includes('dust') || msg.toLowerCase().includes('no dust')) {
            console.log('    Insufficient DUST for transaction fees. Use option [3] to monitor your balance.');
          }
          console.log('');
        }
        break;
      case '2':
        try {
          return await joinContract(providers, rli);
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          console.log(`  ✗ Failed to join contract: ${msg}\n`);
        }
        break;
      case '3':
        await startDustMonitor(walletCtx.wallet, rli);
        break;
      case '4':
        return null;
      default:
        console.log(`  Invalid choice: ${choice}`);
    }
  }
};

const mainLoop = async (
  providers: MiniPrivateBuyerProviders,
  walletCtx: api.WalletContext,
  rli: Interface,
): Promise<void> => {
  const contract = await deployOrJoin(providers, walletCtx, rli);
  if (contract === null) {
    return;
  }

  while (true) {
    const dustLabel = await getDustLabel(walletCtx.wallet);
    const choice = await rli.question(mainMenu(dustLabel));
    try {
      switch (choice.trim()) {
        case '1': {
          const toHex = await readHexBytes(rli, 'Enter recipient public key (hex): ');
          const to: MiniPrivateBuyer.Either<MiniPrivateBuyer.ZswapCoinPublicKey, MiniPrivateBuyer.ContractAddress> = {
            is_left: true,
            left: { bytes: toHex },
            right: { bytes: new Uint8Array() },
          };
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          const idStr = await rli.question('Enter certificate ID: ');
          const categoryStr = await rli.question('Enter category (Type1=0,Type2=1,Type3=2,Type4=3,Type5=4,Type6=5): ');
          const quantity = await readBigInt(rli, 'Enter quantity: ');
          const period = await readBigInt(rli, 'Enter period: ');
          const tierStr = await rli.question('Enter tier (Level1=0,Level2=1,Level3=2,Level4=3,Level5=4): ');
          const regionStr = await rli.question('Enter region (Region1=0,Region2=1,Region3=2,Region4=3): ');
          const price = await readBigInt(rli, 'Enter price: ');
          const cert: MiniPrivateBuyer.NonFungibleToken_Certificate = {
            id: idStr.trim(),
            category: Number(categoryStr.trim()) as MiniPrivateBuyer.NonFungibleToken_Category,
            quantity,
            period,
            tier: Number(tierStr.trim()) as MiniPrivateBuyer.NonFungibleToken_Tier,
            region: Number(regionStr.trim()) as MiniPrivateBuyer.NonFungibleToken_Region,
          };
          await api.withStatus('Minting token', () => api.mint(contract, to, tokenId, cert, price));
          break;
        }
        case '2': {
          const tokenId = await readBigInt(rli, 'Enter token ID to burn: ');
          await api.withStatus('Burning token', () => api.burn(contract, tokenId));
          break;
        }
        case '3': {
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          const price = await readBigInt(rli, 'Enter new price: ');
          await api.withStatus('Setting token price', () => api.setTokenPrice(contract, tokenId, price));
          break;
        }
        case '4': {
          const tokenId = await readBigInt(rli, 'Enter token ID to add: ');
          await api.withStatus('Adding to pool', () => api.addToPool(contract, tokenId));
          break;
        }
        case '5': {
          const tokenId = await readBigInt(rli, 'Enter token ID to remove: ');
          await api.withStatus('Removing from pool', () => api.removeFromPool(contract, tokenId));
          break;
        }
        case '6': {
          const tokenId = await readBigInt(rli, 'Enter token ID to purchase: ');
          const nonce = await readHexBytes(rli, 'Enter coin nonce (hex): ');
          const color = await readHexBytes(rli, 'Enter coin color (hex): ');
          const value = await readBigInt(rli, 'Enter coin value: ');
          const coin: MiniPrivateBuyer.ShieldedCoinInfo = { nonce, color, value };
          await api.withStatus('Purchasing NFT', () => api.purchaseNFT(contract, tokenId, coin));
          break;
        }
        case '7':
          await api.withStatus('Withdrawing seller funds', () => api.withdrawSellerFunds(contract));
          break;
        case '8': {
          const ownerCommitment = await readHexBytes(rli, 'Enter owner commitment (hex): ');
          const challenge = await readHexBytes(rli, 'Enter challenge (hex): ');
          await api.withStatus('Proving ownership', () => api.proofOwnership(contract, ownerCommitment, challenge));
          break;
        }
        case '9': {
          const ownerCommitment = await readHexBytes(rli, 'Enter owner commitment (hex): ');
          const tokenId = await readBigInt(rli, 'Enter token ID to burn: ');
          const challenge = await readHexBytes(rli, 'Enter challenge (hex): ');
          await api.withStatus('Burning purchased token', () =>
            api.burnPurchased(contract, ownerCommitment, tokenId, challenge),
          );
          break;
        }
        case '10': {
          const ownerHex = await readHexBytes(rli, 'Enter owner public key (hex): ');
          const owner: MiniPrivateBuyer.Either<MiniPrivateBuyer.ZswapCoinPublicKey, MiniPrivateBuyer.ContractAddress> = {
            is_left: true,
            left: { bytes: ownerHex },
            right: { bytes: new Uint8Array() },
          };
          await api.withStatus('Querying balance', () => api.balanceOf(contract, owner));
          break;
        }
        case '11': {
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          await api.withStatus('Querying owner', () => api.ownerOf(contract, tokenId));
          break;
        }
        case '12': {
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          await api.withStatus('Querying certificate', () => api.tokenCertificate(contract, tokenId));
          break;
        }
        case '13': {
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          await api.withStatus('Querying price', () => api.tokenPrice(contract, tokenId));
          break;
        }
        case '14':
          await api.displayLedgerSummary(providers, contract);
          break;
        case '15':
          return;
        default:
          console.log(`  Invalid choice: ${choice}`);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`  ✗ Failed: ${msg}\n`);
    }
  }
};

// ─── Docker Port Mapping ────────────────────────────────────────────────────

const mapContainerPort = (env: StartedDockerComposeEnvironment, url: string, containerName: string) => {
  const mappedUrl = new URL(url);
  const container = env.getContainer(containerName);
  mappedUrl.port = String(container.getFirstMappedPort());
  return mappedUrl.toString().replace(/\/+$/, '');
};

// ─── Entry Point ────────────────────────────────────────────────────────────

export const run = async (config: Config, _logger: Logger, dockerEnv?: DockerComposeEnvironment): Promise<void> => {
  logger = _logger;
  api.setLogger(_logger);

  console.log(BANNER);

  const rli = createInterface({ input, output, terminal: true });
  let env: StartedDockerComposeEnvironment | undefined;

  try {
    if (dockerEnv !== undefined) {
      console.log('Starting Docker containers (this may take a while)...');
      env = await dockerEnv.up();
      console.log('Docker containers started.');

      if (config instanceof UndeployedConfig) {
        config.indexer = mapContainerPort(env, config.indexer, 'mini-private-buyer-indexer');
        config.indexerWS = mapContainerPort(env, config.indexerWS, 'mini-private-buyer-indexer');
        config.node = mapContainerPort(env, config.node, 'mini-private-buyer-node');
        config.proofServer = mapContainerPort(env, config.proofServer, 'mini-private-buyer-proof-server');
      }
      console.log('Port remapping complete. Indexer:', config.indexer, 'Node:', config.node, 'ProofServer:', config.proofServer);
    }

    console.log('Building wallet...');
    const walletCtx = await buildWallet(config, rli);
    if (walletCtx === null) {
      return;
    }

    try {
      const providers = await api.withStatus('Configuring providers', () => api.configureProviders(walletCtx, config));
      console.log('');

      await mainLoop(providers, walletCtx, rli);
    } catch (e) {
      if (e instanceof Error) {
        logger.error(`Error: ${e.message}`);
        logger.debug(`${e.stack}`);
      } else {
        throw e;
      }
    } finally {
      try {
        await walletCtx.wallet.stop();
      } catch (e) {
        logger.error(`Error stopping wallet: ${e}`);
      }
    }
  } finally {
    rli.close();
    rli.removeAllListeners();

    if (env !== undefined) {
      try {
        await env.down();
      } catch (e) {
        logger.error(`Error shutting down docker environment: ${e}`);
      }
    }

    logger.info('Goodbye.');
  }
};
