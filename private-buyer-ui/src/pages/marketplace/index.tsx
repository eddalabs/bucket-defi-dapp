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
import type { TokenInfo } from '@/modules/midnight/nft-sdk/api/common-types';

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

const CATEGORY_LABELS = ['Type1', 'Type2', 'Type3', 'Type4', 'Type5', 'Type6'];
const TIER_LABELS = ['Level1', 'Level2', 'Level3', 'Level4', 'Level5'];
const REGION_LABELS = ['Region1', 'Region2', 'Region3', 'Region4'];

interface MintedToken {
  tokenId: string;
  price: string;
  category: number;
  tier: number;
  region: number;
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
  const [category, setCategory] = useState(0);
  const [tier, setTier] = useState(2);
  const [region, setRegion] = useState(0);
  const [quantity, setQuantity] = useState('1000000');
  const [period, setPeriod] = useState('2024');
  const [lastMintedId, setLastMintedId] = useState<string | null>(null);
  const txProgress = useTransactionProgress();
  useFlowMessageSync(txProgress);

  const handleMintAndList = async () => {
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
        category,
        quantity: BigInt(quantity),
        period: BigInt(period),
        tier,
        region,
      };
      await controller.mintAndList(to, BigInt(tokenId), certificate, BigInt(price));
      setLastMintedId(mintingId);
      onMinted({ tokenId: mintingId, price, category, tier, region });
    });
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Mint & List NFT</CardTitle>
        </div>
        <CardDescription>Create a new NFT certificate and list it for sale in one transaction</CardDescription>
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
            <label className="text-xs text-muted-foreground">Category</label>
            <select value={category} onChange={(e) => setCategory(Number(e.target.value))} className="w-full border rounded px-3 py-2 text-sm bg-background">
              <option value={0}>Type1</option><option value={1}>Type2</option><option value={2}>Type3</option>
              <option value={3}>Type4</option><option value={4}>Type5</option><option value={5}>Type6</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Tier</label>
            <select value={tier} onChange={(e) => setTier(Number(e.target.value))} className="w-full border rounded px-3 py-2 text-sm bg-background">
              <option value={0}>Level1</option><option value={1}>Level2</option><option value={2}>Level3</option>
              <option value={3}>Level4</option><option value={4}>Level5</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Region</label>
            <select value={region} onChange={(e) => setRegion(Number(e.target.value))} className="w-full border rounded px-3 py-2 text-sm bg-background">
              <option value={0}>Region1</option><option value={1}>Region2</option><option value={2}>Region3</option><option value={3}>Region4</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Quantity</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-background" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Period</label>
            <input type="number" value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-background" />
          </div>
        </div>
        <Button onClick={handleMintAndList} disabled={!tokenId || txProgress.isProcessing} className="w-full gap-2">
          <PlusCircle className="h-4 w-4" />
          {txProgress.isProcessing ? 'Minting & Listing...' : 'Mint & List NFT'}
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
              <span className="text-muted-foreground">{CATEGORY_LABELS[t.category]}</span>
              <span className="text-muted-foreground">{TIER_LABELS[t.tier]}</span>
              <span className="text-muted-foreground">{REGION_LABELS[t.region]}</span>
              <span className="font-medium">Price: {t.price}</span>
            </div>
          ))}
        </div>
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

// ─── Certificates Table ───────────────────────────────────────────────────

function toHexShort(bytes: Uint8Array): string {
  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  if (hex.length <= 12) return hex;
  return `${hex.slice(0, 6)}...${hex.slice(-6)}`;
}

