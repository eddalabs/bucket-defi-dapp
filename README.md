# Bucket DeFi DApp — Private Buyer NFT Marketplace

A privacy-preserving NFT marketplace built on **Midnight Network** with zero-knowledge proof ownership. Sellers publicly list tokenized certificates as NFTs, and buyers privately acquire them using Midnight's shielded transaction technology.

The contract uses generic enums (`Category`, `Tier`, `Region`) so the same deployment can serve multiple use cases (e.g., renewable energy certificates, recycling credits) — each UI maps the generic values to domain-specific labels.

## Prerequisites

- [Node.js](https://nodejs.org/) (v22+)
- [pnpm](https://pnpm.io/) (v10+)
- [Docker](https://docs.docker.com/get-docker/) (for proof server)
- [Compact](https://docs.midnight.network/relnotes/compact-tools) (Midnight developer tools)
- [Lace Wallet](https://chromewebstore.google.com/detail/hgeekaiplokcnmakghbdfbgnlfheichg) (browser extension)

## Project Structure

```
bucket-defi-dapp/
├── private-buyer-contract/   # Compact smart contract (NFT + Pool modules)
├── private-buyer-cli/        # CLI for contract interaction
├── private-buyer-ui/         # React frontend (Vite + TailwindCSS)
├── turbo.json                # Build pipeline
└── pnpm-workspace.yaml       # Monorepo workspace
```

## Setup

### 1. Install Compact Tools

```bash
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh

compact update +0.30.0
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Compile Contract

```bash
# Full compilation with ZK proof keys (required for deployment)
pnpm compact

# Fast compilation without ZK keys (for development iteration)
cd private-buyer-contract && pnpm compact-fast
```

### 4. Build All Packages

```bash
pnpm build
```

> **Note:** `pnpm build` runs `compact` (full compilation) automatically. This generates ZK proof keys and takes longer on first run.

## Running the UI

### 1. Configure Environment

```bash
cp private-buyer-ui/.env_template private-buyer-ui/.env
```

Set `VITE_CONTRACT_ADDRESS` in `.env` to your deployed contract address. Leave empty to deploy a new contract from the UI.

### 2. Start Proof Server

The proof server is required for ZK proof generation. Run it via Docker:

```bash
cd private-buyer-cli && pnpm ps-all
```

### 3. Start Development Server

```bash
pnpm dev:frontend
```

Open [http://localhost:5174](http://localhost:5174) in a browser with the Lace wallet extension installed.

### 4. Connect Wallet

1. Click **Connect Wallet** in the header
2. Select your network (Preprod recommended)
3. Choose Lace from the wallet dialog

### 5. Deploy a Contract (if no contract address in .env)

1. Click **Deploy New Contract** on the marketplace page
2. Wait for the transaction to confirm
3. Copy the deployed contract address
4. Set it as `VITE_CONTRACT_ADDRESS` in `.env` and restart the dev server

## Features

| Action | Description |
|--------|-------------|
| **Mint & List** | Create an NFT certificate and list it for sale in one atomic transaction |
| **Set Price** | Update the price of an existing NFT |
| **Buy NFT** | Purchase a listed NFT with ZK commitment-based ownership |
| **Certificates Table** | Real-time view of the first 10 certificates from the indexer |

## Contract Architecture

The contract uses 15 circuits:

| Circuit | Function |
|---------|----------|
| Constructor | Initialize NFT + Pool modules |
| `mint` | Mint NFT with certificate metadata + price |
| `mintAndList` | Mint and list atomically |
| `burn` | Burn unsold tokens |
| `addToPool` | List NFT for sale |
| `removeFromPool` | Delist NFT |
| `purchaseNFT` | Buy with ZK commitment |
| `withdrawSellerFunds` | Seller withdraws earnings |
| `proofOwnership` | Buyer proves ownership via ZK |
| `burnPurchased` | Burn a purchased token |
| `balanceOf` | Query token balance |
| `ownerOf` | Query token owner |
| `tokenCertificate` | Query certificate metadata |
| `tokenPrice` | Query token price |
| `setTokenPrice` | Update token price |

### Certificate Struct (Generic)

```
Certificate {
  id: string          // External reference ID
  category: Category  // Type1..Type6
  quantity: Uint<64>  // Numeric value (kWh, tonnes, etc.)
  period: Uint<64>    // Time period (year, month, etc.)
  tier: Tier          // Level1..Level5
  region: Region      // Region1..Region4
}
```

Each UI maps these generic values to domain-specific labels.

## Testing

### Contract Tests (Simulator)

```bash
cd private-buyer-contract && pnpm test
```

### CLI Tests (Against Undeployed Network)

```bash
cd private-buyer-cli && pnpm test-undeployed
```

## Scripts Reference

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm build` | Build all packages (runs compact + TypeScript + Vite) |
| `pnpm compact` | Compile contract with full ZK keys |
| `pnpm dev:frontend` | Start UI dev server |
| `cd private-buyer-contract && pnpm compact-fast` | Compile contract without ZK keys (fast) |
| `cd private-buyer-contract && pnpm test` | Run contract simulator tests |
| `cd private-buyer-cli && pnpm ps-all` | Start proof server via Docker |

---

Built by [Edda Labs](https://eddalabs.io)
