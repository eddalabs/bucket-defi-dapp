import { useContext } from 'react';
import { ProvidersContext, type ProvidersState } from '../contexts';

export const useProviders = (): ProvidersState | null => {
  const providerState = useContext(ProvidersContext);
  if (!providerState) {
    return null;
  }
  return providerState;
};
