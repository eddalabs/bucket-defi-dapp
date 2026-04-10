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

export type DerivedState = {
  readonly name: string;
  readonly symbol: string;
  readonly certificatesCreatedCounter: bigint;
  readonly purchaseCounter: bigint;
  readonly privateState: PrivateState;
};

export const emptyState: DerivedState = {
  name: '',
  symbol: '',
  certificatesCreatedCounter: 0n,
  purchaseCounter: 0n,
  privateState: createPrivateState(new Uint8Array(32)),
};
