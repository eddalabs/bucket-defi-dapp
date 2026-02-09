---
name: compact-test
description: Write tests for a Compact smart contract using Vitest and the Simulator pattern. Use when asked to write tests, add test coverage, or create a test suite for a Compact contract.
argument-hint: "[contract-name]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Compact Smart Contract Testing

Write tests for a Compact smart contract using Vitest and the Simulator pattern.

## Arguments

- `$0` = contract name (e.g. `private-buyer`, `bucket-defi`)

## Test Architecture

Tests consist of 3 files:

```
src/test/
├── <contract-name>.test.ts        # Test suite (Vitest describe/it blocks)
├── simulators/
│   └── simulator.ts               # Simulator class wrapping the Contract API
└── utils/
    └── utils.ts                    # Test helpers (randomBytes, encoders, coin factory)
```

## Test Utilities (`utils/utils.ts`)

Standard utilities that must be adapted for each contract (only the import path changes):

```typescript
import type * as Compact from "../../managed/<contract-name>/contract/index.js";
import {
  encodeRawTokenType,
  encodeContractAddress,
  encodeCoinPublicKey
} from "@midnight-ntwrk/compact-runtime";
import * as ledger from '@midnight-ntwrk/ledger-v7';

const PREFIX_ADDRESS = "0200";

// Random bytes generator
export const randomBytes = (length: number): Uint8Array => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
};

// Hex encoding
export const toHexPadded = (str: string, len = 64) =>
  Buffer.from(str, "ascii").toString("hex").padStart(len, "0");

export const bytesToHex = (bytes: Uint8Array): string =>
  Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');

// Account creation helpers
export const encodeToPK = (str: string): Compact.ZswapCoinPublicKey => ({
  bytes: encodeCoinPublicKey(toHexPadded(str))
});

export const createCaller = (str: string): string =>
  bytesToHex(encodeCoinPublicKey(toHexPadded(str)));

export const createEitherTestUser = (str: string) => ({
  is_left: true,
  left: encodeToPK(str),
  right: { bytes: new Uint8Array(32) }
});

export const zeroUint8Array = (length = 32) => new Uint8Array(length);

// Coin factory for shielded transactions
export const coin = (value: number): Compact.ShieldedCoinInfo => ({
  nonce: randomBytes(32),
  color: encodeRawTokenType(ledger.shieldedToken().raw),
  value: BigInt(value),
});
```

## Simulator Class (`simulators/simulator.ts`)

The Simulator wraps the compiled Contract class and provides:
- User context switching (`as(name)`)
- Private state management per user
- Ledger state access
- One method per exported circuit

### Template Structure

