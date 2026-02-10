// Diagnostic script: check actual contract state sizes
import * as ledger from '@midnight-ntwrk/ledger-v7';
import { CompiledContract, ContractExecutable } from '@midnight-ntwrk/compact-js';
import { PrivateBuyer, witnesses, createPrivateState } from '@eddalabs/private-buyer-contract';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import {
  createUnprovenDeployTxFromVerifierKeys,
} from '@midnight-ntwrk/midnight-js-contracts';
import { contractConfig } from './config';
import { getNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { type ContractState as CompactContractState, sampleSigningKey } from '@midnight-ntwrk/compact-runtime';

async function main() {
  console.log('=== Private Buyer Contract Size Diagnostic ===\n');

  const compiledContract = CompiledContract.make('private-buyer', PrivateBuyer.Contract).pipe(
    CompiledContract.withWitnesses(witnesses),
    CompiledContract.withCompiledFileAssets(contractConfig.zkConfigPath),
  );

  const contractExec = ContractExecutable.make(compiledContract);
  const circuitIds = contractExec.getImpureCircuitIds();
  console.log(`Number of impure circuits: ${circuitIds.length}\n`);

  // Get VKs
  const zkConfigProvider = new NodeZkConfigProvider<string>(contractConfig.zkConfigPath);
  const vks = await zkConfigProvider.getVerifierKeys(circuitIds);
  console.log(`VK count: ${vks.length}`);

  // Try to create the unproven deploy tx to get the full contract state
  // We need a dummy coin public key for this
  const dummyCoinPubKey = '0'.repeat(64);
  const dummyEncPubKey = '0'.repeat(64);

  try {
    const unprovenData = await createUnprovenDeployTxFromVerifierKeys(
      zkConfigProvider,
      dummyCoinPubKey,
      {
        compiledContract,
        initialPrivateState: createPrivateState(crypto.getRandomValues(new Uint8Array(32))),
        signingKey: sampleSigningKey(),
        args: ['TestNFT', 'TNFT'],
      },
      dummyEncPubKey,
    );

    // Get the contract state from compact-runtime format
    const compactState = unprovenData.public.initialContractState as unknown as CompactContractState;
    const serializedFull = compactState.serialize();
    console.log(`\nFull ContractState serialized size: ${serializedFull.length} bytes (${(serializedFull.length / 1024).toFixed(1)} KB)`);

    // Convert to ledger-v7 ContractState
    const ledgerState = ledger.ContractState.deserialize(serializedFull);
    const ops = ledgerState.operations();
    console.log(`Operations count: ${ops.length}`);

    // Check each operation size
    let totalOpSize = 0;
    for (const op of ops) {
      const operation = ledgerState.operation(op);
      if (operation) {
        // Each operation has a verifier key
        totalOpSize += operation.verifierKey.length;
      }
    }
    console.log(`Total VK size in operations: ${totalOpSize} bytes (${(totalOpSize / 1024).toFixed(1)} KB)`);

    // Create a stripped state with no operations
    const strippedState = new ledger.ContractState();
    strippedState.data = ledgerState.data;
    strippedState.maintenanceAuthority = ledgerState.maintenanceAuthority;
    // Don't copy operations - leave empty

    const serializedStripped = strippedState.serialize();
    console.log(`\nStripped ContractState (no ops) serialized size: ${serializedStripped.length} bytes (${(serializedStripped.length / 1024).toFixed(1)} KB)`);

    // Check sizes with different numbers of operations
    for (const numOps of [0, 5, 10, 15, 20, 25, 30, 35, 38]) {
      const testState = new ledger.ContractState();
      testState.data = ledgerState.data;
      testState.maintenanceAuthority = ledgerState.maintenanceAuthority;

      const opsToInclude = ops.slice(0, numOps);
      for (const op of opsToInclude) {
        const operation = ledgerState.operation(op);
        if (operation) {
          testState.setOperation(op, operation);
        }
      }

      const serialized = testState.serialize();
      const underLimit = serialized.length <= 50000;
      console.log(`  ${numOps} ops: ${serialized.length} bytes (${(serialized.length / 1024).toFixed(1)} KB) ${underLimit ? '✓ under 50KB' : '✗ EXCEEDS 50KB'}`);
    }

    // Transaction size and cost analysis
    const unprovenTx = unprovenData.private.unprovenTx;
    const txSerialized = unprovenTx.serialize();
    console.log(`\nFull UnprovenTransaction serialized size: ${txSerialized.length} bytes (${(txSerialized.length / 1024).toFixed(1)} KB)`);

    // Mock-prove the deploy tx (no ZK proofs needed for deploys)
    const provenTx = unprovenTx.mockProve();
    const params = ledger.LedgerParameters.initialParameters();

    // Show transaction cost vs block limits
    console.log('\n── Transaction Cost vs Block Limits ──');
    try {
      const cost = provenTx.cost(params);
      console.log(`  readTime:     ${cost.readTime}`);
      console.log(`  computeTime:  ${cost.computeTime}`);
      console.log(`  blockUsage:   ${cost.blockUsage} (limit: 200,000)`);
      console.log(`  bytesWritten: ${cost.bytesWritten} (limit: 50,000)`);
      console.log(`  bytesChurned: ${cost.bytesChurned} (limit: 1,000,000)`);
    } catch (e: any) {
      console.log(`  cost() threw: ${e.message}`);
    }

    try {
      const fee = provenTx.fees(params);
      console.log(`\n  Fee: ${fee} tDUST (${Number(fee) / 1e12} DUST)`);
    } catch (e: any) {
      console.log(`\n  fees() threw: ${e.message}`);
    }

    try {
      const feeMargin = provenTx.feesWithMargin(params, 2);
      console.log(`  Fee (2-block margin): ${feeMargin} tDUST`);
    } catch (e: any) {
      console.log(`  feesWithMargin() threw: ${e.message}`);
    }

    // Show block limits for reference
    console.log('\n── LedgerParameters (initial) ──');
    console.log(params.toString(false));

  } catch (e: any) {
    console.error('Error during constructor execution:', e.message);
    if (e.stack) console.error(e.stack.split('\n').slice(0, 5).join('\n'));
  }

  console.log('\n=== Done ===');
}

main().catch(console.error);
