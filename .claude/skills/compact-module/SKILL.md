---
name: compact-module
description: Create a new Compact module following the tri-file pattern (Main + Initializable + Pausable). Use when adding a new module to an existing contract project.
argument-hint: "[module-name] [description]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Compact Module - Create New Module

Create a new Compact module following the Edda Labs tri-file pattern.

## Arguments

- `$0` = module name (PascalCase, e.g. `NFTPool`, `Marketplace`, `Escrow`)
- `$1` = description of the module's purpose

## Tri-File Pattern

Every module consists of exactly 3 files:

```
modules/<module-name-lowercase>/
├── <ModuleName>.compact       # Main logic
├── Initializable.compact      # Init guard (identical across all modules)
└── Pausable.compact           # Pause guard (identical across all modules)
```

## Steps

1. Create the module directory under `src/modules/`
2. Copy the standard `Initializable.compact` and `Pausable.compact` (identical for all modules)
3. Write the main `<ModuleName>.compact` file following the template below
4. Import the module in the main contract `.compact` file with a prefix
5. Export public state from the module in the main contract
6. Call `<Prefix>_initialize()` in the constructor
7. Create wrapper circuits in the main contract for cross-module logic

## Initializable.compact (Standard - Never Modify)

```compact
pragma language_version >= 0.20.0;

module Initializable {
  import CompactStandardLibrary;

  export ledger _isInitialized: Boolean;

  export circuit initialize(): [] {
    assertNotInitialized();
    _isInitialized = true;
  }

  export circuit assertInitialized(): [] {
    assert(_isInitialized, "Initializable: contract not initialized");
  }

  export circuit assertNotInitialized(): [] {
    assert(!_isInitialized, "Initializable: contract already initialized");
  }
}
```

## Pausable.compact (Standard - Never Modify)

```compact
pragma language_version >= 0.20.0;

module Pausable {
  import CompactStandardLibrary;

  export ledger _isPaused: Boolean;

  export circuit isPaused(): Boolean {
    return _isPaused;
  }

  export circuit assertPaused(): [] {
    assert(_isPaused, "Pausable: not paused");
  }

  export circuit assertNotPaused(): [] {
    assert(!_isPaused, "Pausable: paused");
  }

  export circuit _pause(): [] {
    assertNotPaused();
    _isPaused = true;
  }

  export circuit _unpause(): [] {
    assertPaused();
    _isPaused = false;
  }
}
```

## Main Module Template

```compact
// Edda Labs Compact Contracts v0.0.1
pragma language_version >= 0.20.0;

/**
* @module: <ModuleName>
*
* @description: <Description of what this module does>
*
* @notice: Initialization logic is all handled within the module.
* All callable circuits (not with prefix _) are protected by `Initializable_assertInitialized()`.
*
* @notice: Design patterns
* - Initializable
* - Pausable
* - Concurrency-safe: use of simple, granular and critical ADTs
* - Low fees: optimized circuits & minimal ADTs interactions
* - High performance: use events to build complex queries offchain
*/

module <ModuleName> {
  import CompactStandardLibrary;
  import "./Initializable" prefix Initializable_;
  import "./Pausable" prefix Pausable_;
  // Import other modules if needed (types only, not state access):
  // import "../token-nft/NonFungibleToken" prefix NonFungibleToken_;

  ///////////////////////////////////////////////////////////////////////////////
  // ENUMS (if needed)
  ///////////////////////////////////////////////////////////////////////////////

  // export enum STATUS { ACTIVE, COMPLETED }

  ///////////////////////////////////////////////////////////////////////////////
  // STRUCTS (if needed)
  ///////////////////////////////////////////////////////////////////////////////

  // export struct MyData { field1: Uint<64>, field2: Bytes<32> }

  ///////////////////////////////////////////////////////////////////////////////
  // PUBLIC STATE
  ///////////////////////////////////////////////////////////////////////////////

  // Use Map, Set, Counter for concurrency-safe state
  // export ledger _myMap: Map<Bytes<32>, Boolean>;
  // export ledger _myCounter: Counter;
  // export ledger _mySet: Set<Uint<128>>;

  ///////////////////////////////////////////////////////////////////////////////
  // WITNESS (if ZK private state needed)
  ///////////////////////////////////////////////////////////////////////////////

  // export witness wit_secretNonce(): Bytes<32>;

  ///////////////////////////////////////////////////////////////////////////////
  // CIRCUITS
  ///////////////////////////////////////////////////////////////////////////////

  export circuit initialize(): [] {
    Initializable_initialize();
  }

  // Public circuits MUST have init + pause guards
  export circuit myPublicCircuit(param: Uint<128>): [] {
    Initializable_assertInitialized();
    Pausable_assertNotPaused();
    // Access control is enforced at the top-level contract, NOT here
    // Business logic here...
  }

  export circuit pause<ModuleName>(): [] {
    Initializable_assertInitialized();
    Pausable_assertNotPaused();
    Pausable__pause();
  }

  export circuit unpause<ModuleName>(): [] {
    Initializable_assertInitialized();
    Pausable_assertPaused();
    Pausable__unpause();
  }

  ///////////////////////////////////////////////////////////////////////////////
  // PRIVATE CIRCUITS (prefix with _)
  ///////////////////////////////////////////////////////////////////////////////

  // export circuit _internalHelper(...): ... { }
  // export pure circuit _pureHelper(...): ... { }
}
```

