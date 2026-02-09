# Bucket DEFI Contract - User Flow Diagram

## 1. Role Hierarchy

```
                              +------------------+
                              |   Admin Master   |
                              |    (Role 0)      |
                              +--------+---------+
                                       |
          +------------+-------+-------+-------+------------+
          |            |               |               |
 +--------v--------+  |  +------------v-----------+   |
 | MinterAdmin (1) |  |  | MatcherAdmin (3)       |   |
 +--------+--------+  |  +------------+-----------+   |
          |            |               |               |
 +--------v--------+  |  +------------v-----------+   |
 |   Minter (2)    |  |  |     Matcher (4)        |   |
 +-----------------+  |  +------------------------+   |
                      |                                |
         +------------v-----------+   +----------------v---------+
         | SettlerAdmin (5)       |   | VerifierAdmin (7)        |
         +------------+-----------+   +----------------+---------+
                      |                                |
         +------------v-----------+   +----------------v---------+
         |     Settler (6)        |   |     Verifier (8)         |
         +------------------------+   +--------------------------+
```

**Admin Master (0):** Root admin. Manages all admin roles (1,3,5,7). Pauses/unpauses all modules.
**MinterAdmin (1):** Admin for Minter role. Can grant/revoke role 2.
**Minter (2):** Mints NFTs with certificate metadata and price.
**MatcherAdmin (3):** Admin for Matcher role. Can grant/revoke role 4.
**Matcher (4):** Adds certificates to buckets on behalf of certificate owners.
**SettlerAdmin (5):** Admin for Settler role. Can grant/revoke role 6.
**Settler (6):** Settles buckets after end date. Burns tokens.
**VerifierAdmin (7):** Admin for Verifier role. Can grant/revoke role 8.
**Verifier (8):** Verifies/removes user identities (KYC whitelist).

---

## 2. NFT Certificate Lifecycle (State Machine)

```
                                  MINTER mints
                             (certificate + price)
                                       |
                                       v
                             +-------------------+
                             |     MINTED        |
                             |  (owned by minter)|
                             +--------+----------+
                                      |
                       Owner or Matcher (role 4)
                        addCertificateToBucket
                                      |
                                      v
                             +-------------------+
                             |  LOCKED IN BUCKET |
                             | (conditions match)|
                             +--------+----------+
                                      |
                         Settler or Bucket Owner
                             settleBucket
                                      |
                                      v
                             +-------------------+
                             |  BUCKET SETTLED   |
                             +--------+----------+
                                      |
                           Certificate Owner
                          claimCertificateReward
                                      |
                                      v
                             +-------------------+
                             |     CLAIMED       |
                             |  (reward paid)    |
                             +--------+----------+
                                      |
                              Settler (role 6)
                                burn(tokenId)
                                      |
                                      v
                             +-------------------+
                             |     BURNED        |
                             |  (destroyed)      |
                             +-------------------+
```

---

## 3. Bucket Lifecycle (State Machine)

```
         Verified User creates bucket
              (deposits pot as coin)
                       |
                       v
              +-------------------+
              |       OPEN        |
              | (accepting certs) |
              +--------+----------+
                       |
          Certificates added while:
           - conditions match
           - accumulatedPrice <= pot
           - between startDate & endDate
                       |
                       v
              +-------------------+
              |     SETTLED       |
              |  (endDate passed) |
              +--------+----------+
              |                   |
    claimCertificateReward   withdrawBucketLeftover
      (per certificate)       (unused pot funds)
              |                   |
              v                   v
              +-------------------+
              |     CLAIMED       |
              |  (leftover taken) |
              +-------------------+
```

---

## 4. Complete Interaction Flows

### Flow A: Setup (one-time)

```
Admin Master
  |
  |--- grantRole(1, MinterAdmin) -------->  MinterAdmin ready
  |--- grantRole(3, MatcherAdmin) ------->  MatcherAdmin ready
  |--- grantRole(5, SettlerAdmin) ------->  SettlerAdmin ready
  |--- grantRole(7, VerifierAdmin) ------>  VerifierAdmin ready
  |
MinterAdmin
  |--- grantRole(2, Minter) ------------->  Minter ready
  |
MatcherAdmin
  |--- grantRole(4, Matcher) ------------>  Matcher ready
  |
SettlerAdmin
  |--- grantRole(6, Settler) ------------>  Settler ready
  |
VerifierAdmin
  |--- grantRole(8, Verifier) ----------->  Verifier ready
```

### Flow B: Mint Certificates

```
Minter                                                  Contract State
  |                                                           |
  |-- mint(to, tokenId,                                       |
  |    certificate, price) ---------------------------------->| Token created
  |                                                           | owner = minter
  |                                                           | certificate stored
  |                                                           |   (source, generation,
  |                                                           |    vintage, impact, location)
  |                                                           | price set
```

### Flow C: Create a Bucket (Buyer/Investor)

