# MVP: Private Sticker Album — Digital Collectibles Marketplace

## Vision

A digital sticker album platform where users collect, trade, and complete albums — powered by zero-knowledge privacy on the Midnight Network. Users buy random sticker packs in web2, manage their collections, and trade duplicates on a private web3 marketplace where buyer identity is never exposed.

Think **Panini sticker albums meets privacy-preserving blockchain**.

---

## Why This MVP

- **Self-contained**: We mint all stickers ourselves — no third-party partnerships required
- **Natural marketplace demand**: Random packs guarantee duplicates, forcing a secondary market
- **Privacy makes sense**: Collectors don't want others knowing which stickers they're missing (prevents price manipulation)
- **Maps directly to the private-buyer contract**: zero code changes needed
- **Revenue generating**: Multiple monetization streams from day one

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          STICKER ALBUM PLATFORM                             │
├─────────────────────────────────┬───────────────────────────────────────────┤
│          WEB2 LAYER             │              WEB3 LAYER                   │
│      (Edda Backend + DB)        │     (Private-Buyer Smart Contract)        │
│                                 │        (Midnight Network)                 │
│  ┌───────────┐                  │                                           │
│  │  Purchase  │  Buy packs      │                                           │
│  │  Sticker   │  with fiat/     │                                           │
│  │  Packs     │  crypto         │                                           │
│  └─────┬─────┘                  │                                           │
│        │ random                 │                                           │
│        ▼ distribution           │                                           │
│  ┌───────────┐                  │  ┌──────────────────────┐                 │
│  │  My        │  view, organize │  │  NFT Pool             │                │
│  │  Collection│─────────────────┼─►│  (Marketplace)        │                │
│  │            │  list for sale   │  │                       │                │
│  └─────┬─────┘                  │  │  - Listed stickers    │                │
│        │                        │  │  - Prices             │                │
│        │ transfer               │  │  - Purchase counter   │                │
│        ▼                        │  └───────────┬───────────┘                │
│  ┌───────────┐                  │              │                            │
│  │  Trade     │  gift/swap      │              ▼                            │
│  │  with      │  between        │  ┌──────────────────────┐                 │
│  │  Friends   │  friends        │  │  Private Purchase      │               │
│  └─────┬─────┘                  │  │                       │                │
│        │                        │  │  - ZK commitment      │                │
│        │ retire (glue)          │  │  - Shielded payment   │                │
│        ▼                        │  │  - Batch buy (5/10/20)│                │
│  ┌───────────┐                  │  └───────────┬───────────┘                │
│  │  Album     │  place sticker  │              │                            │
│  │  Board     │  permanently    │              ▼                            │
│  │            │◄────────────────┼──┌──────────────────────┐                 │
│  └───────────┘  burn on-chain   │  │  Proof & Retire       │                │
│                                 │  │                       │                │
│                                 │  │  - proofOwnership     │                │
│                                 │  │  - burnPurchasedBatch │                │
│                                 │  │  - Lifecycle tracking │                │
│                                 │  └──────────────────────┘                 │
│                                 │                                           │
│  ┌───────────┐                  │  ┌──────────────────────┐                 │
│  │  Seller    │◄────────────────┼──│  withdrawSellerFunds  │                │
│  │  Dashboard │  withdraw       │  │  (shielded payout)   │                │
│  └───────────┘  earnings        │  └──────────────────────┘                 │
├─────────────────────────────────┴───────────────────────────────────────────┤
│                          BACKEND (Bridge)                                    │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────┐       │
│  │  Edda Backend Service                                            │       │
│  │                                                                  │       │
│  │  Roles: Admin(0) + Minter(1) + PoolOperator(2) + Verifier(3)    │       │
│  │                                                                  │       │
│  │  - Mints NFTs when packs are purchased (Minter role)             │       │
│  │  - Lists stickers in pool (PoolOperator role)                    │       │
│  │  - Verifies user identities (Verifier role)                      │       │
│  │  - Executes authorized burns (Minter role)                       │       │
│  │  - Manages pricing and seasonal drops                            │       │
│  └──────────────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Contract Mapping

The private-buyer contract maps directly to the sticker album without modifications:

### Certificate = Sticker

```
Certificate {
  id:         Opaque<"string">   →  Sticker unique ID (e.g., "WC2026-BR-042")
  source:     Source enum        →  Sticker Category (see album themes below)
  generation: Uint<64>           →  Print Run / Edition Number
  vintage:    Uint<64>           →  Season / Year of the album
  impact:     Impact enum        →  Rarity Tier
  location:   Location enum      →  Album Section / Page
}
```