```typescript
import {
  type CircuitContext,
  type CoinPublicKey,
  CircuitResults,
  QueryContext,
  emptyZswapLocalState,
  sampleContractAddress,
  createConstructorContext,
  CostModel,
  ContractAddress
} from "@midnight-ntwrk/compact-runtime";
import {
  Contract,
  type Ledger,
  ledger,
  ContractAddress as ContractAddress_,
  ZswapCoinPublicKey as ZswapCoinPublicKey_,
  Either,
  ShieldedCoinInfo,
  // Import types/enums needed from your contract
} from "../../managed/<contract-name>/contract/index.js";
import {
  type PrivateState,
  createPrivateState,
  witnesses
} from "../../witnesses.js";
import { createLogger } from "../../logger.js";
import { LogicTestingConfig } from "../../config.js";
import { adminMaster } from "../<contract-name>.test.js";

const config = new LogicTestingConfig();
export const logger = await createLogger(config.logDir);

export class Simulator {
  readonly contract: Contract<PrivateState>;
  circuitContext: CircuitContext<PrivateState>;
  userPrivateStates: Record<string, PrivateState>;
  updateUserPrivateState: (newPrivateState: PrivateState) => void;
  contractAddress: ContractAddress;

  constructor(privateState: PrivateState, name: string, symbol: string) {
    this.contract = new Contract<PrivateState>(witnesses);
    this.contractAddress = sampleContractAddress();
    const { currentPrivateState, currentContractState, currentZswapLocalState } =
      this.contract.initialState(
        createConstructorContext({ secretNonce: privateState.secretNonce }, adminMaster),
        name, symbol
      );
    this.circuitContext = {
      currentPrivateState,
      currentZswapLocalState,
      currentQueryContext: new QueryContext(currentContractState.data, this.contractAddress),
      costModel: CostModel.initialCostModel()
    };
    this.userPrivateStates = { ["adminMaster"]: currentPrivateState };
    this.updateUserPrivateState = () => {};
  }

  static deployContract(secretNonce: Uint8Array, name: string, symbol: string): Simulator {
    return new Simulator(createPrivateState(secretNonce), name, symbol);
  }

  createPrivateState(pName: string, secretNonce: Uint8Array): void {
    this.userPrivateStates[pName] = createPrivateState(secretNonce);
  }

  private buildTurnContext(currentPrivateState: PrivateState): CircuitContext<PrivateState> {
    return { ...this.circuitContext, currentPrivateState };
  }

  private updateUserPrivateStateByName = (name: string) => (newPS: PrivateState): void => {
    this.userPrivateStates[name] = newPS;
  };

  as(name: string): Simulator {
    const ps = this.userPrivateStates[name];
    if (!ps) throw new Error(`No private state for '${name}'`);
    this.circuitContext = this.buildTurnContext(ps);
    this.updateUserPrivateState = this.updateUserPrivateStateByName(name);
    return this;
  }

  public getLedger(): Ledger { return ledger(this.circuitContext.currentQueryContext.state); }
  public getPrivateState(): PrivateState { return this.circuitContext.currentPrivateState; }

  updateStateAndGetLedger<T>(circuitResults: CircuitResults<PrivateState, T>): Ledger {
    this.circuitContext = circuitResults.context;
    this.updateUserPrivateState(circuitResults.context.currentPrivateState);
    return this.getLedger();
  }

  // === Circuit wrapper pattern (one per exported circuit) ===

  // For void-returning circuits:
  public myCircuit(param: bigint, caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.myCircuit(
      { ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState },
      param
    );
    return this.updateStateAndGetLedger(circuitResults);
  }

  // For value-returning circuits:
  public myQuery(param: bigint, caller?: CoinPublicKey): bigint {
    const circuitResults = this.contract.impureCircuits.myQuery(
      { ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState },
      param
    );
    return circuitResults.result;
  }

  // For circuits returning bytes (commitments):
  public myCommitment(param: bigint, coin: ShieldedCoinInfo, caller?: CoinPublicKey): Uint8Array {
    const circuitResults = this.contract.impureCircuits.myCommitment(
      { ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState },
      param, coin
    );
    this.updateStateAndGetLedger(circuitResults);
    return circuitResults.result;
  }
}
```

## Test File Template

