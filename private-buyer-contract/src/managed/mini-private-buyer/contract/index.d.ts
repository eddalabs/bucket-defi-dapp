import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type ZswapCoinPublicKey = { bytes: Uint8Array };

export type ContractAddress = { bytes: Uint8Array };

export type Either<A, B> = { is_left: boolean; left: A; right: B };

export type ShieldedCoinInfo = { nonce: Uint8Array;
                                 color: Uint8Array;
                                 value: bigint
                               };

export type NonFungibleToken_Certificate = { id: string;
                                             category: NonFungibleToken_Category;
                                             quantity: bigint;
                                             period: bigint;
                                             tier: NonFungibleToken_Tier;
                                             region: NonFungibleToken_Region
                                           };

export enum NonFungibleToken_Category { Type1 = 0,
                                        Type2 = 1,
                                        Type3 = 2,
                                        Type4 = 3,
                                        Type5 = 4,
                                        Type6 = 5
}

export enum NonFungibleToken_Tier { Level1 = 0,
                                    Level2 = 1,
                                    Level3 = 2,
                                    Level4 = 3,
                                    Level5 = 4
}

export enum NonFungibleToken_Region { Region1 = 0,
                                      Region2 = 1,
                                      Region3 = 2,
                                      Region4 = 3
}

export type Witnesses<PS> = {
  wit_secretNonce(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  mint(context: __compactRuntime.CircuitContext<PS>,
       to_0: Either<ZswapCoinPublicKey, ContractAddress>,
       tokenId_0: bigint,
       tokenCertificate_0: NonFungibleToken_Certificate,
       price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  mintAndList(context: __compactRuntime.CircuitContext<PS>,
              to_0: Either<ZswapCoinPublicKey, ContractAddress>,
              tokenId_0: bigint,
              tokenCertificate_0: NonFungibleToken_Certificate,
              price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  burn(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  unlistAndBurn(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  addToPool(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  removeFromPool(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  purchaseNFT(context: __compactRuntime.CircuitContext<PS>,
              tokenId_0: bigint,
              coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, Uint8Array>;
  withdrawSellerFunds(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  proofOwnership(context: __compactRuntime.CircuitContext<PS>,
                 ownerCommitment_0: Uint8Array,
                 challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  burnPurchased(context: __compactRuntime.CircuitContext<PS>,
                ownerCommitment_0: Uint8Array,
                tokenId_0: bigint,
                challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  balanceOf(context: __compactRuntime.CircuitContext<PS>,
            owner_0: Either<ZswapCoinPublicKey, ContractAddress>): __compactRuntime.CircuitResults<PS, bigint>;
  ownerOf(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, Either<ZswapCoinPublicKey,
                                                                                                                       ContractAddress>>;
  tokenCertificate(context: __compactRuntime.CircuitContext<PS>,
                   tokenId_0: bigint): __compactRuntime.CircuitResults<PS, NonFungibleToken_Certificate>;
  tokenPrice(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  setTokenPrice(context: __compactRuntime.CircuitContext<PS>,
                tokenId_0: bigint,
                price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  mint(context: __compactRuntime.CircuitContext<PS>,
       to_0: Either<ZswapCoinPublicKey, ContractAddress>,
       tokenId_0: bigint,
       tokenCertificate_0: NonFungibleToken_Certificate,
       price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  mintAndList(context: __compactRuntime.CircuitContext<PS>,
              to_0: Either<ZswapCoinPublicKey, ContractAddress>,
              tokenId_0: bigint,
              tokenCertificate_0: NonFungibleToken_Certificate,
              price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  burn(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  unlistAndBurn(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  addToPool(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  removeFromPool(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  purchaseNFT(context: __compactRuntime.CircuitContext<PS>,
              tokenId_0: bigint,
              coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, Uint8Array>;
  withdrawSellerFunds(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  proofOwnership(context: __compactRuntime.CircuitContext<PS>,
                 ownerCommitment_0: Uint8Array,
                 challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  burnPurchased(context: __compactRuntime.CircuitContext<PS>,
                ownerCommitment_0: Uint8Array,
                tokenId_0: bigint,
                challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  balanceOf(context: __compactRuntime.CircuitContext<PS>,
            owner_0: Either<ZswapCoinPublicKey, ContractAddress>): __compactRuntime.CircuitResults<PS, bigint>;
  ownerOf(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, Either<ZswapCoinPublicKey,
                                                                                                                       ContractAddress>>;
  tokenCertificate(context: __compactRuntime.CircuitContext<PS>,
                   tokenId_0: bigint): __compactRuntime.CircuitResults<PS, NonFungibleToken_Certificate>;
  tokenPrice(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  setTokenPrice(context: __compactRuntime.CircuitContext<PS>,
                tokenId_0: bigint,
                price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  mint(context: __compactRuntime.CircuitContext<PS>,
       to_0: Either<ZswapCoinPublicKey, ContractAddress>,
       tokenId_0: bigint,
       tokenCertificate_0: NonFungibleToken_Certificate,
       price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  mintAndList(context: __compactRuntime.CircuitContext<PS>,
              to_0: Either<ZswapCoinPublicKey, ContractAddress>,
              tokenId_0: bigint,
              tokenCertificate_0: NonFungibleToken_Certificate,
              price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  burn(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  unlistAndBurn(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  addToPool(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  removeFromPool(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  purchaseNFT(context: __compactRuntime.CircuitContext<PS>,
              tokenId_0: bigint,
              coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, Uint8Array>;
  withdrawSellerFunds(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  proofOwnership(context: __compactRuntime.CircuitContext<PS>,
                 ownerCommitment_0: Uint8Array,
                 challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  burnPurchased(context: __compactRuntime.CircuitContext<PS>,
                ownerCommitment_0: Uint8Array,
                tokenId_0: bigint,
                challenge_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  balanceOf(context: __compactRuntime.CircuitContext<PS>,
            owner_0: Either<ZswapCoinPublicKey, ContractAddress>): __compactRuntime.CircuitResults<PS, bigint>;
  ownerOf(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, Either<ZswapCoinPublicKey,
                                                                                                                       ContractAddress>>;
  tokenCertificate(context: __compactRuntime.CircuitContext<PS>,
                   tokenId_0: bigint): __compactRuntime.CircuitResults<PS, NonFungibleToken_Certificate>;
  tokenPrice(context: __compactRuntime.CircuitContext<PS>, tokenId_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  setTokenPrice(context: __compactRuntime.CircuitContext<PS>,
                tokenId_0: bigint,
                price_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
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
  NFTPool__sellerAmount: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Either<ZswapCoinPublicKey, ContractAddress>): boolean;
    lookup(key_0: Either<ZswapCoinPublicKey, ContractAddress>): bigint;
    [Symbol.iterator](): Iterator<[Either<ZswapCoinPublicKey, ContractAddress>, bigint]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               _name_0: string,
               _symbol_0: string): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
