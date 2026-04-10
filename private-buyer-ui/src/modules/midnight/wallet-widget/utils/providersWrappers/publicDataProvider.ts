import type { PublicDataProvider, ContractStateObservableConfig } from '@midnight-ntwrk/midnight-js-types';
import type { ContractAddress, TransactionId } from '@midnight-ntwrk/ledger-v8';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { retryWithBackoff } from './retryWithBackoff';

export class WrappedPublicDataProvider implements PublicDataProvider {
  private readonly provider: PublicDataProvider;

  constructor(indexerUrl: string, indexerWsUrl: string) {
    this.provider = indexerPublicDataProvider(indexerUrl, indexerWsUrl);
  }

  queryContractState(contractAddress: ContractAddress, config?: Parameters<PublicDataProvider['queryContractState']>[1]) {
    return retryWithBackoff(() => this.provider.queryContractState(contractAddress, config));
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
    return this.provider.watchForDeployTxData(contractAddress);
  }

  watchForTxData(txId: TransactionId) {
    return this.provider.watchForTxData(txId);
  }

  contractStateObservable(address: ContractAddress, config: ContractStateObservableConfig) {
    return this.provider.contractStateObservable(address, config);
  }

  unshieldedBalancesObservable(address: ContractAddress, config: ContractStateObservableConfig) {
    return this.provider.unshieldedBalancesObservable(address, config);
  }
}
