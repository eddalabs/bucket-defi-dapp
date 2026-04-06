# Midnight Pickers Privacy dApp — Technical Specification & Knowledge Base

**Version**: 1.0
**Last Updated**: April 2026

## 1. Project Overview

### 1.1 What This Is

A decentralized application (dApp) built on the **Midnight blockchain** that enables the **private acquisition of tokenized Recycling Credits (CCRLRs)** in the Brazilian market. The dApp does not replace the existing reverse logistics regulatory and tracking infrastructure — it adds a **privacy-preserving trading layer** on top of it.

### 1.2 One-Sentence Summary

Cooperatives and managing entities publicly list tokenized recycling credits (as NFTs with full certificate metadata) on the Midnight ledger, and buyers privately acquire them using Midnight's shielded transaction technology, protecting buyer identity, purchase volumes, material mix, and procurement patterns while preserving full auditability through zero-knowledge proofs.

### 1.3 Core Value Proposition

> "Meet your reverse logistics obligations without exposing your packaging volumes, material strategy, or procurement timing to competitors — with cryptographic proof for regulators when you're ready to report."

### 1.4 Naming

- **Pickers** — The name of this recycling credit dApp, honoring the catadores (waste pickers) who are the foundation of Brazil's recycling chain.
- **Karbonity** — The sister dApp for I-REC (renewable energy certificate) trading on Midnight.

---

## 2. Problem Statement

### 2.1 The Brazilian Recycling Credit Market Context

- Brazil generates **27.7 million tonnes** of recyclable waste annually, but the overall recycling rate is only ~4% (ABRELPE data).
- The **PNRS (Law 12,305/2010)** established Extended Producer Responsibility (EPR), requiring manufacturers, importers, distributors, and retailers to take responsibility for post-consumer packaging waste.
- **Decree 11,413/2023** formalized the **recycling credit system (CCRLR — Certificado de Crédito de Reciclagem de Logística Reversa)**, allowing companies to purchase credits instead of operating their own collection programs.
- **Decree 12,688/2025** introduced specific targets for **plastic packaging**: 32% recovery by 2026, scaling to 50% by 2040, with recycled content mandates of 22% (2026) to 40% (2040).
- Each CCRLR represents **1 metric tonne of post-consumer recyclable material** verified as collected, sorted, and returned to the production cycle.
- The projected total market potential is **R$ 14.2 billion** (~USD 2.5–2.8 billion).
- **Catadores (waste pickers)** are responsible for approximately **90% of all municipal solid waste recycling** in Brazil, with 281,000+ registered and potentially 800,000+ total workers.
- Unlike the I-REC market, there is **no single centralized registry** — multiple managing entities (Instituto Giro, Instituto Rever, ANCAT) operate independent systems.

### 2.2 The Privacy Problem in Current Recycling Credit Trading

Current platforms (Eureciclo, BVRio, Rever) provide traceability and compliance documentation but offer **zero buyer privacy**. Every credit purchase reveals strategic information about the buyer.

**Specific problems the dApp solves:**

1. **Packaging volume exposure**: When a company purchases 50,000 tonnes of plastic recycling credits, competitors can directly infer how much plastic packaging the company puts on the market — revealing production volumes and market share.

2. **Material strategy leakage**: The breakdown of credits by material type (plastic vs. glass vs. paper vs. metal) reveals a company's packaging strategy and product portfolio composition. A shift from glass credits to plastic credits signals a packaging redesign before it's announced.

3. **Price discrimination**: Managing entities and platforms know exactly who is buying and in what quantities. Large obligated companies with massive compliance needs — those who need 50,000 tonnes vs. 500 tonnes — face different pricing power. Shielded buyer identity pushes toward fairer price discovery.

4. **Pre-disclosure ESG leakage**: Companies preparing sustainability reports or ESG disclosures under **CVM Resolutions 217–219** (mandatory IFRS-aligned sustainability reporting for listed companies starting FY2026) don't want their credit purchases visible before publication.

5. **M&A due diligence exposure**: EPR compliance history is now scrutinized during acquisitions. Visible credit purchase patterns become a strategic asset or liability that counterparties can analyze before the company is ready to disclose.

6. **Supply chain mapping**: The traceability infrastructure (NF-e, MTR, CDF) creates detailed records of which cooperatives supply which companies. Competitors can map supply chain relationships from credit transaction data.

### 2.3 What Existing Platforms Do (and Don't Do)

| Platform | What it does | What it lacks |
|----------|-------------|---------------|
| **Eureciclo** | Pioneer recycling credit platform; works with 7,000+ companies and 26,000+ recycling actors; 800,000+ tonnes recycled | No buyer privacy, purchase volumes are visible |
| **BVRio** | World's first waste credit trading system (2012); Circular Credits Mechanism (CCM); 100+ cooperatives in 21 states | No buyer privacy, no shielded transactions |
| **Rever** | Managing entity + tech platform; cooperative-focused | No buyer privacy |
| **Polen** | Blockchain marketplace for recycling tracking and credit generation | Blockchain for traceability only, no privacy features |
| **BASF reciChain** | Blockchain pilot for plastic recycling traceability and tokenization | Pilot stage, enterprise-only, no privacy |
| **Circular Brain** | Digital platform for e-waste lifecycle management and traceable credits | Focus on electronics, no privacy features |

**No existing platform offers privacy-preserving buyer transactions for recycling credits. This is the gap the Pickers dApp fills.**

---

## 3. Institutional Architecture: Managing Entities, SINIR, and the Marketplace

### 3.1 Roles and Responsibilities

Understanding the precise division of labor across the institutional chain is critical for the dApp's integration architecture.

**MMA (Ministério do Meio Ambiente e Mudança do Clima)**:
- Sets national policy for reverse logistics and the circular economy
- Accredits managing entities (entidades gestoras)
- Oversees the reverse logistics framework and compliance reporting
- Published **Decree 12,082/2024** establishing the National Circular Economy Strategy

**IBAMA (Instituto Brasileiro do Meio Ambiente)**:
- Enforcement agency for environmental regulations
- Can fine companies for non-compliance with reverse logistics obligations
- Receives compliance reports from managing entities and obligated companies

**SINIR (Sistema Nacional de Informações sobre a Gestão de Resíduos Sólidos)**:
- Operates the national information system for solid waste management
- Manages the **MTR (Manifesto de Transporte de Resíduos)** — the waste transport manifest that tracks physical material from origin to destination
- Provides the underlying traceability infrastructure (not a credit registry itself)
- The **SINIR+** portal integrates databases from multiple systems for planning and monitoring