function toHexFull(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function CertificatesTable({ tokens, secretNonce }: { tokens: TokenInfo[]; secretNonce: Uint8Array | undefined }) {
  if (tokens.length === 0) return null;

  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Certificates (Live)</CardTitle>
        </div>
        <CardDescription>Real-time state of NFT certificates from the indexer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="pb-2 pr-3 font-medium text-muted-foreground text-xs">ID</th>
                <th className="pb-2 pr-3 font-medium text-muted-foreground text-xs">Category</th>
                <th className="pb-2 pr-3 font-medium text-muted-foreground text-xs">Tier</th>
                <th className="pb-2 pr-3 font-medium text-muted-foreground text-xs">Region</th>
                <th className="pb-2 pr-3 font-medium text-muted-foreground text-xs">Price</th>
                <th className="pb-2 pr-3 font-medium text-muted-foreground text-xs">Status</th>
                <th className="pb-2 pr-3 font-medium text-muted-foreground text-xs">Owner</th>
                <th className="pb-2 font-medium text-muted-foreground text-xs">Buyer Commitment</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <tr key={token.tokenId.toString()} className="border-b border-border/30 last:border-0">
                  <td className="py-2.5 pr-3 font-mono font-semibold">#{token.tokenId.toString()}</td>
                  <td className="py-2.5 pr-3">{CATEGORY_LABELS[token.certificate.category] ?? '?'}</td>
                  <td className="py-2.5 pr-3">{TIER_LABELS[token.certificate.tier] ?? '?'}</td>
                  <td className="py-2.5 pr-3">{REGION_LABELS[token.certificate.region] ?? '?'}</td>
                  <td className="py-2.5 pr-3 font-medium">{token.price.toString()}</td>
                  <td className="py-2.5 pr-3">
                    {token.isSold ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400">
                        Sold
                      </span>
                    ) : token.isListed ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        Listed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        Unlisted
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 pr-3 font-mono text-xs text-muted-foreground">
                    {toHexShort(token.ownerBytes)}
                  </td>
                  <td className="py-2.5 font-mono text-xs">
                    {token.buyerCommitment ? (
                      <span className="text-purple-600 dark:text-purple-400" title={Array.from(token.buyerCommitment).map(b => b.toString(16).padStart(2, '0')).join('')}>
                        {toHexShort(token.buyerCommitment)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/40">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Private state for connected wallet */}
        {secretNonce && tokens.some((t) => t.isSold) && (
          <div className="mt-4 p-3 bg-purple-500/5 border border-purple-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-purple-500" />
              <p className="text-xs font-medium text-purple-600 dark:text-purple-400">My Private State (Secret Nonce)</p>
            </div>
            <p className="text-xs font-mono break-all text-purple-600/80 dark:text-purple-400/80 select-all">
              {toHexFull(secretNonce)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This nonce, combined with your public key, generates the commitment hash used to prove your NFT ownership via ZK proofs.
            </p>
          </div>
        )}
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
  const { deployedContractAPI, derivedState, providers } = useContractSubscription();
  const [mintedTokens, setMintedTokens] = useState<MintedToken[]>([]);
  const deployTxProgress = useTransactionProgress();
  const [appLoading, setAppLoading] = useState(true);
  const [deployedAddress, setDeployedAddress] = useState<string | undefined>(undefined);
  const [deployedCopied, setDeployedCopied] = useState(false);

  const providersState = useProviders();
  const flowMessage = providersState?.flowMessage;
  useEffect(() => {
    deployTxProgress.updateFromFlowMessage(flowMessage);
  }, [flowMessage]);

  useEffect(() => {
    if (derivedState?.name !== undefined && derivedState.name !== '') {
      setAppLoading(false);
    }
  }, [derivedState?.name]);

  const handleDeployNew = async () => {
    if (!providersState?.providers) return;
    setDeployedAddress(undefined);
    await deployTxProgress.execute(async () => {
      const { ContractController } = await import('@/modules/midnight/nft-sdk/api/contractController');
      const { pino } = await import('pino');
      const logger = pino({ level: 'trace', browser: { asObject: true } });
      const controller = await ContractController.deploy(providersState.providers!, logger, 'EddaCerts', 'ECRT');
      setDeployedAddress(controller.deployedContractAddress);
    });
  };

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

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">NFT Marketplace</h1>
          <p className="text-muted-foreground">Mint, list, price, and trade NFT certificates on Midnight Network</p>
        </div>

        {/* Deploy new contract */}
        <Card className="mb-6 border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Deploy</CardTitle>
            <CardDescription>Deploy a new contract instance (copy the address to your .env)</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleDeployNew}
              disabled={deployTxProgress.isProcessing}
              className="gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Deploy New Contract
            </Button>

            {deployedAddress && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border/60">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-muted-foreground">Deployed to</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs gap-1"
                    onClick={async () => {
                      await navigator.clipboard.writeText(deployedAddress);
                      setDeployedCopied(true);
                      setTimeout(() => setDeployedCopied(false), 2000);
                    }}
                  >
                    {deployedCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {deployedCopied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <p className="text-xs font-mono break-all text-foreground select-all">{deployedAddress}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Set this as <code className="bg-muted px-1 rounded">VITE_CONTRACT_ADDRESS</code> in your <code className="bg-muted px-1 rounded">.env</code> file and restart the dev server.
                </p>
              </div>
            )}

            <TransactionProgress {...deployTxProgress} />
          </CardContent>
        </Card>

        {/* Loading contract */}
        {appLoading && !deployedContractAPI && (
          <div className="text-center py-12 space-y-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Connecting to contract...</p>
          </div>
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

            <CertificatesTable tokens={derivedState.tokens} secretNonce={derivedState.privateState.secretNonce} />

            <MintedTokensList tokens={mintedTokens} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MintSection
                controller={deployedContractAPI}
                coinPublicKey={shieldedAddresses?.shieldedCoinPublicKey ?? ''}
                onMinted={(token) => setMintedTokens((prev) => [...prev, token])}
              />
              <SetPriceSection controller={deployedContractAPI} />
              <BuySection controller={deployedContractAPI} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
