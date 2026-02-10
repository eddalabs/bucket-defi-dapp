Midnight Preprod: Deploy Size Limit & Maintenance VK Workaround                                                                                                    
                                                                                                                                                                     
  Problem                                                                                                                                                            
                                                                                                                                                                     
  The private-buyer contract has 15 export circuits. When deploying to Midnight Preprod, the deployContract SDK function includes all verifier keys (VKs) in a single
   transaction. With 15 circuits, the transaction's bytesWritten reaches ~33.0 KB, exceeding the Preprod block limit of ~31.5 KB. The deploy transaction fails.      

  Findings

  - 14 circuits (~30.2 KB bytesWritten) — passes
  - 15 circuits (~33.0 KB bytesWritten) — fails
  - The deployContract function from @midnight-ntwrk/midnight-js-contracts deploys all circuits in the CompiledContract — there is no option to selectively exclude
  circuits during deployment.
  - The SDK does provide submitInsertVerifierKeyTx, a maintenance function that inserts a single VK into an already-deployed contract.

  Workaround: Two-Phase Deploy

  Phase A — Deploy with 14 circuits:
  1. Comment out the 15th circuit (proofOwnership) in the .compact source
  2. Compile with compact compile (generates 14 VKs)
  3. Deploy — fits under the block limit

  Phase B — Insert the missing VK post-deploy:
  1. Uncomment the 15th circuit
  2. Recompile with compact compile (generates all 15 VKs, including proofOwnership)
  3. From the CLI, call submitInsertVerifierKeyTx with the contract address, circuit ID (proofOwnership), and the newly generated VK
  4. The contract now has all 15 VKs on-chain and is fully functional

  Limitations of This Workaround

  - Requires two full ZK compilations — one for 14 circuits, one for 15 — because compact compile --skip-zk deletes the keys directory
  - Maintenance signing key: auto-generated during deployContract and stored in LevelDB (signing-keys store). Must use the same DB instance for the VK insert. If the
   DB is lost, the contract can't be maintained.
  - No selective deploy: ideally, deployContract would accept a parameter to exclude specific circuits, allowing a single compilation of all 15 circuits and a
  partial deploy of 14

  Open Questions for the Team

  1. Is there a way to deploy with a subset of circuits from a fully compiled contract?
  2. Are there plans to increase the Preprod bytesWritten block limit?
  3. Is there an incremental compilation option for compact compile to avoid regenerating all keys?
  4. Are other teams hitting this limit, and what patterns are they using?