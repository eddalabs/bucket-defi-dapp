import { type Logger } from 'pino';
import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import * as Rx from 'rxjs';
import {
  MiniPrivateBuyerPrivateStateId,
  MiniPrivateBuyerProviders,
  DeployedMiniPrivateBuyerContract,
  emptyState,
  type DerivedState,
  type UserAction,
  type TokenInfo,
} from './common-types';
import { MiniPrivateBuyer, type PrivateState, witnesses, createPrivateState } from '@eddalabs/mini-private-buyer-contract';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { CompiledContract } from '@midnight-ntwrk/compact-js';

const miniPrivateBuyerCompiledContract = CompiledContract.make('mini-private-buyer', MiniPrivateBuyer.Contract).pipe(
  CompiledContract.withWitnesses(witnesses),
  CompiledContract.withCompiledFileAssets(`${window.location.origin}/midnight/mini-private-buyer`),
);

export interface ContractControllerInterface {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Rx.Observable<DerivedState>;
  mint: (
    to: MiniPrivateBuyer.Either<MiniPrivateBuyer.ZswapCoinPublicKey, MiniPrivateBuyer.ContractAddress>,
    tokenId: bigint,
    tokenCertificate: MiniPrivateBuyer.NonFungibleToken_Certificate,
    price: bigint,
  ) => Promise<void>;
  mintAndList: (
    to: MiniPrivateBuyer.Either<MiniPrivateBuyer.ZswapCoinPublicKey, MiniPrivateBuyer.ContractAddress>,
    tokenId: bigint,
    tokenCertificate: MiniPrivateBuyer.NonFungibleToken_Certificate,
    price: bigint,
  ) => Promise<void>;
  addToPool: (tokenId: bigint) => Promise<void>;
  setTokenPrice: (tokenId: bigint, price: bigint) => Promise<void>;
  purchaseNFT: (tokenId: bigint, coin: MiniPrivateBuyer.ShieldedCoinInfo) => Promise<void>;
}

export class ContractController implements ContractControllerInterface {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Rx.Observable<DerivedState>;
  readonly privateStates$: Rx.BehaviorSubject<PrivateState>;
  readonly actions$: Rx.Subject<UserAction>;

  private constructor(
    public readonly contractPrivateStateId: typeof MiniPrivateBuyerPrivateStateId,
    public readonly deployedContract: DeployedMiniPrivateBuyerContract,
    public readonly providers: MiniPrivateBuyerProviders,
    private readonly logger: Logger,
    initialPrivateState: PrivateState,
  ) {
    this.deployedContractAddress = deployedContract.deployTxData.public.contractAddress;
    this.privateStates$ = new Rx.BehaviorSubject<PrivateState>(initialPrivateState);
    this.actions$ = new Rx.Subject<UserAction>();

    const combine = (_acc: DerivedState, val: Partial<DerivedState>): DerivedState => ({
      ...emptyState,
      ..._acc,
      ...val,
    });

    const contractState$ = providers.publicDataProvider
      .contractStateObservable(this.deployedContractAddress, { type: 'latest' })
      .pipe(
        Rx.map((contractState) => {
          const ledgerState = MiniPrivateBuyer.ledger(contractState.data);

          // Extract first 10 tokens from ledger maps
          const tokens: TokenInfo[] = [];
          let count = 0;
          for (const [tokenId, certificate] of ledgerState.NonFungibleToken__tokenToCertificate) {
            if (count >= 10) break;

            const price = ledgerState.NonFungibleToken__tokenToPrice.member(tokenId)
              ? ledgerState.NonFungibleToken__tokenToPrice.lookup(tokenId)
              : 0n;

            const owner = ledgerState.NonFungibleToken__owners.member(tokenId)
              ? ledgerState.NonFungibleToken__owners.lookup(tokenId)
              : null;

            const isListed = ledgerState.NFTPool__pool.member(tokenId);

            const isSold = ledgerState.NFTPool__tokenSold.member(tokenId)
              ? ledgerState.NFTPool__tokenSold.lookup(tokenId)
              : false;

            const buyerCommitment = ledgerState.NFTPool__nftOwnerCommitment.member(tokenId)
              ? ledgerState.NFTPool__nftOwnerCommitment.lookup(tokenId)
              : null;

            tokens.push({
              tokenId,
              certificate,
              price,
              ownerBytes: owner?.left?.bytes ?? new Uint8Array(32),
              isListed,
              isSold,
              buyerCommitment,
            });
            count++;
          }

          return {
            name: ledgerState.NonFungibleToken__name,
            symbol: ledgerState.NonFungibleToken__symbol,
            certificatesCreatedCounter: ledgerState.NonFungibleToken__certificatesCreatedCounter,
            purchaseCounter: ledgerState.NFTPool__purchaseCounter,
            tokens,
          };
        }),
        Rx.retry({ delay: 5000 }),
        Rx.catchError((err) => {
          logger.error({ err }, 'Error in contract state observable');
          return Rx.of({
            name: '',
            symbol: '',
            certificatesCreatedCounter: 0n,
            purchaseCounter: 0n,
            tokens: [] as TokenInfo[],
          });
        }),
      );

    this.state$ = Rx.merge(
      contractState$.pipe(Rx.map((s) => ({ ...s }))),
      this.privateStates$.pipe(Rx.map((privateState) => ({ privateState }))),
      this.actions$.pipe(Rx.map((actions) => ({ actions }))),
    ).pipe(
      Rx.scan(combine, emptyState),
      Rx.shareReplay(1),
    );
  }

