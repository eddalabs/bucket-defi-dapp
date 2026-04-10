import { type Logger } from 'pino';
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
}

export const NFTAppProvider = ({ children, logger }: NFTAppProviderProps) => {
  return (
    <LocalStorageProvider>
      <Provider logger={logger}>
        <DeployedProvider logger={logger}>
          {children}
        </DeployedProvider>
      </Provider>
    </LocalStorageProvider>
  );
};
