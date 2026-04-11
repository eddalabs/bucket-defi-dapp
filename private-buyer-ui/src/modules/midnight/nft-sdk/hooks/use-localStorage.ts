import { useContext } from 'react';
import { LocalStorageContext } from '../contexts';
import type { LocalStorageProps } from '../contexts/nft-localStorage-class';

export const useLocalStorage = (): LocalStorageProps | undefined => {
  return useContext(LocalStorageContext);
};
