import { type DerivedState } from '../api/common-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type ContractControllerInterface } from '../api/contractController';
import { type Observable } from 'rxjs';
import { useWallet } from '../../wallet-widget/hooks/useWallet';
import { type ContractDeployment, type ContractFollow } from '../contexts';
import { useDeployedContracts } from './use-deployment';
import { useProviders } from './use-providers';

export const useContractSubscription = () => {
  const { connectedAPI } = useWallet();
  const providers = useProviders();
  const deploy = useDeployedContracts();
  const deployRef = useRef(deploy);
  deployRef.current = deploy;

  const [deploymentObservable, setDeploymentObservable] =
    useState<Observable<ContractDeployment> | undefined>(undefined);

  const [contractDeployment, setContractDeployment] = useState<ContractDeployment>();
  const [deployedContractAPI, setDeployedContractAPI] = useState<ContractControllerInterface>();
  const [derivedState, setDerivedState] = useState<DerivedState>();
  const joinedWithRef = useRef<unknown>(null);

  const onDeploy = useCallback(async (): Promise<ContractFollow> => {
    const contractFollow = await deployRef.current.deployContract();
    setDeploymentObservable(contractFollow.observable);
    return contractFollow;
  }, []);

  // Auto-join when wallet connects and providers are ready
  useEffect(() => {
    if (!connectedAPI || !providers?.providers) {
      joinedWithRef.current = null;
      setDeployedContractAPI(undefined);
      setDerivedState(undefined);
      setContractDeployment(undefined);
      setDeploymentObservable(undefined);
      return;
    }

    // Don't re-join if we already joined with this connectedAPI
    if (joinedWithRef.current === connectedAPI) return;
    joinedWithRef.current = connectedAPI;

    // Reset state for new connection
    setDeployedContractAPI(undefined);
    setDerivedState(undefined);
    setContractDeployment(undefined);

    // Try to join
    const follow = deployRef.current.joinContract();
    setDeploymentObservable(follow.observable);
  }, [connectedAPI, providers?.providers]);

  // Subscribe to deployment observable
  useEffect(() => {
    if (!deploymentObservable) return;
    const subscription = deploymentObservable.subscribe(setContractDeployment);
    return () => {
      subscription.unsubscribe();
    };
  }, [deploymentObservable]);

  // Extract API when deployment succeeds
  useEffect(() => {
    if (!contractDeployment) return;
    if (contractDeployment.status === 'in-progress' || contractDeployment.status === 'failed') return;
    setDeployedContractAPI(contractDeployment.api);
  }, [contractDeployment]);

  // Subscribe to contract state
  useEffect(() => {
    if (!deployedContractAPI) return;
    const sub = deployedContractAPI.state$.subscribe(setDerivedState);
    return () => {
      sub.unsubscribe();
    };
  }, [deployedContractAPI]);

  return {
    deployedContractAPI,
    derivedState,
    contractDeployment,
    onDeploy,
    providers,
  };
};
