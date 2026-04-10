import { createContext, useMemo } from 'react';
import { ContractLocalStorage } from './nft-localStorage-class';

export interface LocalStorageContextState {
  storage: ContractLocalStorage;
}

export const LocalStorageContext = createContext<LocalStorageContextState | null>(null);

interface LocalStorageProviderProps {
  children: React.ReactNode;
}

export function LocalStorageProvider({ children }: LocalStorageProviderProps) {
  const storage = useMemo(() => new ContractLocalStorage(), []);

  return (
    <LocalStorageContext.Provider value={{ storage }}>
      {children}
    </LocalStorageContext.Provider>
  );
}
