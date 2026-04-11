import { type Logger } from 'pino';

const STORAGE_KEY = 'nft_contracts';

export interface LocalStorageProps {
  addContract: (contractAddress: string) => void;
  getContracts: () => string[];
}

export class LocalStorage implements LocalStorageProps {
  constructor(private readonly logger: Logger) {}

  addContract(contractAddress: string): void {
    const contracts = this.getContracts();
    contracts.push(contractAddress);
    const unique = [...new Set(contracts)];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
    this.logger.trace(`Contract added: ${contractAddress}`);
  }

  getContracts(): string[] {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      const contracts: string[] = JSON.parse(stored);
      return [...new Set(contracts)];
    } catch {
      return [];
    }
  }
}
