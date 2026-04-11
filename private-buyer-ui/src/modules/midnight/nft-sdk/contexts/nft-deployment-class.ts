import { type Logger } from 'pino';
import * as Rx from 'rxjs';
import { ContractController, type ContractControllerInterface } from '../api/contractController';
import type { MiniPrivateBuyerProviders } from '../api/common-types';
import type { LocalStorageProps } from './nft-localStorage-class';
import type { ContractAddress } from '@midnight-ntwrk/compact-runtime';

export type ContractDeployment =
  | { status: 'in-progress' }
  | { status: 'failed'; error: string }
  | { status: 'deployed'; api: ContractControllerInterface };

export type ContractFollow = {
  observable: Rx.Observable<ContractDeployment>;
};

export interface DeployedAPIProvider {
  deployContract: () => Promise<ContractFollow>;
  joinContract: () => ContractFollow;
}

export class DeployedTemplateManager implements DeployedAPIProvider {
  constructor(
    private readonly providers: MiniPrivateBuyerProviders | undefined,
    private readonly logger: Logger,
    private readonly localStorage: LocalStorageProps | undefined,
    private readonly contractAddress: ContractAddress | undefined,
  ) {}

  async deployContract(): Promise<ContractFollow> {
    return {
      observable: new Rx.Observable((subscriber) => {
        void this.deploy(subscriber);
      }),
    };
  }

  joinContract(): ContractFollow {
    return {
      observable: new Rx.Observable((subscriber) => {
        void this.join(subscriber);
      }),
    };
  }

  private async deploy(subscriber: Rx.Subscriber<ContractDeployment>): Promise<void> {
    if (!this.providers) {
      subscriber.next({ status: 'failed', error: 'Providers not ready' });
      return;
    }

    subscriber.next({ status: 'in-progress' });

    try {
      const controller = await ContractController.deploy(
        this.providers,
        this.logger,
        'EddaCerts',
        'ECRT',
      );

      this.localStorage?.addContract(controller.deployedContractAddress);
      subscriber.next({ status: 'deployed', api: controller });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Deploy failed';
      this.logger.error({ e }, msg);
      subscriber.next({ status: 'failed', error: msg });
    }
  }

  private async join(subscriber: Rx.Subscriber<ContractDeployment>): Promise<void> {
    if (!this.providers) {
      subscriber.next({ status: 'failed', error: 'Providers not ready' });
      return;
    }

    const address = this.contractAddress ?? this.localStorage?.getContracts()?.[0];
    if (!address) {
      subscriber.next({ status: 'failed', error: 'No contract address available' });
      return;
    }

    subscriber.next({ status: 'in-progress' });

    try {
      const controller = await ContractController.join(
        this.providers,
        this.logger,
        address,
      );

      this.localStorage?.addContract(controller.deployedContractAddress);
      subscriber.next({ status: 'deployed', api: controller });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Join failed';
      this.logger.error({ e }, msg);
      subscriber.next({ status: 'failed', error: msg });
    }
  }
}
