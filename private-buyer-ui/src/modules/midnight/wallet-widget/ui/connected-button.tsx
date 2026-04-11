import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useWallet } from '../hooks/useWallet';
import { Copy, LogOut } from 'lucide-react';

export function ConnectedButton() {
  const { unshieldedAddress, disconnect } = useWallet();

  const handleCopyAddress = async () => {
    if (unshieldedAddress) {
      await navigator.clipboard.writeText(unshieldedAddress.unshieldedAddress);
    }
  };

  if (!unshieldedAddress) {
    return null;
  }

  const addr = unshieldedAddress.unshieldedAddress;
  const shortAddress = `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="font-mono">
          {shortAddress}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleCopyAddress}>
          <Copy className="h-4 w-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={disconnect}>
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
