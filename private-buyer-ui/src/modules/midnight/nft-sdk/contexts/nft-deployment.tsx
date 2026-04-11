import { createContext, useMemo } from 'react';
import { type Logger } from 'pino';
import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import { DeployedTemplateManager, type DeployedAPIProvider } from './nft-deployment-class';
import { useProviders } from '../hooks/use-providers';
import { useLocalStorage } from '../hooks/use-localStorage';

export const DeployedProviderContext = createContext<DeployedAPIProvider | undefined>(undefined);

export interface DeployedProviderProps {
  children: React.ReactNode;
  logger: Logger;
  contractAddress: ContractAddress;
}

export const DeployedProvider = ({ children, logger, contractAddress }: DeployedProviderProps) => {
  const providersState = useProviders();
  const localStorage = useLocalStorage();

  const manager = useMemo(
    () =>
      new DeployedTemplateManager(
        providersState?.providers,
        logger,
        localStorage,
        contractAddress,
      ),
    [providersState, logger, localStorage, contractAddress],
  );

  return (
    <DeployedProviderContext.Provider value={manager}>
      {children}
    </DeployedProviderContext.Provider>
  );
};
