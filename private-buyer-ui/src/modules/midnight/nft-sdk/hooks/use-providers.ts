import { useContext } from 'react';
import { ProvidersContext, type ProvidersState } from '../contexts';

export const useProviders = (): ProvidersState | undefined => {
  const providerState = useContext(ProvidersContext);
  if (!providerState) {
    return undefined;
  }
  return providerState;
};
