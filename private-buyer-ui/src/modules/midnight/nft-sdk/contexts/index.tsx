import { type Logger } from 'pino';
import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import { DeployedProvider } from './nft-deployment';
import { LocalStorageProvider } from './nft-localStorage';
import { Provider } from './nft-providers';

export * from './nft-providers';
export * from './nft-localStorage';
export * from './nft-localStorage-class';
export * from './nft-deployment';
export * from './nft-deployment-class';

interface NFTAppProviderProps {
  children: React.ReactNode;
  logger: Logger;
  contractAddress: ContractAddress;
}

export const NFTAppProvider = ({ children, logger, contractAddress }: NFTAppProviderProps) => {
  return (
    <LocalStorageProvider logger={logger}>
      <Provider logger={logger}>
        <DeployedProvider logger={logger} contractAddress={contractAddress}>
          {children}
        </DeployedProvider>
      </Provider>
    </LocalStorageProvider>
  );
};
