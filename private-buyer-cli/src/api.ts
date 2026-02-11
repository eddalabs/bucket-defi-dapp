import { type Logger } from 'pino';
import * as Rx from 'rxjs';
import { WebSocket } from 'ws';
import * as bip39 from '@scure/bip39';
import { wordlist as english } from '@scure/bip39/wordlists/english.js';

import {
  PrivateBuyerCircuits,
  type PrivateBuyerPrivateStateId,
  type PrivateBuyerProviders,
  type DeployedPrivateBuyerContract,
} from './common-types';
import { type Config, contractConfig } from './config';
import {
  PrivateBuyer,
  witnesses,
  createPrivateState,
} from '@eddalabs/private-buyer-contract';
import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import * as ledger from '@midnight-ntwrk/ledger-v7';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { deployContract, findDeployedContract, submitInsertVerifierKeyTx } from '@midnight-ntwrk/midnight-js-contracts';
import { assertIsContractAddress, toHex } from '@midnight-ntwrk/midnight-js-utils';
import { getNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import {
  type FinalizedTxData,
  type MidnightProvider,
  type WalletProvider,
} from '@midnight-ntwrk/midnight-js-types';

import {
  createKeystore,
  InMemoryTransactionHistoryStorage,
  type UnshieldedKeystore,
  UnshieldedWallet,
  PublicKey,
} from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import { ShieldedWallet } from '@midnight-ntwrk/wallet-sdk-shielded';
import { DustWallet } from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import { WalletFacade } from '@midnight-ntwrk/wallet-sdk-facade';
import { generateRandomSeed, HDWallet, Roles } from '@midnight-ntwrk/wallet-sdk-hd';
import { CompiledContract } from '@midnight-ntwrk/compact-js';
import {
  MidnightBech32m,
  ShieldedAddress,
  ShieldedCoinPublicKey,
  ShieldedEncryptionPublicKey,
} from '@midnight-ntwrk/wallet-sdk-address-format';

let logger: Logger;

// @ts-expect-error: It's needed to enable WebSocket usage through apollo
globalThis.WebSocket = WebSocket;

export function setLogger(_logger: Logger) {
  logger = _logger;
}

// Pre-compile the private-buyer contract with ZK circuit assets
const privateBuyerCompiledContract = CompiledContract.make('private-buyer', PrivateBuyer.Contract).pipe(
  CompiledContract.withWitnesses(witnesses),
  CompiledContract.withCompiledFileAssets(contractConfig.zkConfigPath),
);

// Deploy-only compiled contract is built lazily in deployOnly() via dynamic import.
// The deploy-only Contract class (14 circuits) lives in a separate compact output
// and its types are structurally identical but nominally different from the full contract,
// so we cast CompiledContract to any to bypass the generic mismatch.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CC = CompiledContract as any;

// Types for the new wallet
export interface WalletContext {
  wallet: WalletFacade;
  shieldedSecretKeys: ledger.ZswapSecretKeys;
  dustSecretKey: ledger.DustSecretKey;
  unshieldedKeystore: UnshieldedKeystore;
}

/**
 * Convert mnemonic phrase to seed buffer using BIP39 standard
 * This generates a 64-byte seed as expected by Midnight HD wallet
 */
export const mnemonicToSeed = async (mnemonic: string): Promise<string> => {
  const words = mnemonic.trim().split(/\s+/);
  if (!bip39.validateMnemonic(words.join(' '), english)) {
    throw new Error('Invalid mnemonic phrase');
  }
  // Use BIP39 standard seed derivation (PBKDF2) - produces 64 bytes. hashes it (mixes it up) 2048 times using SHA-512
  const seed = await bip39.mnemonicToSeed(words.join(' '));
  return Buffer.from(seed).subarray(0, 32).toString('hex');
};

// ─── Ledger State ──────────────────────────────────────────────────────────

export const getLedgerState = async (
  providers: PrivateBuyerProviders,
  contractAddress: ContractAddress,
): Promise<PrivateBuyer.Ledger | null> => {
  assertIsContractAddress(contractAddress);
  logger.info('Checking contract ledger state...');
  const state = await providers.publicDataProvider
    .queryContractState(contractAddress)
    .then((contractState) => (contractState != null ? PrivateBuyer.ledger(contractState.data) : null));
  return state;
};

export const displayLedgerSummary = async (
  providers: PrivateBuyerProviders,
  contract: DeployedPrivateBuyerContract,
): Promise<{ ledger: PrivateBuyer.Ledger | null; contractAddress: string }> => {
  const contractAddress = contract.deployTxData.public.contractAddress;
  const state = await getLedgerState(providers, contractAddress);
  if (state === null) {
    logger.info(`There is no private-buyer contract deployed at ${contractAddress}.`);
  } else {
    const DIV = '──────────────────────────────────────────────────────────────';
    console.log(`
${DIV}
  Ledger State Summary
${DIV}
  Name:                  ${state.NonFungibleToken__name}
  Symbol:                ${state.NonFungibleToken__symbol}
  Certificates Created:  ${state.NonFungibleToken__certificatesCreatedCounter}
  Pool Size:             ${state.NFTPool__pool.size()}
  Purchase Count:        ${state.NFTPool__purchaseCounter}
${DIV}`);
  }
  return { contractAddress, ledger: state };
};

// ─── Contract Lifecycle ────────────────────────────────────────────────────

export const joinContract = async (
  providers: PrivateBuyerProviders,
  contractAddress: string,
): Promise<DeployedPrivateBuyerContract> => {
  const contract = await findDeployedContract(providers, {
    contractAddress,
    compiledContract: privateBuyerCompiledContract,
    privateStateId: 'privateBuyerPrivateState',
    initialPrivateState: createPrivateState(crypto.getRandomValues(new Uint8Array(32))),
  });
  logger.info(`Joined contract at address: ${contract.deployTxData.public.contractAddress}`);
  return contract;
};

export const deploy = async (
  providers: PrivateBuyerProviders,
  name: string,
  symbol: string,
): Promise<DeployedPrivateBuyerContract> => {
  logger.info('Deploying private-buyer contract...');
  const contract = await deployContract(providers, {
    compiledContract: privateBuyerCompiledContract,
    privateStateId: 'privateBuyerPrivateState',
    initialPrivateState: createPrivateState(crypto.getRandomValues(new Uint8Array(32))),
    args: [name, symbol],
  });
  logger.info(`Deployed contract at address: ${contract.deployTxData.public.contractAddress}`);
  return contract;
};

export const deployOnly = async (
  providers: PrivateBuyerProviders,
  name: string,
  symbol: string,
): Promise<DeployedPrivateBuyerContract> => {
  logger.info('Deploying private-buyer contract (deploy-only, 14 circuits)...');

  // Dynamically import the deploy-only Contract class (14 circuits).
  // Using the full PrivateBuyer.Contract (38 circuits) would exceed the block limit
  // because the contract IR itself encodes all circuit bytecode.
  const { Contract: DeployContract } = await import(contractConfig.zkConfigDeployPath + '/contract/index.js');
  const deployCC = CC.make('private-buyer-deploy', DeployContract).pipe(
    CC.withWitnesses(witnesses),
    CC.withCompiledFileAssets(contractConfig.zkConfigDeployPath),
  );

  const contract = await (deployContract as any)(providers, {
    compiledContract: deployCC,
    privateStateId: 'privateBuyerPrivateState',
    initialPrivateState: createPrivateState(crypto.getRandomValues(new Uint8Array(32))),
    args: [name, symbol],
  });
  logger.info(`Deployed contract at address: ${contract.deployTxData.public.contractAddress}`);
  return contract as DeployedPrivateBuyerContract;
};

// ─── Access Control Circuits ───────────────────────────────────────────────

export const grantRole = async (
  contract: DeployedPrivateBuyerContract,
  roleId: Uint8Array,
  account: PrivateBuyer.Either<PrivateBuyer.ZswapCoinPublicKey, PrivateBuyer.ContractAddress>,
): Promise<FinalizedTxData> => {
  logger.info('Granting role...');
  const result = await contract.callTx.grantRole(roleId, account);
  return result.public;
};

/*
 * [INCREMENTAL DEPLOY TEST] Re-enabling circuit wrappers incrementally.
 * Batch 2: revokeRole, renounceRole
 */

export const revokeRole = async (
  contract: DeployedPrivateBuyerContract,
  roleId: Uint8Array,
  account: PrivateBuyer.Either<PrivateBuyer.ZswapCoinPublicKey, PrivateBuyer.ContractAddress>,
): Promise<FinalizedTxData> => {
  logger.info('Revoking role...');
  const result = await contract.callTx.revokeRole(roleId, account);
  return result.public;
};

export const renounceRole = async (
  contract: DeployedPrivateBuyerContract,
  roleId: Uint8Array,
): Promise<FinalizedTxData> => {
  logger.info('Renouncing role...');
  const result = await contract.callTx.renounceRole(roleId);
  return result.public;
};

// Batch 3: Identity circuit wrappers
export const setUser = async (
  contract: DeployedPrivateBuyerContract,
  user: PrivateBuyer.ZswapCoinPublicKey,
): Promise<FinalizedTxData> => {
  logger.info('Setting user...');
  const result = await contract.callTx.setUser(user);
  return result.public;
};

export const removeUser = async (
  contract: DeployedPrivateBuyerContract,
  user: PrivateBuyer.ZswapCoinPublicKey,
): Promise<FinalizedTxData> => {
  logger.info('Removing user...');
  const result = await contract.callTx.removeUser(user);
  return result.public;
};

export const assertOwnVerification = async (contract: DeployedPrivateBuyerContract): Promise<FinalizedTxData> => {
  logger.info('Asserting own verification...');
  const result = await contract.callTx.assertOwnVerification();
  return result.public;
};

// Batch 4: Token circuit wrappers
export const mint = async (
  contract: DeployedPrivateBuyerContract,
  to: PrivateBuyer.Either<PrivateBuyer.ZswapCoinPublicKey, PrivateBuyer.ContractAddress>,
  tokenId: bigint,
  tokenCertificate: PrivateBuyer.NonFungibleToken_Certificate,
  price: bigint,
): Promise<FinalizedTxData> => {
  logger.info(`Minting token ${tokenId}...`);
  const result = await contract.callTx.mint(to, tokenId, tokenCertificate, price);
  return result.public;
};

export const burn = async (
  contract: DeployedPrivateBuyerContract,
  tokenId: bigint,
): Promise<FinalizedTxData> => {
  logger.info(`Burning token ${tokenId}...`);
  const result = await contract.callTx.burn(tokenId);
  return result.public;
};

export const setTokenPrice = async (
  contract: DeployedPrivateBuyerContract,
  tokenId: bigint,
  price: bigint,
): Promise<FinalizedTxData> => {
  logger.info(`Setting token ${tokenId} price to ${price}...`);
  const result = await contract.callTx.setTokenPrice(tokenId, price);
  return result.public;
};

// Batch 5a: First 3 Pool circuit wrappers
export const addToPool = async (
  contract: DeployedPrivateBuyerContract,
  tokenId: bigint,
): Promise<FinalizedTxData> => {
  logger.info(`Adding token ${tokenId} to pool...`);
  const result = await contract.callTx.addToPool(tokenId);
  return result.public;
};

export const removeFromPool = async (
  contract: DeployedPrivateBuyerContract,
  tokenId: bigint,
): Promise<FinalizedTxData> => {
  logger.info(`Removing token ${tokenId} from pool...`);
  const result = await contract.callTx.removeFromPool(tokenId);
  return result.public;
};

export const purchaseNFT = async (
  contract: DeployedPrivateBuyerContract,
  tokenId: bigint,
  coin: PrivateBuyer.ShieldedCoinInfo,
): Promise<FinalizedTxData> => {
  logger.info(`Purchasing NFT ${tokenId}...`);
  const result = await contract.callTx.purchaseNFT(tokenId, coin);
  return result.public;
};

export const withdrawSellerFunds = async (contract: DeployedPrivateBuyerContract): Promise<FinalizedTxData> => {
  logger.info('Withdrawing seller funds...');
  const result = await contract.callTx.withdrawSellerFunds();
  return result.public;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- available after VK insert
const callTxAny = (contract: DeployedPrivateBuyerContract) => contract.callTx as any;

export const proofOwnership = async (
  contract: DeployedPrivateBuyerContract,
  ownerCommitment: Uint8Array,
  challenge: Uint8Array,
): Promise<FinalizedTxData> => {
  logger.info('Proving ownership...');
  const result = await callTxAny(contract).proofOwnership(ownerCommitment, challenge);
  return result.public;
};

export const insertCircuitVerifierKey = async (
  providers: PrivateBuyerProviders,
  contractAddress: string,
  circuitId: string,
): Promise<FinalizedTxData> => {
  logger.info(`Inserting verifier key for circuit: ${circuitId}...`);
  const zkConfigProvider = new NodeZkConfigProvider<string>(contractConfig.zkConfigPath);
  const vk = await zkConfigProvider.getVerifierKey(circuitId);
  return submitInsertVerifierKeyTx(
    providers,
    privateBuyerCompiledContract,
    contractAddress as ContractAddress,
    circuitId as PrivateBuyerCircuits,
    vk,
  );
};

export const burnPurchased = async (
  contract: DeployedPrivateBuyerContract,
  ownerCommitment: Uint8Array,
  tokenId: bigint,
  challenge: Uint8Array,
): Promise<FinalizedTxData> => {
  logger.info(`Burning purchased token ${tokenId}...`);
  const result = await contract.callTx.burnPurchased(ownerCommitment, tokenId, challenge);
  return result.public;
};

// ─── Maintenance Batch 1: Ownership & Emergency ────────────────────────────

export const pauseAccessControl = async (contract: DeployedPrivateBuyerContract): Promise<FinalizedTxData> => {
  logger.info('Pausing Access Control...');
  const result = await callTxAny(contract).pauseAccessControl();
  return result.public;
};

export const unpauseAccessControl = async (contract: DeployedPrivateBuyerContract): Promise<FinalizedTxData> => {
  logger.info('Unpausing Access Control...');
  const result = await callTxAny(contract).unpauseAccessControl();
  return result.public;
};

export const pauseIdentity = async (contract: DeployedPrivateBuyerContract): Promise<FinalizedTxData> => {
  logger.info('Pausing Identity...');
  const result = await callTxAny(contract).pauseIdentity();
  return result.public;
};

export const unpauseIdentity = async (contract: DeployedPrivateBuyerContract): Promise<FinalizedTxData> => {
  logger.info('Unpausing Identity...');
  const result = await callTxAny(contract).unpauseIdentity();
  return result.public;
};

export const pauseToken = async (contract: DeployedPrivateBuyerContract): Promise<FinalizedTxData> => {
  logger.info('Pausing Token...');
  const result = await callTxAny(contract).pauseToken();
  return result.public;
};

export const unpauseToken = async (contract: DeployedPrivateBuyerContract): Promise<FinalizedTxData> => {
  logger.info('Unpausing Token...');
  const result = await callTxAny(contract).unpauseToken();
  return result.public;
};

export const pauseNFTPool = async (contract: DeployedPrivateBuyerContract): Promise<FinalizedTxData> => {
  logger.info('Pausing NFTPool...');
  const result = await callTxAny(contract).pauseNFTPool();
  return result.public;
};

export const unpauseNFTPool = async (contract: DeployedPrivateBuyerContract): Promise<FinalizedTxData> => {
  logger.info('Unpausing NFTPool...');
  const result = await callTxAny(contract).unpauseNFTPool();
  return result.public;
};

// ─── Maintenance Batch 2: Queries ──────────────────────────────────────────

export const isUserVerified = async (
  contract: DeployedPrivateBuyerContract,
  user: PrivateBuyer.ZswapCoinPublicKey,
): Promise<FinalizedTxData> => {
  logger.info('Checking if user is verified...');
  const result = await callTxAny(contract).isUserVerified(user);
  return result.public;
};

export const balanceOf = async (
  contract: DeployedPrivateBuyerContract,
  owner: PrivateBuyer.Either<PrivateBuyer.ZswapCoinPublicKey, PrivateBuyer.ContractAddress>,
): Promise<FinalizedTxData> => {
  logger.info('Querying balance...');
  const result = await callTxAny(contract).balanceOf(owner);
  return result.public;
};

export const ownerOf = async (
  contract: DeployedPrivateBuyerContract,
  tokenId: bigint,
): Promise<FinalizedTxData> => {
  logger.info(`Querying owner of token ${tokenId}...`);
  const result = await callTxAny(contract).ownerOf(tokenId);
  return result.public;
};

export const tokenCertificate = async (
  contract: DeployedPrivateBuyerContract,
  tokenId: bigint,
): Promise<FinalizedTxData> => {
  logger.info(`Querying certificate for token ${tokenId}...`);
  const result = await callTxAny(contract).tokenCertificate(tokenId);
  return result.public;
};

export const tokenPrice = async (
  contract: DeployedPrivateBuyerContract,
  tokenId: bigint,
): Promise<FinalizedTxData> => {
  logger.info(`Querying price for token ${tokenId}...`);
  const result = await callTxAny(contract).tokenPrice(tokenId);
  return result.public;
};

// ─── Maintenance Batch 3: Batch Purchase ───────────────────────────────────

export const purchaseBatch5 = async (
  contract: DeployedPrivateBuyerContract,
  tokenIds: bigint[],
  coin: PrivateBuyer.ShieldedCoinInfo,
): Promise<FinalizedTxData> => {
  logger.info(`Batch purchasing 5 NFTs...`);
  const ids = [...tokenIds, ...Array(5 - tokenIds.length).fill(0n)].slice(0, 5);
  const result = await callTxAny(contract).purchaseBatch5(ids[0], ids[1], ids[2], ids[3], ids[4], coin);
  return result.public;
};

export const purchaseBatch10 = async (
  contract: DeployedPrivateBuyerContract,
  tokenIds: bigint[],
  coin: PrivateBuyer.ShieldedCoinInfo,
): Promise<FinalizedTxData> => {
  logger.info(`Batch purchasing 10 NFTs...`);
  const ids = [...tokenIds, ...Array(10 - tokenIds.length).fill(0n)].slice(0, 10);
  const result = await callTxAny(contract).purchaseBatch10(
    ids[0], ids[1], ids[2], ids[3], ids[4],
    ids[5], ids[6], ids[7], ids[8], ids[9], coin,
  );
  return result.public;
};

export const purchaseBatch20 = async (
  contract: DeployedPrivateBuyerContract,
  tokenIds: bigint[],
  coin: PrivateBuyer.ShieldedCoinInfo,
): Promise<FinalizedTxData> => {
  logger.info(`Batch purchasing 20 NFTs...`);
  const ids = [...tokenIds, ...Array(20 - tokenIds.length).fill(0n)].slice(0, 20);
  const result = await callTxAny(contract).purchaseBatch20(
    ids[0], ids[1], ids[2], ids[3], ids[4],
    ids[5], ids[6], ids[7], ids[8], ids[9],
    ids[10], ids[11], ids[12], ids[13], ids[14],
    ids[15], ids[16], ids[17], ids[18], ids[19], coin,
  );
  return result.public;
};

// ─── Maintenance Batch 4: Batch Burn ───────────────────────────────────────

export const burnPurchasedBatch5 = async (
  contract: DeployedPrivateBuyerContract,
  ownerCommitment: Uint8Array,
  tokenIds: bigint[],
  challenge: Uint8Array,
): Promise<FinalizedTxData> => {
  logger.info(`Batch burning 5 purchased tokens...`);
  const ids = [...tokenIds, ...Array(5 - tokenIds.length).fill(0n)].slice(0, 5);
  const result = await callTxAny(contract).burnPurchasedBatch5(
    ownerCommitment, ids[0], ids[1], ids[2], ids[3], ids[4], challenge,
  );
  return result.public;
};

export const burnPurchasedBatch10 = async (
  contract: DeployedPrivateBuyerContract,
  ownerCommitment: Uint8Array,
  tokenIds: bigint[],
  challenge: Uint8Array,
): Promise<FinalizedTxData> => {
  logger.info(`Batch burning 10 purchased tokens...`);
  const ids = [...tokenIds, ...Array(10 - tokenIds.length).fill(0n)].slice(0, 10);
  const result = await callTxAny(contract).burnPurchasedBatch10(
    ownerCommitment,
    ids[0], ids[1], ids[2], ids[3], ids[4],
    ids[5], ids[6], ids[7], ids[8], ids[9], challenge,
  );
  return result.public;
};

export const burnPurchasedBatch20 = async (
  contract: DeployedPrivateBuyerContract,
  ownerCommitment: Uint8Array,
  tokenIds: bigint[],
  challenge: Uint8Array,
): Promise<FinalizedTxData> => {
  logger.info(`Batch burning 20 purchased tokens...`);
  const ids = [...tokenIds, ...Array(20 - tokenIds.length).fill(0n)].slice(0, 20);
  const result = await callTxAny(contract).burnPurchasedBatch20(
    ownerCommitment,
    ids[0], ids[1], ids[2], ids[3], ids[4],
    ids[5], ids[6], ids[7], ids[8], ids[9],
    ids[10], ids[11], ids[12], ids[13], ids[14],
    ids[15], ids[16], ids[17], ids[18], ids[19], challenge,
  );
  return result.public;
};

// ─── Post-Deploy VK Insertion ───────────────────────────────────────────────

export const REMAINING_CIRCUITS: string[] = [
  // Ownership & Emergency
  'proofOwnership', 'pauseAccessControl', 'unpauseAccessControl',
  'pauseIdentity', 'unpauseIdentity', 'pauseToken', 'unpauseToken',
  'pauseNFTPool', 'unpauseNFTPool',
  // Queries
  'isUserVerified', 'balanceOf', 'ownerOf', 'tokenCertificate', 'tokenPrice',
  // Batch Purchase
  '_getBatchTokenPrice', '_storeBatchSellerPayment', '_executeBatchPurchase',
  'purchaseBatch5', 'purchaseBatch10', 'purchaseBatch20',
  // Batch Burn
  '_burnPurchasedToken', 'burnPurchasedBatch5', 'burnPurchasedBatch10', 'burnPurchasedBatch20',
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const insertRemainingVerifierKeys = async (
  providers: PrivateBuyerProviders,
  contractAddress: string,
): Promise<void> => {
  const circuits = REMAINING_CIRCUITS;
  const MAX_RETRIES = 3;
  const RETRY_DELAY_MS = 10_000;

  logger.info(`Inserting ${circuits.length} remaining VKs...`);
  for (let i = 0; i < circuits.length; i++) {
    const circuitId = circuits[i];
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        logger.info(`  Inserting VK for ${circuitId} (${i + 1}/${circuits.length})...`);
        await insertCircuitVerifierKey(providers, contractAddress, circuitId as PrivateBuyerCircuits);
        logger.info(`  VK for ${circuitId} inserted.`);
        break;
      } catch (e) {
        if (attempt === MAX_RETRIES) throw e;
        const msg = e instanceof Error ? e.message : String(e);
        logger.warn(`  VK insert for ${circuitId} failed (attempt ${attempt}/${MAX_RETRIES}): ${msg}`);
        logger.info(`  Retrying in ${RETRY_DELAY_MS / 1000}s...`);
        await delay(RETRY_DELAY_MS);
      }
    }
  }
  logger.info(`All ${circuits.length} VKs inserted.`);
};

// ─── Wallet Functions ──────────────────────────────────────────────────────

/**
 * Sign all unshielded offers in a transaction's intents, using the correct
 * proof marker for Intent.deserialize. This works around a bug in the wallet
 * SDK where signRecipe hardcodes 'pre-proof', which fails for proven
 * (UnboundTransaction) intents that contain 'proof' data.
 */
const signTransactionIntents = (
  tx: { intents?: Map<number, any> },
  signFn: (payload: Uint8Array) => ledger.Signature,
  proofMarker: 'proof' | 'pre-proof',
): void => {
  if (!tx.intents || tx.intents.size === 0) return;

  for (const segment of tx.intents.keys()) {
    const intent = tx.intents.get(segment);
    if (!intent) continue;

    // Clone the intent with the correct proof marker.
    // The wallet SDK bug hardcodes 'pre-proof' here, which fails for
    // proven (UnboundTransaction) intents that use 'proof'.
    const cloned = ledger.Intent.deserialize<ledger.SignatureEnabled, ledger.Proofish, ledger.PreBinding>(
      'signature',
      proofMarker,
      'pre-binding',
      intent.serialize(),
    );

    const sigData = cloned.signatureData(segment);
    const signature = signFn(sigData);

    if (cloned.fallibleUnshieldedOffer) {
      const sigs = cloned.fallibleUnshieldedOffer.inputs.map(
        (_: ledger.UtxoSpend, i: number) => cloned.fallibleUnshieldedOffer!.signatures.at(i) ?? signature,
      );
      cloned.fallibleUnshieldedOffer = cloned.fallibleUnshieldedOffer.addSignatures(sigs);
    }

    if (cloned.guaranteedUnshieldedOffer) {
      const sigs = cloned.guaranteedUnshieldedOffer.inputs.map(
        (_: ledger.UtxoSpend, i: number) => cloned.guaranteedUnshieldedOffer!.signatures.at(i) ?? signature,
      );
      cloned.guaranteedUnshieldedOffer = cloned.guaranteedUnshieldedOffer.addSignatures(sigs);
    }

    tx.intents.set(segment, cloned);
  }
};

export const createWalletAndMidnightProvider = async (
  walletContext: WalletContext,
): Promise<WalletProvider & MidnightProvider> => {
  const state = await Rx.firstValueFrom(walletContext.wallet.state().pipe(Rx.filter((s) => s.isSynced)));

  return {
    getCoinPublicKey(): ledger.CoinPublicKey {
      return state.shielded.coinPublicKey.toHexString();
    },
    getEncryptionPublicKey(): ledger.EncPublicKey {
      return state.shielded.encryptionPublicKey.toHexString();
    },
    async balanceTx(tx, ttl) {
      // Use the wallet facade to balance the transaction
      const recipe = await walletContext.wallet.balanceUnboundTransaction(
        tx,
        { shieldedSecretKeys: walletContext.shieldedSecretKeys, dustSecretKey: walletContext.dustSecretKey },
        { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1000) },
      );
      const signFn = (payload: Uint8Array) => walletContext.unshieldedKeystore.signData(payload);
      signTransactionIntents(recipe.baseTransaction, signFn, 'proof');
      if (recipe.balancingTransaction) {
        signTransactionIntents(recipe.balancingTransaction, signFn, 'pre-proof');
      }

      return walletContext.wallet.finalizeRecipe(recipe);
    },
    async submitTx(tx: ledger.FinalizedTransaction): Promise<ledger.TransactionId> {
      return await walletContext.wallet.submitTransaction(tx);
    },
  };
};

