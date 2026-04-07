import type * as Compact from "../../managed/mini-private-buyer/contract/index.js";
import {
  encodeRawTokenType,
  encodeContractAddress,
  encodeCoinPublicKey
} from "@midnight-ntwrk/compact-runtime";
import * as ledger from '@midnight-ntwrk/ledger-v8';

const PREFIX_ADDRESS = "0200";

export const randomBytes = (length: number): Uint8Array => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
};

export const toHexPadded = (str: string, len = 64) =>
  Buffer.from(str, "ascii").toString("hex").padStart(len, "0");

export const bytesToHex = (bytes: Uint8Array): string =>
  Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');

export const encodeToPK = (str: string): Compact.ZswapCoinPublicKey => ({
  bytes: encodeCoinPublicKey(toHexPadded(str))
});

export const createCaller = (str: string): string =>
  bytesToHex(encodeCoinPublicKey(toHexPadded(str)));

export const encodeToAddress = (str: string): Compact.ContractAddress => ({
  bytes: encodeContractAddress(PREFIX_ADDRESS + toHexPadded(str, 60))
});

export const createEitherTestUser = (str: string) => ({
  is_left: true,
  left: encodeToPK(str),
  right: { bytes: new Uint8Array(32) }
});

export const createEitherTestContractAddress = (str: string) => ({
  is_left: false,
  left: encodeToPK(""),
  right: encodeToAddress(str)
});

export const zeroUint8Array = (length = 32) =>
  new Uint8Array(length);

export const coin = (value: number): Compact.ShieldedCoinInfo => {
  return {
    nonce: randomBytes(32),
    color: encodeRawTokenType(ledger.shieldedToken().raw),
    value: BigInt(value),
  };
}
