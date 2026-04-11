import {
  type CircuitContext,
  type CoinPublicKey,
  CircuitResults,
  QueryContext,
  emptyZswapLocalState,
  sampleContractAddress,
  createConstructorContext,
  CostModel,
  ContractAddress
} from "@midnight-ntwrk/compact-runtime";
import {
  Contract,
  type Ledger,
  ledger,
  ContractAddress as ContractAddress_,
  ZswapCoinPublicKey as ZswapCoinPublicKey_,
  Either,
  ShieldedCoinInfo,
  type NonFungibleToken_Certificate,
  NonFungibleToken_Category,
  NonFungibleToken_Tier,
  NonFungibleToken_Region
} from "../../managed/mini-private-buyer/contract/index.js";
import {
  type PrivateState,
  createPrivateState,
  witnesses
} from "../../witnesses.js";
import { createLogger } from "../../logger.js";
import { LogicTestingConfig } from "../../config.js";
import { deployer } from "../mini-private-buyer.test.js";

export {
  type NonFungibleToken_Certificate,
  NonFungibleToken_Category,
  NonFungibleToken_Tier,
  NonFungibleToken_Region,
  type ShieldedCoinInfo
};

const config = new LogicTestingConfig();
export const logger = await createLogger(config.logDir);

export class Simulator {
  readonly contract: Contract<PrivateState>;
  circuitContext: CircuitContext<PrivateState>;
  userPrivateStates: Record<string, PrivateState>;
  updateUserPrivateState: (newPrivateState: PrivateState) => void;
  contractAddress: ContractAddress;

  constructor(privateState: PrivateState, name: string, symbol: string) {
    this.contract = new Contract<PrivateState>(witnesses);
    this.contractAddress = sampleContractAddress();
    const {
      currentPrivateState,
      currentContractState,
      currentZswapLocalState
    } = this.contract.initialState(
      createConstructorContext(
        { secretNonce: privateState.secretNonce },
        deployer
      ),
      name,
      symbol
    );
    this.circuitContext = {
      currentPrivateState,
      currentZswapLocalState,
      currentQueryContext: new QueryContext(
        currentContractState.data,
        this.contractAddress
      ),
      costModel: CostModel.initialCostModel()
    };
    this.userPrivateStates = { ["deployer"]: currentPrivateState };
    this.updateUserPrivateState = (newPrivateState: PrivateState) => {};
  }

  static deployContract(
    secretNonce: Uint8Array,
    name: string,
    symbol: string
  ): Simulator {
    return new Simulator(createPrivateState(secretNonce), name, symbol);
  }

  createPrivateState(pName: string, secretNonce: Uint8Array): void {
    this.userPrivateStates[pName] = createPrivateState(secretNonce);
  }

  private buildTurnContext(
    currentPrivateState: PrivateState
  ): CircuitContext<PrivateState> {
    return {
      ...this.circuitContext,
      currentPrivateState
    };
  }

  private updateUserPrivateStateByName =
    (name: string) =>
    (newPrivateState: PrivateState): void => {
      this.userPrivateStates[name] = newPrivateState;
    };

  as(name: string): Simulator {
    const ps = this.userPrivateStates[name];
    if (!ps) {
      throw new Error(
        `No private state found for user '${name}'. Did you register it?`
      );
    }
    this.circuitContext = this.buildTurnContext(ps);
    this.updateUserPrivateState = this.updateUserPrivateStateByName(name);
    return this;
  }

