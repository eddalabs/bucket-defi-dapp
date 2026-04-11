import type {
  PrivateStateProvider,
  PrivateStateId,
  PrivateStateExport,
  ExportPrivateStatesOptions,
  ImportPrivateStatesOptions,
  ImportPrivateStatesResult,
  SigningKeyExport,
  ExportSigningKeysOptions,
  ImportSigningKeysOptions,
  ImportSigningKeysResult,
} from '@midnight-ntwrk/midnight-js-types';
import type { ContractAddress, SigningKey } from '@midnight-ntwrk/compact-runtime';

export class WrappedPrivateStateProvider<PSI extends PrivateStateId = PrivateStateId, PS = unknown>
  implements PrivateStateProvider<PSI, PS>
{
  constructor(private readonly inner: PrivateStateProvider<PSI, PS>) {}

  setContractAddress(address: ContractAddress): void {
    return this.inner.setContractAddress(address);
  }

  set(privateStateId: PSI, state: PS): Promise<void> {
    return this.inner.set(privateStateId, state);
  }

  get(privateStateId: PSI): Promise<null | PS> {
    return this.inner.get(privateStateId);
  }

  remove(privateStateId: PSI): Promise<void> {
    return this.inner.remove(privateStateId);
  }

  clear(): Promise<void> {
    return this.inner.clear();
  }

  setSigningKey(address: ContractAddress, signingKey: SigningKey): Promise<void> {
    return this.inner.setSigningKey(address, signingKey);
  }

  getSigningKey(address: ContractAddress): Promise<SigningKey | null> {
    return this.inner.getSigningKey(address);
  }

  removeSigningKey(address: ContractAddress): Promise<void> {
    return this.inner.removeSigningKey(address);
  }

  clearSigningKeys(): Promise<void> {
    return this.inner.clearSigningKeys();
  }

  exportPrivateStates(options?: ExportPrivateStatesOptions): Promise<PrivateStateExport> {
    return this.inner.exportPrivateStates(options);
  }

  importPrivateStates(exportData: PrivateStateExport, options?: ImportPrivateStatesOptions): Promise<ImportPrivateStatesResult> {
    return this.inner.importPrivateStates(exportData, options);
  }

  exportSigningKeys(options?: ExportSigningKeysOptions): Promise<SigningKeyExport> {
    return this.inner.exportSigningKeys(options);
  }

  importSigningKeys(exportData: SigningKeyExport, options?: ImportSigningKeysOptions): Promise<ImportSigningKeysResult> {
    return this.inner.importSigningKeys(exportData, options);
  }
}
