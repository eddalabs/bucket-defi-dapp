const STORAGE_KEY = 'mini-private-buyer-contract-address';

export class ContractLocalStorage {
  getContractAddress(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  }

  setContractAddress(address: string): void {
    localStorage.setItem(STORAGE_KEY, address);
  }

  clearContractAddress(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
