import { useEffect, useState } from 'react';
import { MidnightBrowserWallet } from '../api/walletController';
import type { InitialAPI } from '@midnight-ntwrk/dapp-connector-api';

export function useWalletList() {
  const [wallets, setWallets] = useState<InitialAPI[]>([]);

  useEffect(() => {
    const available = MidnightBrowserWallet.getAvailableWallets();
    setWallets(available);
  }, []);

  return wallets;
}