**Managing Entities (Entidades Gestoras)** — The key integration partners:
- Accredited by MMA to operate collective reverse logistics systems
- Verify recycling events through independent results verifiers
- Issue CCRLRs based on verified electronic invoices
- Manage the relationship between cooperatives/collectors and obligated companies
- **Each managing entity maintains its own credit records** — there is no unified registry

**Key Managing Entities in Brazil:**

| Entity | Description | Associations |
|--------|-------------|--------------|
| **Instituto Giro** | Associated with Eureciclo; certification signed Oct 2023 | ABIPLA, ABIS, ANAP |
| **Instituto Rever** | First accredited by MMA and SEMAD-MG; Term of Commitment with CETESB-SP | Focuses on recycling chain professionalization |
| **ANCAT** | National Association of Waste Pickers; dual role as managing entity and catador advocate | Represents catadores nationally |
| **Instituto ABIA de Meio Ambiente** | Launched by food industry association (ABIA) | Food sector post-consumer packaging |

**Cooperatives and Waste Pickers (Catadores)**:
- Collect and sort post-consumer recyclable materials
- Generate electronic invoices (NF-e) for material sales to recyclers
- Form the base of the credit generation chain
- **Decree 11,413/2023** establishes priority for catadores in the credit generation chain

### 3.2 Managing Entities Are Not Marketplaces

Unlike the I-REC market (where Evident is a centralized ledger), managing entities are **operational coordinators, not trading platforms**. They verify recycling events, issue credits, and report compliance — but they do not operate open marketplaces with listings, prices, or real-time buy/sell functionality.

When an obligated company needs credits, it can:

| Channel | How it works |
|---------|-------------|
| **Direct from managing entity** | Company joins a managing entity (e.g., Instituto Giro via Eureciclo) and purchases credits through their platform |
| **Platform marketplace** | Platforms like Eureciclo or BVRio offer credit trading functionality with price discovery |
| **Bilateral agreements** | Company negotiates directly with cooperatives or recycling operators, with the managing entity verifying the transaction |
| **Broker/intermediary** | Third parties facilitate credit purchases and manage compliance |

**The Pickers dApp is another marketplace option** — managing entities who want to offer their credit inventory to privacy-conscious buyers list on Midnight.

### 3.3 The Custodial Challenge (KEY ARCHITECTURAL DIFFERENCE FROM KARBONITY)

Unlike Karbonity, which benefits from Instituto Totum's established custodial service as a single trusted bridge entity, the Pickers dApp faces a **fragmented custodial landscape**:

- There is no single equivalent of Totum/Evident in the recycling credit market
- Multiple managing entities each operate their own verification and credit issuance systems
- Credits from different managing entities are not interchangeable or cross-verified by default

**Proposed Solution: Managing Entity as Bridge Partner**

The dApp partners with one or more managing entities who act as bridge custodians:

1. The managing entity verifies a recycling event and issues a CCRLR
2. Instead of (or in addition to) delivering the credit directly to the buyer, the managing entity **holds the credit in custody** for the Pickers marketplace
3. The dApp operator mints a corresponding NFT on Midnight with the verified metadata
4. When a sale occurs on-chain, the managing entity records the credit assignment
5. When the buyer retires the credit, the managing entity processes the retirement for compliance reporting

**Phase 1 Strategy**: Partner with **Instituto Giro (Eureciclo)** as the primary bridge entity, given its market dominance (7,000+ companies, 800,000+ tonnes) and existing technology infrastructure. Expand to additional managing entities in later phases.

**Trust model**: The buyer is not trusting the dApp directly — they are trusting an MMA-accredited managing entity that already verifies recycling events for the entire market.

---

## 4. Solution Architecture