### Rarity Tiers (Impact enum)

| Impact Value | Sticker Rarity | Drop Rate | Pack Odds   |
|-------------|----------------|-----------|-------------|
| Minimal     | Common         | 50%       | 3-4 per pack |
| Low         | Uncommon       | 25%       | 1-2 per pack |
| Medium      | Rare           | 15%       | ~1 per pack  |
| High        | Epic           | 8%        | 1 in 3 packs |
| Extreme     | Legendary      | 2%        | 1 in 10 packs|

### Contract Operations = User Actions

| Contract Circuit          | Album Action                                      |
|--------------------------|---------------------------------------------------|
| `mint`                   | Backend mints sticker NFTs when pack is purchased  |
| `addToPool`              | User lists duplicate sticker for sale               |
| `removeFromPool`         | User delists a sticker                              |
| `purchaseNFT`            | Buy a single sticker privately                      |
| `purchaseBatch5/10/20`   | Buy multiple stickers in one private transaction    |
| `proofOwnership`         | Prove you own a sticker (for retiring/redeeming)   |
| `burnPurchasedBatch`     | "Glue" sticker to album (permanently retire)        |
| `burn`                   | Remove unsold sticker from circulation               |
| `withdrawSellerFunds`    | Seller collects earnings from sold stickers          |
| `setTokenPrice`          | Operator adjusts sticker marketplace price           |
| `tokenCertificate`       | View sticker metadata (category, rarity, edition)   |
| `setUser`                | Register/verify a new collector                      |

### Roles = Platform Operators

| Role            | ID | Album Role                                              |
|-----------------|----|---------------------------------------------------------|
| Admin Master    | 0  | Platform administrator                                   |
| Minter          | 1  | Backend bot: mints packs, executes authorized burns      |
| PoolOperator    | 2  | Marketplace manager: lists stickers, adjusts prices      |
| Verifier        | 3  | KYC/identity: approves new collectors                    |

---

## User Flows

### Flow 1: Buy a Sticker Pack (Web2)

```
Collector                    Web2 Backend                  Smart Contract
    │                            │                              │
    │  1. Buy pack ($2.99)       │                              │
    │  ─────────────────────►    │                              │
    │                            │  2. Random selection          │
    │                            │     (5 stickers by rarity)   │
    │                            │                              │
    │                            │  3. mint(to, tokenId,        │
    │                            │     certificate, price)      │
    │                            │  ────────────────────────►   │
    │                            │         (×5 stickers)        │
    │                            │                              │
    │                            │  4. addToPool(tokenId)       │
    │                            │  ────────────────────────►   │
    │                            │         (×5 stickers)        │
    │                            │                              │
    │  5. Show new stickers!     │                              │
    │  ◄─────────────────────    │                              │
    │     (reveal animation)     │                              │
```

### Flow 2: Buy Sticker from Marketplace (Web3 — Private)

```
Collector                    Midnight Network              Seller
    │                            │                           │
    │  1. Browse marketplace     │                           │
    │  ─────────────────────►    │                           │
    │     (sees stickers,        │                           │
    │      prices, rarities      │                           │
    │      — NOT who's buying)   │                           │
    │                            │                           │
    │  2. purchaseNFT(tokenId,   │                           │
    │     shieldedCoin)          │                           │
    │  ─────────────────────►    │                           │
    │                            │  3. Payment stored         │
    │     ZK commitment          │  ──────────────────────►  │
    │  ◄─────────────────────    │     in seller balance     │
    │  (buyer identity hidden)   │                           │
    │                            │                           │
    │                            │  4. withdrawSellerFunds() │
    │                            │  ◄──────────────────────  │
    │                            │     (seller gets paid)    │
```

### Flow 3: Retire Sticker — "Glue to Album" (Web3 → Web2)

```
Collector                    Midnight Network              Backend Bot
    │                            │                              │
    │  1. Select sticker to      │                              │
    │     place in album         │                              │
    │                            │                              │
    │  2. proofOwnership(        │                              │
    │     commitment, challenge) │                              │
    │  ─────────────────────►    │                              │
    │                            │  3. Challenge stored          │
    │                            │     on-chain                  │
    │                            │                              │
    │                            │  4. Bot reads challenge       │
    │                            │  ◄────────────────────────   │
    │                            │                              │
    │                            │  5. burnPurchasedBatch5(     │
    │                            │     commitment, tokenIds,    │
    │                            │     challenge)               │
    │                            │  ◄────────────────────────   │
    │                            │                              │
    │  6. Sticker permanently    │  7. Lifecycle recorded:      │
    │     placed in album!       │     seller, commitment,      │
    │  ◄─────────────────────    │     challenge (provable)     │
    │  (irreversible, like       │                              │
    │   gluing a real sticker)   │                              │
```

