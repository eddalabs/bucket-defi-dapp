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

export function createInMemoryPrivateStateProvider<
  PSI extends PrivateStateId = PrivateStateId,
  PS = unknown,
>(): PrivateStateProvider<PSI, PS> {
  const store = new Map<string, PS>();
  const signingKeys = new Map<string, SigningKey>();
  let currentContractAddress: ContractAddress | null = null;

  const scopedKey = (id: PSI): string => {
    return currentContractAddress ? `${currentContractAddress}:${id}` : id;
  };

  return {
    setContractAddress(address: ContractAddress): void {
      currentContractAddress = address;
    },
    async set(privateStateId: PSI, state: PS): Promise<void> {
      store.set(scopedKey(privateStateId), state);
    },
    async get(privateStateId: PSI): Promise<PS | null> {
      return store.get(scopedKey(privateStateId)) ?? null;
    },
    async remove(privateStateId: PSI): Promise<void> {
      store.delete(scopedKey(privateStateId));
    },
    async clear(): Promise<void> {
      store.clear();
    },
    async setSigningKey(address: ContractAddress, signingKey: SigningKey): Promise<void> {
      signingKeys.set(address, signingKey);
    },
    async getSigningKey(address: ContractAddress): Promise<SigningKey | null> {
      return signingKeys.get(address) ?? null;
    },
    async removeSigningKey(address: ContractAddress): Promise<void> {
      signingKeys.delete(address);
    },
    async clearSigningKeys(): Promise<void> {
      signingKeys.clear();
    },
    async exportPrivateStates(_options?: ExportPrivateStatesOptions): Promise<PrivateStateExport> {
      throw new Error('Export not supported in in-memory provider');
    },
    async importPrivateStates(_exportData: PrivateStateExport, _options?: ImportPrivateStatesOptions): Promise<ImportPrivateStatesResult> {
      throw new Error('Import not supported in in-memory provider');
    },
    async exportSigningKeys(_options?: ExportSigningKeysOptions): Promise<SigningKeyExport> {
      throw new Error('Export not supported in in-memory provider');
    },
    async importSigningKeys(_exportData: SigningKeyExport, _options?: ImportSigningKeysOptions): Promise<ImportSigningKeysResult> {
      throw new Error('Import not supported in in-memory provider');
    },
  };
}
