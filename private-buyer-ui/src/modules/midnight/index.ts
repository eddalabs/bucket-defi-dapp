export { MidnightMeshProvider } from './wallet-widget/contexts/wallet';
export type { WalletContextState } from './wallet-widget/contexts/wallet';
export { useWallet } from './wallet-widget/hooks/useWallet';
export { useWalletList } from './wallet-widget/hooks/useWalletList';
export { MidnightWallet } from './wallet-widget/ui/midnightWallet';
export { MidnightBrowserWallet } from './wallet-widget/api/walletController';
export type {
  DustAddress,
  DustBalance,
  ShieldedAddress,
  ShieldedBalance,
  UnshieldedAddress,
  UnshieldedBalanceDappConnector,
} from './wallet-widget/api/common-types';
