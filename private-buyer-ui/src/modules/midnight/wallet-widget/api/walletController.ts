import {
  ConnectedAPI,
  InitialAPI,
  Configuration,
  ConnectionStatus,
} from '@midnight-ntwrk/dapp-connector-api';
import {
  catchError,
  concatMap,
  filter,
  firstValueFrom,
  interval,
  take,
  timeout,
} from 'rxjs';

import {
  DustAddress,
  DustBalance,
  ShieldedAddress,
  ShieldedBalance,
  UnshieldedAddress,
  UnshieldedBalanceDappConnector,
} from './common-types';
import { checkProofServerStatus } from '../utils/proofServer/utils';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';

declare global {
  interface Window {
    midnight?: { [key: string]: InitialAPI };
  }
}

export interface DiscoveredWallet {
  /** The actual key under window.midnight (typically a UUID) */
  key: string;
  /** Human-readable name from the wallet's InitialAPI */
  name: string;
  /** Icon URL from the wallet's InitialAPI */
  icon: string;
  /** Reverse-DNS identifier (e.g. "io.iohk.lace") */
  rdns: string;
}

export class MidnightBrowserWallet {
  private constructor(
    public initialAPI: InitialAPI | undefined,
    public connectedAPI: ConnectedAPI | undefined,
    public serviceUriConfig: Configuration | undefined,
    public status: ConnectionStatus | undefined,
    public dustAddress: DustAddress | undefined,
    public dustBalance: DustBalance | undefined,
    public shieldedAddresses: ShieldedAddress | undefined,
    public shieldedBalances: ShieldedBalance | undefined,
    public unshieldedAddress: UnshieldedAddress | undefined,
    public unshieldedBalances: UnshieldedBalanceDappConnector | undefined,
    public proofServerOnline: boolean,
  ) {}

  /**
   * Discover all wallets injected under window.midnight.
   * Returns their actual keys (UUIDs) along with metadata (name, icon, rdns).
   */
  static async discoverWallets(): Promise<DiscoveredWallet[]> {
    const keys = await MidnightBrowserWallet.getAvailableWalletKeys();
    if (!window.midnight) return [];

    return keys.map((key) => {
      const api = window.midnight![key];
      return {
        key,
        name: api.name ?? key,
        icon: api.icon ?? '',
        rdns: api.rdns ?? '',
      };
    });
  }

  static async getAvailableWalletKeys(): Promise<string[]> {
    const source$ = interval(100).pipe(
      concatMap(() => {
        const detectedWallets = window.midnight ? Object.keys(window.midnight) : [];
        return [detectedWallets];
      }),
      filter((w) => w.length > 0),
      take(1),
      timeout({ first: 3_000 }),
      catchError(() => [[] as string[]]),
    );
    return await firstValueFrom(source$);
  }

  static create(): MidnightBrowserWallet {
    return new MidnightBrowserWallet(
      undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      undefined, undefined, false,
    );
  }

  async connect(walletKey: string, networkId: string): Promise<MidnightBrowserWallet> {
    setNetworkId(networkId);

    const wallet = window.midnight?.[walletKey];
    if (!wallet) {
      throw new Error(`Wallet "${walletKey}" not found in window.midnight`);
    }

    const initialAPI = wallet;
    const connectedAPI = await initialAPI.connect(networkId);
    const serviceUriConfig = await connectedAPI.getConfiguration();
    const status = await connectedAPI.getConnectionStatus();

    const dustAddress = await connectedAPI.getDustAddress();
    const dustBalance = await connectedAPI.getDustBalance();
    const shieldedAddresses = await connectedAPI.getShieldedAddresses();
    const shieldedBalances = await connectedAPI.getShieldedBalances();
    const unshieldedAddress = await connectedAPI.getUnshieldedAddress();
    const unshieldedBalances = await connectedAPI.getUnshieldedBalances();

    let proofServerOnline = false;
    try {
      proofServerOnline = await checkProofServerStatus(serviceUriConfig.proverServerUri ?? '');
    } catch {
      proofServerOnline = false;
    }

    return new MidnightBrowserWallet(
      initialAPI, connectedAPI, serviceUriConfig, status,
      dustAddress as DustAddress,
      dustBalance as DustBalance,
      shieldedAddresses as ShieldedAddress,
      shieldedBalances as ShieldedBalance,
      unshieldedAddress as UnshieldedAddress,
      unshieldedBalances as UnshieldedBalanceDappConnector,
      proofServerOnline,
    );
  }

  async disconnect(): Promise<MidnightBrowserWallet> {
    return MidnightBrowserWallet.create();
  }

  async refresh(): Promise<MidnightBrowserWallet> {
    if (!this.connectedAPI) return this;

    const dustAddress = await this.connectedAPI.getDustAddress();
    const dustBalance = await this.connectedAPI.getDustBalance();
    const shieldedAddresses = await this.connectedAPI.getShieldedAddresses();
    const shieldedBalances = await this.connectedAPI.getShieldedBalances();
    const unshieldedAddress = await this.connectedAPI.getUnshieldedAddress();
    const unshieldedBalances = await this.connectedAPI.getUnshieldedBalances();

    let proofServerOnline = false;
    try {
      proofServerOnline = await checkProofServerStatus(this.serviceUriConfig?.proverServerUri ?? '');
    } catch {
      proofServerOnline = false;
    }

    return new MidnightBrowserWallet(
      this.initialAPI, this.connectedAPI, this.serviceUriConfig, this.status,
      dustAddress as DustAddress,
      dustBalance as DustBalance,
      shieldedAddresses as ShieldedAddress,
      shieldedBalances as ShieldedBalance,
      unshieldedAddress as UnshieldedAddress,
      unshieldedBalances as UnshieldedBalanceDappConnector,
      proofServerOnline,
    );
  }
}
