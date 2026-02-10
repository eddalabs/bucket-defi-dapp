# Private Buyer Contract - User Flow Diagram

## 1. Role Hierarchy

```
                        +------------------+
                        |      Admin       |
                        |    (Role 0)      |
                        +--------+---------+
                                 |
              +------------------+------------------+
              |                  |                  |
     +--------v--------+ +------v--------+ +-------v-----------+
     |     Minter      | | PoolOperator  | |     Verifier      |
     |    (Role 1)     | |   (Role 2)    | |     (Role 3)      |
     +-----------------+ +---------------+ +-------------------+
```

**Admin (0):** Assigns all roles, pauses/unpauses all modules, can perform all actions
**Minter (1):** Mints NFTs (with initial price), burns unsold tokens, executes burns of purchased tokens (bot, after buyer authorization via challenge), withdraws seller funds
**PoolOperator (2):** Lists/unlists NFTs in the pool (token owner can also list/unlist their own tokens), updates NFT prices
**Verifier (3):** Verifies/removes buyer identities (KYC), stores auth challenges

---

## 2. NFT Lifecycle (State Machine)

```
                                  MINTER mints
                                       |
                                       v
                             +-------------------+
                             |     MINTED        |
                             |  (owned by minter)|
                             +--------+----------+
                                      |
                       Owner OR PoolOperator
                            addToPool
                                      |
                                      v
                             +-------------------+
                             |  LISTED IN POOL   |
                             |  (for sale)       |
                             +--------+----------+
                                      |
                        +-------------+-------------+
                        |                           |
              Buyer purchaseNFT/         Owner OR PoolOperator
              purchaseBatch5/10/20          removeFromPool
                        |                           |
                        v                           v
               +-------------------+      +-------------------+
               |      SOLD         |      |     UNLISTED      |
               | (commitment-owned)|      |  (back to minted) |
               +--------+----------+      +--------+----------+
                        |                           |
              Bot burnPurchased             Minter burn
              Batch5/10/20                          |
              (after buyer proof)                   |
                        |                           v
                        v                  +-------------------+
               +-------------------+       |     BURNED        |
               |     BURNED        |       | (destroyed, web2  |
               | (destroyed, web2  |       |  ledger unlocked) |
               |  ledger unlocked) |       +-------------------+
               +-------------------+
```

---

## 3. Complete Interaction Flows

### Flow A: Setup (one-time)

```
Admin
  |
  |--- grantRole(1, Minter) ----------->  Minter ready
  |--- grantRole(2, PoolOperator) ----->  PoolOperator ready
  |--- grantRole(3, Verifier) -------->  Verifier ready
```

### Flow B: List NFT for Sale

```
Minter                     PoolOperator                   Contract State
  |                              |                              |
  |-- mint(to, tokenId,          |                              |
  |    certificate, price) ----->|----------------------------->| Token created
  |                              |                              | owner = minter
  |                              |                              | certificate stored
  |                              |                              | price set
  |                              |                              |
  |-- addToPool(tokenId) ------->|----------------------------->| Token added to _pool
  |   (owner can list own token) |                              | Available for purchase
  |         OR                   |                              |
  |                    addToPool(tokenId) --------------------->| (PoolOperator can also list)
  |                              |                              |
  |                    setTokenPrice(tokenId, newPrice) ------->| Price updated
  |                              |                              | (can update anytime,
  |                              |                              |  even when listed)
```

### Flow C: Purchase NFT (Single)

```
Verifier         Buyer                                   Contract State
  |                |                                           |
  |-- setUser      |                                           |
  |  (buyerPK) --->|------------------------------------------>| Buyer identity verified
  |                |                                           |
  |                |-- purchaseNFT(tokenId, coin) ------------>|
  |                |                                           |
  |                |   [assertOwnVerification]                 | Verify buyer KYC
  |                |   [validate coin >= price]                | Check payment
  |                |   [validate coin color]                   |
  |                |   [receiveShielded(coin)]                 | Receive payment
  |                |   [storeSellerPayment(seller, coin)]      | Credit seller balance
  |                |   [NFTPool.purchaseNFT(tokenId)]          | Remove from pool
  |                |                                           | Mark as sold
  |                |                                           | Compute commitment:
  |                |                                           |   id = hash(buyerPK, nonce)
  |                |                                           |   commitment = hash(id, counter)
  |                |                                           | Map tokenId -> commitment
  |                |                                           | counter++
  |                |                                           |
  |                |<-- returns ownerCommitment (Bytes<32>) ---|
  |                |                                           |
  |                |   [Buyer stores commitment + nonce        |
  |                |    privately for future proof]             |
```

### Flow D: Batch Purchase (5 / 10 / 20)

