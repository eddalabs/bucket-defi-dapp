import { useContext } from 'react';
import { DeployedProviderContext, type DeployedAPIProvider } from '../contexts';

export const useDeployment = (): DeployedAPIProvider => {
  const context = useContext(DeployedProviderContext);
  if (!context) {
    throw new Error('useDeployment must be used within a DeployedProvider');
  }
  return context;
};
