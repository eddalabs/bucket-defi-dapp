import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/modules/midnight';
import { fromHex } from '@midnight-ntwrk/compact-runtime';
import { useContractSubscription } from '@/modules/midnight/nft-sdk/hooks/use-contract-subscription';
import { useTransactionProgress } from '@/modules/midnight/nft-sdk/hooks/use-transaction-progress';
import { useProviders } from '@/modules/midnight/nft-sdk/hooks/use-providers';
import type { ContractControllerInterface } from '@/modules/midnight/nft-sdk/api/contractController';

function TransactionStatus({ stage, message, errorMessage, progress }: {
  stage: string;
  message: string;
  errorMessage: string | null;
  progress: number;
}) {
  if (stage === 'idle') return null;

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-2">
        {stage === 'error' ? (
          <span className="text-destructive text-sm">{errorMessage}</span>
        ) : stage === 'confirmed' ? (
          <span className="text-success text-sm">{message}</span>
        ) : (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
            <span className="text-sm text-muted-foreground">{message}</span>
          </>
        )}
      </div>
      {progress > 0 && stage !== 'error' && (
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

const SOURCE_LABELS = ['Solar', 'Wind', 'Hydro', 'Biomass', 'Geothermal', 'Nuclear'];
const IMPACT_LABELS = ['Minimal', 'Low', 'Medium', 'High', 'Extreme'];
const LOCATION_LABELS = ['RJ', 'SP', 'MG', 'RS'];

interface MintedToken {
  tokenId: string;
  price: string;
  source: number;
  impact: number;
  location: number;
}

function MintSection({ controller, coinPublicKey, onMinted }: {
  controller: ContractControllerInterface;
  coinPublicKey: string;
  onMinted: (token: MintedToken) => void;
}) {
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('100');
  const [source, setSource] = useState(0);
  const [impact, setImpact] = useState(2);
  const [location, setLocation] = useState(0);
  const [generation, setGeneration] = useState('1000000');
  const [vintage, setVintage] = useState('2024');
  const [lastMintedId, setLastMintedId] = useState<string | null>(null);
  const txProgress = useTransactionProgress();
  const providersState = useProviders();

  // Sync flow messages from providers
  const flowMessage = providersState?.flowMessage;
  useEffect(() => {
    txProgress.updateFromFlowMessage(flowMessage);
  }, [flowMessage]);

  const handleMint = async () => {
    if (!tokenId) return;
    const mintingId = tokenId;

    await txProgress.execute(async () => {
      const to = {
        is_left: true,
        left: { bytes: fromHex(coinPublicKey) },
        right: { bytes: new Uint8Array(32) },
      };

      const certificate = {
        id: `Certificate_${tokenId}`,
        source,
        generation: BigInt(generation),
        vintage: BigInt(vintage),
        impact,
        location,
      };

      await controller.mint(to, BigInt(tokenId), certificate, BigInt(price));
      setLastMintedId(mintingId);
      onMinted({ tokenId: mintingId, price, source, impact, location });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mint NFT</CardTitle>
        <CardDescription>Create a new NFT certificate with metadata</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Token ID</label>
            <input
              type="number"
              placeholder="1"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm bg-background"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Price</label>
            <input
              type="number"
              placeholder="100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm bg-background"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Source</label>
            <select value={source} onChange={(e) => setSource(Number(e.target.value))} className="w-full border rounded px-3 py-2 text-sm bg-background">
              <option value={0}>Solar</option><option value={1}>Wind</option><option value={2}>Hydro</option>
              <option value={3}>Biomass</option><option value={4}>Geothermal</option><option value={5}>Nuclear</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Impact</label>
            <select value={impact} onChange={(e) => setImpact(Number(e.target.value))} className="w-full border rounded px-3 py-2 text-sm bg-background">
              <option value={0}>Minimal</option><option value={1}>Low</option><option value={2}>Medium</option>
              <option value={3}>High</option><option value={4}>Extreme</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Location</label>
            <select value={location} onChange={(e) => setLocation(Number(e.target.value))} className="w-full border rounded px-3 py-2 text-sm bg-background">
              <option value={0}>RJ</option><option value={1}>SP</option><option value={2}>MG</option><option value={3}>RS</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Generation (kWh)</label>
            <input type="number" value={generation} onChange={(e) => setGeneration(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-background" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Vintage (Year)</label>
            <input type="number" value={vintage} onChange={(e) => setVintage(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-background" />
          </div>
        </div>
        <Button onClick={handleMint} disabled={!tokenId || txProgress.isProcessing} className="w-full">
          {txProgress.isProcessing ? 'Minting...' : 'Mint NFT'}
        </Button>
        <TransactionStatus {...txProgress} />
        {lastMintedId && txProgress.stage === 'idle' && (
          <p className="text-sm text-success font-medium">Token #{lastMintedId} minted successfully</p>
        )}
      </CardContent>
    </Card>
  );
}

function MintedTokensList({ tokens }: { tokens: MintedToken[] }) {
  if (tokens.length === 0) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Minted Tokens</CardTitle>
        <CardDescription>Tokens minted in this session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tokens.map((t) => (
            <div key={t.tokenId} className="flex items-center justify-between border border-border rounded-lg px-4 py-2 text-sm">
              <span className="font-mono font-semibold">#{t.tokenId}</span>
              <span className="text-muted-foreground">{SOURCE_LABELS[t.source]}</span>
              <span className="text-muted-foreground">{IMPACT_LABELS[t.impact]}</span>
              <span className="text-muted-foreground">{LOCATION_LABELS[t.location]}</span>
              <span className="font-medium">Price: {t.price}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ListSection({ controller }: { controller: ContractControllerInterface }) {
  const [tokenId, setTokenId] = useState('');
  const txProgress = useTransactionProgress();

  const handleList = async () => {
    if (!tokenId) return;
    await txProgress.execute(async () => {
      await controller.addToPool(BigInt(tokenId));
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>List NFT for Sale</CardTitle>
        <CardDescription>Add an NFT to the marketplace pool</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground">Token ID</label>
          <input type="number" placeholder="Token ID to list" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-background" />
        </div>
        <Button onClick={handleList} disabled={!tokenId || txProgress.isProcessing} className="w-full">
          {txProgress.isProcessing ? 'Listing...' : 'List for Sale'}
        </Button>
        <TransactionStatus {...txProgress} />
      </CardContent>
    </Card>
  );
}

function SetPriceSection({ controller }: { controller: ContractControllerInterface }) {
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');
  const txProgress = useTransactionProgress();

  const handleSetPrice = async () => {
    if (!tokenId || !price) return;
    await txProgress.execute(async () => {
      await controller.setTokenPrice(BigInt(tokenId), BigInt(price));
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set NFT Price</CardTitle>
        <CardDescription>Update the price of an existing NFT</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Token ID</label>
            <input type="number" placeholder="Token ID" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-background" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">New Price</label>
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-background" />
          </div>
        </div>
        <Button onClick={handleSetPrice} disabled={!tokenId || !price || txProgress.isProcessing} className="w-full">
          {txProgress.isProcessing ? 'Setting price...' : 'Set Price'}
        </Button>
        <TransactionStatus {...txProgress} />
      </CardContent>
    </Card>
  );
}

function BuySection({ controller }: { controller: ContractControllerInterface }) {
  const [tokenId, setTokenId] = useState('');
  const txProgress = useTransactionProgress();

  const handleBuy = async () => {
    if (!tokenId) return;
    await txProgress.execute(async () => {
      const dummyCoin = { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n };
      await controller.purchaseNFT(BigInt(tokenId), dummyCoin);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buy NFT</CardTitle>
        <CardDescription>Purchase a listed NFT (no shielded payment required for now)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground">Token ID</label>
          <input type="number" placeholder="Token ID to buy" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-background" />
        </div>
        <Button onClick={handleBuy} disabled={!tokenId || txProgress.isProcessing} className="w-full">
          {txProgress.isProcessing ? 'Purchasing...' : 'Buy NFT'}
        </Button>
        <TransactionStatus {...txProgress} />
      </CardContent>
    </Card>
  );
}

function ContractStats({ name, symbol, certificatesCreatedCounter, purchaseCounter }: {
  name: string; symbol: string; certificatesCreatedCounter: bigint; purchaseCounter: bigint;
}) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="border border-border rounded-lg p-3 text-center">
        <p className="text-xs text-muted-foreground">Name</p>
        <p className="font-semibold">{name || '-'}</p>
      </div>
      <div className="border border-border rounded-lg p-3 text-center">
        <p className="text-xs text-muted-foreground">Symbol</p>
        <p className="font-semibold">{symbol || '-'}</p>
      </div>
      <div className="border border-border rounded-lg p-3 text-center">
        <p className="text-xs text-muted-foreground">Certificates</p>
        <p className="font-semibold">{certificatesCreatedCounter.toString()}</p>
      </div>
      <div className="border border-border rounded-lg p-3 text-center">
        <p className="text-xs text-muted-foreground">Purchases</p>
        <p className="font-semibold">{purchaseCounter.toString()}</p>
      </div>
    </div>
  );
}

export function Marketplace() {
  const { unshieldedAddress, shieldedAddresses } = useWallet();
  const { deployedContractAPI, derivedState, contractDeployment, onDeploy, providers } = useContractSubscription();
  const [mintedTokens, setMintedTokens] = useState<MintedToken[]>([]);
  const txProgress = useTransactionProgress();

  if (!unshieldedAddress) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
        <p className="text-muted-foreground">Please connect your Midnight wallet to access the marketplace.</p>
      </div>
    );
  }

  if (!providers) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Initializing Providers</h2>
        <p className="text-muted-foreground">Setting up connection to Midnight network...</p>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary mx-auto" />
      </div>
    );
  }

  const isDeploying = contractDeployment?.status === 'in-progress';
  const deployError = contractDeployment?.status === 'failed' ? contractDeployment.error : null;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">NFT Marketplace</h1>
        <p className="text-muted-foreground">Mint, list, price, and trade NFT certificates</p>
      </div>

      {!deployedContractAPI && (
        <Card>
          <CardHeader>
            <CardTitle>Contract Setup</CardTitle>
            <CardDescription>
              {isDeploying ? 'Deploying contract...' : 'Deploy a new contract to get started'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => txProgress.execute(() => onDeploy().then(() => {}))}
              disabled={isDeploying || txProgress.isProcessing}
              className="w-full"
            >
              {isDeploying ? 'Deploying...' : 'Deploy Contract'}
            </Button>
            {deployError && <p className="text-sm text-destructive">{deployError}</p>}
            <TransactionStatus {...txProgress} />
          </CardContent>
        </Card>
      )}

      {deployedContractAPI && derivedState && (
        <>
          <ContractStats
            name={derivedState.name}
            symbol={derivedState.symbol}
            certificatesCreatedCounter={derivedState.certificatesCreatedCounter}
            purchaseCounter={derivedState.purchaseCounter}
          />

          <MintedTokensList tokens={mintedTokens} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MintSection
              controller={deployedContractAPI}
              coinPublicKey={shieldedAddresses?.shieldedCoinPublicKey ?? ''}
              onMinted={(token) => setMintedTokens((prev) => [...prev, token])}
            />
            <ListSection controller={deployedContractAPI} />
            <SetPriceSection controller={deployedContractAPI} />
            <BuySection controller={deployedContractAPI} />
          </div>
        </>
      )}
    </div>
  );
}
