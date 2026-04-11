import { useEffect, useState } from 'react';
import {
  Shield, Pencil, Send, Clock, CheckCircle2, Loader2, AlertTriangle,
  PlusCircle, ShoppingBag, Tag, DollarSign, Hash, Activity, MapPin, Copy, Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/modules/midnight';
import { fromHex } from '@midnight-ntwrk/compact-runtime';
import { useContractSubscription } from '@/modules/midnight/nft-sdk/hooks/use-contract-subscription';
import { useTransactionProgress, type TxStage } from '@/modules/midnight/nft-sdk/hooks/use-transaction-progress';
import { useProviders } from '@/modules/midnight/nft-sdk/hooks/use-providers';
import type { ContractControllerInterface } from '@/modules/midnight/nft-sdk/api/contractController';
import { Loading } from '@/components/loading';

// ─── Transaction Progress UI ──────────────────────────────────────────────

const stageConfig: { stage: TxStage; icon: typeof Shield; label: string }[] = [
  { stage: 'proving', icon: Shield, label: 'Prove' },
  { stage: 'signing', icon: Pencil, label: 'Sign' },
  { stage: 'submitting', icon: Send, label: 'Submit' },
  { stage: 'finalizing', icon: Clock, label: 'Confirm' },
];

const stageOrder: Record<string, number> = {
  proving: 0, signing: 1, submitting: 2, finalizing: 3,
};

function getStageIndex(stage: TxStage): number {
  return stageOrder[stage] ?? -1;
}

function TransactionProgress({ stage, message, progress, errorMessage, isProcessing }: {
  stage: TxStage;
  message: string;
  progress: number;
  errorMessage: string | null;
  isProcessing: boolean;
}) {
  const isActive = isProcessing || stage === 'confirmed';
  if (!isActive && stage !== 'error') return null;

  if (stage === 'error') {
    return (
      <div className="mt-4 flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
        <p className="text-sm text-red-600 dark:text-red-400">{errorMessage || 'Transaction failed'}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Stage indicators */}
      <div className="grid grid-cols-4 gap-2">
        {stageConfig.map((cfg) => {
          const currentIdx = getStageIndex(stage);
          const cfgIdx = getStageIndex(cfg.stage);
          const isCompleted = stage === 'confirmed' || currentIdx > cfgIdx;
          const isCurrent = currentIdx === cfgIdx && stage !== 'confirmed';
          const Icon = cfg.icon;

          return (
            <div
              key={cfg.stage}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-colors ${
                isCompleted
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : isCurrent
                    ? 'border-blue-500/30 bg-blue-500/5'
                    : 'border-border/40 bg-muted/30'
              }`}
            >
              <div className="relative">
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : isCurrent ? (
                  <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                ) : (
                  <Icon className="h-5 w-5 text-muted-foreground/40" />
                )}
              </div>
              <span className={`text-xs font-medium ${
                isCompleted
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : isCurrent
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-muted-foreground/50'
              }`}>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out bg-blue-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status message */}
      <p className="text-sm text-muted-foreground text-center">{message}</p>

      {/* Warning */}
      {stage !== 'confirmed' && (
        <div className="flex items-center justify-center gap-2 p-2 bg-amber-500/5 border border-amber-500/10 rounded-lg">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs text-amber-600 dark:text-amber-400">Do not close this window while the transaction is in progress</span>
        </div>
      )}

      {/* Confirmed banner */}
      {stage === 'confirmed' && (
        <div className="flex items-center justify-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Transaction confirmed!</span>
        </div>
      )}
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────

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

// ─── Action Sections ──────────────────────────────────────────────────────

function useFlowMessageSync(txProgress: ReturnType<typeof useTransactionProgress>) {
  const providersState = useProviders();
  const flowMessage = providersState?.flowMessage;
  useEffect(() => {
    txProgress.updateFromFlowMessage(flowMessage);
  }, [flowMessage]);
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
  useFlowMessageSync(txProgress);

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
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Mint NFT</CardTitle>
        </div>
        <CardDescription>Create a new NFT certificate with metadata</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Token ID</label>
            <input type="number" placeholder="1" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-background" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Price</label>
            <input type="number" placeholder="100" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-background" />
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
        <Button onClick={handleMint} disabled={!tokenId || txProgress.isProcessing} className="w-full gap-2">
          <PlusCircle className="h-4 w-4" />
          {txProgress.isProcessing ? 'Minting...' : 'Mint NFT'}
        </Button>
        <TransactionProgress {...txProgress} />
        {lastMintedId && txProgress.stage === 'idle' && (
          <div className="flex items-center justify-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Token #{lastMintedId} minted successfully</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MintedTokensList({ tokens }: { tokens: MintedToken[] }) {
  if (tokens.length === 0) return null;
  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Minted Tokens</CardTitle>
        </div>
        <CardDescription>Tokens minted in this session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tokens.map((t) => (
            <div key={t.tokenId} className="flex items-center justify-between border border-border/60 rounded-lg px-4 py-2.5 text-sm">
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
  useFlowMessageSync(txProgress);

  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">List NFT for Sale</CardTitle>
        </div>
        <CardDescription>Add an NFT to the marketplace pool</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground">Token ID</label>
          <input type="number" placeholder="Token ID to list" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-background" />
        </div>
        <Button onClick={async () => { if (!tokenId) return; await txProgress.execute(() => controller.addToPool(BigInt(tokenId))); }} disabled={!tokenId || txProgress.isProcessing} className="w-full gap-2">
          <ShoppingBag className="h-4 w-4" />
          {txProgress.isProcessing ? 'Listing...' : 'List for Sale'}
        </Button>
        <TransactionProgress {...txProgress} />
      </CardContent>
    </Card>
  );
}

function SetPriceSection({ controller }: { controller: ContractControllerInterface }) {
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');
  const txProgress = useTransactionProgress();
  useFlowMessageSync(txProgress);

  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Set NFT Price</CardTitle>
        </div>
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
        <Button onClick={async () => { if (!tokenId || !price) return; await txProgress.execute(() => controller.setTokenPrice(BigInt(tokenId), BigInt(price))); }} disabled={!tokenId || !price || txProgress.isProcessing} className="w-full gap-2">
          <Tag className="h-4 w-4" />
          {txProgress.isProcessing ? 'Setting price...' : 'Set Price'}
        </Button>
        <TransactionProgress {...txProgress} />
      </CardContent>
    </Card>
  );
}

function BuySection({ controller }: { controller: ContractControllerInterface }) {
  const [tokenId, setTokenId] = useState('');
  const txProgress = useTransactionProgress();
  useFlowMessageSync(txProgress);

  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Buy NFT</CardTitle>
        </div>
        <CardDescription>Purchase a listed NFT (no shielded payment required for now)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground">Token ID</label>
          <input type="number" placeholder="Token ID to buy" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-background" />
        </div>
        <Button onClick={async () => { if (!tokenId) return; await txProgress.execute(() => controller.purchaseNFT(BigInt(tokenId), { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n })); }} disabled={!tokenId || txProgress.isProcessing} className="w-full gap-2">
          <DollarSign className="h-4 w-4" />
          {txProgress.isProcessing ? 'Purchasing...' : 'Buy NFT'}
        </Button>
        <TransactionProgress {...txProgress} />
      </CardContent>
    </Card>
  );
}

// ─── Contract Stats ───────────────────────────────────────────────────────

function ContractStats({ name, symbol, certificatesCreatedCounter, purchaseCounter, contractAddress }: {
  name: string; symbol: string; certificatesCreatedCounter: bigint; purchaseCounter: bigint; contractAddress?: string;
}) {
  const [copied, setCopied] = useState(false);

  const stats = [
    { label: 'Name', value: name || '-', icon: Hash },
    { label: 'Symbol', value: symbol || '-', icon: Activity },
    { label: 'Certificates', value: certificatesCreatedCounter.toString(), icon: PlusCircle },
    { label: 'Purchases', value: purchaseCounter.toString(), icon: ShoppingBag },
  ];

  return (
    <div className="space-y-4">
      {contractAddress && (
        <Card className="border-border/60">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-muted shrink-0">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Contract Address</p>
                  <p className="text-sm font-mono truncate">{contractAddress}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs gap-1 shrink-0"
                onClick={async () => {
                  if (contractAddress) {
                    await navigator.clipboard.writeText(contractAddress);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                }}
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-border/60">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-muted shrink-0">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-lg font-semibold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Marketplace ─────────────────────────────────────────────────────

export function Marketplace() {
  const { unshieldedAddress, shieldedAddresses } = useWallet();
  const { deployedContractAPI, derivedState, contractDeployment, onDeploy, providers } = useContractSubscription();
  const [mintedTokens, setMintedTokens] = useState<MintedToken[]>([]);
  const txProgress = useTransactionProgress();
  const [appLoading, setAppLoading] = useState(true);

  const providersState = useProviders();
  const flowMessage = providersState?.flowMessage;
  useEffect(() => {
    txProgress.updateFromFlowMessage(flowMessage);
  }, [flowMessage]);

  useEffect(() => {
    if (derivedState?.name !== undefined && derivedState.name !== '') {
      setAppLoading(false);
    }
  }, [derivedState?.name]);

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
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {appLoading && !deployedContractAPI && <Loading text="Connecting to contract..." />}

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">NFT Marketplace</h1>
          <p className="text-muted-foreground">Mint, list, price, and trade NFT certificates on Midnight Network</p>
        </div>

        {/* Deploy section */}
        {!deployedContractAPI && !appLoading && (
          <Card className="mb-6 border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
              <CardDescription>Deploy a new contract to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => txProgress.execute(() => onDeploy().then(() => {}))}
                disabled={isDeploying || txProgress.isProcessing}
                className="gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Deploy New Contract
              </Button>

              {deployError && (
                <div className="mt-4 flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-400">{deployError}</p>
                </div>
              )}

              <TransactionProgress {...txProgress} />
            </CardContent>
          </Card>
        )}

        {/* Connected to contract */}
        {deployedContractAPI && derivedState && (
          <div className="space-y-6">
            <ContractStats
              name={derivedState.name}
              symbol={derivedState.symbol}
              certificatesCreatedCounter={derivedState.certificatesCreatedCounter}
              purchaseCounter={derivedState.purchaseCounter}
              contractAddress={deployedContractAPI.deployedContractAddress}
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
          </div>
        )}
      </div>
    </div>
  );
}
