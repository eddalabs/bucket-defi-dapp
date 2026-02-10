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
  [3] Insert Verifier Key (maintenance)
  [4] Monitor DUST balance
  [5] Exit
${'─'.repeat(62)}
> `;

/** Build the main actions menu, showing current DUST balance in the header. */
const mainMenu = (dustBalance: string) => `
${DIVIDER}
  Main Actions (38 circuits)${dustBalance ? `            DUST: ${dustBalance}` : ''}
${DIVIDER}
  ── Deploy Batch (14 circuits) ──
  [1] Grant Role                  [2] Revoke Role
  [3] Renounce Role               [4] Set User
  [5] Remove User                 [6] Assert Own Verification
  [7] Mint                        [8] Burn
  [9] Set Token Price             [10] Add to Pool
  [11] Remove from Pool           [12] Purchase NFT
  [13] Withdraw Seller Funds      [14] Burn Purchased Token
  ── Maintenance Batch 1: Ownership & Emergency ──
  [15] Proof Ownership            [16] Pause Access Control
  [17] Unpause Access Control     [18] Pause Identity
  [19] Unpause Identity           [20] Pause Token
  [21] Unpause Token              [22] Pause NFT Pool
  [23] Unpause NFT Pool
  ── Maintenance Batch 2: Queries ──
  [24] Is User Verified           [25] Balance Of
  [26] Owner Of                   [27] Token Certificate
  [28] Token Price
  ── Maintenance Batch 3: Batch Purchase ──
  [29] Purchase Batch 5           [30] Purchase Batch 10
  [31] Purchase Batch 20
  ── Maintenance Batch 4: Batch Burn ──
  [32] Burn Purchased Batch 5     [33] Burn Purchased Batch 10
  [34] Burn Purchased Batch 20
  ── Admin ──
  [35] Insert Verifier Key (maintenance)
  [36] View Ledger State
  [37] Exit
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