export const waitForSync = (wallet: WalletFacade) =>
  Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(5_000),
      Rx.tap((state) => {
        logger.info(`Waiting for wallet sync. Synced: ${state.isSynced}`);
      }),
      Rx.filter((state) => state.isSynced),
    ),
  );

export const waitForFunds = (wallet: WalletFacade) =>
  Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(10_000),
      Rx.tap((state) => {
        const unshielded = state.unshielded?.balances[ledger.nativeToken().raw] ?? 0n;
        const shielded = state.shielded?.balances[ledger.nativeToken().raw] ?? 0n;
        logger.info(`Waiting for funds. Synced: ${state.isSynced}, Unshielded: ${unshielded}, Shielded: ${shielded}`);
      }),
      Rx.filter((state) => state.isSynced),
      Rx.map(
        (s) =>
          (s.unshielded?.balances[ledger.nativeToken().raw] ?? 0n) +
          (s.shielded?.balances[ledger.nativeToken().raw] ?? 0n),
      ),
      Rx.filter((balance) => balance > 0n),
    ),
  );

const buildShieldedConfig = ({ indexer, indexerWS, node, proofServer }: Config) => ({
  networkId: getNetworkId(),
  indexerClientConnection: {
    indexerHttpUrl: indexer,
    indexerWsUrl: indexerWS,
  },
  provingServerUrl: new URL(proofServer),
  relayURL: new URL(node.replace(/^http/, 'ws')),
});