### Flow 4: Batch Purchase (Privacy Optimized)

```
Collector                         Midnight Network
    │                                  │
    │  "I need stickers #12, #47,      │
    │   #83, #91, #105"                │
    │                                  │
    │  purchaseBatch5(                 │
    │    tokenId12, tokenId47,         │
    │    tokenId83, tokenId91,         │
    │    tokenId105, shieldedCoin)     │
    │  ────────────────────────────►   │
    │                                  │
    │  ONE commitment for ALL 5        │
    │  ONE transaction                 │
    │  ONE shielded payment            │
    │  ◄────────────────────────────   │
    │                                  │
    │  On-chain: 5 stickers sold.      │
    │  Observer sees: ??? bought ???   │
    │  No link between purchases.      │
```

---

## Album Theme Ideas

### Theme A: "Crypto Legends" — History of Blockchain

An educational/fun album about the history of crypto. Self-contained, no licensing needed.

| Source Enum   | Album Section             | Example Stickers                                  |
|--------------|---------------------------|----------------------------------------------------|
| Solar        | The Pioneers              | Satoshi whitepaper, Hal Finney, first BTC tx       |
| Wind         | The Platforms             | Ethereum launch, Solana, Midnight Network          |
| Hydro        | The Breakthroughs         | Smart contracts, DeFi summer, ZK proofs            |
| Biomass      | The Culture               | Memes, CryptoPunks, Bored Apes, pizza day          |
| Geothermal   | The Technology            | Mining rigs, nodes, wallets, bridges                |
| Nuclear      | The Future                | ZK rollups, privacy chains, quantum resistance     |

**Album**: 120 stickers across 6 sections (20 per section)
**Why it works**: Appeals directly to your target audience (crypto community). No licensing issues.

---

### Theme B: "World Explorer" — Countries & Landmarks

A travel-themed album. Generic enough to avoid licensing.

| Source Enum   | Album Section             | Example Stickers                                  |
|--------------|---------------------------|----------------------------------------------------|
| Solar        | Americas                  | Machu Picchu, Grand Canyon, Cristo Redentor        |
| Wind         | Europe                    | Eiffel Tower, Colosseum, Sagrada Familia           |
| Hydro        | Asia                      | Great Wall, Taj Mahal, Mount Fuji                  |
| Biomass      | Africa                    | Pyramids, Victoria Falls, Serengeti                |
| Geothermal   | Oceania                   | Sydney Opera, Milford Sound, Uluru                 |
| Nuclear      | Special: Wonders          | Aurora Borealis, Mariana Trench, ISS               |

**Album**: 100 stickers across 6 sections
**Why it works**: Universal appeal, beautiful visuals, no licensing needed.

---

### Theme C: "Mythic Creatures" — Fantasy Bestiary

A fantasy creature collection. Original art, no licensing.

| Source Enum   | Album Section             | Example Stickers                                  |
|--------------|---------------------------|----------------------------------------------------|
| Solar        | Dragons                   | Fire, Ice, Shadow, Elder, Hatchling                |
| Wind         | Spirits                   | Phoenix, Thunderbird, Will-o-Wisp                  |
| Hydro        | Sea Creatures             | Kraken, Leviathan, Merfolk, Charybdis              |
| Biomass      | Forest Beings             | Treant, Unicorn, Fairy, Centaur                    |
| Geothermal   | Underworld                | Cerberus, Basilisk, Chimera, Hydra                 |
| Nuclear      | Celestials                | Angel, Titan, Cosmic Serpent, Star Whale           |

**Album**: 90 stickers across 6 sections (15 per section)
**Why it works**: Visually stunning, appeals to gaming/fantasy audience, all original IP.

---

### Theme D: "FutureCity 2099" — Sci-Fi Cyberpunk

A cyberpunk-themed album. Original world-building.

| Source Enum   | Album Section             | Example Stickers                                  |
|--------------|---------------------------|----------------------------------------------------|
| Solar        | Districts                 | Neon Market, Sky Gardens, Data Mines               |
| Wind         | Characters                | Hacker, Corpo Agent, Street Medic, Ghost Runner    |
| Hydro        | Vehicles                  | Hover Bike, Submarine Shuttle, Sky Cruiser         |
| Biomass      | Tech & Gear               | Neural Link, Plasma Blade, Stealth Cloak           |
| Geothermal   | Events                    | The Blackout, AI Uprising, Neon Festival           |
| Nuclear      | Secrets                   | Hidden lore, Easter eggs, map fragments            |

