import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '../hooks/useWallet';
import { networkID } from './common/common-values';
import { MidnightBrowserWallet, type DiscoveredWallet } from '../api/walletController';

export function MidnightWallet() {
  const { unshieldedAddress, connectWallet, disconnect, connectingWallet, error } = useWallet();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>(networkID.PREPROD);
  const [discoveredWallets, setDiscoveredWallets] = useState<DiscoveredWallet[]>([]);
  const [discovering, setDiscovering] = useState(false);

  useEffect(() => {
    if (!showDialog) return;
    setDiscovering(true);
    MidnightBrowserWallet.discoverWallets()
      .then(setDiscoveredWallets)
      .finally(() => setDiscovering(false));
  }, [showDialog]);

  if (unshieldedAddress) {
    const addr = unshieldedAddress.unshieldedAddress;
    const shortAddress = `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground font-mono">{shortAddress}</span>
        <Button variant="outline" size="sm" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button onClick={() => setShowDialog(!showDialog)} disabled={connectingWallet}>
        {connectingWallet ? 'Connecting...' : 'Connect Wallet'}
      </Button>

      {showDialog && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-border bg-card p-4 shadow-lg z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Connect Wallet</h3>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="text-xs border rounded px-2 py-1 bg-background"
            >
              <option value={networkID.UNDEPLOYED}>Undeployed</option>
              <option value={networkID.PREVIEW}>Preview</option>
              <option value={networkID.PREPROD}>Preprod</option>
            </select>
          </div>

          {error && <p className="text-xs text-destructive mb-3">{error}</p>}

          {discovering ? (
            <div className="flex items-center justify-center py-4 gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
              <span className="text-sm text-muted-foreground">Detecting wallets...</span>
            </div>
          ) : discoveredWallets.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No Midnight wallets detected. Install Lace or 1AM.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {discoveredWallets.map((wallet) => (
                <button
                  key={wallet.key}
                  onClick={() => {
                    connectWallet(wallet.key, selectedNetwork);
                    setShowDialog(false);
                  }}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  {wallet.icon ? (
                    <img src={wallet.icon} alt={wallet.name} className="h-10 w-10 rounded-full" />
                  ) : (
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-muted text-lg font-bold">
                      {wallet.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-xs font-medium">{wallet.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
