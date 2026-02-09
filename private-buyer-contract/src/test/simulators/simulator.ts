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
  NonFungibleToken_Source,
  NonFungibleToken_Impact,
  NonFungibleToken_Location
} from "../../managed/private-buyer/contract/index.js";
import {
  type PrivateState,
  createPrivateState,
  witnesses
} from "../../witnesses.js";
import { createLogger } from "../../logger.js";
import { LogicTestingConfig } from "../../config.js";
import { adminMaster } from "../private-buyer.test.js";

export {
  type NonFungibleToken_Certificate,
  NonFungibleToken_Source,
  NonFungibleToken_Impact,
  NonFungibleToken_Location,
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
        adminMaster
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
    this.userPrivateStates = { ["adminMaster"]: currentPrivateState };
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
  // ACCESS CONTROL
  // ///////////////////////////////////////////////////////////////////////////

  public assertOnlyRole(roleId: Uint8Array, caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.assertOnlyRole(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      roleId
    );
    return this.updateStateAndGetLedger(circuitResults);
  }

  public grantRole(
    roleId: Uint8Array,
    account: Either<ZswapCoinPublicKey_, ContractAddress_>,
    caller?: CoinPublicKey
  ): Ledger {
    const circuitResults = this.contract.impureCircuits.grantRole(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      roleId,
      account
    );
    return this.updateStateAndGetLedger(circuitResults);
  }

  public setRoleAdmin(
    roleId: Uint8Array,
    adminRole: Uint8Array,
    caller?: CoinPublicKey
  ): Ledger {
    const circuitResults = this.contract.impureCircuits.setRoleAdmin(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      roleId,
      adminRole
    );
    return this.updateStateAndGetLedger(circuitResults);
  }

  public pauseAccessControl(caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.pauseAccessControl({
      ...this.circuitContext,
      currentZswapLocalState: caller
        ? emptyZswapLocalState(caller)
        : this.circuitContext.currentZswapLocalState
    });
    return this.updateStateAndGetLedger(circuitResults);
  }

  public unpauseAccessControl(caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.unpauseAccessControl({
      ...this.circuitContext,
      currentZswapLocalState: caller
        ? emptyZswapLocalState(caller)
        : this.circuitContext.currentZswapLocalState
    });
    return this.updateStateAndGetLedger(circuitResults);
  }

  // ///////////////////////////////////////////////////////////////////////////
  // IDENTITY
  // ///////////////////////////////////////////////////////////////////////////

  public assertOwnVerification(caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.assertOwnVerification({
      ...this.circuitContext,
      currentZswapLocalState: caller
        ? emptyZswapLocalState(caller)
        : this.circuitContext.currentZswapLocalState
    });
    return this.updateStateAndGetLedger(circuitResults);
  }

  public setUser(user: ZswapCoinPublicKey_, caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.setUser(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      user
    );
    return this.updateStateAndGetLedger(circuitResults);
  }

  public removeUser(user: ZswapCoinPublicKey_, caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.removeUser(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      user
    );
    return this.updateStateAndGetLedger(circuitResults);
  }

  public pauseIdentity(caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.pauseIdentity({
      ...this.circuitContext,
      currentZswapLocalState: caller
        ? emptyZswapLocalState(caller)
        : this.circuitContext.currentZswapLocalState
    });
    return this.updateStateAndGetLedger(circuitResults);
  }

  public unpauseIdentity(caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.unpauseIdentity({
      ...this.circuitContext,
      currentZswapLocalState: caller
        ? emptyZswapLocalState(caller)
        : this.circuitContext.currentZswapLocalState
    });
    return this.updateStateAndGetLedger(circuitResults);
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

  public purchaseBatch5(
    tokenId1: bigint,
    tokenId2: bigint,
    tokenId3: bigint,
    tokenId4: bigint,
    tokenId5: bigint,
    coin: ShieldedCoinInfo,
    caller?: CoinPublicKey
  ): Uint8Array {
    const circuitResults = this.contract.impureCircuits.purchaseBatch5(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      tokenId1,
      tokenId2,
      tokenId3,
      tokenId4,
      tokenId5,
      coin
    );
    this.updateStateAndGetLedger(circuitResults);
    return circuitResults.result;
  }

  public purchaseBatch10(
    tokenId1: bigint,
    tokenId2: bigint,
    tokenId3: bigint,
    tokenId4: bigint,
    tokenId5: bigint,
    tokenId6: bigint,
    tokenId7: bigint,
    tokenId8: bigint,
    tokenId9: bigint,
    tokenId10: bigint,
    coin: ShieldedCoinInfo,
    caller?: CoinPublicKey
  ): Uint8Array {
    const circuitResults = this.contract.impureCircuits.purchaseBatch10(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      tokenId1,
      tokenId2,
      tokenId3,
      tokenId4,
      tokenId5,
      tokenId6,
      tokenId7,
      tokenId8,
      tokenId9,
      tokenId10,
      coin
    );
    this.updateStateAndGetLedger(circuitResults);
    return circuitResults.result;
  }

  public purchaseBatch20(
    tokenId1: bigint,
    tokenId2: bigint,
    tokenId3: bigint,
    tokenId4: bigint,
    tokenId5: bigint,
    tokenId6: bigint,
    tokenId7: bigint,
    tokenId8: bigint,
    tokenId9: bigint,
    tokenId10: bigint,
    tokenId11: bigint,
    tokenId12: bigint,
    tokenId13: bigint,
    tokenId14: bigint,
    tokenId15: bigint,
    tokenId16: bigint,
    tokenId17: bigint,
    tokenId18: bigint,
    tokenId19: bigint,
    tokenId20: bigint,
    coin: ShieldedCoinInfo,
    caller?: CoinPublicKey
  ): Uint8Array {
    const circuitResults = this.contract.impureCircuits.purchaseBatch20(
      {
        ...this.circuitContext,
        currentZswapLocalState: caller
          ? emptyZswapLocalState(caller)
          : this.circuitContext.currentZswapLocalState
      },
      tokenId1,
      tokenId2,
      tokenId3,
      tokenId4,
      tokenId5,
      tokenId6,
      tokenId7,
      tokenId8,
      tokenId9,
      tokenId10,
      tokenId11,
      tokenId12,
      tokenId13,
      tokenId14,
      tokenId15,
      tokenId16,
      tokenId17,
      tokenId18,
      tokenId19,
      tokenId20,
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

  public pauseNFTPool(caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.pauseNFTPool({
      ...this.circuitContext,
      currentZswapLocalState: caller
        ? emptyZswapLocalState(caller)
        : this.circuitContext.currentZswapLocalState
    });
    return this.updateStateAndGetLedger(circuitResults);
  }

  public unpauseNFTPool(caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.unpauseNFTPool({
      ...this.circuitContext,
      currentZswapLocalState: caller
        ? emptyZswapLocalState(caller)
        : this.circuitContext.currentZswapLocalState
    });
    return this.updateStateAndGetLedger(circuitResults);
  }

  public pauseToken(caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.pauseToken({
      ...this.circuitContext,
      currentZswapLocalState: caller
        ? emptyZswapLocalState(caller)
        : this.circuitContext.currentZswapLocalState
    });
    return this.updateStateAndGetLedger(circuitResults);
  }

  public unpauseToken(caller?: CoinPublicKey): Ledger {
    const circuitResults = this.contract.impureCircuits.unpauseToken({
      ...this.circuitContext,
      currentZswapLocalState: caller
        ? emptyZswapLocalState(caller)
        : this.circuitContext.currentZswapLocalState
    });
    return this.updateStateAndGetLedger(circuitResults);
  }
}
