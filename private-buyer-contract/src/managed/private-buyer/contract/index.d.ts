import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type ZswapCoinPublicKey = { bytes: Uint8Array };

export type ContractAddress = { bytes: Uint8Array };

export type Either<A, B> = { is_left: boolean; left: A; right: B };

export type ShieldedCoinInfo = { nonce: Uint8Array;
                                 color: Uint8Array;
                                 value: bigint
                               };

export type NonFungibleToken_Certificate = { id: string;
                                             source: NonFungibleToken_Source;
                                             generation: bigint;
                                             vintage: bigint;
                                             impact: NonFungibleToken_Impact;
                                             location: NonFungibleToken_Location
                                           };

export enum NonFungibleToken_Location { RJ = 0, SP = 1, MG = 2, RS = 3 }

export enum NonFungibleToken_Impact { Minimal = 0,
                                      Low = 1,
                                      Medium = 2,
                                      High = 3,
                                      Extreme = 4
}

export enum NonFungibleToken_Source { Solar = 0,
                                      Wind = 1,
                                      Hydro = 2,
                                      Biomass = 3,
                                      Geothermal = 4,
                                      Nuclear = 5
}

export type Witnesses<PS> = {
  wit_secretNonce(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  grantRole(context: __compactRuntime.CircuitContext<PS>,
            roleId_0: Uint8Array,
            account_0: Either<ZswapCoinPublicKey, ContractAddress>): __compactRuntime.CircuitResults<PS, []>;
  revokeRole(context: __compactRuntime.CircuitContext<PS>,
             roleId_0: Uint8Array,
             account_0: Either<ZswapCoinPublicKey, ContractAddress>): __compactRuntime.CircuitResults<PS, []>;
  renounceRole(context: __compactRuntime.CircuitContext<PS>,
               roleId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  setRoleAdmin(context: __compactRuntime.CircuitContext<PS>,
               roleId_0: Uint8Array,
               adminRole_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  removeRoleAdmin(context: __compactRuntime.CircuitContext<PS>,
                  roleId_0: Uint8Array,
                  adminRole_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  assertOnlyRole(context: __compactRuntime.CircuitContext<PS>,
                 roleId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  pauseAccessControl(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  unpauseAccessControl(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  assertOwnVerification(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  isUserVerified(context: __compactRuntime.CircuitContext<PS>,
                 user_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, boolean>;
  setUser(context: __compactRuntime.CircuitContext<PS>,
          user_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  removeUser(context: __compactRuntime.CircuitContext<PS>,
             user_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  pauseIdentity(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  unpauseIdentity(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  balanceOf(context: __compactRuntime.CircuitContext<PS>,
            owner_0: Either<ZswapCoinPublicKey, ContractAddress>): __compactRuntime.CircuitResults<PS, bigint>;
  ownerOf(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, Either<ZswapCoinPublicKey,
                                                                                                                       ContractAddress>>;
  tokenCertificate(context: __compactRuntime.CircuitContext<PS>,
                   tokenId_0: bigint): __compactRuntime.CircuitResults<PS, NonFungibleToken_Certificate>;
  tokenPrice(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  mint(context: __compactRuntime.CircuitContext<PS>,
       to_0: Either<ZswapCoinPublicKey, ContractAddress>,
       tokenId_0: bigint,
       tokenCertificate_0: NonFungibleToken_Certificate,
       price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  burn(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  setTokenPrice(context: __compactRuntime.CircuitContext<PS>,
                tokenId_0: bigint,
                price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  pauseToken(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  unpauseToken(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  addToPool(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  removeFromPool(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  purchaseNFT(context: __compactRuntime.CircuitContext<PS>,
              tokenId_0: bigint,
              coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, Uint8Array>;
  _getBatchTokenPrice(context: __compactRuntime.CircuitContext<PS>,
                      tokenId_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  _storeBatchSellerPayment(context: __compactRuntime.CircuitContext<PS>,
                           tokenId_0: bigint,
                           coin_0: ShieldedCoinInfo,
                           price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  _executeBatchPurchase(context: __compactRuntime.CircuitContext<PS>,
                        tokenId_0: bigint,
                        ownerCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  purchaseBatch5(context: __compactRuntime.CircuitContext<PS>,
                 tokenId1_0: bigint,
                 tokenId2_0: bigint,
                 tokenId3_0: bigint,
                 tokenId4_0: bigint,
                 tokenId5_0: bigint,
                 coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, Uint8Array>;
  purchaseBatch10(context: __compactRuntime.CircuitContext<PS>,
                  tokenId1_0: bigint,
                  tokenId2_0: bigint,
                  tokenId3_0: bigint,
                  tokenId4_0: bigint,
                  tokenId5_0: bigint,
                  tokenId6_0: bigint,
                  tokenId7_0: bigint,
                  tokenId8_0: bigint,
                  tokenId9_0: bigint,
                  tokenId10_0: bigint,
                  coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, Uint8Array>;
  purchaseBatch20(context: __compactRuntime.CircuitContext<PS>,
                  tokenId1_0: bigint,
                  tokenId2_0: bigint,
                  tokenId3_0: bigint,
                  tokenId4_0: bigint,
                  tokenId5_0: bigint,
                  tokenId6_0: bigint,
                  tokenId7_0: bigint,
                  tokenId8_0: bigint,
                  tokenId9_0: bigint,
                  tokenId10_0: bigint,
                  tokenId11_0: bigint,
                  tokenId12_0: bigint,
                  tokenId13_0: bigint,
                  tokenId14_0: bigint,
                  tokenId15_0: bigint,
                  tokenId16_0: bigint,
                  tokenId17_0: bigint,
                  tokenId18_0: bigint,
                  tokenId19_0: bigint,
                  tokenId20_0: bigint,
                  coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, Uint8Array>;
  withdrawSellerFunds(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  proofOwnership(context: __compactRuntime.CircuitContext<PS>,
                 ownerCommitment_0: Uint8Array,
                 challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  pauseNFTPool(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  unpauseNFTPool(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  _burnPurchasedToken(context: __compactRuntime.CircuitContext<PS>,
                      tokenId_0: bigint,
                      ownerCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  burnPurchasedBatch5(context: __compactRuntime.CircuitContext<PS>,
                      ownerCommitment_0: Uint8Array,
                      tokenId1_0: bigint,
                      tokenId2_0: bigint,
                      tokenId3_0: bigint,
                      tokenId4_0: bigint,
                      tokenId5_0: bigint,
                      challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  burnPurchasedBatch10(context: __compactRuntime.CircuitContext<PS>,
                       ownerCommitment_0: Uint8Array,
                       tokenId1_0: bigint,
                       tokenId2_0: bigint,
                       tokenId3_0: bigint,
                       tokenId4_0: bigint,
                       tokenId5_0: bigint,
                       tokenId6_0: bigint,
                       tokenId7_0: bigint,
                       tokenId8_0: bigint,
                       tokenId9_0: bigint,
                       tokenId10_0: bigint,
                       challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  burnPurchasedBatch20(context: __compactRuntime.CircuitContext<PS>,
                       ownerCommitment_0: Uint8Array,
                       tokenId1_0: bigint,
                       tokenId2_0: bigint,
                       tokenId3_0: bigint,
                       tokenId4_0: bigint,
                       tokenId5_0: bigint,
                       tokenId6_0: bigint,
                       tokenId7_0: bigint,
                       tokenId8_0: bigint,
                       tokenId9_0: bigint,
                       tokenId10_0: bigint,
                       tokenId11_0: bigint,
                       tokenId12_0: bigint,
                       tokenId13_0: bigint,
                       tokenId14_0: bigint,
                       tokenId15_0: bigint,
                       tokenId16_0: bigint,
                       tokenId17_0: bigint,
                       tokenId18_0: bigint,
                       tokenId19_0: bigint,
                       tokenId20_0: bigint,
                       challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  grantRole(context: __compactRuntime.CircuitContext<PS>,
            roleId_0: Uint8Array,
            account_0: Either<ZswapCoinPublicKey, ContractAddress>): __compactRuntime.CircuitResults<PS, []>;
  revokeRole(context: __compactRuntime.CircuitContext<PS>,
             roleId_0: Uint8Array,
             account_0: Either<ZswapCoinPublicKey, ContractAddress>): __compactRuntime.CircuitResults<PS, []>;
  renounceRole(context: __compactRuntime.CircuitContext<PS>,
               roleId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  setRoleAdmin(context: __compactRuntime.CircuitContext<PS>,
               roleId_0: Uint8Array,
               adminRole_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  removeRoleAdmin(context: __compactRuntime.CircuitContext<PS>,
                  roleId_0: Uint8Array,
                  adminRole_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  assertOnlyRole(context: __compactRuntime.CircuitContext<PS>,
                 roleId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  pauseAccessControl(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  unpauseAccessControl(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  assertOwnVerification(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  isUserVerified(context: __compactRuntime.CircuitContext<PS>,
                 user_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, boolean>;
  setUser(context: __compactRuntime.CircuitContext<PS>,
          user_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  removeUser(context: __compactRuntime.CircuitContext<PS>,
             user_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  pauseIdentity(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  unpauseIdentity(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  balanceOf(context: __compactRuntime.CircuitContext<PS>,
            owner_0: Either<ZswapCoinPublicKey, ContractAddress>): __compactRuntime.CircuitResults<PS, bigint>;
  ownerOf(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, Either<ZswapCoinPublicKey,
                                                                                                                       ContractAddress>>;
  tokenCertificate(context: __compactRuntime.CircuitContext<PS>,
                   tokenId_0: bigint): __compactRuntime.CircuitResults<PS, NonFungibleToken_Certificate>;
  tokenPrice(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  mint(context: __compactRuntime.CircuitContext<PS>,
       to_0: Either<ZswapCoinPublicKey, ContractAddress>,
       tokenId_0: bigint,
       tokenCertificate_0: NonFungibleToken_Certificate,
       price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  burn(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  setTokenPrice(context: __compactRuntime.CircuitContext<PS>,
                tokenId_0: bigint,
                price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  pauseToken(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  unpauseToken(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  addToPool(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  removeFromPool(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  purchaseNFT(context: __compactRuntime.CircuitContext<PS>,
              tokenId_0: bigint,
              coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, Uint8Array>;
  _getBatchTokenPrice(context: __compactRuntime.CircuitContext<PS>,
                      tokenId_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  _storeBatchSellerPayment(context: __compactRuntime.CircuitContext<PS>,
                           tokenId_0: bigint,
                           coin_0: ShieldedCoinInfo,
                           price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  _executeBatchPurchase(context: __compactRuntime.CircuitContext<PS>,
                        tokenId_0: bigint,
                        ownerCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  purchaseBatch5(context: __compactRuntime.CircuitContext<PS>,
                 tokenId1_0: bigint,
                 tokenId2_0: bigint,
                 tokenId3_0: bigint,
                 tokenId4_0: bigint,
                 tokenId5_0: bigint,
                 coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, Uint8Array>;
  purchaseBatch10(context: __compactRuntime.CircuitContext<PS>,
                  tokenId1_0: bigint,
                  tokenId2_0: bigint,
                  tokenId3_0: bigint,
                  tokenId4_0: bigint,
                  tokenId5_0: bigint,
                  tokenId6_0: bigint,
                  tokenId7_0: bigint,
                  tokenId8_0: bigint,
                  tokenId9_0: bigint,
                  tokenId10_0: bigint,
                  coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, Uint8Array>;
  purchaseBatch20(context: __compactRuntime.CircuitContext<PS>,
                  tokenId1_0: bigint,
                  tokenId2_0: bigint,
                  tokenId3_0: bigint,
                  tokenId4_0: bigint,
                  tokenId5_0: bigint,
                  tokenId6_0: bigint,
                  tokenId7_0: bigint,
                  tokenId8_0: bigint,
                  tokenId9_0: bigint,
                  tokenId10_0: bigint,
                  tokenId11_0: bigint,
                  tokenId12_0: bigint,
                  tokenId13_0: bigint,
                  tokenId14_0: bigint,
                  tokenId15_0: bigint,
                  tokenId16_0: bigint,
                  tokenId17_0: bigint,
                  tokenId18_0: bigint,
                  tokenId19_0: bigint,
                  tokenId20_0: bigint,
                  coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, Uint8Array>;
  withdrawSellerFunds(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  proofOwnership(context: __compactRuntime.CircuitContext<PS>,
                 ownerCommitment_0: Uint8Array,
                 challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  pauseNFTPool(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  unpauseNFTPool(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  _burnPurchasedToken(context: __compactRuntime.CircuitContext<PS>,
                      tokenId_0: bigint,
                      ownerCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  burnPurchasedBatch5(context: __compactRuntime.CircuitContext<PS>,
                      ownerCommitment_0: Uint8Array,
                      tokenId1_0: bigint,
                      tokenId2_0: bigint,
                      tokenId3_0: bigint,
                      tokenId4_0: bigint,
                      tokenId5_0: bigint,
                      challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  burnPurchasedBatch10(context: __compactRuntime.CircuitContext<PS>,
                       ownerCommitment_0: Uint8Array,
                       tokenId1_0: bigint,
                       tokenId2_0: bigint,
                       tokenId3_0: bigint,
                       tokenId4_0: bigint,
                       tokenId5_0: bigint,
                       tokenId6_0: bigint,
                       tokenId7_0: bigint,
                       tokenId8_0: bigint,
                       tokenId9_0: bigint,
                       tokenId10_0: bigint,
                       challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  burnPurchasedBatch20(context: __compactRuntime.CircuitContext<PS>,
                       ownerCommitment_0: Uint8Array,
                       tokenId1_0: bigint,
                       tokenId2_0: bigint,
                       tokenId3_0: bigint,
                       tokenId4_0: bigint,
                       tokenId5_0: bigint,
                       tokenId6_0: bigint,
                       tokenId7_0: bigint,
                       tokenId8_0: bigint,
                       tokenId9_0: bigint,
                       tokenId10_0: bigint,
                       tokenId11_0: bigint,
                       tokenId12_0: bigint,
                       tokenId13_0: bigint,
                       tokenId14_0: bigint,
                       tokenId15_0: bigint,
                       tokenId16_0: bigint,
                       tokenId17_0: bigint,
                       tokenId18_0: bigint,
                       tokenId19_0: bigint,
                       tokenId20_0: bigint,
                       challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  AccessControl__operatorRoles: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: Either<ZswapCoinPublicKey, ContractAddress>): boolean;
      lookup(key_1: Either<ZswapCoinPublicKey, ContractAddress>): boolean;
      [Symbol.iterator](): Iterator<[Either<ZswapCoinPublicKey, ContractAddress>, boolean]>
    }
  };
  AccessControl_adminRoles: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  readonly AccessControl__ADMIN_MASTER: Uint8Array;
  Identity__verifiedUsersforBuckets: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: ZswapCoinPublicKey): boolean;
    [Symbol.iterator](): Iterator<ZswapCoinPublicKey>
  };
  readonly NonFungibleToken__name: string;
  readonly NonFungibleToken__symbol: string;
  readonly NonFungibleToken__certificatesCreatedCounter: bigint;
  NonFungibleToken__owners: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): Either<ZswapCoinPublicKey, ContractAddress>;
    [Symbol.iterator](): Iterator<[bigint, Either<ZswapCoinPublicKey, ContractAddress>]>
  };
  NonFungibleToken__balances: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Either<ZswapCoinPublicKey, ContractAddress>): boolean;
    lookup(key_0: Either<ZswapCoinPublicKey, ContractAddress>): bigint;
    [Symbol.iterator](): Iterator<[Either<ZswapCoinPublicKey, ContractAddress>, bigint]>
  };
  NonFungibleToken__tokenApprovals: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): Either<ZswapCoinPublicKey, ContractAddress>;
    [Symbol.iterator](): Iterator<[bigint, Either<ZswapCoinPublicKey, ContractAddress>]>
  };
  NonFungibleToken__operatorApprovals: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Either<ZswapCoinPublicKey, ContractAddress>): boolean;
    lookup(key_0: Either<ZswapCoinPublicKey, ContractAddress>): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: Either<ZswapCoinPublicKey, ContractAddress>): boolean;
      lookup(key_1: Either<ZswapCoinPublicKey, ContractAddress>): boolean;
      [Symbol.iterator](): Iterator<[Either<ZswapCoinPublicKey, ContractAddress>, boolean]>
    }
  };
  NonFungibleToken__tokenToCertificate: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): NonFungibleToken_Certificate;
    [Symbol.iterator](): Iterator<[bigint, NonFungibleToken_Certificate]>
  };
  NonFungibleToken__tokenToPrice: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): bigint;
    [Symbol.iterator](): Iterator<[bigint, bigint]>
  };
  NFTPool__pool: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: bigint): boolean;
    [Symbol.iterator](): Iterator<bigint>
  };
  NFTPool__nftOwnerCommitment: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): Uint8Array;
    [Symbol.iterator](): Iterator<[bigint, Uint8Array]>
  };
  readonly NFTPool__purchaseCounter: bigint;
  NFTPool__tokenSold: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): boolean;
    [Symbol.iterator](): Iterator<[bigint, boolean]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               _name_0: string,
               _symbol_0: string): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
