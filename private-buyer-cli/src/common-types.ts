import { MiniPrivateBuyer, type PrivateState } from '@eddalabs/mini-private-buyer-contract';
import type { MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import type { ProvableCircuitId } from '@midnight-ntwrk/compact-js';

export type MiniPrivateBuyerCircuits = ProvableCircuitId<MiniPrivateBuyer.Contract<PrivateState>>;

export const MiniPrivateBuyerPrivateStateId = 'miniPrivateBuyerPrivateState';

export type MiniPrivateBuyerProviders = MidnightProviders<
  MiniPrivateBuyerCircuits,
  typeof MiniPrivateBuyerPrivateStateId,
  PrivateState
>;

export type MiniPrivateBuyerContract = MiniPrivateBuyer.Contract<PrivateState>;

export type DeployedMiniPrivateBuyerContract = DeployedContract<MiniPrivateBuyerContract> | FoundContract<MiniPrivateBuyerContract>;

export type UserAction = {
  action: string | undefined;
};

export type DerivedState = {
  readonly name: MiniPrivateBuyer.Ledger['NonFungibleToken__name'];
  readonly symbol: MiniPrivateBuyer.Ledger['NonFungibleToken__symbol'];
  readonly certificatesCreatedCounter: MiniPrivateBuyer.Ledger['NonFungibleToken__certificatesCreatedCounter'];
  readonly purchaseCounter: MiniPrivateBuyer.Ledger['NFTPool__purchaseCounter'];
};

export const emptyState: DerivedState = {
  name: '',
  symbol: '',
  certificatesCreatedCounter: 0n,
  purchaseCounter: 0n,
};
