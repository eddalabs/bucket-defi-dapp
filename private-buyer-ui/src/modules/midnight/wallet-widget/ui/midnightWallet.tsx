import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '../hooks/useWallet';
import { ConnectedButton } from './connected-button';
import ScreenMain from './screen-main';
import { networkID } from './common/common-values';

export function MidnightWallet() {
  const { unshieldedAddress, connectingWallet, error } = useWallet();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>(networkID.PREPROD);

  if (unshieldedAddress) {
    return <ConnectedButton />;
  }

  return (
    <div className="relative">
      <Button onClick={() => setShowDialog(!showDialog)} disabled={connectingWallet}>
        {connectingWallet ? 'Connecting...' : 'Connect Wallet'}
      </Button>

      {showDialog && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-border bg-card p-4 shadow-lg z-50">
          <div className="flex items-center justify-between mb-2">
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

          {error != null && (
            <p className="text-xs text-destructive mb-3">
              {error instanceof Error ? error.message : String(error as string)}
            </p>
          )}

          <ScreenMain selectedNetwork={selectedNetwork} setOpen={setShowDialog} />
        </div>
      )}
    </div>
  );
}