const buildUnshieldedConfig = ({ indexer, indexerWS }: Config) => ({
  networkId: getNetworkId(),
  indexerClientConnection: {
    indexerHttpUrl: indexer,
    indexerWsUrl: indexerWS,
  },
  txHistoryStorage: new InMemoryTransactionHistoryStorage(),
});

const buildDustConfig = ({ indexer, indexerWS, node, proofServer }: Config) => ({
  networkId: getNetworkId(),
  costParameters: {
    additionalFeeOverhead: 10_000_000_000n,
    feeBlocksMargin: 5,
  },
  indexerClientConnection: {
    indexerHttpUrl: indexer,
    indexerWsUrl: indexerWS,
  },
  provingServerUrl: new URL(proofServer),
  relayURL: new URL(node.replace(/^http/, 'ws')),
});

/**
 * Derive HD wallet keys for all three roles (Zswap, NightExternal, Dust)
 * from a hex-encoded seed using BIP-44 style derivation at account 0, index 0.
 */
const deriveKeysFromSeed = (seed: string) => {
  const hdWallet = HDWallet.fromSeed(Buffer.from(seed, 'hex'));
  if (hdWallet.type !== 'seedOk') {
    throw new Error('Failed to initialize HDWallet from seed');
  }

  const derivationResult = hdWallet.hdWallet
    .selectAccount(0)
    .selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust])
    .deriveKeysAt(0);

  if (derivationResult.type !== 'keysDerived') {
    throw new Error('Failed to derive keys');
  }

  hdWallet.hdWallet.clear();
  return derivationResult.keys;
};