## Critical Rules

### DO

- **Always** guard public circuits with `Initializable_assertInitialized()` and `Pausable_assertNotPaused()`
- **Always** use `disclose()` when writing to ledger state: `myMap.insert(disclose(key), disclose(value))`
- **Always** prefix internal/private circuits with `_` (e.g., `_computeOwnerId`)
- **Always** use concurrency-safe ADTs: `Map`, `Set`, `Counter` (never plain variables for mutable shared state)
- **Always** use `export` on circuits and state that need to be accessed from the main contract
- **Always** mark pure utility circuits as `export pure circuit`

### DON'T

- **Never** enforce access control inside modules - do it at the top-level contract via `assertOnlyRole()`
- **Never** read another module's ledger state directly from within a module - flow inter-module data through the top-level contract's wrapper circuits
- **Never** use `Uint<256>` - max supported is `Uint<128>` due to midnight circuit backend limits
- **Never** use `sealed ledger` for mutable state - only for immutable config (name, symbol)
- **Never** forget the `disclose()` wrapper on values being written to ledger

### Type Casting Pitfalls

```compact
// WRONG - produces range type mismatch
myMap.insert(key, value1 + value2);

// CORRECT - cast the result explicitly
const result = (value1 + value2) as Uint<128>;
myMap.insert(disclose(key), disclose(result));

// WRONG - direct Uint<64> to Uint<128> map
myUint128Map.insert(key, price as Uint<128>);

// CORRECT - use disclose
const amount = disclose(price) as Uint<128>;
myUint128Map.insert(disclose(key), disclose(amount));
```

## Integration in Main Contract

After creating the module, integrate it in the main `.compact` file:

```compact
// 1. Import
import "./modules/<module-dir>/<ModuleName>" prefix <Prefix>_;

// 2. Export public state
export { <Prefix>__myState, <Prefix>__myCounter };

// 3. Initialize in constructor
constructor(...) {
  // ... other inits ...
  <Prefix>_initialize();
}

// 4. Wrapper circuits with access control
export circuit doSomething(param: Uint<128>): [] {
  assertOnlyRole(4 as Field as Bytes<32>);  // PoolOperator role
  // Cross-module state reads happen HERE
  const data = NonFungibleToken__tokenToPrice.lookup(disclose(param));
  <Prefix>_myPublicCircuit(param);
}

// 5. Pause/unpause with admin check
export circuit pause<ModuleName>(): [] {
  assertOnlyRole(default<Bytes<32>>);  // MasterAdmin only
  <Prefix>_pause<ModuleName>();
}
```
