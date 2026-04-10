import { createContext, useMemo } from 'react';
import { type Logger } from 'pino';
import { DeployedTemplateManager } from './nft-deployment-class';

export interface DeployedAPIProvider {
  manager: DeployedTemplateManager;
}

export const DeployedProviderContext = createContext<DeployedAPIProvider | null>(null);

interface DeployedProviderProps {
  children: React.ReactNode;
  logger: Logger;
}

export function DeployedProvider({ children, logger }: DeployedProviderProps) {
  const manager = useMemo(() => new DeployedTemplateManager(logger), [logger]);

  return (
    <DeployedProviderContext.Provider value={{ manager }}>
      {children}
    </DeployedProviderContext.Provider>
  );
}
