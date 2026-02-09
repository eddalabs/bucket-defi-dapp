import { Ledger } from "./managed/private-buyer/contract/index.js";
import { WitnessContext } from "@midnight-ntwrk/compact-runtime";

export type PrivateState = {
  secretNonce: Uint8Array;
};

export const createPrivateState = (secretNonce: Uint8Array): PrivateState => {
  return {
    secretNonce
  };
};

export const witnesses = {
  wit_secretNonce: ({
    privateState,
  }: WitnessContext<Ledger, PrivateState>): [
    PrivateState,
    Uint8Array,
  ] => [privateState, privateState.secretNonce],
};