### 4.1 Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│            LAYER 1: VERIFICATION & TRACKING (SINIR + NF-e)          │
│                                                                     │
│  Source of truth for recycling events, material flows, and          │
│  final destination verification                                     │
│                                                                     │
│  Cooperative/     NF-e (Electronic      MTR (Waste         CDF     │
│  Catador          Invoice)              Transport          (Final   │
│  ───────────► Sells recyclable ──► Manifesto tracks ──► Destination │
│                material to           physical flow      Certificate)│
│                recycler                                             │
│                                                                     │
│  Independent Results Verifier: cross-references NF-e + MTR + CDF   │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           │ Verified recycling event
                           │ submitted to managing entity
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│          LAYER 2: CREDIT ISSUANCE & CUSTODY (Managing Entity)       │
│                                                                     │
│  Managing Entity (e.g., Instituto Giro / Eureciclo)                │
│                                                                     │
│  ├── Receives verified recycling event data                        │
│  ├── Issues CCRLR (recycling credit certificate)                   │
│  ├── Holds credits in custody on behalf of the marketplace         │
│  ├── Provides API/interface for credit inventory and metadata      │
│  ├── Confirms credit availability and prevents double-assignment   │
│  ├── Processes retirements for compliance reporting                │
│  └── Reports to MMA/IBAMA as required                              │
│                                                                     │
│  TRUST: Buyer trusts MMA-accredited managing entity, not the dApp  │
│  CUSTODY: Credits held by managing entity = locked from being      │
│           assigned elsewhere while listed on the marketplace        │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           │ Managing entity confirms credit data
                           │ to the dApp (manual now, API later)
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│          LAYER 3: PRIVACY MARKETPLACE (Midnight Pickers dApp)       │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    PUBLIC STATE                               │   │
│  │                                                               │   │
│  │  NFT Token (Recycling Credit)                                 │   │
│  │  ├── Credit Reference ID (from managing entity)               │   │
│  │  ├── Material Type (Plastic / Glass / Paper / Metal / Multi)  │   │
│  │  ├── Material Subtype (PET, HDPE, Corrugated, Aluminum, etc.) │   │
│  │  ├── Weight (tonnes)                                          │   │
│  │  ├── Cooperative / Collector (origin)                         │   │
│  │  ├── State / Region of Collection                             │   │
│  │  ├── Recycler (final destination)                             │   │
│  │  ├── Verification Period (date range)                         │   │
│  │  ├── Managing Entity (issuer)                                 │   │
│  │  ├── Listing Price (set by seller/operator)                   │   │
│  │  ├── Seller Identity (public)                                 │   │
│  │  ├── Status (Listed / Sold / Retired)                         │   │
│  │  └── Custody Reference                                        │   │
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
│  │  1. dApp operator mints NFT from managing-entity-confirmed    │   │
│  │     recycling credit data                                     │   │
│  │  2. Buyer sends shielded payment → contract verifies amount   │   │
│  │  3. Contract atomically: transfers NFT to buyer (shielded)    │   │
│  │     + releases payment to seller                              │   │
│  │  4. Buyer can later generate ZK proof of ownership            │   │
│  │  5. Buyer initiates retirement → dApp requests managing       │   │
│  │     entity to process for compliance reporting                │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 What Is Public (Visible on Ledger)

- **The recycling credit NFT metadata**: all certificate attributes (material type, weight, cooperative, region, recycler, verification period)
- **The listing price**: what the seller/operator is asking per tonne
- **The seller identity**: who is selling (managing entity or cooperative — intentionally public for transparency and social impact visibility)
- **The NFT status**: whether it's listed, sold, or retired
- **That a transaction occurred**: the fact that a sale happened is visible, but not to whom

### 4.3 What Is Shielded (Private)

- **Buyer identity**: no one can see which company purchased the credits
- **Payment amount**: the actual amount transferred is hidden
- **Purchase patterns**: multiple purchases by the same buyer are not linkable
- **Portfolio composition**: no one can reconstruct a buyer's credit portfolio (material mix, volumes, timing)
- **Compliance strategy**: competitors cannot infer how much packaging the buyer places on the market

### 4.4 What Is Provable (ZK Proofs)

The buyer can selectively prove:

- **"I hold credits for X tonnes of plastic recycling"** — for reverse logistics compliance reporting to IBAMA
- **"I hold credits covering Y% of my packaging obligation"** — threshold proofs for compliance without revealing total volumes
- **"My credit portfolio includes Z material types"** — material mix claims without revealing specific quantities
- **"I purchased credits from cooperatives in regions A, B, C"** — for social impact reporting (SDG alignment)
- **"I retired N tonnes of credits for FY2025"** — retirement claims for sustainability reports under CVM Resolutions 217–219
- **"My credits were verified by managing entity X"** — provenance claims for audit purposes

These proofs can be generated and shared with regulators, auditors, or ESG reporting frameworks **without revealing the full portfolio or transaction history**.

---

## 5. Technical Components

### 5.1 Operational Roles

The smart contract enforces a flat, four-role access model. The Admin directly manages all other roles — there is no intermediate admin delegation or role-admin hierarchy.

| Role | Responsibility | Who holds it |
|------|---------------|-------------|
| **Admin** | Assigns and revokes all other roles. Pauses/unpauses any module in an emergency. | dApp deployer / organization owner |
| **Minter** | Mints recycling credit NFTs (from managing-entity-confirmed data) with certificate metadata and initial price. Burns unsold tokens (unlisting). Executes burns of purchased tokens on behalf of buyers (bot-executed after buyer authorization via challenge). | dApp operator (backend service / bot) |
| **PoolOperator** | Lists and unlists NFTs in the purchase pool. Updates NFT prices to reflect market conditions. | dApp operator or designated market manager |
| **Verifier** | Verifies and removes buyer identities (KYC/AML whitelist). | Compliance team or KYC service integration |

**Key design decisions:**
- A single Admin controls all role assignments. This keeps governance simple and auditable.
- Roles are non-hierarchical — no role can grant or revoke another role except Admin.
- The same entity may hold multiple roles (e.g., the dApp operator may be both Minter and PoolOperator).
- Each module (Access Control, Identity, Token, Pool) can be independently paused by Admin for emergency response without affecting the others.

### 5.2 NFT Token Design (Recycling Credit Token)

Each tokenized recycling credit is represented as an NFT on Midnight. The token carries two categories of data:

**Public Data (visible to all market participants):**

- **Credit identity**: Reference ID from the managing entity, number of credits represented, and the custody reference linking the NFT to the underlying credits held by the managing entity.
- **Material information**: Material type (plastic, glass, paper/cardboard, metal, multilayer), material subtype (PET, HDPE, LDPE, PP, corrugated, aluminum, tinplate, etc.), and weight in metric tonnes.
- **Collection origin**: Cooperative or collector name, state/region of collection, collection period (date range).
- **Recycler (final destination)**: Licensed recycling facility that received and processed the material.
- **Verification details**: Managing entity that issued the credit, verification period, results verifier identity.
- **Marketplace information**: Seller identity, listing price per tonne, payment currency, and current status (listed, sold, retired, or cancelled).
- **Social impact markers**: Whether the credit originates from a formalized cooperative, fair trade certified, BNDES-supported, or SDG-aligned program.

**Shielded Data (private, provable via zero-knowledge proofs):**

- **Buyer identity**: The current owner after purchase — hidden from all observers.
- **Transaction details**: Purchase hash and timestamp — each purchase generates a unique, unlinkable record.

This separation ensures that credit quality, provenance, and social impact remain fully transparent for market discovery, while buyer identity and purchasing patterns remain private.

### 5.3 Marketplace Capabilities

#### 5.3.1 Seller / Operator Capabilities

- **Mint recycling credit NFTs**: The dApp operator creates NFTs from managing-entity-confirmed credit data, including all public metadata and the initial listing price. Only authorized operators (Minter role) can mint.
- **Cancel listings**: When a seller requests delisting, the operator removes the NFT from the marketplace. This triggers the release of credits back to the managing entity's available inventory.
- **Update pricing**: The pool operator can adjust NFT prices to reflect market conditions at any time while the NFT is listed.

#### 5.3.2 Buyer Capabilities

- **Purchase NFTs privately**: A buyer selects an NFT and completes the purchase in a single atomic transaction. The contract verifies the payment meets the listing price, transfers the NFT to the buyer's shielded identity, and releases payment to the seller — all without revealing who the buyer is. Each purchase generates a unique, unlinkable transaction record.
- **Batch purchases**: Buyers can acquire multiple NFTs (5, 10, or 20) in a single transaction, reducing costs and simplifying compliance portfolio building. Partial batches are supported.
- **Prove ownership**: Buyers can generate a zero-knowledge proof that they own specific credits, shareable with IBAMA, auditors, or sustainability reporting frameworks without revealing their wallet identity.
- **Prove portfolio aggregates**: Buyers can make aggregate claims (e.g., "I hold credits for at least 10,000 tonnes of plastic recycling from Brazil") without revealing which specific credits they hold.
- **Initiate retirement**: The buyer provides the beneficiary company name and reporting period (required for compliance). The dApp operator coordinates with the managing entity to process the retirement and generate compliance documentation.
- **Burn purchased tokens**: Buyers authorize burns by calling `proofOwnership` with a challenge. The Minter/Burner bot then executes `burnPurchasedBatch` with the matching challenge, which verifies authorization, records full lifecycle history (seller, commitment, challenge), and destroys the NFTs. This finalizes the lifecycle on-chain and unlocks the corresponding entry in the web2 credit ledger. The same token ID can be re-minted in a new lifecycle after burn.

### 5.4 Bridge Design: Managing Entity Integration

The bridge between the off-chain recycling credit world and Midnight is mediated by the **partnered managing entity**. The dApp does NOT interact with SINIR, IBAMA, or the NF-e system directly.

```
┌──────────────┐ Verified  ┌──────────────┐   Partner   ┌──────────────┐  Mint/Retire  ┌──────────────┐
│ Cooperative/  │──────────►│  Managing    │◄───────────►│   dApp       │──────────────►│   Midnight   │
│ Collector     │  NF-e +   │  Entity      │  Interface  │   Operator   │               │   Contract   │
│ sells to      │  MTR +    │  (e.g.,      │             │   (Backend)  │               │              │
│ Recycler      │  CDF      │  Inst. Giro) │             │              │               │              │
└──────────────┘           └──────────────┘             └──────────────┘               └──────────────┘
```

**Operational flows:**

**Listing a credit:**
1. Cooperative sells recyclable material to recycler, generating NF-e + MTR + CDF
2. Independent results verifier homologates the recycling event
3. Managing entity issues CCRLR and holds it in custody for the Pickers marketplace
4. Managing entity confirms credit data to the dApp operator (manual initially; API planned)
5. dApp operator mints corresponding NFT(s) on Midnight with the metadata
6. NFT is live and purchasable

**Purchasing (on-chain):**
1. Buyer purchases NFT via shielded transaction on Midnight (fully on-chain, no bridge involvement)
2. Payment goes to seller, NFT ownership transfers to buyer's shielded address
3. Credit remains in the managing entity's custody (ownership change recorded on Midnight only)

**Retirement:**
1. Buyer initiates retirement on Midnight (provides beneficiary company name and reporting period)
2. NFT status set to Retired on Midnight
3. dApp operator requests managing entity to process the retirement for compliance
4. Managing entity records the credit retirement and generates compliance documentation
5. dApp operator confirms completion back on Midnight

**Cancellation:**
1. Seller/operator requests delisting
2. dApp operator cancels the NFT on Midnight
3. Managing entity releases the credit back to available inventory

**Why this works:**
- Credits held in custody by the managing entity are **locked** — they cannot be assigned elsewhere while the marketplace holds them
- The dApp never touches SINIR, NF-e, or IBAMA systems directly — the managing entity is the trusted intermediary
- Double-assignment is prevented because the managing entity controls which credits are available to which marketplace
- Buyers trust an MMA-accredited managing entity, not the dApp

### 5.5 Transaction Privacy Model

#### How a Purchase Works (Step by Step)

1. **Buyer browses listings** — All NFT metadata and prices are public. Buyer can filter by material type, region, cooperative, verification period, price, social impact markers.

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

5. **Buyer can split purchases** — To avoid pattern analysis, a company needing 50,000 tonnes of credits can:
   - Make many separate purchases of different sizes and material types
   - Each purchase generates an independent hash
   - No on-chain link between the transactions
   - The buyer can later prove aggregate compliance via a single ZK proof

#### Privacy Guarantees

| What an observer sees | What remains hidden |
|----------------------|-------------------|
| A credit NFT was sold (status changed) | Who bought it |
| The listed price | The actual payment amount |
| The seller received funds | The buyer's wallet address |
| The credit metadata (material, weight, origin) | The buyer's total credit portfolio |
| Transaction occurred at block N | Links between multiple purchases by same buyer |
| Material type of the credit | The buyer's total material mix |

#### What the Buyer Can Prove (Selective Disclosure)

| Proof Type | Use Case | What It Reveals |
|-----------|----------|----------------|
| Single ownership | "I own this specific credit" | Credit ID + buyer identity, nothing else |
| Aggregate weight | "I hold credits for ≥ 10,000 tonnes of plastic" | Threshold claim, no specific credits |
| Material mix | "My portfolio covers plastic, glass, and paper" | Material types, no volumes |
| Compliance threshold | "I have credits covering ≥ 32% of my packaging obligation" | Percentage claim, no absolute volumes |
| Social impact | "My credits originate from formalized cooperatives" | Origin type, no specific cooperatives |
| Retirement proof | "I retired N tonnes of credits for FY2025" | Retirement claim for compliance reporting |

---

## 6. API Recommendations for Managing Entity Partner Integration

The primary managing entity partner (initially Instituto Giro/Eureciclo) will need to provide an API for the Pickers dApp to consume. The following are architectural recommendations designed to enable efficient integration.

### 6.1 Core Design Principles

1. **RESTful + Webhooks**: REST API for queries and commands, webhooks for async event notifications (credit issuances, retirement confirmations, status changes). Marketplaces need to react to events in real-time, not poll constantly.

2. **Idempotent operations**: Every write operation (lock, retirement request, cancellation) should accept a client-generated `idempotency_key` so that retries don't create duplicate actions.

3. **OAuth 2.0 + API keys**: Marketplace authentication via OAuth 2.0 with scoped permissions (read-only, trade, retire). Each marketplace gets its own credentials. Rate limiting per marketplace.

4. **Eventual consistency acknowledged**: The API should clearly communicate that credit operations (issuance, retirement) are not instant. Provide explicit status fields and webhook notifications for state transitions.

### 6.2 Recommended Endpoints

#### 6.2.1 Credit Inventory

```
GET /v1/custody/credits
```
Returns all credits currently held in custody on behalf of the Pickers marketplace.

**Query parameters:**
- `marketplace_id` — Which marketplace is querying
- `material_type` — Filter by plastic, glass, paper, metal, multilayer (optional)
- `material_subtype` — Filter by PET, HDPE, corrugated, aluminum, etc. (optional)
- `state_region` — Filter by state/region of collection (optional)
- `cooperative_id` — Filter by cooperative (optional)
- `verification_period_start` / `verification_period_end` — Filter by verification date (optional)
- `status` — Filter by: `available`, `locked`, `sold`, `retired` (optional)
- `page` / `page_size` — Pagination

**Response per credit (or batch):**
```json
{
  "custody_ref": "GIRO-2026-00451",
  "credit_count": 50,
  "weight_tonnes": 50,
  "material": {
    "type": "plastic",
    "subtype": "PET",
    "description": "Post-consumer PET bottles"
  },
  "collection": {
    "cooperative_name": "Cooperativa Recicla Vida",
    "cooperative_id": "COOP-SP-00234",
    "state_region": "São Paulo",
    "country": "BR",
    "collection_period_start": "2025-10-01",
    "collection_period_end": "2025-12-31"
  },
  "recycler": {
    "name": "Indústria Recicladora Paulista Ltda.",
    "facility_id": "REC-SP-00891",
    "license_number": "CETESB-2024-12345"
  },
  "verification": {
    "managing_entity": "Instituto Giro",
    "results_verifier": "Auditoria Verde S.A.",
    "verified_at": "2026-01-20T10:00:00Z",
    "nfe_access_keys": ["35260112345678901234567890123456789012345678"],
    "mtr_reference": "MTR-SP-2026-00234"
  },
  "social_impact": {
    "formalized_cooperative": true,
    "fair_trade_certified": false,
    "bndes_supported": true,
    "sdg_alignment": ["SDG-8", "SDG-11", "SDG-12"]
  },
  "status": "available",
  "deposited_at": "2026-01-25T14:30:00Z"
}
```

#### 6.2.2 Credit Detail

```
GET /v1/custody/credits/{custody_ref}
```
Returns full detail for a specific credit batch, including NF-e references, MTR data, and CDF confirmation for audit purposes.

#### 6.2.3 Lock Credits for Listing

```
POST /v1/custody/credits/{custody_ref}/lock
```
Locks a credit batch so it can only be used by the Pickers marketplace.

**Request body:**
```json
{
  "marketplace_id": "midnight-pickers-dapp",
  "idempotency_key": "lock-2026-02-08-001",
  "lock_duration_hours": 720,
  "callback_url": "https://dapp-backend.example/webhooks/managing-entity"
}
```

**Response:**
```json
{
  "custody_ref": "GIRO-2026-00451",
  "lock_status": "locked",
  "locked_by": "midnight-pickers-dapp",
  "locked_at": "2026-02-08T10:00:00Z",
  "lock_expires_at": "2026-03-10T10:00:00Z"
}
```

#### 6.2.4 Unlock / Release Credits

```
POST /v1/custody/credits/{custody_ref}/unlock
```
Releases the lock, making credits available again. Used when listings are cancelled.

**Request body:**
```json
{
  "marketplace_id": "midnight-pickers-dapp",
  "idempotency_key": "unlock-2026-02-08-001",
  "reason": "listing_cancelled"
}
```

#### 6.2.5 Confirm Sale

```
POST /v1/custody/credits/{custody_ref}/sale
```
Notifies the managing entity that a sale has been completed on the marketplace.

**Request body:**
```json
{
  "marketplace_id": "midnight-pickers-dapp",
  "idempotency_key": "sale-2026-02-08-001",
  "sale_timestamp": "2026-02-08T15:30:00Z",
  "on_chain_tx_ref": "midnight_tx_hash_abc123",
  "disposition": "hold_for_retirement"
}
```

**`disposition` options:**
- `hold_for_retirement` — Keep in custody until buyer requests retirement (most common since buyer identity is shielded)
- `assign_to_company` — Assign credit to a specific company's compliance account (buyer would need to reveal identity, breaking some privacy)

#### 6.2.6 Request Retirement

```
POST /v1/custody/credits/{custody_ref}/retire
```
Requests that the managing entity process the retirement for compliance reporting.

**Request body:**
```json
{
  "marketplace_id": "midnight-pickers-dapp",
  "idempotency_key": "retire-2026-02-08-001",
  "beneficiary": {
    "company_name": "Embalagens Brasil S.A.",
    "cnpj": "12.345.678/0001-99",
    "country": "BR",
    "reporting_period_start": "2025-01-01",
    "reporting_period_end": "2025-12-31",
    "obligation_sector": "general_packaging"
  },
  "on_chain_tx_ref": "midnight_retire_tx_hash_def456",
  "callback_url": "https://dapp-backend.example/webhooks/managing-entity/retirement"
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
  "compliance_reference": "COMP-2026-12345",
  "compliance_document_url": "https://managing-entity.example/compliance/...",
  "completed_at": "2026-02-09T16:00:00Z"
}
```

### 6.3 Webhooks

The API should push notifications for key events.

**Recommended webhook events:**

| Event | Trigger | Payload includes |
|-------|---------|-----------------|
| `credit.issued` | New credits verified and available for listing | Credit metadata, custody_ref, cooperative info |
| `credit.locked` | Lock confirmed | custody_ref, marketplace_id, expiration |
| `credit.lock_expired` | Lock timed out without sale | custody_ref, original marketplace_id |
| `credit.unlocked` | Lock released (cancellation) | custody_ref, reason |
| `retirement.processing` | Managing entity has started processing | retirement_request_id |
| `retirement.completed` | Retirement finalized and compliance docs generated | retirement_request_id, compliance_document_url |
| `retirement.failed` | Retirement could not be processed | retirement_request_id, error_reason |

**Webhook format:**
```json
{
  "event": "retirement.completed",
  "timestamp": "2026-02-09T16:00:00Z",
  "marketplace_id": "midnight-pickers-dapp",
  "data": {
    "retirement_request_id": "RET-2026-00089",
    "custody_ref": "GIRO-2026-00451",
    "compliance_reference": "COMP-2026-12345",
    "compliance_document_url": "https://managing-entity.example/compliance/..."
  },
  "signature": "hmac_sha256_of_payload"
}
```

### 6.4 Additional API Recommendations

**Batch operations**: Allow locking, confirming sales, and requesting retirements for multiple credit batches in a single API call.

**Cooperative onboarding endpoint**: An endpoint that returns a deposit reference for a cooperative, so when they sell materials and the credit is generated, it can be automatically associated with the Pickers marketplace.

```
POST /v1/cooperatives/onboard
→ Returns: { "cooperative_id": "...", "marketplace_association": "...", "instructions": "..." }
```

**Proof-of-reserves endpoint**: Returns a signed attestation of the current state of credits in custody, which the marketplace can publish or use on-chain.

```
GET /v1/custody/attestation
→ Returns: { "total_credits": 45000, "total_tonnes": 45000, "by_material": {...}, "by_marketplace": {...}, "timestamp": "...", "signature": "..." }
```

---

## 7. Recycling Credit Domain Knowledge

### 7.1 What Is a Recycling Credit (CCRLR)

A CCRLR (Certificado de Crédito de Reciclagem de Logística Reversa) is a document issued by an accredited managing entity (entidade gestora) proving that **1 metric tonne of post-consumer recyclable material** has been collected, sorted, and verifiably returned to the production cycle (recycled). It was formalized by **Decree 11,413/2023** as the primary instrument for companies to demonstrate compliance with reverse logistics obligations under the PNRS.

### 7.2 Credit Types Under Decree 11,413/2023

| Credit Type | What It Certifies | Use Case |
|-------------|-------------------|----------|
| **CCRLR** | Return of equivalent mass to production cycle | Standard compliance credit — the primary tradeable instrument |
| **CERE** | Investment in structured recycling infrastructure projects | Companies investing beyond credit purchases |
| **Future Mass Credit** | Forward-looking investment in long-term recycling capacity | Companies meeting goals in advance |

The Pickers dApp focuses on **CCRLR** as the tradeable instrument.

### 7.3 Recycling Credit Lifecycle

```
Collection → Verification → Issuance → Trading → Retirement

1. COLLECTION: Catadores (waste pickers), cooperatives, or formal waste
   operators collect post-consumer recyclable materials. Materials are
   sorted by type at cooperatives or sorting facilities.

2. SALE TO RECYCLER: The cooperative/collector sells sorted materials to
   a licensed recycling industry. This generates an electronic invoice
   (NF-e) with a unique 44-digit access key, plus a Waste Transport
   Manifest (MTR) and a Certificate of Final Destination (CDF).

3. VERIFICATION: An independent results verifier (verificador de
   resultados), contracted by the managing entity, homologates the
   transaction: checks NF-e authenticity, uniqueness, MTR cross-reference,
   CDF confirmation, and receipt by the recycler.

4. ISSUANCE: The managing entity (entidade gestora) issues a CCRLR
   based on the verified recycling event. Each credit is individualized
   and linked to specific invoices and verified events.

5. TRADING: Companies obligated under PNRS purchase credits from
   managing entities or through certified platforms. Credits can be
   transferred between parties.

6. RETIREMENT: Credits are retired when used for compliance reporting.
   The managing entity records the retirement with beneficiary details.
   The company reports its reverse logistics performance to IBAMA/MMA
   with CCRLRs as documentary proof.
```

### 7.4 Key Credit Attributes

- Managing entity reference ID
- Material type (plastic, glass, paper/cardboard, metal, multilayer)
- Material subtype (PET, HDPE, LDPE, PP, corrugated, aluminum, etc.)
- Weight in metric tonnes
- Cooperative/collector of origin
- State/region of collection
- Collection period (date range)
- Recycler (final destination facility)
- Verification date
- NF-e access key(s)
- MTR reference(s)
- Social impact indicators

### 7.5 Recycling Credit Nature: Semi-Fungible

Recycling credits are **semi-fungible**, similar to I-RECs:

- Two credits for **different materials** are distinguishable and may have different market values (aluminum vs. glass, PET vs. multilayer).
- Two credits for the **same material from the same cooperative in the same period** are functionally identical.
- Buyers care about material type, origin, and social impact — these attributes affect desirability and price even though all represent 1 tonne of recycled material.
- **Obligated companies need specific material types**: A company that produces plastic packaging needs plastic credits, not glass credits. This creates material-specific demand.

### 7.6 Material Types and Market Values

| Material | Avg. Material Price (R$/kg) | Credit Price Drivers | Notes |
|----------|---------------------------|---------------------|-------|
| **Aluminum** | R$ 4.77 | Lowest credit premium (material itself is valuable) | Brazil recycles 97.3% of aluminum cans (world leader) |
| **Plastic** | R$ 1.73 | High credit demand due to Decree 12,688/2025 targets | Varies significantly by resin type |
| **Paper/Cardboard** | R$ 0.81 | Moderate; volatile commodity prices | Dropped to R$ 0.15/kg in early 2024 |
| **Glass** | R$ 0.21 | Highest credit premium relative to material value | Low commodity value but same logistics cost |
| **Multilayer** | Minimal | Highest credit premium (hardest to recycle) | Tetra Pak-type packaging, limited recycling infrastructure |

Credit prices for compliance purposes are **higher** than raw material prices because they include collection, sorting, verification, and certification costs. Glass and multilayer credits are particularly expensive relative to material value.

### 7.7 Obligated Sectors and Compliance Targets

**General Packaging (Embalagens em Geral)**:
- Covers: paper, plastic, glass, metal, and multilayer packaging
- Obligated parties: manufacturers, importers, distributors, retailers of packaged goods
- Compliance via: individual reverse logistics programs OR purchase of CCRLRs from managing entities

**Plastic Packaging (Decree 12,688/2025)**:

| Target | 2026 | 2030 | 2040 |
|--------|------|------|------|
| Recovery rate (% of plastic placed on market) | 32% | Incremental | 50% |
| Recycled content in plastic packaging | 22% | 30% | 40% |

- Effective January 2026 for large companies, July 2026 for SMEs
- Exemptions: food packaging (from recycled content), products covered by specific decrees (electronics, medicines, pesticides)

**Other sectors with specific reverse logistics obligations:**
- Pesticide packaging (nearly 100% return rate via inpEV — most mature system)
- Batteries
- Tires
- Lubricating oils
- Fluorescent lamps
- Electronics/WEEE (Decree 10,240/2020)
- Medicines (Decree 10,388/2020)

### 7.8 Verification Chain: Preventing Double-Counting

| Layer | Mechanism | What It Prevents |
|-------|-----------|-----------------|
| **NF-e uniqueness** | Each electronic invoice has a unique 44-digit access key validated by SEFAZ | Same invoice used for multiple credits |
| **MTR tracking** | Waste Transport Manifest tracks physical material flow via SINIR | Phantom recycling claims without physical material |
| **CDF confirmation** | Certificate of Final Destination from licensed recycler | Claims without actual recycling processing |
| **Results verifier** | Independent annual audits cross-referencing NF-e + MTR + CDF | Systemic fraud at cooperative or managing entity level |

**Known structural weakness**: Different managing entities operate independent verification systems. There is no mandatory cross-check between them at the national level, creating **cross-entity double-counting risk**. This is a gap the Pickers dApp could help address by providing a transparent, on-chain record of which credits are listed and sold.

### 7.9 Important: Retirement Makes Beneficiary Public

When a recycling credit is retired for compliance, the **beneficiary company name and CNPJ become part of the compliance record** submitted to IBAMA/MMA. This is required for reverse logistics reporting.

**Implication for the dApp**: Privacy is preserved **during the trading and holding phase**, not at final retirement. The value is protecting the *timing, volumes, material mix, and procurement strategy* during the acquisition phase — before the company is ready to file its compliance reports.

---

## 8. The Social Dimension: Catadores and Cooperatives

### 8.1 Why This Matters for the dApp

The recycling credit market is fundamentally different from the energy certificate market in one critical way: **the credits originate from human labor by some of Brazil's most vulnerable workers**. The Pickers dApp has both an opportunity and a responsibility to preserve and amplify the social value of the credit chain.

### 8.2 Catadores by the Numbers

- **281,000+** registered waste pickers (actual number may reach 800,000+)
- Responsible for **~90% of all municipal solid waste recycling** in Brazil
- Estimated economic contribution of **USD 5.5 billion** in recycling value
- ~55% have limited literacy or have not completed elementary school
- Work individually on streets/landfills or collectively through cooperatives

### 8.3 Cooperatives

Cooperatives provide:
- Safer working conditions and more predictable incomes
- Access to social services and collective bargaining power
- Ability to generate electronic invoices (NF-e) required for credit issuance
- Formalized standing for contracts, grants, and credit market participation

### 8.4 Legal Protections

- **Decree 11,413/2023** establishes **priority for catadores** in the credit generation chain — NF-e for credit generation should preferentially originate from waste picker trading operations
- **BNDES "Tudo na Circularidade"** (March 2025): R$ 20 million program to expand cooperative access to the credit market
- Legal reforms have strengthened the formal standing of cooperatives

### 8.5 Social Impact in NFT Design

The Pickers dApp NFT metadata includes **social impact markers**:
- Whether the credit originates from a formalized cooperative
- Fair trade certification status
- BNDES or government program support
- SDG alignment indicators (SDG-8: Decent Work, SDG-11: Sustainable Cities, SDG-12: Responsible Consumption)

This enables buyers to **select credits with higher social impact** while maintaining their purchasing privacy. A buyer can prove "my credits come from formalized cooperatives" via ZK proof for ESG reporting without revealing which cooperatives or how many credits.

---

## 9. Competitive Positioning

### 9.1 What Makes This Different

| Feature | Eureciclo | BVRio | Polen | BASF reciChain | **Pickers dApp** |
|---------|-----------|-------|-------|----------------|-------------------|
| Credit trading | ✅ | ✅ | ✅ | Pilot | ✅ |
| Blockchain-based | ❌ | ❌ | ✅ (green blockchain) | ✅ (pilot) | ✅ Midnight |
| NFT representation | ❌ | ❌ | ❌ | ❌ | ✅ Native NFT |
| Buyer privacy | ❌ | ❌ | ❌ | ❌ | ✅ Shielded |
| Unlinkable purchases | ❌ | ❌ | ❌ | ❌ | ✅ Per-tx hash |
| ZK proof of compliance | ❌ | ❌ | ❌ | ❌ | ✅ Selective disclosure |
| Social impact tracking | Partial | ✅ | Partial | ❌ | ✅ On-chain metadata |
| Anti-front-running | ❌ | ❌ | ❌ | ❌ | ✅ Volume fragmentation |
| Custodian | Self | Self | Self | Self | **MMA-accredited managing entity** |

### 9.2 Target Users

**Primary**: Large consumer goods companies, packaged food manufacturers, and multinationals with significant reverse logistics obligations who want to control ESG disclosure timing and prevent competitors from inferring packaging volumes and material strategy.

**Secondary**: ESG compliance managers and sustainability consultants managing reverse logistics obligations for multiple clients who need to prevent cross-client information leakage.

**Tertiary**: Any obligated company that values fair pricing without identity-based price discrimination. Companies needing 50,000 tonnes of credits face different pricing than those needing 500 tonnes — shielded identity levels the field.

---

## 10. Regulatory Alignment

### 10.1 Compliance Framework Compatibility

| Framework | How the dApp supports it |
|-----------|------------------------|
| **PNRS (Law 12,305/2010)** | ZK proofs demonstrate credit ownership for reverse logistics compliance; retirement generates required documentation |
| **Decree 11,413/2023** | CCRLRs are the native tradeable instrument; dApp preserves the credit's regulatory validity |
| **Decree 12,688/2025** | Supports plastic-specific compliance targets with material-type filtering and aggregate proofs |
| **CVM Resolutions 217–219** | Selective disclosure proofs provide auditable evidence for IFRS-aligned sustainability reporting (mandatory FY2026+) |
| **LGPD** | Privacy-preserving transactions align with Brazil's data protection law; buyer data is never exposed on-chain |
| **GHG Protocol** | Aggregate proofs can demonstrate Scope 3 waste management practices |
| **SDG Reporting** | Social impact metadata enables SDG-8, SDG-11, SDG-12 alignment claims via ZK proofs |
| **ESG Frameworks (CDP, GRI)** | Selective disclosure proofs provide auditable evidence without revealing portfolio details |

### 10.2 Key Regulatory Considerations

- The recycling credit market is driven by **mandatory obligations** under PNRS (unlike I-RECs which are voluntary), creating strong structural demand.
- **Decree 12,688/2025** specifically increases compliance pressure for plastic packaging starting January 2026, creating an immediate market opportunity.
- **CVM Resolutions 217–219** make sustainability disclosure mandatory for listed companies starting FY2026 — companies will need auditable proof of compliance without premature exposure.
- IBAMA enforcement is increasing — fines for non-compliance with reverse logistics obligations create urgency for reliable credit procurement.
- **LGPD (Lei Geral de Proteção de Dados)** — Brazil's data protection law supports the privacy-preserving approach. The STJ has ruled that credit protection does not authorize sharing identifiable data without consent, reinforcing the case for shielded transactions.

---

## 11. Implementation Considerations

### 11.1 Why Midnight

Same rationale as Karbonity: Midnight natively supports the dual-state model required — public state for credit metadata and marketplace transparency, and private (shielded) state for buyer identity and transaction details. Zero-knowledge proofs are built into the protocol. The Pickers dApp can share infrastructure, tooling, and smart contract patterns with Karbonity.

### 11.2 MVP Scope (Recommended)

**Phase 1 — Core Trading (Manual Bridge via Managing Entity)**:
1. Managing entity verifies recycling event and issues CCRLR
2. Managing entity confirms credit data to dApp operator (manual — email/dashboard)
3. dApp operator mints corresponding recycling credit NFTs on Midnight
4. Buyer purchases NFTs via shielded transactions
5. Buyer can prove ownership via ZK proof
6. Retirement: buyer requests → dApp operator → managing entity processes for compliance

**Phase 2 — Managing Entity API Integration**:
1. Automated credit inventory sync via managing entity API
2. Automated lock/unlock lifecycle
3. Automated retirement requests and confirmation via webhooks
4. Proof-of-reserves attestation published on-chain

**Phase 3 — Advanced Features**:
1. Aggregate portfolio proofs (material mix, compliance thresholds)
2. Batch purchases (multiple NFTs in one shielded transaction)
3. Multi-managing-entity support (Instituto Giro + Instituto Rever + ANCAT)
4. Secondary market (buyer resells while preserving privacy)
5. Social impact scoring and premium pricing for high-impact credits
6. Cross-entity double-counting verification on-chain
7. Multi-currency support

### 11.3 Frontend Requirements

- **Browse/Search page**: Public view of all listed recycling credit NFTs with filters (material type, subtype, region, cooperative, verification period, price, social impact)
- **NFT Detail page**: Full credit metadata, price, cooperative info, recycler info, social impact markers, custody reference
- **Purchase flow**: Wallet connection → shielded payment → receipt
- **Portfolio dashboard** (private): Buyer's owned credits (only visible to the authenticated buyer), with compliance tracking (how much of their obligation is covered)
- **Proof generator**: UI for generating and exporting ZK proofs for IBAMA, auditors, and ESG reporting
- **Retirement flow**: Buyer provides beneficiary company details and reporting period → confirmation → status tracking until compliance documentation is generated
- **Operator dashboard**: List new NFTs, manage active listings, view sales (amounts without buyer identity)
- **Social impact dashboard** (public): Aggregate statistics on cooperatives supported, catadores benefited, tonnes recycled through the platform — transparency without revealing individual buyer data

### 11.4 Key Technical Decisions to Make During Implementation

1. **NFT batching**: Should one NFT represent 1 tonne or a batch (e.g., 50 tonnes from the same cooperative/period)? Batching reduces gas costs but reduces granularity. Recommended: allow both — operator chooses based on credit batch size.

2. **Material-type filtering**: Credits are not interchangeable across material types. A company obligated for plastic needs plastic credits. The marketplace must make material-type filtering prominent and the smart contract should store material type as a public attribute.

3. **Price mechanism**: Fixed price only (operator sets, buyer takes it) vs. allowing offers/negotiation. Recommended for MVP: fixed price only.

4. **Payment token**: tDUST (native) for testnet. For mainnet, consider bridged stablecoins (USDC) or BRL-pegged tokens for real-world pricing.

5. **Retirement beneficiary**: When retiring, the buyer must provide their company name and CNPJ (required for IBAMA/MMA compliance). This breaks anonymity at retirement. This is by design — align messaging accordingly.

6. **Managing entity selection**: Phase 1 partners with a single managing entity (recommended: Instituto Giro/Eureciclo for market dominance and tech maturity). Phase 3 adds multi-entity support. Cross-entity interoperability is a differentiator.

7. **Shared infrastructure with Karbonity**: The Pickers and Karbonity dApps share the same Midnight platform, smart contract patterns, and role model. Consider whether they share a common frontend or operate as separate marketplace instances.

---

## 12. Glossary

| Term | Definition |
|------|-----------|
| **CCRLR** | Certificado de Crédito de Reciclagem de Logística Reversa — recycling credit proving 1 tonne of verified recycling |
| **CERE** | Certificado de Estruturação e Reciclagem de Embalagens em Geral — certificate for investment in recycling infrastructure |
| **PNRS** | Política Nacional de Resíduos Sólidos (Law 12,305/2010) — Brazil's national solid waste policy establishing EPR |
| **EPR** | Extended Producer Responsibility — principle that manufacturers are responsible for post-consumer packaging |
| **Logística Reversa** | Reverse logistics — the system for collecting and recycling post-consumer products and packaging |
| **Catador(a)** | Waste picker — the workers who collect and sort recyclable materials in Brazil |
| **Cooperativa** | Cooperative — organized group of catadores with formal legal standing |
| **Entidade Gestora** | Managing entity — MMA-accredited organization that operates collective reverse logistics systems and issues CCRLRs |
| **Instituto Giro** | Managing entity associated with Eureciclo |
| **Instituto Rever** | Managing entity accredited by MMA, focused on recycling chain professionalization |
| **ANCAT** | Associação Nacional dos Catadores — national catador association, also accredited as managing entity |
| **Eureciclo** | Dominant recycling credit platform and technology partner for Instituto Giro |
| **BVRio** | Bolsa Verde do Rio de Janeiro — pioneered waste credit trading systems in Brazil |
| **NF-e** | Nota Fiscal Eletrônica — electronic invoice with unique 44-digit access key, legally binding in Brazil |
| **MTR** | Manifesto de Transporte de Resíduos — waste transport manifest tracking physical material flow via SINIR |
| **CDF** | Certificado de Destinação Final — certificate confirming material reached a licensed recycler |
| **SINIR** | Sistema Nacional de Informações sobre a Gestão de Resíduos Sólidos — national waste management information system |
| **MMA** | Ministério do Meio Ambiente e Mudança do Clima — Ministry of Environment |
| **IBAMA** | Instituto Brasileiro do Meio Ambiente — environmental enforcement agency |
| **CETESB** | Companhia Ambiental do Estado de São Paulo — São Paulo state environmental agency |
| **CCEE** | Câmara de Comercialização de Energia Elétrica — Brazilian electricity market regulator |
| **CVM** | Comissão de Valores Mobiliários — Brazil's securities regulator |
| **LGPD** | Lei Geral de Proteção de Dados — Brazil's general data protection law |
| **CNPJ** | Cadastro Nacional da Pessoa Jurídica — Brazilian company registration number |
| **SEFAZ** | Secretaria da Fazenda — state tax authority that validates NF-e |
| **Shielded Transaction** | Midnight transaction where sender, receiver, and/or amount are hidden |
| **ZK Proof** | Zero-knowledge proof — cryptographic proof that a statement is true without revealing underlying data |
| **tDUST** | Midnight testnet native token |
| **Compact** | Midnight's smart contract language (TypeScript-based DSL) |
| **SDG** | Sustainable Development Goals (United Nations) |
| **GHG Protocol** | Framework for corporate greenhouse gas emissions reporting |
| **CDP** | Carbon Disclosure Project — global environmental reporting platform |
| **GRI** | Global Reporting Initiative — sustainability reporting standards |
| **CEMPRE** | Compromisso Empresarial para Reciclagem — business coalition promoting recycling |
| **ABRELPE** | Associação Brasileira de Empresas de Limpeza Pública e Resíduos Especiais — waste management industry association |

---

## 13. References and Resources

- PNRS (Law 12,305/2010): https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12305.htm
- Decree 11,413/2023 (Recycling credits): https://www.planalto.gov.br/ccivil_03/_Ato2023-2026/2023/Decreto/D11413.htm
- Decree 12,688/2025 (Plastic packaging): https://www.planalto.gov.br/ccivil_03/_Ato2023-2026/2025/Decreto/D12688.htm
- SINIR+ Portal: https://sinir.gov.br/
- MMA (Ministry of Environment): https://www.gov.br/mma
- IBAMA: https://www.gov.br/ibama
- Eureciclo: https://eureciclo.com.br
- BVRio (Circular Credits Mechanism): https://www.bvrio.org/reverse-logistics-credits/
- Instituto Rever: https://rever.org.br/
- ANCAT: https://www.ancat.org.br
- CEMPRE: https://cempre.org.br
- ABRELPE: https://abrelpe.org.br
- Polen (blockchain marketplace): https://polen.com.br
- Midnight blockchain: https://midnight.network
- LGPD (Data Protection): https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- GHG Protocol: https://ghgprotocol.org
- I-TRACK Foundation (I-REC governance): https://www.trackingstandard.org
