import { useEffect, useState } from 'react';
import { MidnightBrowserWallet } from '../api/walletController';

export function useWalletList() {
  const [wallets, setWallets] = useState<string[]>([]);

  useEffect(() => {
    const getWallets = async () => {
      const availableWallets = await MidnightBrowserWallet.getAvailableWalletKeys();
      setWallets(availableWallets);
    };
    getWallets();
  }, []);

  return wallets;
}