  public getLedger(): Ledger {
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  public getPrivateState(): PrivateState {
    return this.circuitContext.currentPrivateState;
  }

  updateStateAndGetLedger<T>(
    circuitResults: CircuitResults<PrivateState, T>
  ): Ledger {
    this.circuitContext = circuitResults.context;
    this.updateUserPrivateState(circuitResults.context.currentPrivateState);
    return this.getLedger();
  }

  // ///////////////////////////////////////////////////////////////////////////
  // TOKEN / NFT
  // ///////////////////////////////////////////////////////////////////////////

  public mint(
    to: Either<ZswapCoinPublicKey_, ContractAddress_>,
    tokenId: bigint,
    tokenCertificate: NonFungibleToken_Certificate,
    price: bigint,
    caller?: CoinPublicKey
  ): Ledger {
    const circuitResults = this.contract.impureCircuits.mint(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      to,
      tokenId,
      tokenCertificate,
      price
    );
    return this.updateStateAndGetLedger(circuitResults);
  }

  public setTokenPrice(
    tokenId: bigint,
    price: bigint,
    caller?: CoinPublicKey
  ): Ledger {
    const circuitResults = this.contract.impureCircuits.setTokenPrice(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      tokenId,
      price
    );
    return this.updateStateAndGetLedger(circuitResults);
  }

  public burn(tokenId: bigint, caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.burn(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      tokenId
    );
    return this.updateStateAndGetLedger(circuitResults);
  }

  public balanceOf(
    owner: Either<ZswapCoinPublicKey_, ContractAddress_>,
    caller?: CoinPublicKey
  ): bigint {
    const circuitResults = this.contract.impureCircuits.balanceOf(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      owner
    );
    return circuitResults.result;
  }

  public ownerOf(
    tokenId: bigint,
    caller?: CoinPublicKey
  ): Either<ZswapCoinPublicKey_, ContractAddress_> {
    const circuitResults = this.contract.impureCircuits.ownerOf(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      tokenId
    );
    return circuitResults.result;
  }

  public tokenCertificate(
    tokenId: bigint,
    caller?: CoinPublicKey
  ): NonFungibleToken_Certificate {
    const circuitResults = this.contract.impureCircuits.tokenCertificate(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      tokenId
    );
    return circuitResults.result;
  }

  public tokenPrice(tokenId: bigint, caller?: CoinPublicKey): bigint {
    const circuitResults = this.contract.impureCircuits.tokenPrice(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      tokenId
    );
    return circuitResults.result;
  }

  // ///////////////////////////////////////////////////////////////////////////
  // NFT POOL
  // ///////////////////////////////////////////////////////////////////////////

  public addToPool(tokenId: bigint, caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.addToPool(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      tokenId
    );
    return this.updateStateAndGetLedger(circuitResults);
  }

  public removeFromPool(tokenId: bigint, caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.removeFromPool(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      tokenId
    );
    return this.updateStateAndGetLedger(circuitResults);
  }

  public purchaseNFT(
    tokenId: bigint,
    coin: ShieldedCoinInfo,
    caller?: CoinPublicKey
  ): Uint8Array {
    const circuitResults = this.contract.impureCircuits.purchaseNFT(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      tokenId,
      coin
    );
    this.updateStateAndGetLedger(circuitResults);
    return circuitResults.result;
  }

  public withdrawSellerFunds(caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.withdrawSellerFunds({
      ...this.circuitContext,
      currentZswapLocalState: caller
        ? emptyZswapLocalState(caller)
        : this.circuitContext.currentZswapLocalState
    });
    return this.updateStateAndGetLedger(circuitResults);
  }

  public proofOwnership(
    ownerCommitment: Uint8Array,
    challenge: Uint8Array,
    caller?: CoinPublicKey
  ): Ledger {
    const circuitResults = this.contract.impureCircuits.proofOwnership(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      ownerCommitment,
      challenge
    );
    return this.updateStateAndGetLedger(circuitResults);
  }

  public burnPurchased(
    ownerCommitment: Uint8Array,
    tokenId: bigint,
    challenge: Uint8Array,
    caller?: CoinPublicKey
  ): Ledger {
    const circuitResults = this.contract.impureCircuits.burnPurchased(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      ownerCommitment,
      tokenId,
      challenge
    );
    return this.updateStateAndGetLedger(circuitResults);
  }
}
