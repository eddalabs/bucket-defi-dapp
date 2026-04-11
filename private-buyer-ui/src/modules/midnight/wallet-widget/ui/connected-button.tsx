import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './common/dropdown-menu';
import { Button } from './common/button';
import { useWallet } from '../hooks/useWallet';

export function ConnectedButton() {
  const { disconnect, unshieldedAddress } = useWallet();

  if (!unshieldedAddress) return null;

  const addr = unshieldedAddress.unshieldedAddress;
  const shortAddress = `${addr.slice(0, 4)}...${addr.slice(-4)}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{shortAddress}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(addr)}
        >
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => disconnect()}>
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
