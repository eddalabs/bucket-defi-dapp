import { MiniPrivateBuyer } from '@eddalabs/mini-private-buyer-contract';
import { encodeCoinPublicKey, encodeRawTokenType } from '@midnight-ntwrk/compact-runtime';
import * as ledger from '@midnight-ntwrk/ledger-v8';

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
 */
export function createCertificate(index: number): MiniPrivateBuyer.NonFungibleToken_Certificate {
  const sources = [
    MiniPrivateBuyer.NonFungibleToken_Source.Biomass,
    MiniPrivateBuyer.NonFungibleToken_Source.Solar,
    MiniPrivateBuyer.NonFungibleToken_Source.Wind,
    MiniPrivateBuyer.NonFungibleToken_Source.Hydro,
    MiniPrivateBuyer.NonFungibleToken_Source.Geothermal,
  ];
  const impacts = [
    MiniPrivateBuyer.NonFungibleToken_Impact.High,
    MiniPrivateBuyer.NonFungibleToken_Impact.Medium,
    MiniPrivateBuyer.NonFungibleToken_Impact.Low,
    MiniPrivateBuyer.NonFungibleToken_Impact.Minimal,
    MiniPrivateBuyer.NonFungibleToken_Impact.Extreme,
  ];
  const locations = [
    MiniPrivateBuyer.NonFungibleToken_Location.RJ,
    MiniPrivateBuyer.NonFungibleToken_Location.SP,
    MiniPrivateBuyer.NonFungibleToken_Location.MG,
    MiniPrivateBuyer.NonFungibleToken_Location.RS,
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
 */
export function createEitherAccount(
  coinPublicKeyHex: string,
): MiniPrivateBuyer.Either<MiniPrivateBuyer.ZswapCoinPublicKey, MiniPrivateBuyer.ContractAddress> {
  return {
    is_left: true,
    left: { bytes: encodeCoinPublicKey(coinPublicKeyHex) },
    right: { bytes: new Uint8Array(32) },
  };
}

/**
 * Create a ShieldedCoinInfo for use with purchaseNFT.
 * Uses a random nonce because receiveShielded creates a NEW output coin
 * (the wallet's balanceTx handles spending existing coins to fund it).
 */
export function createCoin(value: bigint): MiniPrivateBuyer.ShieldedCoinInfo {
  return {
    nonce: randomBytes(32),
    color: encodeRawTokenType(ledger.shieldedToken().raw),
    value,
  };
}