**Album**: 100 stickers, 6 sections
**Why it works**: Original IP, strong visual identity, lore-driven engagement (collect map fragments to unlock story).

---

### Recommended: Start with Theme A (Crypto Legends)

**Reasons:**
1. Your audience IS the crypto community — immediate resonance
2. No art licensing needed (historical events, public figures, concepts)
3. Educational angle adds legitimacy
4. The Midnight Network itself can be a featured sticker — meta-marketing
5. Can be expanded with seasonal editions (2026 events, new protocols, etc.)
6. Easy to create AI-generated artwork for stickers

---

## Revenue Model

### Primary Revenue

| Stream                  | Price Point       | Description                                    |
|------------------------|-------------------|------------------------------------------------|
| Sticker Pack (5 stickers) | $2.99           | Random distribution by rarity weights           |
| Premium Pack (5 stickers) | $4.99           | Guaranteed 1 Rare or higher                    |
| Ultra Pack (5 stickers)   | $9.99           | Guaranteed 1 Epic or higher                    |
| Album (digital)          | Free             | Free to attract users, revenue from packs       |

### Secondary Revenue (Marketplace)

| Stream                    | Rate          | Description                                    |
|--------------------------|---------------|------------------------------------------------|
| Marketplace fee          | 5% per sale   | Taken from each web3 marketplace transaction    |
| Featured listing         | $0.99         | Pin sticker at top of marketplace               |

### Engagement Revenue

| Stream                    | Price         | Description                                    |
|--------------------------|---------------|------------------------------------------------|
| Seasonal album           | Free / $1.99  | New album each season drives repeat packs      |
| Album completion reward  | Prize pool    | First N completers win exclusive prizes          |
| Exclusive stickers       | Event-based   | Limited drops tied to real events                |

### Revenue Projection (Conservative)

```
Assumptions:
- 1,000 active collectors (first 3 months)
- Average 3 packs/week per collector at $2.99
- 20% participate in marketplace
- 5% marketplace fee

Monthly Revenue:
  Pack sales:      1,000 × 3 × 4 weeks × $2.99  =  $35,880
  Premium packs:   200 × 2 × 4 weeks × $4.99     =  $7,984
  Marketplace fees: ~$2,000 estimated              =  $2,000
                                            Total  ≈  $45,864/month
```

---

## Privacy Value Proposition

### What's visible on-chain

- Sticker exists (token ID, metadata, rarity)
- Sticker is listed for sale (pool membership)
- A sale occurred (purchase counter increments)
- A sticker was retired (burn lifecycle)

### What's HIDDEN (ZK-protected)

- **WHO bought the sticker** (buyer identity → ZK commitment)
- **HOW MUCH was paid** (shielded coin)
- **WHICH stickers a user owns** (no link between purchases)
- **Collection strategy** (competitors can't see what you're missing)

### Why collectors care

> "If other collectors know I'm missing sticker #42 (Legendary Satoshi),
> they can list it at 10x the price. With privacy, I buy it at market rate
> because nobody knows it's me looking for it."

This is the **exact same problem** that exists in real sticker trading — kids in schoolyards hiding their album to prevent friends from inflating swap prices. The private-buyer contract solves this digitally.

---

## Technical Implementation

### Phase 1: Core MVP (4-6 weeks)

**Web2 Backend:**
- User registration + authentication
- Pack purchase (payment processing)
- Random sticker distribution engine (weighted by rarity)
- Collection viewer (my stickers, my album progress)
- Sticker detail view (metadata, rarity, edition)

**Web3 Integration:**
- Deploy private-buyer contract on Midnight testnet
- Mint stickers as NFTs on pack purchase (Minter bot)
- List minted stickers in NFT pool (PoolOperator bot)
- Identity verification for marketplace users (Verifier)

**Marketplace:**
- Browse available stickers (read NFT pool state)
- Private purchase flow (single + batch)
- Seller dashboard (view earnings, withdraw)

### Phase 2: Album Experience (2-3 weeks)

- Album board UI (visual grid with empty/filled slots)
- "Glue" sticker flow (proofOwnership → burnPurchasedBatch)
- Album completion tracking and progress %
- Duplicate detection ("You have 3 copies of this sticker!")

### Phase 3: Engagement (2-3 weeks)

- Seasonal albums and new drops
- Leaderboards (completion %, collection value)
- Pack opening animation (reveal experience)
- Trading history and statistics

---

## Sticker Pack Distribution Algorithm