/**
 * Formats a token balance for display (e.g. 1000000000 -> "1,000,000,000").
 */
const formatBalance = (balance: bigint): string => balance.toLocaleString();

/**
 * Runs an async operation with an animated spinner on the console.
 * Shows ⠋⠙⠹... while running, then ✓ on success or ✗ on failure.
 */
export const withStatus = async <T>(message: string, fn: () => Promise<T>): Promise<T> => {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(`\r  ${frames[i++ % frames.length]} ${message}`);
  }, 80);
  try {
    const result = await fn();
    clearInterval(interval);
    process.stdout.write(`\r  ✓ ${message}\n`);
    return result;
  } catch (e) {
    clearInterval(interval);
    process.stdout.write(`\r  ✗ ${message}\n`);
    throw e;
  }
};

/**
 * Register unshielded NIGHT UTXOs for dust generation.
 *
 * On Preprod/Preview, NIGHT tokens generate DUST over time, but only after
 * the UTXOs have been explicitly designated for dust generation via an on-chain
 * transaction. DUST is the non-transferable fee token used by the Midnight network.
 */
const registerForDustGeneration = async (
  wallet: WalletFacade,
  unshieldedKeystore: UnshieldedKeystore,
): Promise<void> => {
  const state = await Rx.firstValueFrom(wallet.state().pipe(Rx.filter((s) => s.isSynced)));

  // Check if dust is already available (e.g. from a previous designation)
  if (state.dust.availableCoins.length > 0) {
    const dustBal = state.dust.walletBalance(new Date());
    console.log(`  ✓ Dust tokens already available (${formatBalance(dustBal)} DUST)`);
    return;
  }

  // Only register coins that haven't been designated yet
  const nightUtxos = state.unshielded.availableCoins.filter(
    (coin: any) => coin.meta?.registeredForDustGeneration !== true,
  );
  if (nightUtxos.length === 0) {
    // All coins already registered — just wait for dust to generate
    await withStatus('Waiting for dust tokens to generate', () =>
      Rx.firstValueFrom(
        wallet.state().pipe(
          Rx.throttleTime(5_000),
          Rx.filter((s) => s.isSynced),
          Rx.filter((s) => s.dust.walletBalance(new Date()) > 0n),
        ),
      ),
    );
    return;
  }

  await withStatus(`Registering ${nightUtxos.length} NIGHT UTXO(s) for dust generation`, async () => {
    const recipe = await wallet.registerNightUtxosForDustGeneration(
      nightUtxos,
      unshieldedKeystore.getPublicKey(),
      (payload) => unshieldedKeystore.signData(payload),
    );
    const finalized = await wallet.finalizeRecipe(recipe);
    await wallet.submitTransaction(finalized);
  });

  // Wait for dust to actually generate (balance > 0), not just for coins to appear
  await withStatus('Waiting for dust tokens to generate', () =>
    Rx.firstValueFrom(
      wallet.state().pipe(
        Rx.throttleTime(5_000),
        Rx.filter((s) => s.isSynced),
        Rx.filter((s) => s.dust.walletBalance(new Date()) > 0n),
      ),
    ),
  );
};

