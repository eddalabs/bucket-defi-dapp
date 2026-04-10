import { type Logger } from 'pino';
import { BehaviorSubject } from 'rxjs';
import { ContractController } from '../api/contractController';
import type { MiniPrivateBuyerProviders } from '../api/common-types';

export type DeploymentStatus = 'idle' | 'deploying' | 'joining' | 'ready' | 'error';

export interface DeploymentState {
  status: DeploymentStatus;
  controller: ContractController | null;
  error: string | null;
  contractAddress: string | null;
}

export class DeployedTemplateManager {
  readonly state$ = new BehaviorSubject<DeploymentState>({
    status: 'idle',
    controller: null,
    error: null,
    contractAddress: null,
  });

  constructor(private readonly logger: Logger) {}

  async deploy(providers: MiniPrivateBuyerProviders, name: string, symbol: string): Promise<void> {
    this.state$.next({ ...this.state$.value, status: 'deploying', error: null });
    try {
      const controller = await ContractController.deploy(providers, this.logger, name, symbol);
      this.state$.next({
        status: 'ready',
        controller,
        error: null,
        contractAddress: controller.deployedContractAddress,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Deploy failed';
      this.logger.error({ e }, msg);
      this.state$.next({ ...this.state$.value, status: 'error', error: msg });
    }
  }

  async join(providers: MiniPrivateBuyerProviders, contractAddress: string): Promise<void> {
    this.state$.next({ ...this.state$.value, status: 'joining', error: null });
    try {
      const controller = await ContractController.join(providers, this.logger, contractAddress);
      this.state$.next({
        status: 'ready',
        controller,
        error: null,
        contractAddress: controller.deployedContractAddress,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Join failed';
      this.logger.error({ e }, msg);
      this.state$.next({ ...this.state$.value, status: 'error', error: msg });
    }
  }
}