```
Verifier            Buyer/Investor                      Contract State
  |                      |                                    |
  |-- setUser            |                                    |
  |  (buyerPK) --------->|---------------------------------->| Buyer identity verified
  |                      |                                    |
  |                      |-- createBucket(                    |
  |                      |     conditions, coin) ----------->|
  |                      |                                    |
  |                      |   [assertOwnVerification]          | Verify KYC
  |                      |   [receiveShielded(coin)]          | Receive pot deposit
  |                      |   [validate coin == pot]           | Check amount
  |                      |   [validate native token]          | Check coin type
  |                      |   [compute ownerCommitment]        | id = hash(buyerPK, nonce)
  |                      |                                    | commitment = hash(id, counter)
  |                      |   [store conditions, pot, counter] | Bucket state stored
  |                      |   [increment counter]              | counter++
  |                      |                                    |
  |                      |<-- returns ownerCommitment --------|
  |                      |                                    |
  |                      |   [Buyer stores commitment + nonce |
  |                      |    privately for future proof]      |
```

### Flow D: Add Certificates to Bucket

```
Cert Owner / Matcher                                    Contract State
  |                                                           |
  |-- addCertificateToBucket(                                 |
  |     ownerCommitment, tokenId) -------------------------->|
  |                                                           |
  |   [if not owner: assertOnlyRole(Matcher)]                 | Check authorization
  |                                                           |
  |   [validate bucket exists]                                | Get bucket conditions
  |   [validate token exists]                                 | Get cert specs + price
  |                                                           |
  |   [assert source matches]                                 | Certificate validation:
  |   [assert unitPrice * generation >= tokenPrice]           |   Source
  |   [assert vintage <= vintageLimit]                        |   Unit price economics
  |   [assert impact matches]                                 |   Vintage date
  |   [assert location matches]                               |   Impact level
  |   [assert bucket status == OPEN]                          |   Location
  |   [assert accumulatedPrice + price <= pot]                |   Budget capacity
  |   [assert time between start and end]                     |   Time window
  |                                                           |
  |   [BucketDEFI.addCertificateToBucket()]                   | Lock certificate
  |                                                           | Update accumulatedPrice
  |                                                           | Track cert -> bucket
  |                                                           |
  |<-- success -----------------------------------------------|
```

### Flow E: Settle Bucket

```
Settler / Bucket Owner                                  Contract State
  |                                                           |
  |-- settleBucket(ownerCommitment) ------------------------>|
  |                                                           |
  |   [if not owner: assertOnlyRole(Settler)]                 | Check authorization
  |   [assert bucket not already settled]                     |
  |   [assert current time >= endDate]                        | Time condition met
  |   [update status -> SETTLED]                              |
  |                                                           |
  |<-- success -----------------------------------------------|
```

### Flow F: Claim Certificate Reward

```
Certificate Owner                                       Contract State
  |                                                           |
  |-- claimCertificateReward(tokenId) ---------------------->|
  |                                                           |
  |   [assert caller is token owner]                          | Ownership check
  |   [get bucket for this certificate]                       |
  |   [assert bucket SETTLED or CLAIMED]                      |
  |   [assert certificate not already claimed]                |
  |                                                           |
  |   [sendShielded(pot, owner, tokenPrice)]                  | Send reward
  |   [update pot with change]                                | Deduct from pot
  |   [mark certificate as claimed]                           |
  |                                                           |
  |<-- reward received ---------------------------------------|
```

### Flow G: Withdraw Bucket Leftover

```
Bucket Owner                                            Contract State
  |                                                           |
  |-- withdrawBucketLeftover(ownerCommitment) --------------->|
  |                                                           |
  |   [verify ownership via witness nonce]                    | ZK proof: caller owns bucket
  |   [assert bucket is SETTLED]                              |
  |   [calculate leftover = pot - accumulatedPrice]           |
  |                                                           |
  |   [sendShielded(pot, owner, leftover)]                    | Return unused funds
  |   [update status -> CLAIMED]                              |
  |                                                           |
  |<-- leftover received -------------------------------------|
```

### Flow H: Burn Token

```
Settler                                                 Contract State
  |                                                           |
  |-- burn(tokenId) ---------------------------------------->|
  |                                                           |
  |   [assertOnlyRole(Settler)]                               | Settler role check
  |   [NonFungibleToken.burn(tokenId)]                        | Destroy NFT
  |                                                           |
  |<-- success -----------------------------------------------|
```

### Flow I: Proof of Bucket Ownership

```
Bucket Owner                                            Contract State
  |                                                           |
  |-- proofBucketOwnership(ownerCommitment, challenge) ----->|
  |                                                           |
  |   [Read witness nonce from private state]                 |
  |   [Recompute: id = hash(buyerPK, nonce)]                  |
  |   [Lookup counter from _zkBucketToCounter]                |
  |   [Recompute: expected = hash(id, counter)]               |
  |   [Assert expected == ownerCommitment]                    | ZK proof: caller owns it
  |   [Store challenge in _authVerifications]                 | Audit trail
  |                                                           |
  |<-- success -----------------------------------------------|
```

