# Midnight I-REC Privacy dApp — Technical Specification & Knowledge Base

**Version**: 2.0
**Last Updated**: February 2026

## 1. Project Overview

### 1.1 What This Is

A decentralized application (dApp) built on the **Midnight blockchain** that enables the **private acquisition of tokenized International Renewable Energy Certificates (I-RECs)** in the Brazilian market. The dApp does not replace the existing I-REC regulatory and tracking infrastructure — it adds a **privacy-preserving trading layer** on top of it.

### 1.2 One-Sentence Summary

Sellers publicly list tokenized I-RECs (as NFTs with full certificate metadata) on the Midnight ledger, and buyers privately acquire them using Midnight's shielded transaction technology, protecting buyer identity, payment amounts, and purchasing patterns while preserving full auditability through zero-knowledge proofs.

### 1.3 Core Value Proposition

> "Procure your sustainability portfolio without exposing your strategy to competitors, with cryptographic proof for auditors and regulators when you're ready to report."

---

## 2. Problem Statement

### 2.1 The Brazilian I-REC Market Context

- Brazil is the **world's largest I-REC market** by volume (54+ million certificates issued in H1 2025 alone).
- Each I-REC represents **1 MWh of verified renewable energy generation** and carries specific metadata (plant, technology, location, vintage, commissioning date, unique serial ID).
- Certificates are issued by **Instituto Totum** (sole accredited local issuer in Brazil) and tracked in the **Evident Registry** (owned by Xpansiv), which is the global system of record for certificate lifecycle (issuance, transfers, retirements).
- Prices in Brazil are very low: approximately **$0.16–0.20 per MWh**.
- The market is growing rapidly due to corporate ESG commitments (RE100, SBTi, GHG Protocol), free energy market expansion, and Brazil hosting COP30 in 2025.

### 2.2 The Privacy Problem in Current I-REC Trading

Current blockchain-based platforms (EXREC, GoNetZero, Arkreen) use blockchain for transparency and auditability but provide **zero buyer privacy**. The existing non-blockchain market (bilateral OTC deals via brokers like Comerc, CGN Brasil) offers some inherent privacy but lacks transparency and price discovery.

**Specific problems the dApp solves:**

1. **Competitive procurement intelligence leakage**: When a multinational buys 2 million wind I-RECs from a specific region on a transparent platform, competitors can infer their ESG strategy, procurement budget, and upcoming sustainability announcements before the company is ready to disclose.

2. **Price discrimination**: Sellers adjust pricing based on buyer identity. Large corporations pay more for the same certificate. Shielded buyer identity pushes the market toward fairer price discovery — the NFT has a listed price, and the buyer either takes it or doesn't.

3. **Whale front-running**: Large purchases on platforms like CBL/Xpansiv move the market. If a company needs 500,000 I-RECs, other participants can front-run or adjust pricing. Breaking purchases into many small, hash-separated, unlinkable transactions prevents this.

4. **Pre-disclosure ESG leakage**: Companies preparing sustainability reports don't want their certificate portfolio visible before publication. ZK proofs enable selective disclosure — they prove ownership when they choose to, not when the chain exposes it.

### 2.3 What Existing Blockchain Platforms Do (and Don't Do)

| Platform | What it does | What it lacks |
|----------|-------------|---------------|
| **EXREC** (Brazil) | Blockchain-audited I-REC trading, fractional purchases below 1 MWh | No buyer privacy, private/permissioned chain |
| **GoNetZero** (Sembcorp) | Blockchain-powered lifecycle management, integrated with Instituto Totum | Enterprise blockchain for audit only, no buyer privacy |
| **Arkreen** | NFTs (ERC-721) on Polygon + fungible ERC-20 tokens (ART), public marketplace | Fully transparent, no privacy features |
| **DREx** | e-NFTs bridged to Evident registry via Chainlink oracles, proof-of-reserves | Public chain, no buyer privacy |

**No existing platform offers privacy-preserving buyer transactions. This is the gap the Midnight dApp fills.**

---

## 3. Institutional Architecture: Totum, Evident, and the Marketplace

### 3.1 Roles and Responsibilities (Corrected)

Understanding the precise division of labor between Totum and Evident is critical for the dApp's integration architecture.

**Instituto Totum** (Local Issuer — Brazil):
- Registers production devices (power plants) — verifies facility documentation
- Registers Registrants (generator companies or their representatives)
- Verifies generation data submitted by Registrants
- Authorizes issuance of I-REC certificates into the Evident Registry
- **Totum's role ends at issuance** — it does NOT handle transfers or retirements
- **NEW**: Totum now offers a **broker/custodial service for marketplaces** (see Section 3.3)

**Evident Registry** (Global Registry Operator — Code Manager):
- Operates the centralized digital platform that tracks every certificate
- Assigns unique serial numbers to each I-REC at issuance
- Records and executes all transfers between Participant accounts
- Manages Trade Accounts and Redemption Accounts for Participants
- Processes redemption (retirement) requests with beneficiary assignment
- Issues Redemption Statements (PDF with QR verification)
- Provides API access for platform integrations
- Is the **single point of truth for legal ownership** of I-RECs
- Every action (issuance, transfer, retirement) is logged with timestamps and participant IDs

**In short**: Totum is the **notary** (verifies real-world generation facts and authorizes issuance). Evident is the **land registry** (records and tracks all ownership, transfers, and retirements from issuance onward).

### 3.2 Evident Is Not a Marketplace

The Evident registry is a **ledger, not a marketplace**. It has Trade Accounts where certificates are held and it can transfer certificates between accounts, but it does not have listings, prices, or buy/sell functionality. Think of it as a bank — it holds and moves assets, but it is not a store.

