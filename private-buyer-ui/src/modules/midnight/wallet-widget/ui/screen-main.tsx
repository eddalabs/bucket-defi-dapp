import { useWallet } from '../hooks/useWallet';
import { walletsListFormat } from './common/common-values';
import { TooltipProvider } from './common/tooltip';
import WalletIcon from './wallet-icon';

export default function ScreenMain({
  selectedNetwork,
  setOpen,
}: {
  selectedNetwork: string;
  setOpen: (open: boolean) => void;
}) {
  const { connectWallet } = useWallet();
  const walletEntries = Object.values(walletsListFormat);

  return (
    <TooltipProvider>
      <div
        className="grid gap-4 py-4 place-items-center"
        style={{
          gridTemplateColumns: `repeat(${walletEntries.length}, minmax(0, 1fr))`,
        }}
      >
        {walletEntries.map((config) => (
          <WalletIcon
            key={config.key}
            iconReactNode={config.icon}
            name={config.displayName}
            action={() => {
              connectWallet?.(config.key, selectedNetwork);
              setOpen(false);
            }}
          />
        ))}
      </div>
    </TooltipProvider>
  );
}
