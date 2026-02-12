import { PrivateBuyer } from '@eddalabs/private-buyer-contract';
import { encodeCoinPublicKey, encodeRawTokenType } from '@midnight-ntwrk/compact-runtime';
import * as ledger from '@midnight-ntwrk/ledger-v7';

export const tokenValue = (value: bigint): bigint => value * 10n ** 6n;

/**
 * Create a Uint8Array with cryptographically random values.
 */
export const randomBytes = (length: number): Uint8Array => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
};

/**
 * Create a certificate for a given index, rotating through available enum values.
 * Replicates the contract-test helper for integration use.
 */
export function createCertificate(index: number): PrivateBuyer.NonFungibleToken_Certificate {
  const sources = [
    PrivateBuyer.NonFungibleToken_Source.Biomass,
    PrivateBuyer.NonFungibleToken_Source.Solar,
    PrivateBuyer.NonFungibleToken_Source.Wind,
    PrivateBuyer.NonFungibleToken_Source.Hydro,
    PrivateBuyer.NonFungibleToken_Source.Geothermal,
  ];
  const impacts = [
    PrivateBuyer.NonFungibleToken_Impact.High,
    PrivateBuyer.NonFungibleToken_Impact.Medium,
    PrivateBuyer.NonFungibleToken_Impact.Low,
    PrivateBuyer.NonFungibleToken_Impact.Minimal,
    PrivateBuyer.NonFungibleToken_Impact.Extreme,
  ];
  const locations = [
    PrivateBuyer.NonFungibleToken_Location.RJ,
    PrivateBuyer.NonFungibleToken_Location.SP,
    PrivateBuyer.NonFungibleToken_Location.MG,
    PrivateBuyer.NonFungibleToken_Location.RS,
  ];

  return {
    id: `Certificate_${index}`,
    source: sources[index % sources.length],
    generation: BigInt(1000000 * index),
    vintage: BigInt(10 + index),
    impact: impacts[index % impacts.length],
    location: locations[index % locations.length],
  };
}

/**
 * Build an Either<ZswapCoinPublicKey, ContractAddress> from a wallet's coin public key hex string.
 * Used to construct the `account` / `to` argument for role-gating and minting.
 */
export function createEitherAccount(
  coinPublicKeyHex: string,
): PrivateBuyer.Either<PrivateBuyer.ZswapCoinPublicKey, PrivateBuyer.ContractAddress> {
  return {
    is_left: true,
    left: { bytes: encodeCoinPublicKey(coinPublicKeyHex) },
    right: { bytes: new Uint8Array(32) },
  };
}

/**
 * Create a ShieldedCoinInfo for use with purchaseNFT.
 */
export function createCoin(value: bigint): PrivateBuyer.ShieldedCoinInfo {
  return {
    nonce: randomBytes(32),
    color: encodeRawTokenType(ledger.shieldedToken().raw),
    value,
  };
}