  static async deploy(
    providers: MiniPrivateBuyerProviders,
    logger: Logger,
    name: string,
    symbol: string,
  ): Promise<ContractController> {
    logger.info('Deploying mini-private-buyer contract...');
    const privateState = createPrivateState(crypto.getRandomValues(new Uint8Array(32)));
    const contract = await deployContract(providers, {
      compiledContract: miniPrivateBuyerCompiledContract,
      privateStateId: MiniPrivateBuyerPrivateStateId,
      initialPrivateState: privateState,
      args: [name, symbol],
    });
    logger.info(`Deployed at: ${contract.deployTxData.public.contractAddress}`);
    return new ContractController(MiniPrivateBuyerPrivateStateId, contract, providers, logger, privateState);
  }

  static async join(
    providers: MiniPrivateBuyerProviders,
    logger: Logger,
    contractAddress: string,
  ): Promise<ContractController> {
    logger.info(`Joining contract at: ${contractAddress}`);
    const privateState = createPrivateState(crypto.getRandomValues(new Uint8Array(32)));
    const contract = await findDeployedContract(providers, {
      contractAddress,
      compiledContract: miniPrivateBuyerCompiledContract,
      privateStateId: MiniPrivateBuyerPrivateStateId,
      initialPrivateState: privateState,
    });
    logger.info('Joined successfully');
    return new ContractController(MiniPrivateBuyerPrivateStateId, contract, providers, logger, privateState);
  }

  async mint(
    to: MiniPrivateBuyer.Either<MiniPrivateBuyer.ZswapCoinPublicKey, MiniPrivateBuyer.ContractAddress>,
    tokenId: bigint,
    tokenCertificate: MiniPrivateBuyer.NonFungibleToken_Certificate,
    price: bigint,
  ): Promise<void> {
    this.logger.info(`Minting token ${tokenId}...`);
    await this.deployedContract.callTx.mint(to, tokenId, tokenCertificate, price);
    this.actions$.next({ ...emptyState.actions, mint: `Token ${tokenId} minted` });
  }

  async mintAndList(
    to: MiniPrivateBuyer.Either<MiniPrivateBuyer.ZswapCoinPublicKey, MiniPrivateBuyer.ContractAddress>,
    tokenId: bigint,
    tokenCertificate: MiniPrivateBuyer.NonFungibleToken_Certificate,
    price: bigint,
  ): Promise<void> {
    this.logger.info(`Minting and listing token ${tokenId}...`);
    await this.deployedContract.callTx.mintAndList(to, tokenId, tokenCertificate, price);
    this.actions$.next({ ...emptyState.actions, mint: `Token ${tokenId} minted & listed` });
  }

  async addToPool(tokenId: bigint): Promise<void> {
    this.logger.info(`Adding token ${tokenId} to pool...`);
    await this.deployedContract.callTx.addToPool(tokenId);
    this.actions$.next({ ...emptyState.actions, addToPool: `Token ${tokenId} listed` });
  }

  async setTokenPrice(tokenId: bigint, price: bigint): Promise<void> {
    this.logger.info(`Setting token ${tokenId} price to ${price}...`);
    await this.deployedContract.callTx.setTokenPrice(tokenId, price);
    this.actions$.next({ ...emptyState.actions, setTokenPrice: `Token ${tokenId} price set to ${price}` });
  }

  async purchaseNFT(tokenId: bigint, coin: MiniPrivateBuyer.ShieldedCoinInfo): Promise<void> {
    this.logger.info(`Purchasing NFT ${tokenId}...`);
    await this.deployedContract.callTx.purchaseNFT(tokenId, coin);
    this.actions$.next({ ...emptyState.actions, purchaseNFT: `Token ${tokenId} purchased` });
  }
}