```typescript
import { Simulator } from "./simulators/simulator";
import { type CoinPublicKey, convertFieldToBytes } from '@midnight-ntwrk/compact-runtime';
import { describe, it, expect, beforeEach } from "vitest";
import { randomBytes } from "./utils/utils";
import * as utils from "./utils/utils";

// === Users (private keys for ZK witness) ===
const adminMaster_privateKey = randomBytes(32);
const minter_privateKey = randomBytes(32);
// ... one per test user

// === Callers (public key hex for emptyZswapLocalState) ===
export const adminMaster = utils.createCaller("adminMaster");
export const minter = utils.createCaller("minter");

// === Accounts (Either<ZswapCoinPublicKey, ContractAddress>) ===
const Account_adminMaster = utils.createEitherTestUser("adminMaster");
const Account_minter = utils.createEitherTestUser("minter");

// === Roles (Bytes<32> from Field) ===
const adminMaster_ROLE = utils.zeroUint8Array();                   // 0
const minter_ROLE = convertFieldToBytes(32, 2n, '');               // 2
const poolOperator_ROLE = convertFieldToBytes(32, 4n, '');         // 4
const verifier_ROLE = convertFieldToBytes(32, 6n, '');             // 6

// === Test setup function ===
function createSimulator() {
  const simulator = Simulator.deployContract(adminMaster_privateKey, "NAME", "SYMBOL");

  // Register users
  simulator.createPrivateState("adminMaster", adminMaster_privateKey);
  simulator.createPrivateState("minter", minter_privateKey);

  // Grant roles through admin hierarchy
  simulator.as("adminMaster").grantRole(minterAdmin_ROLE, Account_minterAdmin, adminMaster);
  simulator.as("minterAdmin").grantRole(minter_ROLE, Account_minter, minterAdmin);

  return simulator;
}

let simulator: Simulator;

describe("Smart Contract Testing", () => {
  beforeEach(() => {
    simulator = createSimulator();
  });

  describe("Module testing", () => {
    it("test description", () => {
      // Success case
      simulator.as("minter").myCircuit(1n, minter);

      // Failure case - expect throw
      expect(() => {
        simulator.as("unauthorized").myCircuit(1n, unauthorized);
      }).toThrow();

      // Check ledger state
      const ledgerState = simulator.as("adminMaster").getLedger();
      expect(ledgerState.SomeModule__someCounter).toEqual(1n);

      // Check return values
      const result = simulator.as("minter").myQuery(1n);
      expect(result).toBe(expectedValue);
    });
  });
});
```

## Test Categories to Cover

For every contract, write tests covering these categories:

### 1. Access Control
- Initialize ledger and private state correctly
- Confirm roles with `assertOnlyRole` for all role IDs
- `setRoleAdmin` fails if not AdminMaster
- `grantRole` fails if not the correct admin for that role
- Create new AdminMaster
- Pause/unpause access control (only AdminMaster)

### 2. Identity
- `setUser` fails if not Verifier role
- `removeUser` fails if not Verifier role
- Pause/unpause identity (only AdminMaster)

### 3. Token/NFT
- Minting (only Minter role)
- Burning (check which role is required)
- `setTokenPrice` (only token owner)
- Balance and ownership queries

### 4. Custom Module
- Initialize state (counters at 0, sets empty)
- Operations succeed with correct role
- Operations fail with wrong role
- Operations fail with invalid input
- Edge cases (duplicate operations, non-existent items)
- Pause/unpause (only AdminMaster)

### 5. End-to-End Flow
- Full workflow from setup to completion
- Multi-user interactions
- State consistency throughout

## Running Tests

```bash
# Compile first (generates managed code)
npm run compact

# Run all tests
npm run test

# Compile and test
npm run test:compile
```

## Key Testing Patterns

### Pattern: Test role enforcement
```typescript
it("operation fails for unauthorized user", () => {
  expect(() => {
    simulator.as("unauthorized").protectedCircuit(param, unauthorizedCaller);
  }).toThrow();
  // Success with correct role
  simulator.as("authorized").protectedCircuit(param, authorizedCaller);
});
```

### Pattern: Test state changes
```typescript
it("operation updates state correctly", () => {
  simulator.as("user").doSomething(param, caller);
  const ledger = simulator.as("admin").getLedger();
  expect(ledger.Module__counter).toEqual(1n);
});
```

### Pattern: Test ZK commitments
```typescript
it("ownership proof works for owner", () => {
  const commitment = simulator.as("buyer").purchase(tokenId, coin, buyerCaller);
  const challenge = randomBytes(32);
  simulator.as("buyer").proofOwnership(commitment, challenge, buyerCaller);
  // Non-owner fails
  expect(() => {
    simulator.as("otherUser").proofOwnership(commitment, challenge, otherCaller);
  }).toThrow();
});
```
