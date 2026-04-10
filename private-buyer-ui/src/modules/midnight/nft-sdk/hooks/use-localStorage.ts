import { useContext } from 'react';
import { LocalStorageContext, type LocalStorageContextState } from '../contexts';

export const useLocalStorage = (): LocalStorageContextState => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error('useLocalStorage must be used within a LocalStorageProvider');
  }
  return context;
};
