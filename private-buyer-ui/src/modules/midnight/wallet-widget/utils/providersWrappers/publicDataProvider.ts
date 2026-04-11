import type { PublicDataProvider, ContractStateObservableConfig } from '@midnight-ntwrk/midnight-js-types';
import type { ContractAddress, TransactionId } from '@midnight-ntwrk/ledger-v8';
import { retryWithBackoff } from './retryWithBackoff';
import type { Logger } from 'pino';

export type ProviderAction =
  | 'proveTxStarted'
  | 'proveTxDone'
  | 'balanceTxStarted'
  | 'balanceTxDone'
  | 'downloadProverStarted'
  | 'downloadProverDone'
  | 'submitTxStarted'
  | 'submitTxDone'
  | 'watchForTxDataStarted'
  | 'watchForTxDataDone';

export type ActionMessages = {
  [K in ProviderAction]: string | undefined;
};

export class WrappedPublicDataProvider implements PublicDataProvider {
  constructor(
    private readonly provider: PublicDataProvider,
    private readonly callback?: (action: ProviderAction) => void,
    _logger?: Logger,
  ) {}

  queryContractState(...args: Parameters<PublicDataProvider['queryContractState']>) {
    return retryWithBackoff(() => this.provider.queryContractState(...args));
  }

  queryZSwapAndContractState(...args: Parameters<PublicDataProvider['queryZSwapAndContractState']>) {
    return this.provider.queryZSwapAndContractState(...args);
  }

  queryDeployContractState(contractAddress: ContractAddress) {
    return this.provider.queryDeployContractState(contractAddress);
  }

  queryUnshieldedBalances(...args: Parameters<PublicDataProvider['queryUnshieldedBalances']>) {
    return this.provider.queryUnshieldedBalances(...args);
  }

  watchForContractState(contractAddress: ContractAddress) {
    return this.provider.watchForContractState(contractAddress);
  }

  watchForUnshieldedBalances(contractAddress: ContractAddress) {
    return this.provider.watchForUnshieldedBalances(contractAddress);
  }

  watchForDeployTxData(contractAddress: ContractAddress) {
    this.callback?.('watchForTxDataStarted');
    return this.provider.watchForDeployTxData(contractAddress).then((result) => {
      this.callback?.('watchForTxDataDone');
      return result;
    });
  }

  watchForTxData(txId: TransactionId) {
    this.callback?.('watchForTxDataStarted');
    return this.provider.watchForTxData(txId).then((result) => {
      this.callback?.('watchForTxDataDone');
      return result;
    });
  }

  contractStateObservable(address: ContractAddress, config: ContractStateObservableConfig) {
    return this.provider.contractStateObservable(address, config);
  }

  unshieldedBalancesObservable(address: ContractAddress, config: ContractStateObservableConfig) {
    return this.provider.unshieldedBalancesObservable(address, config);
  }
}