/*
 * [MINIMAL DEPLOY TEST] Sub-menu loops commented out.
 * Only grantRole is available directly from the main menu.
 */

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
      case '3': {
        try {
          const addr = await rli.question('Enter contract address (hex): ');
          const input = await rli.question('Enter batch number (1-4) or circuit ID: ');
          const trimmed = input.trim();
          if (['1', '2', '3', '4'].includes(trimmed)) {
            const circuits = api.MAINTENANCE_BATCHES[trimmed];
            console.log(`  Inserting ${circuits.length} VKs for batch ${trimmed}...`);
            for (const circuitId of circuits) {
              await api.withStatus(`Inserting VK for ${circuitId}`, () =>
                api.insertCircuitVerifierKey(providers, addr.trim(), circuitId as any),
              );
            }
            console.log(`  Batch ${trimmed} complete (${circuits.length} VKs inserted).\n`);
          } else {
            await api.withStatus(`Inserting VK for ${trimmed}`, () =>
              api.insertCircuitVerifierKey(providers, addr.trim(), trimmed as any),
            );
            console.log(`  VK for "${trimmed}" inserted successfully.\n`);
          }
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          console.log(`  ✗ VK insert failed: ${msg}\n`);
        }
        break;
      }
      case '4':
        await startDustMonitor(walletCtx.wallet, rli);
        break;
      case '5':
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
        case '4': {
          const userHex = await readHexBytes(rli, 'Enter user public key (hex): ');
          const user: PrivateBuyer.ZswapCoinPublicKey = { bytes: userHex };
          await api.withStatus('Setting user', () => api.setUser(contract, user));
          break;
        }
        case '5': {
          const userHex = await readHexBytes(rli, 'Enter user public key (hex): ');
          const user: PrivateBuyer.ZswapCoinPublicKey = { bytes: userHex };
          await api.withStatus('Removing user', () => api.removeUser(contract, user));
          break;
        }
        case '6':
          await api.withStatus('Asserting own verification', () => api.assertOwnVerification(contract));
          break;
        case '7': {
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
        case '8': {
          const tokenId = await readBigInt(rli, 'Enter token ID to burn: ');
          await api.withStatus('Burning token', () => api.burn(contract, tokenId));
          break;
        }
        case '9': {
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          const price = await readBigInt(rli, 'Enter new price: ');
          await api.withStatus('Setting token price', () => api.setTokenPrice(contract, tokenId, price));
          break;
        }
        case '10': {
          const tokenId = await readBigInt(rli, 'Enter token ID to add: ');
          await api.withStatus('Adding to pool', () => api.addToPool(contract, tokenId));
          break;
        }
        case '11': {
          const tokenId = await readBigInt(rli, 'Enter token ID to remove: ');
          await api.withStatus('Removing from pool', () => api.removeFromPool(contract, tokenId));
          break;
        }
        case '12': {
          const tokenId = await readBigInt(rli, 'Enter token ID to purchase: ');
          const nonce = await readHexBytes(rli, 'Enter coin nonce (hex): ');
          const color = await readHexBytes(rli, 'Enter coin color (hex): ');
          const value = await readBigInt(rli, 'Enter coin value: ');
          const coin: PrivateBuyer.ShieldedCoinInfo = { nonce, color, value };
          await api.withStatus('Purchasing NFT', () => api.purchaseNFT(contract, tokenId, coin));
          break;
        }
        case '13':
          await api.withStatus('Withdrawing seller funds', () => api.withdrawSellerFunds(contract));
          break;
        case '14': {
          const ownerCommitment = await readHexBytes(rli, 'Enter owner commitment (hex): ');
          const tokenId = await readBigInt(rli, 'Enter token ID to burn: ');
          const challenge = await readHexBytes(rli, 'Enter challenge (hex): ');
          await api.withStatus('Burning purchased token', () =>
            api.burnPurchased(contract, ownerCommitment, tokenId, challenge),
          );
          break;
        }
        case '15': {
          const ownerCommitment = await readHexBytes(rli, 'Enter owner commitment (hex): ');
          const challenge = await readHexBytes(rli, 'Enter challenge (hex): ');
          await api.withStatus('Proving ownership', () => api.proofOwnership(contract, ownerCommitment, challenge));
          break;
        }
        case '16':
          await api.withStatus('Pausing Access Control', () => api.pauseAccessControl(contract));
          break;
        case '17':
          await api.withStatus('Unpausing Access Control', () => api.unpauseAccessControl(contract));
          break;
        case '18':
          await api.withStatus('Pausing Identity', () => api.pauseIdentity(contract));
          break;
        case '19':
          await api.withStatus('Unpausing Identity', () => api.unpauseIdentity(contract));
          break;
        case '20':
          await api.withStatus('Pausing Token', () => api.pauseToken(contract));
          break;
        case '21':
          await api.withStatus('Unpausing Token', () => api.unpauseToken(contract));
          break;
        case '22':
          await api.withStatus('Pausing NFT Pool', () => api.pauseNFTPool(contract));
          break;
        case '23':
          await api.withStatus('Unpausing NFT Pool', () => api.unpauseNFTPool(contract));
          break;
        case '24': {
          const userHex = await readHexBytes(rli, 'Enter user public key (hex): ');
          const user: PrivateBuyer.ZswapCoinPublicKey = { bytes: userHex };
          await api.withStatus('Checking user verification', () => api.isUserVerified(contract, user));
          break;
        }
        case '25': {
          const ownerHex = await readHexBytes(rli, 'Enter owner public key (hex): ');
          const owner: PrivateBuyer.Either<PrivateBuyer.ZswapCoinPublicKey, PrivateBuyer.ContractAddress> = {
            is_left: true,
            left: { bytes: ownerHex },
            right: { bytes: new Uint8Array() },
          };
          await api.withStatus('Querying balance', () => api.balanceOf(contract, owner));
          break;
        }
        case '26': {
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          await api.withStatus('Querying owner', () => api.ownerOf(contract, tokenId));
          break;
        }
        case '27': {
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          await api.withStatus('Querying certificate', () => api.tokenCertificate(contract, tokenId));
          break;
        }
        case '28': {
          const tokenId = await readBigInt(rli, 'Enter token ID: ');
          await api.withStatus('Querying price', () => api.tokenPrice(contract, tokenId));
          break;
        }
        case '29': {
          const tokenIdsStr = await rli.question('Enter token IDs (comma-separated, up to 5): ');
          const tokenIds = tokenIdsStr.split(',').map((s) => BigInt(s.trim())).filter((id) => id > 0n);
          const nonce = await readHexBytes(rli, 'Enter coin nonce (hex): ');
          const color = await readHexBytes(rli, 'Enter coin color (hex): ');
          const value = await readBigInt(rli, 'Enter coin value: ');
          const coin: PrivateBuyer.ShieldedCoinInfo = { nonce, color, value };
          await api.withStatus('Batch purchasing 5', () => api.purchaseBatch5(contract, tokenIds, coin));
          break;
        }
        case '30': {
          const tokenIdsStr = await rli.question('Enter token IDs (comma-separated, up to 10): ');
          const tokenIds = tokenIdsStr.split(',').map((s) => BigInt(s.trim())).filter((id) => id > 0n);
          const nonce = await readHexBytes(rli, 'Enter coin nonce (hex): ');
          const color = await readHexBytes(rli, 'Enter coin color (hex): ');
          const value = await readBigInt(rli, 'Enter coin value: ');
          const coin: PrivateBuyer.ShieldedCoinInfo = { nonce, color, value };
          await api.withStatus('Batch purchasing 10', () => api.purchaseBatch10(contract, tokenIds, coin));
          break;
        }
        case '31': {
          const tokenIdsStr = await rli.question('Enter token IDs (comma-separated, up to 20): ');
          const tokenIds = tokenIdsStr.split(',').map((s) => BigInt(s.trim())).filter((id) => id > 0n);
          const nonce = await readHexBytes(rli, 'Enter coin nonce (hex): ');
          const color = await readHexBytes(rli, 'Enter coin color (hex): ');
          const value = await readBigInt(rli, 'Enter coin value: ');
          const coin: PrivateBuyer.ShieldedCoinInfo = { nonce, color, value };
          await api.withStatus('Batch purchasing 20', () => api.purchaseBatch20(contract, tokenIds, coin));
          break;
        }
        case '32': {
          const ownerCommitment = await readHexBytes(rli, 'Enter owner commitment (hex): ');
          const tokenIdsStr = await rli.question('Enter token IDs (comma-separated, up to 5): ');
          const tokenIds = tokenIdsStr.split(',').map((s) => BigInt(s.trim())).filter((id) => id > 0n);
          const challenge = await readHexBytes(rli, 'Enter challenge (hex): ');
          await api.withStatus('Batch burning 5', () =>
            api.burnPurchasedBatch5(contract, ownerCommitment, tokenIds, challenge),
          );
          break;
        }
        case '33': {
          const ownerCommitment = await readHexBytes(rli, 'Enter owner commitment (hex): ');
          const tokenIdsStr = await rli.question('Enter token IDs (comma-separated, up to 10): ');
          const tokenIds = tokenIdsStr.split(',').map((s) => BigInt(s.trim())).filter((id) => id > 0n);
          const challenge = await readHexBytes(rli, 'Enter challenge (hex): ');
          await api.withStatus('Batch burning 10', () =>
            api.burnPurchasedBatch10(contract, ownerCommitment, tokenIds, challenge),
          );
          break;
        }
        case '34': {
          const ownerCommitment = await readHexBytes(rli, 'Enter owner commitment (hex): ');
          const tokenIdsStr = await rli.question('Enter token IDs (comma-separated, up to 20): ');
          const tokenIds = tokenIdsStr.split(',').map((s) => BigInt(s.trim())).filter((id) => id > 0n);
          const challenge = await readHexBytes(rli, 'Enter challenge (hex): ');
          await api.withStatus('Batch burning 20', () =>
            api.burnPurchasedBatch20(contract, ownerCommitment, tokenIds, challenge),
          );
          break;
        }
        case '35': {
          const contractAddress = contract.deployTxData.public.contractAddress;
          console.log(`  Contract address: ${contractAddress}`);
          const input = await rli.question('Enter batch number (1-4) or circuit ID: ');
          const trimmed = input.trim();
          if (['1', '2', '3', '4'].includes(trimmed)) {
            const circuits = api.MAINTENANCE_BATCHES[trimmed];
            console.log(`  Inserting ${circuits.length} VKs for batch ${trimmed}...`);
            for (const circuitId of circuits) {
              await api.withStatus(`Inserting VK for ${circuitId}`, () =>
                api.insertCircuitVerifierKey(providers, contractAddress, circuitId as any),
              );
            }
            console.log(`  Batch ${trimmed} complete (${circuits.length} VKs inserted).\n`);
          } else {
            await api.withStatus(`Inserting VK for ${trimmed}`, () =>
              api.insertCircuitVerifierKey(providers, contractAddress, trimmed as any),
            );
            console.log(`  VK for "${trimmed}" inserted successfully.\n`);
          }
          break;
        }
        case '36':
          await api.displayLedgerSummary(providers, contract);
          break;
        case '37':
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