When a seller (a Participant with certificates in their Trade Account) wants to sell, they choose from several channels:

| Channel | How it works |
|---------|-------------|
| **Bilateral OTC** | Seller finds buyer through relationships/brokers, agrees price off-registry, executes transfer directly in Evident. Most of the Brazilian market works this way today. |
| **Brokers** (Comerc, CGN Brasil) | Intermediary finds buyers, negotiates price, executes transfer in Evident. |
| **CBL/Xpansiv** | Seller connects their Evident account to CBL's order-book trading platform. |
| **Accredited Platforms** (EXREC, GoNetZero, CPFL) | Third-party platforms that act as alternative interfaces to the Evident registry, offering marketplace features on top. |
| **Direct transfer to a Platform** | Participants can transfer certificates from their account to the account of an approved Platform (such as a trading marketplace). |

**The seller chooses where to list.** Evident doesn't dictate sales channels. The dApp is another marketplace option — sellers who want to access privacy-conscious buyers list on Midnight.

### 3.3 Instituto Totum's Broker Service (KEY ARCHITECTURAL DECISION)

Instituto Totum now offers a **broker/custodial account service** specifically designed for marketplaces. This is the critical integration layer for the dApp.

**How it works:**

1. The seller transfers their I-REC certificates from their own Evident Trade Account to **Totum's custodial account** in Evident.
2. Totum holds the certificates in custody on behalf of the marketplace.
3. Totum provides a broker interface to the marketplace, allowing it to query available certificates, manage listings, and trigger operations.
4. When a sale occurs on the marketplace, Totum handles the underlying Evident transfer/retirement.

**Why this solves the trust problem:**

- The seller is NOT trusting the dApp directly with their certificates — they are trusting **Totum**, the accredited issuer they already trust.
- The dApp never needs its own Evident Participant account holding certificates — Totum is the custodian.
- The bridge operator is the most trusted entity in the Brazilian I-REC ecosystem, eliminating the custodial risk that plagues other marketplace designs.
- If someone questions whether the NFTs are backed by real I-RECs, the answer is: "Instituto Totum is custodian."

**Current status**: Manual process (dashboard/email-based). Totum is planning API integration.

---

## 4. Solution Architecture

### 4.1 Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LAYER 1: REGISTRY (Evident)                       │
│                                                                     │
│  Source of truth for certificate existence, ownership, and lifecycle │
│                                                                     │
│  Renewable Energy    Instituto Totum       Evident Registry          │
│  Generator           (Local Issuer)        (Global Tracking)         │
│  ──────────────► Verifies & Authorizes ──► Creates certificates     │
│                  issuance                   Tracks all transfers     │
│                  (role ends here)           Processes retirements    │
│                                            Issues redemption PDFs   │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           │ Seller transfers certificates
                           │ to Totum's custodial account in Evident
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                 LAYER 2: CUSTODIAN & BRIDGE (Totum)                  │
│                                                                     │
│  Instituto Totum's Broker Service                                   │
│                                                                     │
│  ├── Holds certificates in custodial Evident account                │
│  ├── Provides broker interface to marketplaces                      │
│  ├── Confirms certificate availability and metadata                 │
│  ├── Executes retirements in Evident when requested by marketplace  │
│  ├── Prevents double-tokenization (certificates held = locked)      │
│  └── Currently manual process; API planned                          │
│                                                                     │
│  TRUST: Seller trusts Totum (accredited issuer), not the dApp      │
│  CUSTODY: Certificates in Totum's Evident account = locked from     │
│           being sold elsewhere while listed on the marketplace      │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           │ Totum confirms certificate data
                           │ to the dApp (manual now, API later)
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│              LAYER 3: PRIVACY MARKETPLACE (Midnight dApp)            │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    PUBLIC STATE                               │   │
│  │                                                               │   │
│  │  NFT Token (I-REC)                                            │   │
│  │  ├── Certificate Serial ID / Range                            │   │
│  │  ├── Production Device (Plant Name, ID)                       │   │
│  │  ├── Technology (Wind / Solar / Hydro / Biomass)              │   │
│  │  ├── Location (State, Region, Country)                        │   │
│  │  ├── Generation Period (Start Date – End Date)                │   │
│  │  ├── Commissioning Date of Plant                              │   │
│  │  ├── Capacity (MW)                                            │   │
│  │  ├── Listing Price (set by seller)                            │   │
│  │  ├── Seller Identity (public)                                 │   │
│  │  ├── Status (Listed / Sold / Retired)                         │   │
│  │  └── Totum Custody Reference                                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   SHIELDED STATE                              │   │
│  │                                                               │   │
│  │  ├── Buyer Identity (wallet / DID)                            │   │
│  │  ├── Payment Amount (tDUST or payment token)                  │   │
│  │  ├── Transaction Hash (unique, unlinkable)                    │   │
│  │  ├── Purchase Timestamp                                       │   │
│  │  ├── Ownership Proof (ZK commitment)                          │   │
│  │  └── Batch/Grouping Info (if buyer splits purchases)          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                 SMART CONTRACT LOGIC                           │   │
│  │                                                               │   │
│  │  1. dApp operator mints NFT from Totum-confirmed data         │   │
│  │  2. Buyer sends shielded payment → contract verifies amount   │   │
│  │  3. Contract atomically: transfers NFT to buyer (shielded)    │   │
│  │     + releases payment to seller                              │   │
│  │  4. Buyer can later generate ZK proof of ownership            │   │
│  │  5. Buyer initiates retirement → dApp requests Totum to       │   │
│  │     execute retirement in Evident                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 What Is Public (Visible on Ledger)

