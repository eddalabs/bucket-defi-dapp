import { type WalletContext } from './api';
import { stdin as input, stdout as output } from 'node:process';
import { createInterface, type Interface } from 'node:readline/promises';
import { type Logger } from 'pino';
import { type StartedDockerComposeEnvironment, type DockerComposeEnvironment } from 'testcontainers';
import { type PrivateBuyerProviders, type DeployedPrivateBuyerContract } from './common-types';
import { type Config, UndeployedConfig } from './config';
import { PrivateBuyer } from '@eddalabs/private-buyer-contract';
import * as api from './api';

let logger: Logger;

/**
 * This seed gives access to tokens minted in the genesis block of a local development node.
 * Only used in standalone networks to build a wallet with initial funds.
 */
const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

// ─── Display Helpers ────────────────────────────────────────────────────────

const BANNER = `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║              Midnight Private Buyer                          ║
║              ─────────────────────                           ║
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
  [1] Deploy a new private-buyer contract
  [2] Join an existing private-buyer contract
  [3] Monitor DUST balance
  [4] Exit
${'─'.repeat(62)}
> `;

/** Build the main actions menu, showing current DUST balance in the header. */
const mainMenu = (dustBalance: string) => `
${DIVIDER}
  Main Actions${dustBalance ? `                        DUST: ${dustBalance}` : ''}
${DIVIDER}
  [1] Access Control
  [2] Identity
  [3] Token Operations
  [4] NFT Pool
  [5] View Ledger State
  [6] Exit
${'─'.repeat(62)}
> `;

const accessControlMenu = () => `
${DIVIDER}
  Access Control
${DIVIDER}
  [1] Grant Role
  [2] Revoke Role
  [3] Renounce Role
  [4] Pause Access Control
  [5] Unpause Access Control
  [6] Back
${'─'.repeat(62)}
> `;

const identityMenu = () => `
${DIVIDER}
  Identity
${DIVIDER}
  [1] Set User
  [2] Remove User
  [3] Assert Own Verification
  [4] Pause Identity
  [5] Unpause Identity
  [6] Back
${'─'.repeat(62)}
> `;

const tokenMenu = () => `
${DIVIDER}
  Token Operations
${DIVIDER}
  [1] Mint
  [2] Burn
  [3] Set Token Price
  [4] Query Balance Of
  [5] Query Owner Of
  [6] Query Token Certificate
  [7] Query Token Price
  [8] Pause Token
  [9] Unpause Token
  [10] Back
${'─'.repeat(62)}
> `;

const poolMenu = () => `
${DIVIDER}
  NFT Pool
${DIVIDER}
  [1] Add to Pool
  [2] Remove from Pool
  [3] Purchase NFT
  [4] Purchase Batch 5
  [5] Purchase Batch 10
  [6] Purchase Batch 20
  [7] Withdraw Seller Funds
  [8] Proof Ownership
  [9] Burn Purchased Batch 5
  [10] Burn Purchased Batch 10
  [11] Burn Purchased Batch 20
  [12] Pause NFT Pool
  [13] Unpause NFT Pool
  [14] Back
${'─'.repeat(62)}
> `;

// ─── Wallet Setup ───────────────────────────────────────────────────────────

/** Prompt the user for a seed phrase and restore a wallet from it. */
const buildWalletFromSeed = async (config: Config, rli: Interface): Promise<WalletContext> => {
  const seed = await rli.question('Enter your wallet seed: ');
  return await api.buildWalletAndWaitForFunds(config, seed);
};

/** Prompt the user for a mnemonic phrase and restore a wallet from it. */
const buildWalletFromMnemonic = async (config: Config, rli: Interface): Promise<WalletContext> => {
  const mnemonic = await rli.question('Enter your mnemonic phrase: ');
  const seed = await api.mnemonicToSeed(mnemonic);
  return await api.buildWalletAndWaitForFunds(config, seed);
};

/**
 * Wallet creation flow.
 * - Standalone configs skip the menu and use the genesis seed automatically.
 * - All other configs present a menu to create or restore a wallet.
 */