const printWalletSummary = (seed: string, state: any, unshieldedKeystore: UnshieldedKeystore) => {
  const networkId = getNetworkId();
  const unshieldedBalance = state.unshielded.balances[ledger.unshieldedToken().raw] ?? 0n;

  // Build the bech32m shielded address from coin + encryption public keys
  const coinPubKey = ShieldedCoinPublicKey.fromHexString(state.shielded.coinPublicKey.toHexString());
  const encPubKey = ShieldedEncryptionPublicKey.fromHexString(state.shielded.encryptionPublicKey.toHexString());
  const shieldedAddress = MidnightBech32m.encode(networkId, new ShieldedAddress(coinPubKey, encPubKey)).toString();

  const DIV = '──────────────────────────────────────────────────────────────';

  console.log(`
${DIV}
  Wallet Overview                            Network: ${networkId}
${DIV}
  Seed: ${seed}
${DIV}

  Shielded (ZSwap)
  └─ Address: ${shieldedAddress}

  Unshielded
  ├─ Address: ${unshieldedKeystore.getBech32Address()}
  └─ Balance: ${formatBalance(unshieldedBalance)} tNight

  Dust
  └─ Address: ${state.dust.dustAddress}

${DIV}`);
};

/**
 * Build (or restore) a wallet from a hex seed, then wait for the wallet
 * to sync and receive funds before returning.
 *
 * Steps:
 *   1. Derive HD keys (Zswap, NightExternal, Dust) from the seed
 *   2. Create the three sub-wallets (Shielded, Unshielded, Dust)
 *   3. Start the WalletFacade and wait for sync
 *   4. Display a wallet summary with all addresses
 *   5. If balance is zero, wait for incoming funds (e.g. from faucet)
 */
