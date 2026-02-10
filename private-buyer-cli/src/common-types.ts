import { PrivateBuyer, type PrivateState } from '@eddalabs/private-buyer-contract';
import type { MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import type { ImpureCircuitId } from '@midnight-ntwrk/compact-js';

export type PrivateBuyerCircuits = ImpureCircuitId<PrivateBuyer.Contract<PrivateState>>;

export const PrivateBuyerPrivateStateId = 'privateBuyerPrivateState';

export type PrivateBuyerProviders = MidnightProviders<
  PrivateBuyerCircuits,
  typeof PrivateBuyerPrivateStateId,
  PrivateState
>;

export type PrivateBuyerContract = PrivateBuyer.Contract<PrivateState>;

export type DeployedPrivateBuyerContract = DeployedContract<PrivateBuyerContract> | FoundContract<PrivateBuyerContract>;

export type UserAction = {
  action: string | undefined;
};

export type DerivedState = {
  readonly name: PrivateBuyer.Ledger['NonFungibleToken__name'];
  readonly symbol: PrivateBuyer.Ledger['NonFungibleToken__symbol'];
  readonly certificatesCreatedCounter: PrivateBuyer.Ledger['NonFungibleToken__certificatesCreatedCounter'];
  readonly purchaseCounter: PrivateBuyer.Ledger['NFTPool__purchaseCounter'];
};

export const emptyState: DerivedState = {
  name: '',
  symbol: '',
  certificatesCreatedCounter: 0n,
  purchaseCounter: 0n,
};