const buildWallet = async (config: Config, rli: Interface): Promise<WalletContext | null> => {
  // Standalone mode: use the pre-funded genesis wallet
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

/** Format dust balance for menu headers. */
const getDustLabel = async (wallet: api.WalletContext['wallet']): Promise<string> => {
  try {
    const dust = await api.getDustBalance(wallet);
    return dust.available.toLocaleString();
  } catch {
    return '';
  }
};

/** Prompt for a contract address and join an existing deployed contract. */
const joinContract = async (providers: PrivateBuyerProviders, rli: Interface): Promise<DeployedPrivateBuyerContract> => {
  const contractAddress = await rli.question('Enter the contract address (hex): ');
  return await api.joinContract(providers, contractAddress);
};

/**
 * Start the DUST monitor. Shows a live-updating balance display
 * that runs until the user presses Enter.
 */
const startDustMonitor = async (wallet: api.WalletContext['wallet'], rli: Interface): Promise<void> => {
  console.log('');
  // Use readline question to wait for Enter — the monitor will render above this line
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

const accessControlLoop = async (
  contract: DeployedPrivateBuyerContract,
  rli: Interface,
): Promise<void> => {
  while (true) {
    const choice = await rli.question(accessControlMenu());
    try {
      switch (choice.trim()) {
        case '1': {
          const roleId = await readHexBytes(rli, 'Enter role ID (hex): ');
          const accountHex = await readHexBytes(rli, 'Enter account public key (hex): ');
          const account: PrivateBuyer.Either<PrivateBuyer.ZswapCoinPublicKey, PrivateBuyer.ContractAddress> = {
            is_left: true,
            left: { bytes: accountHex },
            right: { bytes: new Uint8Array() },
          };
          await api.withStatus('Granting role', () => api.grantRole(contract, roleId, account));
          break;
        }
        case '2': {
          const roleId = await readHexBytes(rli, 'Enter role ID (hex): ');
          const accountHex = await readHexBytes(rli, 'Enter account public key (hex): ');
          const account: PrivateBuyer.Either<PrivateBuyer.ZswapCoinPublicKey, PrivateBuyer.ContractAddress> = {
            is_left: true,
            left: { bytes: accountHex },
            right: { bytes: new Uint8Array() },
          };
          await api.withStatus('Revoking role', () => api.revokeRole(contract, roleId, account));
          break;
        }
        case '3': {
          const roleId = await readHexBytes(rli, 'Enter role ID (hex): ');
          await api.withStatus('Renouncing role', () => api.renounceRole(contract, roleId));
          break;
        }
        case '4':
          await api.withStatus('Pausing access control', () => api.pauseAccessControl(contract));
          break;
        case '5':
          await api.withStatus('Unpausing access control', () => api.unpauseAccessControl(contract));
          break;
        case '6':
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

const identityLoop = async (
  contract: DeployedPrivateBuyerContract,
  rli: Interface,
): Promise<void> => {
  while (true) {
    const choice = await rli.question(identityMenu());
    try {
      switch (choice.trim()) {
        case '1': {
          const userHex = await readHexBytes(rli, 'Enter user public key (hex): ');
          const user: PrivateBuyer.ZswapCoinPublicKey = { bytes: userHex };
          await api.withStatus('Setting user', () => api.setUser(contract, user));
          break;
        }
        case '2': {
          const userHex = await readHexBytes(rli, 'Enter user public key (hex): ');
          const user: PrivateBuyer.ZswapCoinPublicKey = { bytes: userHex };
          await api.withStatus('Removing user', () => api.removeUser(contract, user));
          break;
        }
        case '3':
          await api.withStatus('Asserting own verification', () => api.assertOwnVerification(contract));
          break;
        case '4':
          await api.withStatus('Pausing identity', () => api.pauseIdentity(contract));
          break;
        case '5':
          await api.withStatus('Unpausing identity', () => api.unpauseIdentity(contract));
          break;
        case '6':
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

const tokenLoop = async (
  contract: DeployedPrivateBuyerContract,
  providers: PrivateBuyerProviders,
  rli: Interface,
): Promise<void> => {
  while (true) {
    const choice = await rli.question(tokenMenu());
    try {
      switch (choice.trim()) {
        case '1': {
          const toHex = await readHexBytes(rli, 'Enter recipient public key (hex): ');
          const to: PrivateBuyer.Either<PrivateBuyer.ZswapCoinPublicKey, PrivateBuyer.ContractAddress> = {
            is_left: true,
            left: { bytes: toHex },
            right: { bytes: new Uint8Array() },
          };
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          const idStr = await rli.question('Enter certificate ID: ');
          const sourceStr = await rli.question('Enter source (Solar=0,Wind=1,Hydro=2,Biomass=3,Geothermal=4,Nuclear=5): ');
          const generation = await readBigInt(rli, 'Enter generation: ');
          const vintage = await readBigInt(rli, 'Enter vintage: ');
          const impactStr = await rli.question('Enter impact (Minimal=0,Low=1,Medium=2,High=3,Extreme=4): ');
          const locationStr = await rli.question('Enter location (RJ=0,SP=1,MG=2,RS=3): ');
          const price = await readBigInt(rli, 'Enter price: ');
          const cert: PrivateBuyer.NonFungibleToken_Certificate = {
            id: idStr.trim(),
            source: Number(sourceStr.trim()) as PrivateBuyer.NonFungibleToken_Source,
            generation,
            vintage,
            impact: Number(impactStr.trim()) as PrivateBuyer.NonFungibleToken_Impact,
            location: Number(locationStr.trim()) as PrivateBuyer.NonFungibleToken_Location,
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
          const ownerHex = await readHexBytes(rli, 'Enter owner public key (hex): ');
          const owner: PrivateBuyer.Either<PrivateBuyer.ZswapCoinPublicKey, PrivateBuyer.ContractAddress> = {
            is_left: true,
            left: { bytes: ownerHex },
            right: { bytes: new Uint8Array() },
          };
          await api.withStatus('Querying balance', () => api.balanceOf(contract, owner));
          break;
        }
        case '5': {
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          await api.withStatus('Querying owner', () => api.ownerOf(contract, tokenId));
          break;
        }
        case '6': {
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          await api.withStatus('Querying certificate', () => api.tokenCertificate(contract, tokenId));
          break;
        }
        case '7': {
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          await api.withStatus('Querying price', () => api.tokenPrice(contract, tokenId));
          break;
        }
        case '8':
          await api.withStatus('Pausing token', () => api.pauseToken(contract));
          break;
        case '9':
          await api.withStatus('Unpausing token', () => api.unpauseToken(contract));
          break;
        case '10':
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

const poolLoop = async (
  contract: DeployedPrivateBuyerContract,
  rli: Interface,
): Promise<void> => {
  while (true) {
    const choice = await rli.question(poolMenu());
    try {
      switch (choice.trim()) {
        case '1': {
          const tokenId = await readBigInt(rli, 'Enter token ID to add: ');
          await api.withStatus('Adding to pool', () => api.addToPool(contract, tokenId));
          break;
        }
        case '2': {
          const tokenId = await readBigInt(rli, 'Enter token ID to remove: ');
          await api.withStatus('Removing from pool', () => api.removeFromPool(contract, tokenId));
          break;
        }
        case '3': {
          const tokenId = await readBigInt(rli, 'Enter token ID to purchase: ');
          const nonce = await readHexBytes(rli, 'Enter coin nonce (hex): ');
          const color = await readHexBytes(rli, 'Enter coin color (hex): ');
          const value = await readBigInt(rli, 'Enter coin value: ');
          const coin: PrivateBuyer.ShieldedCoinInfo = { nonce, color, value };
          await api.withStatus('Purchasing NFT', () => api.purchaseNFT(contract, tokenId, coin));
          break;
        }
        case '4': {
          const ids: bigint[] = [];
          for (let i = 1; i <= 5; i++) {
            ids.push(await readBigInt(rli, `Enter token ID ${i}: `));
          }
          const nonce = await readHexBytes(rli, 'Enter coin nonce (hex): ');
          const color = await readHexBytes(rli, 'Enter coin color (hex): ');
          const value = await readBigInt(rli, 'Enter coin value: ');
          const coin: PrivateBuyer.ShieldedCoinInfo = { nonce, color, value };
          await api.withStatus('Purchasing batch of 5', () =>
            api.purchaseBatch5(contract, ids as [bigint, bigint, bigint, bigint, bigint], coin),
          );
          break;
        }
        case '5': {
          const ids: bigint[] = [];
          for (let i = 1; i <= 10; i++) {
            ids.push(await readBigInt(rli, `Enter token ID ${i}: `));
          }
          const nonce = await readHexBytes(rli, 'Enter coin nonce (hex): ');
          const color = await readHexBytes(rli, 'Enter coin color (hex): ');
          const value = await readBigInt(rli, 'Enter coin value: ');
          const coin: PrivateBuyer.ShieldedCoinInfo = { nonce, color, value };
          await api.withStatus('Purchasing batch of 10', () =>
            api.purchaseBatch10(
              contract,
              ids as [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint],
              coin,
            ),
          );
          break;
        }
        case '6': {
          const ids: bigint[] = [];
          for (let i = 1; i <= 20; i++) {
            ids.push(await readBigInt(rli, `Enter token ID ${i}: `));
          }
          const nonce = await readHexBytes(rli, 'Enter coin nonce (hex): ');
          const color = await readHexBytes(rli, 'Enter coin color (hex): ');
          const value = await readBigInt(rli, 'Enter coin value: ');
          const coin: PrivateBuyer.ShieldedCoinInfo = { nonce, color, value };
          await api.withStatus('Purchasing batch of 20', () =>
            api.purchaseBatch20(
              contract,
              ids as [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint],
              coin,
            ),
          );
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
          const ids: bigint[] = [];
          for (let i = 1; i <= 5; i++) {
            ids.push(await readBigInt(rli, `Enter token ID ${i}: `));
          }
          const challenge = await readHexBytes(rli, 'Enter challenge (hex): ');
          await api.withStatus('Burning purchased batch of 5', () =>
            api.burnPurchasedBatch5(
              contract,
              ownerCommitment,
              ids as [bigint, bigint, bigint, bigint, bigint],
              challenge,
            ),
          );
          break;
        }
        case '10': {
          const ownerCommitment = await readHexBytes(rli, 'Enter owner commitment (hex): ');
          const ids: bigint[] = [];
          for (let i = 1; i <= 10; i++) {
            ids.push(await readBigInt(rli, `Enter token ID ${i}: `));
          }
          const challenge = await readHexBytes(rli, 'Enter challenge (hex): ');
          await api.withStatus('Burning purchased batch of 10', () =>
            api.burnPurchasedBatch10(
              contract,
              ownerCommitment,
              ids as [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint],
              challenge,
            ),
          );
          break;
        }
        case '11': {
          const ownerCommitment = await readHexBytes(rli, 'Enter owner commitment (hex): ');
          const ids: bigint[] = [];
          for (let i = 1; i <= 20; i++) {
            ids.push(await readBigInt(rli, `Enter token ID ${i}: `));
          }
          const challenge = await readHexBytes(rli, 'Enter challenge (hex): ');
          await api.withStatus('Burning purchased batch of 20', () =>
            api.burnPurchasedBatch20(
              contract,
              ownerCommitment,
              ids as [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint],
              challenge,
            ),
          );
          break;
        }
        case '12':
          await api.withStatus('Pausing NFT pool', () => api.pauseNFTPool(contract));
          break;
        case '13':
          await api.withStatus('Unpausing NFT pool', () => api.unpauseNFTPool(contract));
          break;
        case '14':
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

/**
 * Deploy or join flow. Returns the contract handle, or null if the user exits.
 * Errors during deploy/join are caught and displayed — the user stays in the menu.
 */
const deployOrJoin = async (
  providers: PrivateBuyerProviders,
  walletCtx: api.WalletContext,
  rli: Interface,
): Promise<DeployedPrivateBuyerContract | null> => {
  while (true) {
    const dustLabel = await getDustLabel(walletCtx.wallet);
    const choice = await rli.question(contractMenu(dustLabel));
    switch (choice.trim()) {
      case '1':
        try {
          const name = await rli.question('Enter contract name: ');
          const symbol = await rli.question('Enter contract symbol: ');
          const contract = await api.withStatus('Deploying private-buyer contract', () =>
            api.deploy(providers, name.trim(), symbol.trim()),
          );
          console.log(`  Contract deployed at: ${contract.deployTxData.public.contractAddress}\n`);
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

/**
 * Main interaction loop. Once a contract is deployed/joined, the user
 * can interact with the various contract modules.
 */
const mainLoop = async (
  providers: PrivateBuyerProviders,
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
    switch (choice.trim()) {
      case '1':
        await accessControlLoop(contract, rli);
        break;
      case '2':
        await identityLoop(contract, rli);
        break;
      case '3':
        await tokenLoop(contract, providers, rli);
        break;
      case '4':
        await poolLoop(contract, rli);
        break;
      case '5':
        await api.displayLedgerSummary(providers, contract);
        break;
      case '6':
        return;
      default:
        console.log(`  Invalid choice: ${choice}`);
    }
  }
};

// ─── Docker Port Mapping ────────────────────────────────────────────────────

/** Map a container's first exposed port into the config URL. */
const mapContainerPort = (env: StartedDockerComposeEnvironment, url: string, containerName: string) => {
  const mappedUrl = new URL(url);
  const container = env.getContainer(containerName);
  mappedUrl.port = String(container.getFirstMappedPort());
  return mappedUrl.toString().replace(/\/+$/, '');
};

// ─── Entry Point ────────────────────────────────────────────────────────────

/**
 * Main entry point for the CLI.
 *
 * Flow:
 *   1. (Optional) Start Docker containers for proof server / node / indexer
 *   2. Build or restore a wallet and wait for it to be funded
 *   3. Configure midnight-js providers (proof server, indexer, wallet, private state)
 *   4. Enter the contract deploy/join and interaction loop
 *   5. Clean up: close wallet, readline, and docker environment
 */
export const run = async (config: Config, _logger: Logger, dockerEnv?: DockerComposeEnvironment): Promise<void> => {
  logger = _logger;
  api.setLogger(_logger);

  // Print the title banner
  console.log(BANNER);

  const rli = createInterface({ input, output, terminal: true });
  let env: StartedDockerComposeEnvironment | undefined;

  try {
    // Step 1: Start Docker environment if provided (e.g. local proof server)
    if (dockerEnv !== undefined) {
      env = await dockerEnv.up();

      // In standalone mode, remap ports to the dynamically assigned container ports
      if (config instanceof UndeployedConfig) {
        config.indexer = mapContainerPort(env, config.indexer, 'private-buyer-indexer');
        config.indexerWS = mapContainerPort(env, config.indexerWS, 'private-buyer-indexer');
        config.node = mapContainerPort(env, config.node, 'private-buyer-node');
        config.proofServer = mapContainerPort(env, config.proofServer, 'private-buyer-proof-server');
      }
    }

    // Step 2: Build wallet (create new or restore from seed)
    const walletCtx = await buildWallet(config, rli);
    if (walletCtx === null) {
      return;
    }

    try {
      // Step 3: Configure midnight-js providers
      const providers = await api.withStatus('Configuring providers', () => api.configureProviders(walletCtx, config));
      console.log('');

      // Step 4: Enter the contract interaction loop
      await mainLoop(providers, walletCtx, rli);
    } catch (e) {
      if (e instanceof Error) {
        logger.error(`Error: ${e.message}`);
        logger.debug(`${e.stack}`);
      } else {
        throw e;
      }
    } finally {
      // Step 5a: Stop the wallet
      try {
        await walletCtx.wallet.stop();
      } catch (e) {
        logger.error(`Error stopping wallet: ${e}`);
      }
    }
  } finally {
    // Step 5b: Close readline and Docker environment
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