export const buildWalletAndWaitForFunds = async (config: Config, seed: string): Promise<WalletContext> => {
  console.log('');

  // Derive HD keys and initialize the three sub-wallets
  const { wallet, shieldedSecretKeys, dustSecretKey, unshieldedKeystore } = await withStatus(
    'Building wallet',
    async () => {
      const keys = deriveKeysFromSeed(seed);
      const shieldedSecretKeys = ledger.ZswapSecretKeys.fromSeed(keys[Roles.Zswap]);
      const dustSecretKey = ledger.DustSecretKey.fromSeed(keys[Roles.Dust]);
      const unshieldedKeystore = createKeystore(keys[Roles.NightExternal], getNetworkId());

      const shieldedWallet = ShieldedWallet(buildShieldedConfig(config)).startWithSecretKeys(shieldedSecretKeys);
      const unshieldedWallet = UnshieldedWallet(buildUnshieldedConfig(config)).startWithPublicKey(
        PublicKey.fromKeyStore(unshieldedKeystore),
      );
      const dustWallet = DustWallet(buildDustConfig(config)).startWithSecretKey(
        dustSecretKey,
        ledger.LedgerParameters.initialParameters().dust,
      );

      const wallet = new WalletFacade(shieldedWallet, unshieldedWallet, dustWallet);
      await wallet.start(shieldedSecretKeys, dustSecretKey);

      return { wallet, shieldedSecretKeys, dustSecretKey, unshieldedKeystore };
    },
  );

  // Show seed and unshielded address immediately so user can fund via faucet while syncing
  const networkId = getNetworkId();
  const DIV = '──────────────────────────────────────────────────────────────';
  console.log(`
${DIV}
  Wallet Overview                            Network: ${networkId}
${DIV}
  Seed: ${seed}

  Unshielded Address (send tNight here):
  ${unshieldedKeystore.getBech32Address()}

  Fund your wallet with tNight from the Preprod faucet:
  https://faucet.preprod.midnight.network/
${DIV}
`);

  // Wait for the wallet to sync with the network
  const syncedState = await withStatus('Syncing with network', () => waitForSync(wallet));

  // Display the full wallet summary with all addresses and balances
  printWalletSummary(seed, syncedState, unshieldedKeystore);

  // Check if wallet has funds; if not, wait for incoming tokens
  const balance = syncedState.unshielded.balances[ledger.unshieldedToken().raw] ?? 0n;
  if (balance === 0n) {
    const fundedBalance = await withStatus('Waiting for incoming tokens', () => waitForFunds(wallet));
    console.log(`    Balance: ${formatBalance(fundedBalance)} tNight\n`);
  }

  // Register NIGHT UTXOs for dust generation (required for tx fees on Preprod/Preview)
  await registerForDustGeneration(wallet, unshieldedKeystore);

  return { wallet, shieldedSecretKeys, dustSecretKey, unshieldedKeystore };
};