```
Pack Size: 5 stickers

Distribution per pack:
┌─────────────────────────────────────────────┐
│  Slot 1: Common      (100% chance)          │
│  Slot 2: Common      (100% chance)          │
│  Slot 3: Common/Uncommon (50/50)            │
│  Slot 4: Uncommon/Rare   (60/40)            │
│  Slot 5: Rarity Roll                        │
│          ├── Common     30%                 │
│          ├── Uncommon   30%                 │
│          ├── Rare       25%                 │
│          ├── Epic       12%                 │
│          └── Legendary   3%                 │
└─────────────────────────────────────────────┘

Premium Pack Override:
  Slot 5 guaranteed Rare or higher:
          ├── Rare       55%
          ├── Epic       35%
          └── Legendary  10%

Ultra Pack Override:
  Slot 4 guaranteed Rare or higher
  Slot 5 guaranteed Epic or higher:
          ├── Epic       75%
          └── Legendary  25%
```

### Duplicate Protection

- No duplicate protection in standard packs (drives marketplace activity)
- Optional: "Smart Pack" ($5.99) — guaranteed no duplicates from stickers you already own
- This creates a natural economy: cheap packs for gamblers, smart packs for completionists

---

## Example: "Crypto Legends" Album Layout

### Section 1: The Pioneers (Source = Solar)

| # | Sticker Name             | Rarity    | Description                          |
|---|--------------------------|-----------|--------------------------------------|
| 1 | Bitcoin Whitepaper       | Legendary | The document that started it all     |
| 2 | Satoshi's Last Post      | Epic      | "I've moved on to other things"      |
| 3 | Hal Finney               | Epic      | Running Bitcoin — first recipient    |
| 4 | Genesis Block            | Rare      | Block 0 — Jan 3, 2009               |
| 5 | Pizza Day                | Rare      | 10,000 BTC for two pizzas            |
| 6 | The Times Headline       | Uncommon  | "Chancellor on brink..."             |
| 7 | First Bitcoin Wallet     | Uncommon  | Bitcoin-Qt interface                 |
| 8 | Mining with CPU          | Common    | The early days of mining             |
| 9 | P2P Network              | Common    | Decentralized nodes diagram          |
| 10| Cypherpunk Manifesto     | Common    | "Privacy is necessary..."            |

### Section 2: The Platforms (Source = Wind)

| # | Sticker Name             | Rarity    | Description                          |
|---|--------------------------|-----------|--------------------------------------|
| 11| Ethereum Launch          | Epic      | World computer goes live             |
| 12| Vitalik Buterin          | Rare      | The young visionary                  |
| 13| Smart Contract           | Rare      | Code is law                          |
| 14| Midnight Network         | Legendary | Privacy-first blockchain             |
| 15| Solana Speed             | Uncommon  | 65,000 TPS promise                   |
| 16| Cardano Peer Review      | Uncommon  | Academic approach to blockchain      |
| 17| Polkadot Parachains      | Common    | Interoperability vision              |
| 18| Avalanche Subnets        | Common    | Custom blockchain networks           |
| 19| Polygon Bridge           | Common    | Scaling Ethereum                     |
| 20| Layer 2 Revolution       | Common    | Rollups change the game              |

### ...and so on for all 6 sections (120 stickers total)

---

## Competitive Advantages

1. **Privacy by design**: No other digital sticker platform offers buyer anonymity
2. **Provable scarcity**: On-chain NFTs prove edition sizes and rarity — no cheating
3. **Verifiable retirement**: When a sticker is "glued" to an album, the burn is provable and irreversible
4. **Batch efficiency**: Buy up to 20 stickers in a single private transaction
5. **Fair marketplace**: Sellers can't price-discriminate because they don't know who's buying
6. **Lifecycle tracking**: Full provable history (mint → list → sell → retire) without exposing buyer identity

---

## Summary

The sticker album MVP demonstrates every capability of the private-buyer contract in a consumer-friendly package:

| Contract Feature              | Album Experience                                |
|------------------------------|-------------------------------------------------|
| NFT minting                  | Creating sticker packs                           |
| NFT pool                     | Marketplace of tradeable stickers                |
| Private purchase             | Buy without revealing identity or strategy       |
| Batch purchase               | Buy multiple missing stickers at once            |
| Shielded payments            | Hidden transaction amounts                       |
| ZK ownership proof           | Prove you own a sticker without revealing who you are |
| Authorized burn              | Permanently place sticker in album               |
| Seller withdrawal            | Collectors earn from selling duplicates           |
| Identity verification        | Verified collectors in the marketplace            |
| Role-based access control    | Platform operator roles (mint, list, verify)     |

**No contract changes required. No third-party dependencies. Revenue from day one.**
