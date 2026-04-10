import { createContext, useCallback, useState } from 'react';
import {
  ConnectedAPI,
  InitialAPI,
  Configuration,
  ConnectionStatus,
} from '@midnight-ntwrk/dapp-connector-api';
import {
  DustAddress,
  DustBalance,
  ShieldedAddress,
  ShieldedBalance,
  UnshieldedAddress,
  UnshieldedBalanceDappConnector,
} from '../api/common-types';
import { MidnightBrowserWallet } from '../api/walletController';

export interface WalletContextState {
  connectingWallet: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  error: string | undefined;
  initialAPI: InitialAPI | undefined;
  connectedAPI: ConnectedAPI | undefined;
  serviceUriConfig: Configuration | undefined;
  status: ConnectionStatus | undefined;
  dustAddress: DustAddress | undefined;
  dustBalance: DustBalance | undefined;
  shieldedAddresses: ShieldedAddress | undefined;
  shieldedBalances: ShieldedBalance | undefined;
  unshieldedAddress: UnshieldedAddress | undefined;
  unshieldedBalances: UnshieldedBalanceDappConnector | undefined;
  proofServerOnline: boolean;
  connectWallet: (walletKey: string, networkId: string) => Promise<void>;
  disconnect: () => Promise<void>;
  refresh: () => Promise<void>;
}

const initialContext: WalletContextState = {
  connectingWallet: false,
  open: false,
  setOpen: () => {},
  error: undefined,
  initialAPI: undefined,
  connectedAPI: undefined,
  serviceUriConfig: undefined,
  status: undefined,
  dustAddress: undefined,
  dustBalance: undefined,
  shieldedAddresses: undefined,
  shieldedBalances: undefined,
  unshieldedAddress: undefined,
  unshieldedBalances: undefined,
  proofServerOnline: false,
  connectWallet: async () => {},
  disconnect: async () => {},
  refresh: async () => {},
};

export const WalletContext = createContext<WalletContextState>(initialContext);

export function MidnightMeshProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<MidnightBrowserWallet>(MidnightBrowserWallet.create());
  const [connectingWallet, setConnectingWallet] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const connectWallet = useCallback(async (walletKey: string, networkId: string) => {
    setConnectingWallet(true);
    setError(undefined);
    try {
      const connected = await MidnightBrowserWallet.create().connect(walletKey, networkId);
      setWallet(connected);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to connect wallet');
    } finally {
      setConnectingWallet(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    const disconnected = await wallet.disconnect();
    setWallet(disconnected);
  }, [wallet]);

  const refresh = useCallback(async () => {
    try {
      const refreshed = await wallet.refresh();
      setWallet(refreshed);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to refresh wallet');
    }
  }, [wallet]);

  return (
    <WalletContext.Provider
      value={{
        connectingWallet,
        open,
        setOpen,
        error,
        initialAPI: wallet.initialAPI,
        connectedAPI: wallet.connectedAPI,
        serviceUriConfig: wallet.serviceUriConfig,
        status: wallet.status,
        dustAddress: wallet.dustAddress,
        dustBalance: wallet.dustBalance,
        shieldedAddresses: wallet.shieldedAddresses,
        shieldedBalances: wallet.shieldedBalances,
        unshieldedAddress: wallet.unshieldedAddress,
        unshieldedBalances: wallet.unshieldedBalances,
        proofServerOnline: wallet.proofServerOnline,
        connectWallet,
        disconnect,
        refresh,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
