import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/modules/midnight';
import { useProviders } from '@/modules/midnight/nft-sdk/hooks/use-providers';
import { useDeployment } from '@/modules/midnight/nft-sdk/hooks/use-deployment';
import { useLocalStorage } from '@/modules/midnight/nft-sdk/hooks/use-localStorage';
import { useContractSubscription } from '@/modules/midnight/nft-sdk/hooks/use-contract-subscription';
import { useTransactionProgress } from '@/modules/midnight/nft-sdk/hooks/use-transaction-progress';
import type { DeploymentState } from '@/modules/midnight/nft-sdk/contexts/nft-deployment-class';
import type { MiniPrivateBuyerProviders } from '@/modules/midnight/nft-sdk/api/common-types';

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

function DeploySection({ providers }: { providers: MiniPrivateBuyerProviders }) {
  const { manager } = useDeployment();
  const { storage } = useLocalStorage();
  const [deployName, setDeployName] = useState('EddaCerts');
  const [deploySymbol, setDeploySymbol] = useState('ECRT');
  const [joinAddress, setJoinAddress] = useState('');
  const [deployState, setDeployState] = useState<DeploymentState | null>(null);
  const txProgress = useTransactionProgress();

  useEffect(() => {
    const savedAddress = storage.getContractAddress();
    if (savedAddress) setJoinAddress(savedAddress);
  }, [storage]);

  useEffect(() => {
    const sub = manager.state$.subscribe(setDeployState);
    return () => sub.unsubscribe();
  }, [manager]);

  const handleDeploy = async () => {
    await txProgress.execute(async () => {
      await manager.deploy(providers, deployName, deploySymbol);
      const state = manager.state$.value;
      if (state.contractAddress) {
        storage.setContractAddress(state.contractAddress);
      }
    });
  };

  const handleJoin = async () => {
    if (!joinAddress) return;
    await txProgress.execute(async () => {
      await manager.join(providers, joinAddress);
      storage.setContractAddress(joinAddress);
    });
  };

  if (deployState?.status === 'ready') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contract Connected</CardTitle>
          <CardDescription className="font-mono text-xs break-all">
            {deployState.contractAddress}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Setup</CardTitle>
        <CardDescription>Deploy a new contract or join an existing one</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 border-r border-border pr-4">
            <h4 className="font-medium text-sm">Deploy New</h4>
            <input
              type="text"
              placeholder="Name"
              value={deployName}
              onChange={(e) => setDeployName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm bg-background"
            />
            <input
              type="text"
              placeholder="Symbol"
              value={deploySymbol}
              onChange={(e) => setDeploySymbol(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm bg-background"
            />
            <Button
              onClick={handleDeploy}
              disabled={txProgress.isProcessing || deployState?.status === 'deploying'}
              className="w-full"
            >
              {deployState?.status === 'deploying' ? 'Deploying...' : 'Deploy Contract'}
            </Button>
          </div>
          <div className="space-y-3 pl-4">
            <h4 className="font-medium text-sm">Join Existing</h4>
            <input
              type="text"
              placeholder="Contract address"
              value={joinAddress}
              onChange={(e) => setJoinAddress(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm bg-background font-mono"
            />
            <Button
              variant="outline"
              onClick={handleJoin}
              disabled={!joinAddress || txProgress.isProcessing || deployState?.status === 'joining'}
              className="w-full"
            >
              {deployState?.status === 'joining' ? 'Joining...' : 'Join Contract'}
            </Button>
          </div>
        </div>
        {deployState?.error && (
          <p className="text-sm text-destructive">{deployState.error}</p>
        )}
        <TransactionStatus {...txProgress} />
      </CardContent>
    </Card>
  );
}

function MintSection({ controller }: { controller: { mint: Function } }) {
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('100');
  const [source, setSource] = useState(0);
  const [impact, setImpact] = useState(2);
  const [location, setLocation] = useState(0);
  const [generation, setGeneration] = useState('1000000');
  const [vintage, setVintage] = useState('2024');
  const txProgress = useTransactionProgress();

  const handleMint = async () => {
    if (!tokenId) return;

    await txProgress.execute(async () => {
      const to = {
        is_left: true,
        left: { bytes: new Uint8Array(32) },
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
            <select
              value={source}
              onChange={(e) => setSource(Number(e.target.value))}
              className="w-full border rounded px-3 py-2 text-sm bg-background"
            >
              <option value={0}>Solar</option>
              <option value={1}>Wind</option>
              <option value={2}>Hydro</option>
              <option value={3}>Biomass</option>
              <option value={4}>Geothermal</option>
              <option value={5}>Nuclear</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Impact</label>
            <select
              value={impact}
              onChange={(e) => setImpact(Number(e.target.value))}
              className="w-full border rounded px-3 py-2 text-sm bg-background"
            >
              <option value={0}>Minimal</option>
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
              <option value={4}>Extreme</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(Number(e.target.value))}
              className="w-full border rounded px-3 py-2 text-sm bg-background"
            >
              <option value={0}>RJ</option>
              <option value={1}>SP</option>
              <option value={2}>MG</option>
              <option value={3}>RS</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Generation (kWh)</label>
            <input
              type="number"
              value={generation}
              onChange={(e) => setGeneration(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm bg-background"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Vintage (Year)</label>
            <input
              type="number"
              value={vintage}
              onChange={(e) => setVintage(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm bg-background"
            />
          </div>
        </div>
        <Button onClick={handleMint} disabled={!tokenId || txProgress.isProcessing} className="w-full">
          {txProgress.isProcessing ? 'Minting...' : 'Mint NFT'}
        </Button>
        <TransactionStatus {...txProgress} />
      </CardContent>
    </Card>
  );
}

function ListSection({ controller }: { controller: { addToPool: Function } }) {
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
          <input
            type="number"
            placeholder="Token ID to list"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm bg-background"
          />
        </div>
        <Button onClick={handleList} disabled={!tokenId || txProgress.isProcessing} className="w-full">
          {txProgress.isProcessing ? 'Listing...' : 'List for Sale'}
        </Button>
        <TransactionStatus {...txProgress} />
      </CardContent>
    </Card>
  );
}

function SetPriceSection({ controller }: { controller: { setTokenPrice: Function } }) {
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
            <input
              type="number"
              placeholder="Token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm bg-background"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">New Price</label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm bg-background"
            />
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

function BuySection({ controller }: { controller: { purchaseNFT: Function } }) {
  const [tokenId, setTokenId] = useState('');
  const txProgress = useTransactionProgress();

  const handleBuy = async () => {
    if (!tokenId) return;
    await txProgress.execute(async () => {
      // Dummy coin since shielded tokens are not available yet
      const dummyCoin = {
        nonce: new Uint8Array(32),
        color: new Uint8Array(32),
        value: 0n,
      };
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
          <input
            type="number"
            placeholder="Token ID to buy"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm bg-background"
          />
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
  name: string;
  symbol: string;
  certificatesCreatedCounter: bigint;
  purchaseCounter: bigint;
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
  const { unshieldedAddress } = useWallet();
  const providersState = useProviders();
  const { manager } = useDeployment();
  const [deployState, setDeployState] = useState<DeploymentState | null>(null);

  useEffect(() => {
    const sub = manager.state$.subscribe(setDeployState);
    return () => sub.unsubscribe();
  }, [manager]);

  const controller = deployState?.controller ?? null;
  const contractState = useContractSubscription(controller);

  if (!unshieldedAddress) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
        <p className="text-muted-foreground">
          Please connect your Midnight wallet to access the marketplace.
        </p>
      </div>
    );
  }

  if (!providersState) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Initializing Providers</h2>
        <p className="text-muted-foreground">
          Setting up connection to Midnight network...
        </p>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">NFT Marketplace</h1>
        <p className="text-muted-foreground">Mint, list, price, and trade NFT certificates</p>
      </div>

      <DeploySection providers={providersState.providers} />

      {controller && (
        <>
          <ContractStats {...contractState} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MintSection controller={controller} />
            <ListSection controller={controller} />
            <SetPriceSection controller={controller} />
            <BuySection controller={controller} />
          </div>
        </>
      )}
    </div>
  );
}