export const buildFreshWallet = async (config: Config): Promise<WalletContext> =>
  await buildWalletAndWaitForFunds(config, toHex(Buffer.from(generateRandomSeed())));

export const configureProviders = async (walletContext: WalletContext, config: Config) => {
  const walletAndMidnightProvider = await createWalletAndMidnightProvider(walletContext);
  const zkConfigProvider = new NodeZkConfigProvider<PrivateBuyerCircuits>(contractConfig.zkConfigPath);
  return {
    privateStateProvider: levelPrivateStateProvider<typeof PrivateBuyerPrivateStateId>({
      privateStateStoreName: contractConfig.privateStateStoreName,
      signingKeyStoreName: 'signing-keys',
      midnightDbName: 'midnight-level-db',
      walletProvider: walletAndMidnightProvider,
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  };
};

/**
 * Get the current DUST balance from the wallet state.
 */
export const getDustBalance = async (
  wallet: WalletFacade,
): Promise<{ available: bigint; pending: bigint; availableCoins: number; pendingCoins: number }> => {
  const state = await Rx.firstValueFrom(wallet.state().pipe(Rx.filter((s) => s.isSynced)));
  const available = state.dust.walletBalance(new Date());
  const availableCoins = state.dust.availableCoins.length;
  const pendingCoins = state.dust.pendingCoins.length;
  // Sum pending coin initial values for a rough pending balance
  const pending = state.dust.pendingCoins.reduce((sum, c) => sum + c.initialValue, 0n);
  return { available, pending, availableCoins, pendingCoins };
};

/**
 * Monitor DUST balance with a live-updating display.
 * Prints a status line every 5 seconds showing balance, coins, and status.
 * Resolves when the user presses Enter (via the provided signal).
 */
export const monitorDustBalance = async (wallet: WalletFacade, stopSignal: Promise<void>): Promise<void> => {
  let stopped = false;
  void stopSignal.then(() => {
    stopped = true;
  });

  const sub = wallet
    .state()
    .pipe(
      Rx.throttleTime(5_000),
      Rx.filter((s) => s.isSynced),
    )
    .subscribe((state) => {
      if (stopped) return;

      const now = new Date();
      const available = state.dust.walletBalance(now);
      const availableCoins = state.dust.availableCoins.length;
      const pendingCoins = state.dust.pendingCoins.length;

      const registeredNight = state.unshielded.availableCoins.filter(
        (coin: any) => coin.meta?.registeredForDustGeneration === true,
      ).length;
      const totalNight = state.unshielded.availableCoins.length;

      let status = '';
      if (pendingCoins > 0 && availableCoins === 0) {
        status = '⚠ locked by pending tx';
      } else if (available > 0n) {
        status = '✓ ready to deploy';
      } else if (availableCoins > 0) {
        status = 'accruing...';
      } else if (registeredNight > 0) {
        status = 'waiting for generation...';
      } else {
        status = 'no NIGHT registered';
      }

      const time = now.toLocaleTimeString();
      console.log(
        `  [${time}] DUST: ${formatBalance(available)} (${availableCoins} coins, ${pendingCoins} pending) | NIGHT: ${totalNight} UTXOs, ${registeredNight} registered | ${status}`,
      );
    });

  await stopSignal;
  sub.unsubscribe();
};

export const closeWallet = async (walletContext: WalletContext): Promise<void> => {
  try {
    await walletContext.wallet.stop();
  } catch (e) {
    logger.error(`Error closing wallet: ${e}`);
  }
};