---

## 5. Full End-to-End Flow

```
+---------+ +---------+ +--------+ +---------+ +--------+ +--------+
|  Admin  | |  Minter | |Matcher | | Settler | |Verifier| | Buyer  |
|  Master | |         | |        | |         | |        | |        |
+----+----+ +----+----+ +---+----+ +----+----+ +---+----+ +---+----+
     |           |           |          |           |          |
     | grantRole(1, MinterAdmin)        |           |          |
     |---------->|           |          |           |          |
     | grantRole(2, Minter)  |          |           |          |
     |---------->|           |          |           |          |
     | grantRole(3, MatcherAdmin)       |           |          |
     |---------------------->|          |           |          |
     | grantRole(4, Matcher) |          |           |          |
     |---------------------->|          |           |          |
     | grantRole(5, SettlerAdmin)       |           |          |
     |--------------------------------->|           |          |
     | grantRole(6, Settler) |          |           |          |
     |--------------------------------->|           |          |
     | grantRole(7, VerifierAdmin)      |           |          |
     |------------------------------------------->  |          |
     | grantRole(8, Verifier)|          |           |          |
     |------------------------------------------->  |          |
     |           |           |          |           |          |
     |           | mint(tokenId, cert, price)       |          |
     |           |---------->|          |           |          |
     |           |           |          |    setUser(buyer)    |
     |           |           |          |           |--------->|
     |           |           |          |           |          |
     |           |           |          |           | createBucket
     |           |           |          |           | (conditions, coin)
     |           |           |          |           |          |
     |           |           |          |           | <- ownerCommitment
     |           |           |          |           |          |
     |           |     addCertificateToBucket       |          |
     |           |     (commitment, tokenId)        |          |
     |           |           |          |           |          |
     |           |           |          |           |          |
     |   === SETTLEMENT (after endDate) ===         |          |
     |           |           |          |           |          |
     |           |           |   settleBucket       |          |
     |           |           |   (commitment)       |          |
     |           |           |          |           |          |
     |   === REWARDS ===     |          |           |          |
     |           |           |          |           |          |
     |           | claimCertificateReward            |          |
     |           | (tokenId) |          |           |          |
     |           |<-- reward received   |           |          |
     |           |           |          |           |          |
     |           |           |          |       withdrawBucket |
     |           |           |          |       Leftover       |
     |           |           |          |       (commitment)   |
     |           |           |          |           |          |
     |   === BURN ===        |          |           |          |
     |           |           |          |           |          |
     |           |           |    burn(tokenId)     |          |
     |           |           |    ---> Token destroyed         |
```

---

## 6. Bucket CONDITIONS Structure

```
CONDITIONS {
  source:           Source enum (Solar, Wind, Hydro, Biomass, Geothermal, Nuclear)
  unitPrice:        Uint<64>   (cost per kWh - used as: unitPrice * generation >= tokenPrice)
  vintageLimit:     Uint<64>   (maximum expiration date for certificates)
  impact:           Impact enum (Minimal, Low, Medium, High, Extreme)
  location:         Location enum (RJ, SP, MG, RS)
  status:           STATUS enum (OPEN, SETTLED, CLAIMED)
  accumulatedPrice: Uint<128>  (running total of certificate prices added)
  pot:              Uint<128>  (total funds deposited for this bucket)
  startDate:        Uint<64>   (bucket opens for matching)
  endDate:          Uint<64>   (bucket closes, can be settled)
}
```

---

## 7. Privacy Model

```
+---------------------------+       +---------------------------+
|     PUBLIC (on-chain)     |       |    PRIVATE (ZK-hidden)    |
+---------------------------+       +---------------------------+
|                           |       |                           |
| - Token IDs               |       | - Bucket owner's PK       |
| - Token certificates      |       | - Owner's secret nonce    |
| - Token prices            |       | - Link: owner <-> commit. |
| - Certificate-to-bucket   |       | - Payment amounts (after  |
|   mapping                 |       |   shielded receive)       |
| - Bucket conditions       |       |                           |
| - Bucket status           |       |                           |
| - Owner commitment hash   |       |                           |
| - Bucket counter          |       |                           |
| - Certificate lock status |       |                           |
| - Certificate claim status|       |                           |
| - Auth challenges         |       |                           |
|                           |       |                           |
+---------------------------+       +---------------------------+

Commitment scheme:
  ownerId    = hash(ownerPublicKey, secretNonce)
  commitment = hash(ownerId, counter, "BucketDEFI: shield:")

Only the bucket owner can recompute the commitment (requires secret nonce).
The on-chain commitment reveals nothing about the owner's identity.
```

---

## 8. Pause/Emergency Controls

```
Admin Master can pause/unpause each module independently:

  pauseAccessControl()  / unpauseAccessControl()
  pauseIdentity()       / unpauseIdentity()
  pauseToken()          / unpauseToken()
  pauseBucketDEFI()     / unpauseBucketDEFI()

When paused, all state-changing operations in that module revert.
```
