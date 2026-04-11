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
  const categories = [
    MiniPrivateBuyer.NonFungibleToken_Category.Type1,
    MiniPrivateBuyer.NonFungibleToken_Category.Type2,
    MiniPrivateBuyer.NonFungibleToken_Category.Type3,
    MiniPrivateBuyer.NonFungibleToken_Category.Type4,
    MiniPrivateBuyer.NonFungibleToken_Category.Type5,
  ];
  const tiers = [
    MiniPrivateBuyer.NonFungibleToken_Tier.Level1,
    MiniPrivateBuyer.NonFungibleToken_Tier.Level2,
    MiniPrivateBuyer.NonFungibleToken_Tier.Level3,
    MiniPrivateBuyer.NonFungibleToken_Tier.Level4,
    MiniPrivateBuyer.NonFungibleToken_Tier.Level5,
  ];
  const regions = [
    MiniPrivateBuyer.NonFungibleToken_Region.Region1,
    MiniPrivateBuyer.NonFungibleToken_Region.Region2,
    MiniPrivateBuyer.NonFungibleToken_Region.Region3,
    MiniPrivateBuyer.NonFungibleToken_Region.Region4,
  ];

  return {
    id: `Certificate_${index}`,
    category: categories[index % categories.length],
    quantity: BigInt(1000000 * index),
    period: BigInt(10 + index),
    tier: tiers[index % tiers.length],
    region: regions[index % regions.length],
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