```
Buyer                                                    Contract State
  |                                                            |
  |-- purchaseBatch5(                                          |
  |     tokenId1, tokenId2, tokenId3, tokenId4, tokenId5,     |
  |     coin                                                   |
  |   ) ------>                                                |
  |                                                            |
  |   [assertOwnVerification]                                  | Verify buyer KYC
  |   [for each token: _getBatchTokenPrice]                    | Sum prices (mock=0)
  |   [validate coin >= totalPrice]                            | Check total payment
  |   [receiveShielded(coin)]                                  | Receive payment
  |   [for each real token: _storeBatchSellerPayment]          | Credit each seller
  |                                                            |
  |   [NFTPool.computeBatchCommitment()]                       | ONE commitment for batch
  |                                                            |   id = hash(buyerPK, nonce)
  |                                                            |   commitment = hash(id, counter)
  |                                                            |   counter++ (once)
  |                                                            |
  |   [for each real token: _executeBatchPurchase]             | Remove from pool
  |                                                            | Mark as sold
  |                                                            | Map tokenId -> commitment
  |                                                            |
  |<-- returns ownerCommitment (Bytes<32>) --------------------|
  |                                                            |
  |   NOTE: Mock tokens (tokenId == 0) are skipped             |
  |   at every step (price=0, no seller payment,               |
  |   no pool update)                                          |
```

### Flow E: Proof of Ownership

```
Buyer                                                    Contract State
  |                                                            |
  |-- proofOwnership(ownerCommitment, challenge) ------------->|
  |                                                            |
  |   [Read witness nonce from private state]                  |
  |   [Recompute: id = hash(buyerPK, nonce)]                   |
  |   [Lookup counter from _commitmentToCounter]               |
  |   [Recompute: expected = hash(id, counter)]                |
  |   [Assert expected == ownerCommitment]                     | ZK proof: caller owns it
  |   [Store challenge in _authVerifications]                  | Audit trail
  |                                                            |
  |<-- success ------------------------------------------------|
```

### Flow F: Burn - Unsold Token (Minter path)

```
Owner/PoolOperator  Minter                               Contract State
     |                   |                                     |
     |                   |                                     | Token is LISTED in pool
     |                   |                                     |
     |-- removeFromPool  |                                     |
     |   (tokenId) ----->|------------------------------------>| Token removed from pool
     |   (owner or       |                                     | (owner or PoolOperator)
     |    PoolOperator)  |                                     |
     |                   |-- burn(tokenId) ------------------->|
     |                   |                                     |
     |                   |   [assertOnlyRole(Minter)]          | Minter role can burn
     |                   |   [assert NOT in pool]              | Must be unlisted
     |                   |   [assert NOT sold]                 | Must not be purchased
     |                   |   [NonFungibleToken.burn(tokenId)]  | Destroy NFT
     |                   |                                     |
     |                   |<-- success -------------------------|
     |                   |                                     |
     |                   |                                     | Token DESTROYED
     |                   |                                     | Web2 ledger: UNLOCKED
```

### Flow G: Burn - Purchased Token (Bot-executed, Buyer-authorized)

```
Buyer                    Bot (Minter role)                Contract State
  |                              |                              |
  |   [Tokens were purchased via batch, commitment exists]      |
  |                              |                              |
  |   === STEP 1: Buyer Authorizes Burn ===                     |
  |                              |                              |
  |-- proofOwnership(            |                              |
  |     ownerCommitment,         |                              |
  |     challenge                |                              |
  |   ) ------>                  |                              |
  |                              |                              |
  |   [Recompute commitment from witness nonce]                 | ZK proof: caller owns it
  |   [Store challenge in _authVerifications]                   | Challenge stored on-chain
  |                              |                              |
  |<-- success ------------------|                              |
  |                              |                              |
  |   === STEP 2: Bot Executes Burn ===                         |
  |                              |                              |
  |                              |-- burnPurchasedBatch5(       |
  |                              |     ownerCommitment,         |
  |                              |     tokenId1..tokenId5,      |
  |                              |     challenge                |
  |                              |   ) ------>                  |
  |                              |                              |
  |                              |   [assertOnlyRole(Minter)]   | Only bot can burn
  |                              |   [assert _authVerifications  |
  |                              |    [commitment] == challenge] | Challenge must match
  |                              |                              |
  |                              |   [for each real token:      |
  |                              |     - assert commitment      | Token belongs to batch
  |                              |       matches                |
  |                              |     - read seller from       | Capture seller before
  |                              |       _owners                |   burn overwrites it
  |                              |     - recordBurn:            |
  |                              |       store lifecycle data:  | _lifecycleSeller[id][n]
  |                              |         seller, commitment,  | _lifecycleCommitment[id][n]
  |                              |         challenge            | _lifecycleBurnChallenge[id][n]
  |                              |       increment lifecycle    | _tokenLifecycle[id]++
  |                              |       reset _tokenSold=false | Ready for re-mint
  |                              |       reset _nftOwnerCommit. | Prevent stale attacks
  |                              |     - NonFungibleToken.burn  | Destroy NFT
  |                              |   ]                          |
  |                              |                              |
  |                              |<-- success ------------------|
  |                              |                              |
  |   All tokens in batch: DESTROYED                            |
  |   Web2 ledger: UNLOCKED (digital assets released)           |
  |   Lifecycle history: PRESERVED (full audit trail)           |
  |   Token can be re-minted in a new cycle                     |
```

