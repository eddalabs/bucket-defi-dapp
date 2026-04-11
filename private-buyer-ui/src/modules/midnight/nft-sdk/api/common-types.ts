import { type PrivateState, MiniPrivateBuyer, createPrivateState } from '@eddalabs/mini-private-buyer-contract';
import type { ProvableCircuitId } from '@midnight-ntwrk/compact-js';
import type { MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

export type MiniPrivateBuyerCircuits = ProvableCircuitId<MiniPrivateBuyer.Contract<PrivateState>>;

export const MiniPrivateBuyerPrivateStateId = 'miniPrivateBuyerPrivateState';

export type MiniPrivateBuyerProviders = MidnightProviders<
  MiniPrivateBuyerCircuits,
  typeof MiniPrivateBuyerPrivateStateId,
  PrivateState
>;

export type MiniPrivateBuyerContract = MiniPrivateBuyer.Contract<PrivateState>;

export type DeployedMiniPrivateBuyerContract =
  | DeployedContract<MiniPrivateBuyerContract>
  | FoundContract<MiniPrivateBuyerContract>;

export type TokenInfo = {
  tokenId: bigint;
  certificate: MiniPrivateBuyer.NonFungibleToken_Certificate;
  price: bigint;
  ownerBytes: Uint8Array;
  isListed: boolean;
  isSold: boolean;
  buyerCommitment: Uint8Array | null;
};

export type UserAction = {
  mint: string | undefined;
  addToPool: string | undefined;
  setTokenPrice: string | undefined;
  purchaseNFT: string | undefined;
};

export type DerivedState = {
  readonly name: string;
  readonly symbol: string;
  readonly certificatesCreatedCounter: bigint;
  readonly purchaseCounter: bigint;
  readonly privateState: PrivateState;
  readonly actions: UserAction;
  readonly tokens: TokenInfo[];
};

export const emptyState: DerivedState = {
  name: '',
  symbol: '',
  certificatesCreatedCounter: 0n,
  purchaseCounter: 0n,
  privateState: createPrivateState(new Uint8Array(32)),
  actions: { mint: undefined, addToPool: undefined, setTokenPrice: undefined, purchaseNFT: undefined },
  tokens: [],
};
