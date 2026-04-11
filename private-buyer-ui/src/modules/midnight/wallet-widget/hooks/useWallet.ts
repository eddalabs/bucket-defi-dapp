import { useContext } from 'react';
import { WalletContext } from '../contexts/wallet';

export const useWallet = () => {
  const context = useContext(WalletContext);

  if (context.connectWallet === undefined) {
    throw new Error("Can't call useWallet outside of the WalletProvider context");
  }

  return context;
};