### Flow H: Seller Withdraws Payment

```
Minter (Seller)                                          Contract State
  |                                                            |
  |   [Buyer purchased tokens, seller balance accumulated]     |
  |                                                            |
  |-- withdrawSellerFunds() ---------------------------------->|
  |                                                            |
  |   [Lookup _sellerBalance for caller]                       |
  |   [Lookup _sellerAmount for caller]                        |
  |   [assert amount > 0]                                      |
  |   [sendShielded(balance, caller, amount)]                  | Send funds to seller
  |   [Clear seller amount to 0]                               |
  |                                                            |
  |<-- funds received -----------------------------------------|
```

---

## 4. Full End-to-End Flow

```
+--------+    +--------+    +-----------+    +--------+    +---------+
|  Admin |    | Minter |    | PoolOper. |    |Verifier|    |  Buyer  |
|        |    |        |    |           |    |        |    |         |
+---+----+    +---+----+    +-----+-----+    +---+----+    +----+----+
    |             |               |               |              |
    | grantRole(1, Minter)       |               |              |
    |------------>|               |               |              |
    | grantRole(2, PoolOp)       |               |              |
    |-------------------------->  |               |              |
    | grantRole(3, Verifier)     |               |              |
    |------------------------------------------>  |              |
    |             |               |               |              |
    |             | mint(tokenId) |               |              |
    |             |-------------->|               |              |
    |             |               |               |              |
    |             |         addToPool(tokenId)     |              |
    |             | OR addToPool   |               |              |
    |             | (owner can     |               |              |
    |             |  list own)     |               |              |
    |             |               |               |              |
    |             |         setTokenPrice(tokenId, |              |
    |             |           newPrice) (optional) |              |
    |             |               |               |              |
    |             |               |          setUser(buyer)      |
    |             |               |               |------------->|
    |             |               |               |              |
    |             |               |               |   purchaseNFT/Batch
    |             |               |               |      (tokenIds, coin)
    |             |               |               |              |
    |             |               |               |   <- ownerCommitment
    |             |               |               |              |
    |             | withdrawFunds |               |              |
    |             |<--------------|               |              |
    |             |               |               |              |
    |             |               |               |              |
    |   === BURN PATH A: Unsold Token ===         |              |
    |             |               |               |              |
    |             |         removeFromPool         |              |
    |             | OR removeFromPool              |              |
    |             | (owner can unlist own)          |              |
    |             |               |               |              |
    |             | burn(tokenId) |               |              |
    |             |---> Token destroyed            |              |
    |             |     Web2 unlocked              |              |
    |             |               |               |              |
    |   === BURN PATH B: Purchased Token ===      |              |
    |             |               |               |              |
    |             |               |               | proofOwnership
    |             |               |               | (commitment, |
    |             |               |               |  challenge)  |
    |             |               |               |   -> proves ownership (ZK)
    |             |               |               |   -> stores challenge on-chain
    |             |               |               |              |
    |             | burnPurchasedBatch             |              |
    |             | (commitment, tokenIds,         |              |
    |             |  challenge)   |               |              |
    |             |   -> verifies Minter role      |              |
    |             |   -> verifies challenge matches|              |
    |             |   -> records lifecycle history  |              |
    |             |   -> burns all tokens          |              |
    |             |               |               |              |
    |             |               |               |   Tokens destroyed
    |             |               |               |   Web2 unlocked
```

---

## 5. Privacy Model

```
+---------------------------+       +---------------------------+
|     PUBLIC (on-chain)     |       |    PRIVATE (ZK-hidden)    |
+---------------------------+       +---------------------------+
|                           |       |                           |
| - Token IDs               |       | - Buyer's public key      |
| - Token certificates      |       | - Buyer's secret nonce    |
| - Token prices            |       | - Link: buyer <-> commit. |
| - Seller identity (PK)    |       | - Payment amounts (after  |
| - Pool listings            |       |   shielded receive)       |
| - Sold status per token   |       |                           |
| - Owner commitment hash   |       |                           |
| - Purchase counter        |       |                           |
| - Auth challenges          |       |                           |
| - Lifecycle counter        |       |                           |
| - Lifecycle seller history |       |                           |
| - Lifecycle commitment     |       |                           |
|   history                  |       |                           |
| - Lifecycle burn challenge |       |                           |
|   history                  |       |                           |
|                           |       |                           |
+---------------------------+       +---------------------------+

Commitment scheme:
  ownerId    = hash(buyerPublicKey, secretNonce)
  commitment = hash(ownerId, counter, "PrivateBuyer: shield:")

Only the buyer can recompute the commitment (requires secret nonce).
The on-chain commitment reveals nothing about the buyer's identity.
```

---

## 6. Pause/Emergency Controls

```
Admin can pause/unpause each module independently:

  pauseAccessControl()  / unpauseAccessControl()
  pauseIdentity()       / unpauseIdentity()
  pauseToken()          / unpauseToken()
  pauseNFTPool()        / unpauseNFTPool()

When paused, all state-changing operations in that module revert.
```
