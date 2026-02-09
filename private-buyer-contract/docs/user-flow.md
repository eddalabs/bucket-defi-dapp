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
**Minter (1):** Mints NFTs (with initial price), burns unsold tokens, withdraws seller funds
**PoolOperator (2):** Lists/unlists NFTs in the pool, updates NFT prices
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
                          PoolOperator addToPool
                                      |
                                      v
                             +-------------------+
                             |  LISTED IN POOL   |
                             |  (for sale)       |
                             +--------+----------+
                                      |
                        +-------------+-------------+
                        |                           |
              Buyer purchaseNFT/            PoolOperator
              purchaseBatch5/10/20          removeFromPool
                        |                           |
                        v                           v
               +-------------------+      +-------------------+
               |      SOLD         |      |     UNLISTED      |
               | (commitment-owned)|      |  (back to minted) |
               +--------+----------+      +--------+----------+
                        |                           |
              Buyer burnPurchased           Minter burn
              Batch5/10/20                          |
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
  |                    addToPool(tokenId) --------------------->| Token added to _pool
  |                              |                              | Available for purchase
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
PoolOperator        Minter                               Contract State
     |                   |                                     |
     |                   |                                     | Token is LISTED in pool
     |                   |                                     |
     |-- removeFromPool  |                                     |
     |   (tokenId) ----->|------------------------------------>| Token removed from pool
     |                   |                                     |
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

### Flow G: Burn - Purchased Token (Buyer/Commitment Owner path)

```
Buyer                                                    Contract State
  |                                                            |
  |   [Tokens were purchased via batch, commitment exists]     |
  |                                                            |
  |-- burnPurchasedBatch5(                                     |
  |     ownerCommitment,                                       |
  |     tokenId1..tokenId5,                                    |
  |     challenge                                              |
  |   ) ------>                                                |
  |                                                            |
  |   === STEP 1: Prove Ownership ===                          |
  |   [NFTPool.proofOwnership(commitment, challenge)]          |
  |   [Recompute commitment from witness nonce]                | ZK proof: caller owns it
  |   [Store challenge for audit]                              |
  |                                                            |
  |   === STEP 2: Burn Each Token ===                          |
  |   [for each real token (skip mock):                        |
  |     - assert _nftOwnerCommitment has tokenId               | Token was purchased
  |     - assert stored commitment matches                     | Token belongs to THIS batch
  |     - NFTPool.cleanupSoldToken(tokenId)                    | Clear sold status
  |       -> _tokenSold[tokenId] = false                       | Clear commitment mapping
  |       -> _nftOwnerCommitment[tokenId] = 0x00               |
  |     - NonFungibleToken.burn(tokenId)                       | Destroy NFT
  |   ]                                                        |
  |                                                            |
  |<-- success ------------------------------------------------|
  |                                                            |
  |   All tokens in batch: DESTROYED                           |
  |   Web2 ledger: UNLOCKED (digital assets released)          |
  |   Commitment & counter: PRESERVED (audit trail)            |
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
    |             |               |               |              |
    |             | burn(tokenId) |               |              |
    |             |---> Token destroyed            |              |
    |             |     Web2 unlocked              |              |
    |             |               |               |              |
    |   === BURN PATH B: Purchased Token ===      |              |
    |             |               |               |              |
    |             |               |               | burnPurchasedBatch
    |             |               |               | (commitment, tokenIds,
    |             |               |               |  challenge)  |
    |             |               |               |   -> proves ownership
    |             |               |               |   -> burns all tokens
    |             |               |               |   -> cleans up state
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
