import { useState } from 'react';
import { Button } from './common/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from './common/dialog';
import { useWallet } from '../hooks/useWallet';
import { ConnectedButton } from './connected-button';
import ScreenMain from './screen-main';
import { networkID } from './common/common-values';

export function MidnightWallet() {
  const { unshieldedAddress, connectingWallet, error } = useWallet();
  const [open, setOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>(networkID.PREPROD);

  if (unshieldedAddress) {
    return <ConnectedButton />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={connectingWallet}>
          {connectingWallet ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle>Midnight Wallet</DialogTitle>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="text-xs border rounded px-2 py-1.5 bg-background text-foreground"
            >
              <option value={networkID.UNDEPLOYED}>Undeployed</option>
              <option value={networkID.PREVIEW}>Preview</option>
              <option value={networkID.PREPROD}>Preprod</option>
            </select>
          </div>
        </DialogHeader>

        {error != null && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">
              {error instanceof Error ? error.message : String(error as string)}
            </p>
          </div>
        )}

        <ScreenMain selectedNetwork={selectedNetwork} setOpen={setOpen} />

        <DialogFooter className="flex items-center justify-center pt-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Powered by</span>
            <span className="text-xs font-semibold">Edda Labs</span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