- **The I-REC NFT metadata**: all certificate attributes (plant, technology, location, vintage, capacity, serial ID)
- **The listing price**: what the seller is asking
- **The seller identity**: who is selling (this is intentionally public — sellers want visibility for marketing their generators)
- **The NFT status**: whether it's listed, sold, or retired
- **That a transaction occurred**: the fact that a sale happened is visible, but not to whom

### 4.3 What Is Shielded (Private)

- **Buyer identity**: no one can see which wallet/entity purchased the certificate
- **Payment amount**: the actual amount transferred is hidden (buyer may negotiate off-chain or pay listed price, but the chain doesn't reveal the financial flow)
- **Purchase patterns**: because each transaction is represented as an independent hash, multiple purchases by the same buyer are not linkable
- **Portfolio composition**: no one can reconstruct a buyer's I-REC portfolio by scanning the chain

### 4.4 What Is Provable (ZK Proofs)

The buyer can selectively prove:

- **"I own certificates X, Y, Z"** — for sustainability reporting, GHG Protocol Scope 2 claims, CDP, RE100
- **"I own N MWh of wind energy from Brazil, vintage 2025"** — aggregate claims without revealing specific certificates
- **"I purchased certificates from this listing"** — for dispute resolution or audit
- **"My total renewable energy procurement is ≥ X MWh"** — threshold proofs for compliance

These proofs can be generated and shared with auditors, regulators, or reporting frameworks **without revealing the full portfolio or transaction history**.

---

## 5. Technical Components

### 5.1 Operational Roles

The smart contract enforces a flat, four-role access model. The Admin directly manages all other roles — there is no intermediate admin delegation or role-admin hierarchy.

| Role | Responsibility | Who holds it |
|------|---------------|-------------|
| **Admin** | Assigns and revokes all other roles. Pauses/unpauses any module in an emergency. | dApp deployer / organization owner |
| **Minter** | Mints I-REC NFTs (from Totum-confirmed data) with certificate metadata and initial price. Burns unsold tokens (unlisting from the web2 ledger). Executes burns of purchased tokens on behalf of buyers (bot-executed after buyer authorization via challenge). | dApp operator (backend service / bot) |
| **PoolOperator** | Lists and unlists NFTs in the purchase pool. Updates NFT prices to reflect market conditions. | dApp operator or designated market manager |
| **Verifier** | Verifies and removes buyer identities (KYC/AML whitelist). | Compliance team or KYC service integration |

**Key design decisions:**
- A single Admin controls all role assignments. This keeps governance simple and auditable.
- Roles are non-hierarchical — no role can grant or revoke another role except Admin.
- The same entity may hold multiple roles (e.g., the dApp operator may be both Minter and PoolOperator).
- Each module (Access Control, Identity, Token, Pool) can be independently paused by Admin for emergency response without affecting the others.

### 5.2 NFT Token Design (I-REC Certificate Token)

Each tokenized I-REC is represented as an NFT on Midnight. The token carries two categories of data:

**Public Data (visible to all market participants):**

- **Certificate identity**: Serial number or range, number of I-RECs represented, and the Totum custody reference linking the NFT to the underlying certificates held by Instituto Totum.
- **Production device (plant)**: Name, registry ID, technology type (wind, solar, hydro, biomass, etc.), country, state/region, installed capacity, and commissioning date.
- **Generation details**: The period during which the energy was generated and the total MWh represented.
- **Marketplace information**: Seller identity, listing price per MWh, payment currency, and current status (listed, sold, retired, or cancelled).
- **Quality and compliance seals**: Whether the certificate carries the REC Brazil sustainability seal or the CCEE Origem seal.

**Shielded Data (private, provable via zero-knowledge proofs):**

- **Buyer identity**: The current owner after purchase — hidden from all observers.
- **Transaction details**: Purchase hash and timestamp — each purchase generates a unique, unlinkable record.

This separation ensures that certificate quality and provenance remain fully transparent for market discovery, while buyer identity and purchasing patterns remain private.

### 5.3 Marketplace Capabilities

#### 5.3.1 Seller / Operator Capabilities

- **Mint I-REC NFTs**: The dApp operator creates NFTs from Totum-confirmed certificate data, including all public metadata and the initial listing price. Only authorized operators (Minter role) can mint.
- **Cancel listings**: When a seller requests delisting, the operator removes the NFT from the marketplace. This triggers the return of certificates from Totum's custodial account back to the seller's Evident Trade Account.
- **Update pricing**: The pool operator can adjust NFT prices to reflect market conditions at any time while the NFT is listed.

#### 5.3.2 Buyer Capabilities

- **Purchase NFTs privately**: A buyer selects an NFT and completes the purchase in a single atomic transaction. The contract verifies the payment meets the listing price, transfers the NFT to the buyer's shielded identity, and releases payment to the seller — all without revealing who the buyer is. Each purchase generates a unique, unlinkable transaction record.
- **Batch purchases**: Buyers can acquire multiple NFTs (5, 10, or 20) in a single transaction, reducing costs and simplifying portfolio building. Partial batches are supported.
- **Prove ownership**: Buyers can generate a zero-knowledge proof that they own a specific certificate, shareable with auditors or regulators without revealing their wallet identity.
- **Prove portfolio aggregates**: Buyers can make aggregate claims (e.g., "I own at least 1,000 MWh of wind energy from Brazil") without revealing which specific certificates they hold.
- **Initiate retirement**: The buyer provides the beneficiary company name (required by I-REC standards) and triggers the retirement process. The dApp operator coordinates with Totum to execute the retirement in the Evident registry. Note: retirement makes the beneficiary name public — this is by design and required for compliance reporting.
- **Burn purchased tokens**: Buyers authorize burns by calling `proofOwnership` with a challenge. The Minter/Burner bot then executes `burnPurchasedBatch` with the matching challenge, which verifies authorization, records full lifecycle history (seller, commitment, challenge), and destroys the NFTs. This finalizes the lifecycle on-chain and unlocks the corresponding entry in the web2 digital asset ledger. The same token ID can be re-minted in a new lifecycle after burn.

### 5.4 Bridge Design: Totum Broker Integration

The bridge between the off-chain I-REC world and Midnight is mediated entirely by **Instituto Totum's broker service**. The dApp does NOT interact with Evident directly.

```
┌──────────────┐  Transfer   ┌──────────────┐   Broker    ┌──────────────┐  Mint/Retire  ┌──────────────┐
│   Seller's   │────────────►│   Totum's    │◄───────────►│   dApp       │──────────────►│   Midnight   │
│   Evident    │  (in Evident)│   Custodial  │  Interface  │   Operator   │               │   Contract   │
│   Account    │             │   Account    │             │   (Backend)  │               │              │
│              │             │   (Evident)  │             │              │               │              │
└──────────────┘             └──────────────┘             └──────────────┘               └──────────────┘
```

**Operational flows:**

**Listing a certificate:**
1. Seller decides to list on the Midnight marketplace
2. Seller transfers certificates from their Evident Trade Account to Totum's custodial account
3. Totum confirms receipt and provides certificate metadata to the dApp operator (currently manual; API planned)
4. dApp operator mints corresponding NFT(s) on Midnight with the metadata
5. NFT is live and purchasable

**Purchasing (on-chain):**
1. Buyer purchases NFT via shielded transaction on Midnight (fully on-chain, no bridge involvement)
2. Payment goes to seller, NFT ownership transfers to buyer's shielded address
3. Certificates remain in Totum's custody (ownership change is recorded on Midnight only)

**Retirement:**
1. Buyer initiates retirement on Midnight (provides beneficiary name)
2. NFT status set to Retired on Midnight
3. dApp operator requests Totum to execute retirement in Evident with the specified beneficiary
4. Totum processes the retirement in Evident, which generates a Redemption Statement PDF
5. dApp operator confirms completion back on Midnight (optional: store Evident redemption reference)

**Cancellation:**
1. Seller requests delisting
2. dApp operator cancels the NFT on Midnight
3. Totum transfers certificates back from custodial account to seller's Evident Trade Account

**Why this works:**
- Certificates in Totum's custodial account are **locked by custody** — they cannot be sold elsewhere while the marketplace holds them
- The dApp never touches Evident directly — Totum is the trusted intermediary
- Double-tokenization is prevented because Totum controls which certificates are available to which marketplace
- Sellers trust Totum (accredited issuer), not the dApp

### 5.5 Transaction Privacy Model

#### How a Purchase Works (Step by Step)

1. **Buyer browses listings** — All NFT metadata and prices are public. Buyer can filter by technology, region, vintage, price.

2. **Buyer initiates shielded purchase** — Buyer's wallet creates a shielded transaction:
   - The transaction references the `token_id` (public — everyone sees which NFT was sold)
   - The payment is encrypted and sent via Midnight's shielded transfer
   - A ZK range proof verifies the payment amount >= listing price without revealing the exact amount
   - The buyer's identity is replaced with a one-time ZK commitment

3. **Contract executes atomically**:
   - Payment goes to seller's address (seller sees the funds arrive but not the sender)
   - NFT ownership transfers to buyer's shielded address
   - A unique transaction hash is generated (not linkable to the buyer's other transactions)

4. **Buyer receives encrypted receipt** — Contains ownership proof materials for later use.

5. **Buyer can split purchases** — To avoid pattern analysis, a buyer needing 10,000 MWh can:
   - Make many separate purchases of different sizes
   - Each purchase generates an independent hash
   - No on-chain link between the transactions
   - The buyer can later prove aggregate ownership via a single ZK proof

#### Privacy Guarantees

| What an observer sees | What remains hidden |
|----------------------|-------------------|
| An NFT was sold (status changed) | Who bought it |
| The listed price | The actual payment amount |
| The seller received funds | The buyer's wallet address |
| The certificate metadata | The buyer's total portfolio |
| Transaction occurred at block N | Links between multiple purchases by same buyer |

#### What the Buyer Can Prove (Selective Disclosure)

| Proof Type | Use Case | What It Reveals |
|-----------|----------|----------------|
| Single ownership | "I own this specific certificate" | Certificate ID + buyer identity, nothing else |
| Aggregate quantity | "I own ≥ 5,000 MWh of wind from Brazil" | Threshold claim, no specific certificates |
| Technology mix | "80% of my portfolio is wind/solar" | Percentage breakdown, no volumes or prices |
| Vintage proof | "All my certificates are vintage 2024+" | Date range compliance, no specifics |
| Retirement proof | "I retired 10,000 MWh for FY2025" | Retirement claim for reporting |

---

## 6. API Recommendations for Instituto Totum's Broker Service

Instituto Totum is planning to build an API for their broker/custodial service that marketplaces like this dApp will consume. The following are architectural recommendations for that API, designed to enable efficient integration with both traditional and blockchain-based marketplaces.

### 6.1 Core Design Principles

1. **RESTful + Webhooks**: REST API for queries and commands, webhooks for async event notifications (certificate arrivals, retirement confirmations, status changes). Marketplaces need to react to events in real-time, not poll constantly.

2. **Idempotent operations**: Every write operation (lock, retirement request, cancellation) should accept a client-generated `idempotency_key` so that retries don't create duplicate actions. This is critical for blockchain integrations where a transaction might fail mid-bridge.

3. **OAuth 2.0 + API keys**: Marketplace authentication via OAuth 2.0 with scoped permissions (read-only, trade, retire). Each marketplace gets its own credentials. Rate limiting per marketplace.

4. **Eventual consistency acknowledged**: The API should clearly communicate that Evident operations (transfers, retirements) are not instant. Provide explicit status fields and webhook notifications for state transitions rather than implying synchronous completion.

### 6.2 Recommended Endpoints

#### 6.2.1 Certificate Inventory

```
GET /v1/custody/certificates
```
Returns all certificates currently held in Totum's custodial account on behalf of a specific marketplace.

**Query parameters:**
- `marketplace_id` — Which marketplace is querying
- `seller_id` — Filter by seller (optional)
- `technology` — Filter by wind, solar, hydro, biomass (optional)
- `country` — Filter by country code, e.g., "BR" (optional)
- `state_region` — Filter by state/region (optional)
- `vintage_start` / `vintage_end` — Filter by generation period (optional)
- `status` — Filter by: `available`, `locked`, `sold`, `retired` (optional)
- `page` / `page_size` — Pagination

**Response per certificate (or batch):**
```json
{
  "custody_ref": "TOT-2026-00451",
  "irec_serial_start": "BR-TOTUM-1234567",
  "irec_serial_end": "BR-TOTUM-1234667",
  "certificate_count": 100,
  "energy_mwh": 100,
  "device": {
    "name": "Parque Eólico Ventos do Nordeste",
    "device_id": "DEV-BR-00892",
    "technology": "wind",
    "country": "BR",
    "state_region": "Rio Grande do Norte",
    "capacity_mw": 150.0,
    "commissioning_date": "2019-03-15"
  },
  "generation_period_start": "2025-06-01",
  "generation_period_end": "2025-06-30",
  "seller": {
    "participant_id": "PART-BR-00234",
    "name": "Ventos Energia S.A."
  },
  "seals": {
    "rec_brazil": true,
    "ccee_origem": false
  },
  "status": "available",
  "deposited_at": "2026-01-15T14:30:00Z"
}
```

**Why this matters**: The marketplace needs to know exactly what's available to mint as NFTs. The `custody_ref` becomes the bridge reference stored in the NFT on Midnight.

#### 6.2.2 Certificate Detail

```
GET /v1/custody/certificates/{custody_ref}
```
Returns full detail for a specific certificate batch, including Evident registry reference data for audit purposes.

#### 6.2.3 Lock Certificates for Listing

```
POST /v1/custody/certificates/{custody_ref}/lock
```
Locks a certificate batch so it can only be used by the requesting marketplace. Prevents the same certificates from being listed on multiple marketplaces simultaneously.

**Request body:**
```json
{
  "marketplace_id": "midnight-irec-dapp",
  "idempotency_key": "lock-2026-02-08-001",
  "lock_duration_hours": 720,
  "callback_url": "https://dapp-backend.example/webhooks/totum"
}
```

**Response:**
```json
{
  "custody_ref": "TOT-2026-00451",
  "lock_status": "locked",
  "locked_by": "midnight-irec-dapp",
  "locked_at": "2026-02-08T10:00:00Z",
  "lock_expires_at": "2026-03-10T10:00:00Z"
}
```

**Why this matters**: When the dApp mints an NFT on Midnight, the corresponding certificates must be guaranteed to not be sold elsewhere. The lock is the on-ramp guarantee. Lock expiration handles the case where a marketplace goes offline — certificates eventually return to available status.

#### 6.2.4 Unlock / Release Certificates

```
POST /v1/custody/certificates/{custody_ref}/unlock
```
Releases the lock, making certificates available again. Used when a seller cancels their listing.

**Request body:**
```json
{
  "marketplace_id": "midnight-irec-dapp",
  "idempotency_key": "unlock-2026-02-08-001",
  "reason": "seller_cancelled"
}
```

#### 6.2.5 Confirm Sale

```
POST /v1/custody/certificates/{custody_ref}/sale
```
Notifies Totum that a sale has been completed on the marketplace. This updates the internal records and (optionally) could trigger a transfer to a buyer's Evident account or keep them in custody pending retirement.

**Request body:**
```json
{
  "marketplace_id": "midnight-irec-dapp",
  "idempotency_key": "sale-2026-02-08-001",
  "sale_timestamp": "2026-02-08T15:30:00Z",
  "on_chain_tx_ref": "midnight_tx_hash_abc123",
  "disposition": "hold_for_retirement"
}
```

**`disposition` options:**
- `hold_for_retirement` — Keep in Totum's custody until buyer requests retirement (most common for this dApp since buyer identity is shielded)
- `transfer_to_participant` — Transfer to a specific Evident Participant account (buyer would need to provide their account code, breaking some privacy)

#### 6.2.6 Request Retirement

```
POST /v1/custody/certificates/{custody_ref}/retire
```
Requests that Totum execute the retirement in Evident with the specified beneficiary.

**Request body:**
```json
{
  "marketplace_id": "midnight-irec-dapp",
  "idempotency_key": "retire-2026-02-08-001",
  "beneficiary": {
    "company_name": "Acme Corp.",
    "country": "US",
    "reporting_period_start": "2025-01-01",
    "reporting_period_end": "2025-12-31",
    "consumption_location": "Acme Corp US Operations"
  },
  "on_chain_tx_ref": "midnight_retire_tx_hash_def456",
  "callback_url": "https://dapp-backend.example/webhooks/totum/retirement"
}
```

**Response (immediate):**
```json
{
  "retirement_request_id": "RET-2026-00089",
  "status": "pending",
  "estimated_completion": "2026-02-10T00:00:00Z"
}
```

**Why this matters**: Retirement is not instant — it requires processing in Evident (potentially with manual steps). The API should return immediately with a pending status and then notify via webhook when complete.

#### 6.2.7 Retirement Status

```
GET /v1/custody/retirements/{retirement_request_id}
```
Check the status of a retirement request.

**Response (when completed):**
```json
{
  "retirement_request_id": "RET-2026-00089",
  "status": "completed",
  "evident_redemption_id": "EVD-RED-2026-12345",
  "redemption_statement_url": "https://evident.app/statements/...",
  "completed_at": "2026-02-09T16:00:00Z"
}
```

### 6.3 Webhooks

The API should push notifications for key events rather than requiring marketplaces to poll.

**Recommended webhook events:**

| Event | Trigger | Payload includes |
|-------|---------|-----------------|
| `certificate.deposited` | Seller transfers certificates to Totum's custody | Certificate metadata, custody_ref, seller info |
| `certificate.locked` | Lock confirmed | custody_ref, marketplace_id, expiration |
| `certificate.lock_expired` | Lock timed out without sale | custody_ref, original marketplace_id |
| `certificate.unlocked` | Lock released (cancellation) | custody_ref, reason |
| `retirement.processing` | Totum has started the Evident retirement | retirement_request_id |
| `retirement.completed` | Evident retirement finalized | retirement_request_id, redemption_statement_url |
| `retirement.failed` | Retirement could not be processed | retirement_request_id, error_reason |

**Webhook format:**
```json
{
  "event": "retirement.completed",
  "timestamp": "2026-02-09T16:00:00Z",
  "marketplace_id": "midnight-irec-dapp",
  "data": {
    "retirement_request_id": "RET-2026-00089",
    "custody_ref": "TOT-2026-00451",
    "evident_redemption_id": "EVD-RED-2026-12345",
    "redemption_statement_url": "https://evident.app/statements/..."
  },
  "signature": "hmac_sha256_of_payload"
}
```

Webhooks should be signed (HMAC-SHA256) so the marketplace can verify they genuinely came from Totum.

### 6.4 Additional API Recommendations

**Batch operations**: Allow locking, confirming sales, and requesting retirements for multiple certificate batches in a single API call. Marketplaces processing large volumes (hundreds of transactions per day) need this to avoid hitting rate limits and reduce latency.

**Seller onboarding endpoint**: An endpoint that returns a unique deposit reference for a seller, so when they transfer certificates to Totum's Evident account, the system can automatically associate the deposit with the correct marketplace and seller. This avoids manual matching.

```
POST /v1/sellers/onboard
→ Returns: { "seller_id": "...", "deposit_instructions": { "evident_account_code": "...", "reference_note": "..." } }
```

**Certificate metadata updates**: If a certificate receives a new seal (e.g., REC Brazil Seal) after being deposited, the API should notify marketplaces so they can update their NFT metadata or listings.

**Audit / Proof-of-Reserves endpoint**: Returns a signed attestation of the current state of certificates in custody, which the marketplace can publish or use on-chain.

```
GET /v1/custody/attestation
→ Returns: { "total_certificates": 45000, "by_marketplace": {...}, "timestamp": "...", "signature": "..." }
```

This enables the dApp to periodically verify and publish that Midnight NFTs are fully backed by real I-RECs in Totum's custody.

**Rate limiting & quotas**: Transparent rate limits with clear headers (`X-RateLimit-Remaining`, `Retry-After`). Different tiers for different marketplace sizes.

**Sandbox environment**: A test environment with mock certificates for marketplaces to develop and test their integrations before going live.

---

## 7. I-REC Domain Knowledge

### 7.1 What Is an I-REC

An I-REC (International Renewable Energy Certificate) is an Energy Attribute Certificate (EAC) that represents proof of 1 MWh of electricity generated from a renewable source and added to the grid. It is governed by the I-TRACK Foundation (Netherlands) and administered locally in Brazil by Instituto Totum.

### 7.2 I-REC Lifecycle

```
Registration → Issuance → Trading → Redemption (Retirement)

1. REGISTRATION: Generator registers their production device (power plant)
   with Instituto Totum, providing facility details and documentation.
   Fee: registration fee for the device.

2. ISSUANCE: Generator (Registrant) submits generation data and an Issue
   Request to Instituto Totum. Totum verifies the data and authorizes
   issuance. Evident Registry then creates the certificates with unique
   serial numbers and deposits them into the Registrant's Trade Account.
   *** Totum's active role ends here. ***

3. TRADING: Certificates can be transferred between Participant accounts
   in Evident. Unlimited transfers allowed. Each transfer is logged with
   timestamps and participant IDs. Transfers are irreversible.
   The Evident Registry is the single point of truth for legal ownership.

4. REDEMPTION (Retirement): The holder transfers certificates to a
   Redemption Account in Evident with an assigned Beneficiary. Once
   approved, the certificates are permanently locked. A Redemption
   Statement PDF is generated with QR code verification. The beneficiary
   company name becomes a public record.
```

### 7.3 Key I-REC Attributes per Certificate

- Unique serial number
- Production device (specific power plant)
- Technology type (wind, solar, hydro, biomass, geothermal)
- Country and region of generation
- Generation period (date range)
- Plant commissioning date
- Plant capacity (MW)
- Issuer (Instituto Totum for Brazil)

### 7.4 I-REC Certificate Nature: Semi-Fungible

I-RECs are **not fully fungible** (like a currency) and **not fully non-fungible** (like a unique artwork). They are **semi-fungible**:

- Two I-RECs from **different plants** are distinguishable and may have different market values (wind vs. old hydro, new vintage vs. old vintage).
- Two I-RECs from the **same plant in the same generation period** are functionally identical (like numbered tickets from the same event).
- Buyers care about technology, vintage, and location — these attributes affect desirability and price even though all represent 1 MWh.

**This is why the NFT representation is appropriate**: each token carries specific metadata that differentiates it, and buyers select based on these attributes.

### 7.5 Evident Registry: Account Types

| Account Type | Purpose | Who can hold | Key behavior |
|-------------|---------|-------------|-------------|
| **Trade Account** | Hold and transfer certificates | Participants, Platform Operators | Certificates can be transferred in and out freely. Not eligible for end-user claims. |
| **Redemption Account** | Retire certificates | Participants, Platform Operators | Certificates transferred in are permanently locked to a Beneficiary. Irreversible. |

Transfers in Evident are irreversible. The registry does not have an undo function.

### 7.6 Brazilian Market Key Players

| Entity | Role |
|--------|------|
| **Instituto Totum** | Sole accredited local issuer in Brazil (since 2016); now also offers broker/custodial service for marketplaces |
| **Evident Registry** (Xpansiv) | Global registry — single source of truth for ownership, transfers, retirements |
| **CCEE** | Brazilian electricity regulator; launched own certification platform (Oct 2024) |
| **I-TRACK Foundation** | International governance body (Netherlands) |
| **Comerc Energia** | Largest broker/intermediary |
| **CGN Brasil (CGNBE)** | Largest single producer (5M+ I-RECs from 42 wind/solar parks) |
| **CPFL Soluções** | E-commerce style direct sales from own plants |
| **EXREC** | First blockchain-based platform (fractional purchasing) |
| **GoNetZero** (Sembcorp) | Blockchain-powered platform integrated with Instituto Totum |

### 7.7 Pricing and Market Size

- Average price: **$0.16–0.20/MWh** (among cheapest globally)
- 2024 total market value: ~$9–10 million USD in certificate value
- Volume: 54+ million certificates in H1 2025
- Only ~7-8% of Brazil's renewable generation is currently tracked via I-RECs
- For comparison: European GOs trade at €3–8/MWh; US compliance RECs can reach $30/MWh

### 7.8 Important: Retirement Makes Beneficiary Public

When an I-REC is retired (redeemed) in the Evident registry, the **beneficiary company name becomes a public record**. This is required by the GHG Protocol for Scope 2 reporting, CDP, RE100, etc. A Redemption Statement PDF is generated with a QR code for verification.

**Implication for the dApp**: Privacy is preserved **during the trading and holding phase**, not at final retirement. This mirrors traditional financial markets (anonymous trading → public settlement). The value is protecting the *timing, strategy, volume, and counterparty* information during procurement.

---

## 8. Competitive Positioning

### 8.1 What Makes This Different

| Feature | EXREC | GoNetZero | Arkreen | **This dApp** |
|---------|-------|-----------|---------|---------------|
| Blockchain-based | ✅ Private | ✅ Enterprise | ✅ Polygon (public) | ✅ Midnight |
| NFT representation | ❌ | ❌ | ✅ ERC-721 | ✅ Native NFT |
| Buyer privacy | ❌ | ❌ | ❌ | ✅ Shielded |
| Unlinkable purchases | ❌ | ❌ | ❌ | ✅ Per-tx hash |
| ZK proof of ownership | ❌ | ❌ | ❌ | ✅ Selective disclosure |
| Fractional buying | ✅ | ❌ | ✅ (via ART token) | Possible (future) |
| Registry integration | ✅ | ✅ Instituto Totum | Own issuance | ✅ Via Totum broker |
| Anti-front-running | ❌ | ❌ | ❌ | ✅ Whale fragmentation |
| Custodian | Unknown | Sembcorp | None (public chain) | **Instituto Totum** |

### 8.2 Target Users

**Primary**: Large corporations and multinationals with significant I-REC procurement needs who want to control ESG disclosure timing (e.g., companies buying 10,000+ MWh annually).

**Secondary**: ESG portfolio managers and sustainability consultants managing procurement for multiple clients who need to prevent cross-client information leakage.

**Tertiary**: Any buyer who values fair pricing without identity-based price discrimination.

---

## 9. Regulatory Alignment

### 9.1 Compliance Framework Compatibility

| Framework | How the dApp supports it |
|-----------|------------------------|
| **GHG Protocol (Scope 2)** | ZK proofs demonstrate certificate ownership for market-based reporting; retirement makes beneficiary public as required |
| **RE100** | Aggregate proofs can demonstrate renewable energy percentage targets |
| **CDP** | Selective disclosure proofs provide auditable evidence |
| **SBTi** | Technology/vintage proofs demonstrate alignment with quality criteria |
| **REC Brazil Seal** | NFT metadata includes seal status for quality differentiation |
| **CCEE Origem Seal** | NFT metadata includes seal status |
| **Brazilian Cap-and-Trade (SBCE)** | ZK proofs provide selective disclosure to regulators |

### 9.2 Key Regulatory Consideration

Brazil has **no mandatory** renewable energy certificate system — the I-REC market is entirely voluntary. However, several recent regulatory developments increase demand:
- **Law 15,042/2024**: National cap-and-trade system for companies emitting >25,000 tonnes CO₂/year
- **CVM Resolutions 217–219** (Oct 2024): Mandatory IFRS-aligned sustainability disclosures for listed companies starting FY2026
- **CCEE certification platform** (Oct 2024): Centralized generation data to prevent double-counting

---

## 10. Implementation Considerations

### 10.1 Why Midnight

Midnight was selected as the blockchain platform because it natively supports the dual-state model the dApp requires: public state for certificate metadata and marketplace transparency, and private (shielded) state for buyer identity and transaction details. Zero-knowledge proofs are a built-in feature of the platform, meaning buyer privacy and selective disclosure are handled at the protocol level rather than requiring custom cryptographic infrastructure. Midnight also provides a wallet and dApp connector for browser-based user interaction.

### 10.2 MVP Scope (Recommended)

**Phase 1 — Core Trading (Manual Bridge via Totum)**:
1. Seller transfers certificates to Totum's custodial account
2. dApp operator manually receives confirmation from Totum (email/dashboard)
3. dApp operator mints corresponding I-REC NFTs on Midnight
4. Buyer purchases NFTs via shielded transactions
5. Buyer can prove ownership via ZK proof
6. Retirement: buyer requests → dApp operator → Totum processes manually in Evident

**Phase 2 — Totum API Integration**:
1. Automated certificate inventory sync via Totum API
2. Automated lock/unlock lifecycle
3. Automated retirement requests and confirmation via webhooks
4. Proof-of-reserves attestation published on-chain

**Phase 3 — Advanced Features**:
1. Aggregate portfolio proofs
2. Batch purchases (multiple NFTs in one shielded transaction)
3. Secondary market (buyer resells while preserving their privacy)
4. Fractional certificates (sub-1 MWh)
5. Multi-currency support

### 10.3 Frontend Requirements

- **Browse/Search page**: Public view of all listed I-REC NFTs with filters (technology, region, vintage, price, seals)
- **NFT Detail page**: Full certificate metadata, price, seller info, Totum custody reference
- **Purchase flow**: Wallet connection → shielded payment → receipt
- **Portfolio dashboard** (private): Buyer's owned certificates (only visible to the authenticated buyer)
- **Proof generator**: UI for generating and exporting ZK proofs for auditors
- **Retirement flow**: Buyer provides beneficiary details → confirmation → status tracking until Evident retirement completes
- **Seller dashboard**: List new NFTs, manage active listings, view sales (amounts without buyer identity)

### 10.4 Key Technical Decisions to Make During Implementation

1. **NFT batching**: Should one NFT represent 1 I-REC (1 MWh) or a batch (e.g., 500 MWh from the same plant/period)? Batching reduces gas costs but reduces granularity. Recommended: allow both — seller chooses.

2. **Price mechanism**: Fixed price only (seller sets, buyer takes it) vs. allowing offers/negotiation. Recommended for MVP: fixed price only.

3. **Payment token**: tDUST (native) for testnet. For mainnet, consider bridged stablecoins (USDC) for real-world pricing.

4. **Retirement beneficiary**: When retiring, the buyer must provide their company name (required by I-REC standard). This breaks anonymity at retirement. This is by design and is expected behavior — align messaging accordingly.

5. **Operator model**: The dApp operator is the intermediary between Totum's broker service and the Midnight contract. In Phase 1, this is manual. In Phase 2, this is automated via Totum's API. Consider whether multiple operators can exist or if it's a single trusted entity.

---

## 11. Glossary

| Term | Definition |
|------|-----------|
| **I-REC** | International Renewable Energy Certificate — proof of 1 MWh of renewable generation |
| **EAC** | Energy Attribute Certificate — generic term for certificates like I-RECs, GOs, US RECs |
| **Instituto Totum** | Sole accredited I-REC issuer in Brazil; also provides broker/custodial service for marketplaces |
| **Evident Registry** | Global registry for I-REC tracking (owned by Xpansiv); single point of truth for legal ownership |
| **Registrant** | Entity that registers production devices and requests certificate issuance (typically the generator) |
| **Participant** | Entity with an active Evident account that can receive, trade, and redeem certificates |
| **Trade Account** | Evident account where certificates can be freely transferred in and out |
| **Redemption Account** | Evident account where certificates are permanently locked to a Beneficiary |
| **Beneficiary** | The end-user entity claiming the environmental benefits of retired certificates |
| **Redemption/Retirement** | Permanent consumption of a certificate to claim its environmental benefits |
| **Redemption Statement** | PDF document issued by Evident certifying a retirement, with QR code verification |
| **Custodial Account** | Totum's Evident Trade Account where certificates are held on behalf of marketplaces |
| **Shielded Transaction** | Midnight transaction where sender, receiver, and/or amount are hidden |
| **ZK Proof** | Zero-knowledge proof — cryptographic proof that a statement is true without revealing underlying data |
| **tDUST** | Midnight testnet native token |
| **Compact** | Midnight's smart contract language (TypeScript-based DSL) |
| **Vintage** | The year/period when the energy was generated (newer = typically more valuable) |
| **Additionality** | Whether the certificate purchase drove new renewable capacity (key quality concern) |
| **REC Brazil Seal** | National sustainability overlay requiring alignment with UN SDGs |
| **CCEE** | Câmara de Comercialização de Energia Elétrica — Brazilian electricity market regulator |
| **GHG Protocol** | Framework for corporate greenhouse gas emissions reporting |
| **Scope 2** | Indirect emissions from purchased electricity — what I-RECs address |
| **RE100** | Global corporate initiative committing to 100% renewable electricity |
| **SBTi** | Science Based Targets initiative |
| **CDP** | Carbon Disclosure Project — global environmental reporting platform |

---

## 12. References and Resources

- I-TRACK Foundation (I-REC governance): https://www.trackingstandard.org
- Instituto Totum (Brazil issuer): https://institutototum.com.br
- Evident Registry: https://evident.app
- Evident Participant User Guide: https://evident.app/pdfs/UG-04-Participant-EV.4.0.0.pdf
- Evident Registrant User Guide: https://documents.evident.services/user-guides/UG-03-Registrant-EV.2.12.pdf
- Midnight blockchain: https://midnight.network
- EXREC (Brazil blockchain platform): https://exrec.com.br
- GoNetZero (Sembcorp): https://gonetzero.ai
- Arkreen (NFT-based REC): https://www.arkreen.com
- CCEE (Brazil energy regulator): https://www.ccee.org.br
- GHG Protocol: https://ghgprotocol.org
- RE100: https://www.there100.org
