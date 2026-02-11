/**
 * Contract Deploy Size Diagnostic
 *
 * Shows how many circuits fit in a single deploy transaction by measuring
 * the serialized ContractState size at different VK counts against the
 * network's bytesWritten block limit.
 *
 * Usage: npx tsx src/check-deploy-size.ts
 */
import * as ledger from '@midnight-ntwrk/ledger-v7';
import { CompiledContract, ContractExecutable } from '@midnight-ntwrk/compact-js';
import { PrivateBuyer, witnesses, createPrivateState } from '@eddalabs/private-buyer-contract';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { createUnprovenDeployTxFromVerifierKeys } from '@midnight-ntwrk/midnight-js-contracts';
import { contractConfig } from './config';
import { type ContractState as CompactContractState, sampleSigningKey } from '@midnight-ntwrk/compact-runtime';

async function main() {
  console.log('\n=== Contract Deploy Size Diagnostic ===\n');

  // 1. Build the full compiled contract and list its circuits
  const compiledContract = CompiledContract.make('private-buyer', PrivateBuyer.Contract).pipe(
    CompiledContract.withWitnesses(witnesses),
    CompiledContract.withCompiledFileAssets(contractConfig.zkConfigPath),
  );

  const circuitIds = ContractExecutable.make(compiledContract).getImpureCircuitIds();
  console.log(`Total impure circuits: ${circuitIds.length}\n`);

  // 2. Create an unproven deploy tx to get the full ContractState with all VKs
  const zkConfigProvider = new NodeZkConfigProvider<string>(contractConfig.zkConfigPath);
  const dummyKey = '0'.repeat(64);

  const unprovenData = await createUnprovenDeployTxFromVerifierKeys(
    zkConfigProvider,
    dummyKey,
    {
      compiledContract,
      initialPrivateState: createPrivateState(crypto.getRandomValues(new Uint8Array(32))),
      signingKey: sampleSigningKey(),
      args: ['TestNFT', 'TNFT'],
    },
    dummyKey,
  );

  // 3. Deserialize the full state and measure sizes at different VK counts
  const compactState = unprovenData.public.initialContractState as unknown as CompactContractState;
  const ledgerState = ledger.ContractState.deserialize(compactState.serialize());
  const ops = ledgerState.operations();

  console.log('── Serialized ContractState by VK count ──\n');

  for (const n of [0, 5, 10, 14, 15, 20, 25, 30, 38]) {
    const testState = new ledger.ContractState();
    testState.data = ledgerState.data;
    testState.maintenanceAuthority = ledgerState.maintenanceAuthority;
    for (const op of ops.slice(0, n)) {
      const operation = ledgerState.operation(op);
      if (operation) testState.setOperation(op, operation);
    }
    const size = testState.serialize().length;
    const kb = (size / 1024).toFixed(1);
    console.log(`  ${String(n).padStart(2)} VKs: ${String(size).padStart(6)} bytes (${kb} KB)`);
  }

  // 4. Full deploy tx cost and fee
  const params = ledger.LedgerParameters.initialParameters();
  const provenTx = unprovenData.private.unprovenTx.mockProve();

  // 5. Derive block limits from the ledger parameters.
  //    normalizeFullness returns cost/limit ratios, so limit = cost / normalized.
  //    We probe with a unit cost {1,1,1,1,1} to get limit = 1 / normalized.
  const unitCost = { readTime: 1n, computeTime: 1n, blockUsage: 1n, bytesWritten: 1n, bytesChurned: 1n };
  const unitNorm = params.normalizeFullness(unitCost);

  const limits = {
    bytesWritten: Math.round(1 / unitNorm.bytesWritten),
    blockUsage:   Math.round(1 / unitNorm.blockUsage),
    bytesChurned: Math.round(1 / unitNorm.bytesChurned),
  };

  console.log('\n── Full deploy tx (all VKs) ──\n');
  try {
    const cost = provenTx.cost(params);
    const metrics = [
      { name: 'bytesWritten', value: cost.bytesWritten, limit: limits.bytesWritten },
      { name: 'blockUsage',   value: cost.blockUsage,   limit: limits.blockUsage },
      { name: 'bytesChurned', value: cost.bytesChurned, limit: limits.bytesChurned },
    ];

    const exceeded: string[] = [];
    for (const m of metrics) {
      const ok = Number(m.value) <= m.limit;
      if (!ok) exceeded.push(m.name);
      const flag = ok ? ' ' : 'X';
      console.log(`  ${flag} ${m.name.padEnd(14)} ${String(m.value).padStart(9)} / ${m.limit.toLocaleString()}`);
    }

    try {
      const fee = provenTx.feesWithMargin(params, 2);
      console.log(`\n  fee (2-block margin): ${fee} tDUST`);
    } catch {
      console.log(`\n  fee: cannot compute (${exceeded.join(', ')} exceeds block limit)`);
    }
  } catch (e: any) {
    console.log(`  cost error: ${e.message}`);
  }

  console.log('\n=== Done ===\n');
}

main().catch(console.error);
