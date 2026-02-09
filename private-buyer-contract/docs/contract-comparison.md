# Contract Comparison: Bucket DEFI vs Private Buyer

## Overview

The **Private Buyer Contract** is an upgrade of the **Bucket DEFI Contract**. Both contracts manage energy certificate NFTs on the Midnight blockchain with ZK-privacy features, but the Private Buyer contract eliminates the buyer-intent exposure problem inherent in the bucket model by replacing it with a direct NFT pool purchase model.

---

## Architecture Comparison

| Aspect | Bucket DEFI | Private Buyer |
|--------|-------------|---------------|
| **Core Module** | BucketDEFI | NFTPool |
| **Purchase Model** | Bucket-based (indirect) | Direct pool purchase |
| **Buyer Privacy** | Partial (bucket creation reveals intent) | Full (purchase reveals nothing about buyer) |
| **Transaction Steps** | Multi-step (create bucket -> match -> settle -> claim) | Single-step (purchaseNFT) |
| **Role Count** | 9 roles (0-8) | 4 roles (0-3) |
| **Batch Purchases** | Not supported | Supported (batch 5/10/20) |
| **Burn by Buyer** | Not supported (Settler burns) | Supported (burnPurchasedBatch) |
| **Seller Withdrawal** | Not applicable (rewards via bucket pot) | Direct seller withdrawal |
| **Price Updates** | Owner-only (setTokenPrice) | PoolOperator role-based |

---

## 1. What Was Improved

### 1.1 Eliminated Buyer Intent Exposure

**Problem in Bucket DEFI:** When a buyer creates a bucket, they expose their purchasing intent publicly. The bucket conditions (source, impact, location, price range, time window) reveal exactly what the buyer is looking for. Even though the bucket owner identity is hidden behind a commitment, market observers can see *what* is being demanded and front-run or manipulate prices accordingly.

**Solution in Private Buyer:** Buyers purchase NFTs directly from a pool in a single transaction. No bucket creation step means no public signal of buyer intent. The buyer simply selects an NFT and purchases it atomically.

### 1.2 Simplified Role Hierarchy

**Bucket DEFI (9 roles):**
```
Admin(0) -> MinterAdmin(1) -> Minter(2)
          -> MatcherAdmin(3) -> Matcher(4)
          -> SettlerAdmin(5) -> Settler(6)
          -> VerifierAdmin(7) -> Verifier(8)
```

**Private Buyer (4 roles):**
```
Admin(0) -> Minter(1)
          -> PoolOperator(2)
          -> Verifier(3)
```

**Improvement:** The two-tier admin hierarchy (admin + operational per role) was eliminated. All roles are managed directly by the Admin. The Matcher and Settler roles were removed entirely since the bucket matching/settling flow no longer exists. A new PoolOperator role replaces them for managing the NFT listing pool.

### 1.3 Single-Transaction Purchase

**Bucket DEFI flow (4+ transactions):**
1. `createBucket(conditions, coin)` - Buyer deposits funds with conditions
2. `addCertificateToBucket(commitment, tokenId)` - Matcher/owner adds certificates
3. `settleBucket(commitment)` - Settler/owner settles after end date
4. `claimCertificateReward(tokenId)` - Certificate owner claims reward
5. `withdrawBucketLeftover(commitment)` - Bucket owner withdraws unused funds

**Private Buyer flow (1 transaction):**
1. `purchaseNFT(tokenId, coin)` - Buyer purchases directly, done.

**Improvement:** Reduces gas costs, complexity, and time-to-settlement from multiple transactions over days/weeks to a single atomic transaction.

### 1.4 Batch Purchase Support

**Bucket DEFI:** No batch operations. Each certificate must be individually added to a bucket.

**Private Buyer:** Supports `purchaseBatch5`, `purchaseBatch10`, and `purchaseBatch20` circuits. All NFTs in a batch share a single owner commitment, reducing on-chain state and proof overhead. Mock tokens (tokenId == 0) allow partial batches.

### 1.5 Buyer-Initiated Burn

**Bucket DEFI:** Only the Settler role (6) can burn tokens. The buyer/commitment owner has no way to directly destroy their purchased NFTs.

**Private Buyer:** Buyers can burn their own purchased tokens via `burnPurchasedBatch5/10/20`. The circuit:
1. Proves ownership via ZK (witness nonce)
2. Verifies each token belongs to the commitment
3. Cleans up sold state
4. Burns the NFTs

This enables the buyer to unlock the web2 digital asset ledger without depending on a third-party role.

### 1.6 Direct Seller Payment & Withdrawal

**Bucket DEFI:** Certificate owners receive rewards from the bucket pot after settlement. The flow is: bucket creator deposits pot -> certificates match -> bucket settles -> certificate owner claims reward from pot. The payment amount equals the tokenPrice, drawn from the bucket pot.

