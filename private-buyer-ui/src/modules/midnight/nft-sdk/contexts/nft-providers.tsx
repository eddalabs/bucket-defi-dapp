import * as ledger from '@midnight-ntwrk/ledger-v8';
import {
  type MidnightProvider,
  type WalletProvider,
  type PublicDataProvider,
} from '@midnight-ntwrk/midnight-js-types';
import { createContext, useMemo } from 'react';
import { type Logger } from 'pino';
import { useWallet } from '@/modules/midnight';
import type { MiniPrivateBuyerCircuits, MiniPrivateBuyerProviders } from '../api/common-types';
import { WrappedPublicDataProvider } from '../../wallet-widget/utils/providersWrappers/publicDataProvider';
import { CachedFetchZkConfigProvider } from '../../wallet-widget/utils/providersWrappers/zkConfigProvider';
import { proofClient, noopProofClient } from '../../wallet-widget/utils/providersWrappers/proofClient';
import { createInMemoryPrivateStateProvider } from '../../wallet-widget/utils/customImplementations/in-memory-private-state-provider';
import { type PrivateState } from '@eddalabs/mini-private-buyer-contract';
import { fromHex, toHex } from '@midnight-ntwrk/compact-runtime';

export interface ProvidersState {
  providers: MiniPrivateBuyerProviders;
}

export const ProvidersContext = createContext<ProvidersState | null>(null);

interface ProviderProps {
  children: React.ReactNode;
  logger: Logger;
}

export function Provider({ children, logger }: ProviderProps) {
  const { connectedAPI, serviceUriConfig, shieldedAddresses, status } = useWallet();

  const privateStateProvider = useMemo(
    () => createInMemoryPrivateStateProvider<string, PrivateState>(),
    [status],
  );

  const publicDataProvider: PublicDataProvider | undefined = useMemo(
    () =>
      serviceUriConfig
        ? new WrappedPublicDataProvider(
            serviceUriConfig.indexerUri,
            serviceUriConfig.indexerWsUri,
          )
        : undefined,
    [serviceUriConfig, status],
  );

  const zkConfigProvider = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    return new CachedFetchZkConfigProvider<MiniPrivateBuyerCircuits>(
      `${window.location.origin}/midnight/mini-private-buyer`,
      fetch.bind(window),
      () => {},
    );
  }, [status]);

  const proofProvider = useMemo(
    () =>
      serviceUriConfig?.proverServerUri && zkConfigProvider
        ? proofClient(serviceUriConfig.proverServerUri, zkConfigProvider, () => {})
        : noopProofClient(),
    [serviceUriConfig, zkConfigProvider, status],
  );

  const walletProvider: WalletProvider = useMemo(
    () =>
      connectedAPI
        ? {
            getCoinPublicKey(): ledger.CoinPublicKey {
              return shieldedAddresses?.shieldedCoinPublicKey as unknown as ledger.CoinPublicKey;
            },
            getEncryptionPublicKey(): ledger.EncPublicKey {
              return shieldedAddresses?.shieldedEncryptionPublicKey as unknown as ledger.EncPublicKey;
            },
            async balanceTx(
              tx: ledger.Transaction<ledger.SignatureEnabled, ledger.Proof, ledger.PreBinding>,
            ): Promise<ledger.FinalizedTransaction> {
              try {
                const serializedTx = toHex(tx.serialize());
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const received = await (connectedAPI as any).balanceUnsealedTransaction(serializedTx, {});
                return ledger.Transaction.deserialize<
                  ledger.SignatureEnabled,
                  ledger.Proof,
                  ledger.Binding
                >('signature', 'proof', 'binding', fromHex(received.tx));
              } catch (e) {
                logger.error({ error: e }, 'Error balancing transaction via wallet');
                throw e;
              }
            },
          }
        : {
            getCoinPublicKey(): ledger.CoinPublicKey {
              return '';
            },
            getEncryptionPublicKey(): ledger.EncPublicKey {
              return '';
            },
            balanceTx: () => Promise.reject(new Error('Wallet not connected')),
          },
    [connectedAPI, shieldedAddresses, status],
  );

  const midnightProvider: MidnightProvider = useMemo(
    () =>
      connectedAPI
        ? {
            submitTx: async (tx: ledger.FinalizedTransaction): Promise<ledger.TransactionId> => {
              await connectedAPI.submitTransaction(toHex(tx.serialize()));
              const txIdentifiers = tx.identifiers();
              logger.info({ txIdentifiers }, 'Submitted transaction via wallet');
              return txIdentifiers[0];
            },
          }
        : {
            submitTx: (): Promise<ledger.TransactionId> => Promise.reject(new Error('Wallet not connected')),
          },
    [connectedAPI, status, logger],
  );

  const combinedProviders: ProvidersState | null = useMemo(() => {
    if (!publicDataProvider || !zkConfigProvider) return null;
    return {
      providers: {
        privateStateProvider,
        publicDataProvider,
        zkConfigProvider,
        proofProvider,
        walletProvider,
        midnightProvider,
      },
    };
  }, [privateStateProvider, publicDataProvider, proofProvider, zkConfigProvider, walletProvider, midnightProvider]);

  return (
    <ProvidersContext.Provider value={combinedProviders}>
      {children}
    </ProvidersContext.Provider>
  );
}