**Private Buyer:** Sellers receive payment directly when a buyer purchases their NFT. Payments accumulate in `_sellerBalance` and sellers can withdraw at any time via `withdrawSellerFunds()`. No waiting for settlement.

### 1.7 Pool Operator Price Management

**Bucket DEFI:** Only the token owner can update prices via `setTokenPrice` (ownership check: `_ownerOf(tokenId) == ownPublicKey()`).

**Private Buyer:** The PoolOperator role (2) can update NFT prices at any time, even when the NFT is listed in the pool. This enables dynamic pricing by an operational role rather than requiring the original minter to manage prices.

---

## 2. What Was Corrected

### 2.1 Burn Access Control

**Bucket DEFI issue:** Any Settler (role 6) can burn any token with `burn(tokenId)`. There are no guards to prevent burning a token that is currently locked in a bucket or has unclaimed rewards. A malicious or careless settler could burn tokens before certificate owners claim their rewards.

**Private Buyer fix:** The `burn` circuit enforces:
- Token must NOT be listed in the pool (`!NFTPool__pool.member(tokenId)`)
- Token must NOT be sold (`!NFTPool__tokenSold.lookup(tokenId)`)
- Only Minter role can burn unsold tokens
- Sold tokens can ONLY be burned by the commitment owner via `burnPurchasedBatch`

### 2.2 Condition Matching Complexity

**Bucket DEFI issue:** The `addCertificateToBucket` circuit performs 9 validation checks at the top-level contract, reading state from both the BucketDEFI and NonFungibleToken modules. This complex cross-module logic is error-prone and expensive (high circuit row count).

**Private Buyer fix:** Eliminated condition matching entirely. Tokens are listed in a pool with a price. Buyers see the price and purchase directly. No complex condition matching needed.

### 2.3 Leftover Fund Risk

**Bucket DEFI issue:** If a bucket's accumulated certificate prices don't fully consume the pot, the leftover stays locked until the bucket owner calls `withdrawBucketLeftover`. If the owner loses their secret nonce, the leftover funds are permanently locked.

**Private Buyer fix:** No pot/leftover concept. Buyers pay exactly the NFT price. No funds are locked in intermediate state.

### 2.4 Time-Dependent Logic Removed

**Bucket DEFI issue:** Uses `blockTimeGte`/`blockTimeLte` for bucket start/end date validation. Block time manipulation or clock drift can affect bucket operations. Settlement depends on the end date passing.

**Private Buyer fix:** No time-dependent logic. Purchases happen atomically. No start/end date constraints.

---

## 3. Shared Foundations (Unchanged)

Both contracts share these identical modules:
- **AccessControl** - Role-based access control (adapted role hierarchy per contract)
- **Identity** - KYC/whitelist verification
- **NonFungibleToken** - NFT management with Certificate metadata (Source, Impact, Location)
- **Initializable** - One-time initialization pattern
- **Pausable** - Emergency pause/unpause per module
- **Utils** - Pure utility circuits

Both contracts use the same:
- ZK commitment scheme: `hash(hash(publicKey, nonce), counter, domainSeparator)`
- Shielded coin mechanism (`receiveShielded`/`sendShielded`)
- Certificate struct (id, source, generation, vintage, impact, location)
- Proof of ownership pattern (witness nonce -> recompute commitment -> assert match)

---

## 4. Module Replacement Summary

```
Bucket DEFI                          Private Buyer
+-----------------------+            +-----------------------+
| AccessControl         | ---------> | AccessControl         |  (simplified roles)
| Identity              | ---------> | Identity              |  (same)
| NonFungibleToken      | ---------> | NonFungibleToken      |  (same)
| BucketDEFI            | ---------> | NFTPool               |  (replaced)
+-----------------------+            +-----------------------+

BucketDEFI features         ->  NFTPool replacement
  createBucket              ->  (removed - no buckets)
  addCertificateToBucket    ->  addToPool / purchaseNFT
  settleBucket              ->  (removed - instant settlement)
  claimCertificateReward    ->  withdrawSellerFunds
  withdrawBucketLeftover    ->  (removed - no leftover)
  proofBucketOwnership      ->  proofOwnership
  (no batch support)        ->  purchaseBatch5/10/20
  (no buyer burn)           ->  burnPurchasedBatch5/10/20
```

---

## 5. Domain Separator Difference

Both contracts use the same commitment scheme but with different domain separators to ensure commitments are contract-specific and non-transferable:

- **Bucket DEFI:** `"BucketDEFI: shield:"`
- **Private Buyer:** `"PrivateBuyer: shield:"`
