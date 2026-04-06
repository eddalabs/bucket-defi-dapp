import {
  NonFungibleToken_Certificate,
  NonFungibleToken_Source,
  NonFungibleToken_Impact,
  NonFungibleToken_Location,
  ShieldedCoinInfo,
  Simulator
} from "./simulators/simulator";
import {
  type CoinPublicKey,
} from '@midnight-ntwrk/compact-runtime';
import { describe, it, expect, beforeEach } from "vitest";
import { randomBytes } from "./utils/utils";
import * as utils from "./utils/utils";

// Users private information
const deployer_privateKey = randomBytes(32);
const seller_privateKey = randomBytes(32);
const buyer1_privateKey = randomBytes(32);
const buyer2_privateKey = randomBytes(32);

// Callers
export const deployer = utils.createCaller("deployer");
export const seller = utils.createCaller("seller");
export const buyer1 = utils.createCaller("buyer1");
export const buyer2 = utils.createCaller("buyer2");

// Encoded PK/Addresses Accounts
const Account_deployer = utils.createEitherTestUser("deployer");
const Account_seller = utils.createEitherTestUser("seller");
const Account_buyer1 = utils.createEitherTestUser("buyer1");
const Account_buyer2 = utils.createEitherTestUser("buyer2");

// Token IDs
const TOKENID_1: bigint = 1n;
const TOKENID_2: bigint = 2n;
const TOKENID_3: bigint = 3n;
const NON_EXISTENT_TOKEN: bigint = BigInt(0xdead);

// Base price per token
const TOKEN_PRICE = 100n;

// Helper to create a certificate for a given index
function createCertificate(index: number): NonFungibleToken_Certificate {
  const sources = [
    NonFungibleToken_Source.Biomass,
    NonFungibleToken_Source.Solar,
    NonFungibleToken_Source.Wind,
    NonFungibleToken_Source.Hydro,
    NonFungibleToken_Source.Geothermal
  ];
  const impacts = [
    NonFungibleToken_Impact.High,
    NonFungibleToken_Impact.Medium,
    NonFungibleToken_Impact.Low,
    NonFungibleToken_Impact.Minimal,
    NonFungibleToken_Impact.Extreme
  ];
  const locations = [
    NonFungibleToken_Location.RJ,
    NonFungibleToken_Location.SP,
    NonFungibleToken_Location.MG,
    NonFungibleToken_Location.RS
  ];

  return {
    id: `Certificate_${index}`,
    source: sources[index % sources.length],
    generation: BigInt(1000000 * index),
    vintage: BigInt(10 + index),
    impact: impacts[index % impacts.length],
    location: locations[index % locations.length]
  };
}

// Initialization
const name = "NAME";
const symbol = "SYMBOL";

function createSimulator() {
  const simulator = Simulator.deployContract(
    deployer_privateKey,
    name,
    symbol
  );

  simulator.createPrivateState("deployer", deployer_privateKey);
  simulator.createPrivateState("seller", seller_privateKey);
  simulator.createPrivateState("buyer1", buyer1_privateKey);
  simulator.createPrivateState("buyer2", buyer2_privateKey);

  return simulator;
}

/**
 * Helper: mint tokens and add them to the pool
 */
function mintAndPoolTokens(sim: Simulator, count: number): void {
  const tokenIds = [TOKENID_1, TOKENID_2, TOKENID_3];
  for (let i = 0; i < count; i++) {
    const tokenId = tokenIds[i];
    sim.as("seller").mint(
      Account_seller,
      tokenId,
      createCertificate(i + 1),
      TOKEN_PRICE,
      seller
    );
    sim.as("seller").addToPool(tokenId, seller);
  }
}

let simulator: Simulator;

describe("Mini Private Buyer - Smart Contract Testing", () => {
  beforeEach(() => {
    simulator = createSimulator();
  });

  describe("Initialization", () => {
    it("properly initializes ledger state and private state", () => {
      const initialLedgerState = simulator.as("deployer").getLedger();
      expect(initialLedgerState.NonFungibleToken__name).toEqual("NAME");
      expect(initialLedgerState.NonFungibleToken__symbol).toEqual("SYMBOL");
      const initialPrivateState = simulator.as("deployer").getPrivateState();
      expect(initialPrivateState).toEqual({
        secretNonce: deployer_privateKey
      });
    });
  });

  describe("Token module testing", () => {
    it("Minting a token and checking status", () => {
      simulator
        .as("seller")
        .mint(
          Account_seller,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          seller
        );

      // Checking status
      expect(simulator.as("seller").balanceOf(Account_seller)).toBe(1n);
      expect(simulator.as("seller").ownerOf(TOKENID_1)).toStrictEqual(
        Account_seller
      );
      expect(simulator.as("seller").tokenCertificate(TOKENID_1)).toStrictEqual(
        createCertificate(1)
      );
      expect(simulator.as("seller").tokenPrice(TOKENID_1)).toBe(TOKEN_PRICE);
    });

    it("Anyone can set price (no access control)", () => {
      simulator
        .as("seller")
        .mint(
          Account_seller,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          seller
        );

      // Anyone can set price in mini version
      simulator.as("buyer1").setTokenPrice(TOKENID_1, 20n, buyer1);
      expect(simulator.as("seller").tokenPrice(TOKENID_1)).toBe(20n);
    });

    it("Burning a token", () => {
      simulator
        .as("seller")
        .mint(
          Account_seller,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          seller
        );

      // Anyone can burn in mini version
      simulator.as("seller").burn(TOKENID_1, seller);
      expect(simulator.as("seller").balanceOf(Account_seller)).toBe(0n);
    });
  });

  describe("NFT Pool module testing", () => {
    it("properly initializes ledger state", () => {
      const initialLedgerState = simulator.as("deployer").getLedger();
      expect(initialLedgerState.NFTPool__purchaseCounter).toEqual(0n);
    });

    it("Add NFT to pool", () => {
      simulator
        .as("seller")
        .mint(
          Account_seller,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          seller
        );
      simulator.as("seller").addToPool(TOKENID_1, seller);
    });

    it("Add non-existent token to pool should fail", () => {
      expect(() => {
        simulator.as("seller").addToPool(NON_EXISTENT_TOKEN, seller);
      }).toThrow();
    });

    it("Add already-listed token should fail", () => {
      simulator
        .as("seller")
        .mint(
          Account_seller,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          seller
        );
      simulator.as("seller").addToPool(TOKENID_1, seller);
      expect(() => {
        simulator.as("seller").addToPool(TOKENID_1, seller);
      }).toThrow();
    });

    it("Remove NFT from pool", () => {
      simulator
        .as("seller")
        .mint(
          Account_seller,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          seller
        );
      simulator.as("seller").addToPool(TOKENID_1, seller);
      simulator.as("seller").removeFromPool(TOKENID_1, seller);
    });

    it("Remove non-listed token should fail", () => {
      expect(() => {
        simulator.as("seller").removeFromPool(TOKENID_1, seller);
      }).toThrow();
    });

    it("Purchase single NFT", () => {
      mintAndPoolTokens(simulator, 1);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      expect(ownerCommitment).toBeDefined();
      expect(ownerCommitment.length).toBe(32);

      const ledgerState = simulator.as("deployer").getLedger();
      expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
    });

    it("Purchase fails for non-listed token", () => {
      simulator
        .as("seller")
        .mint(
          Account_seller,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          seller
        );

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      expect(() => {
        simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);
      }).toThrow();
    });

    it("Purchase fails with insufficient payment", () => {
      mintAndPoolTokens(simulator, 1);

      const insufficientCoin = utils.coin(Number(TOKEN_PRICE) - 1);
      expect(() => {
        simulator.as("buyer1").purchaseNFT(TOKENID_1, insufficientCoin, buyer1);
      }).toThrow();
    });

    it("Double-purchase of same token fails", () => {
      mintAndPoolTokens(simulator, 1);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);

      const coin2 = utils.coin(Number(TOKEN_PRICE));
      expect(() => {
        simulator.as("buyer1").purchaseNFT(TOKENID_1, coin2, buyer1);
      }).toThrow();
    });

    it("Proof of ownership (owner succeeds)", () => {
      mintAndPoolTokens(simulator, 1);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      const challenge = randomBytes(32);
      simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);
    });

    it("Proof of ownership (non-owner fails)", () => {
      mintAndPoolTokens(simulator, 1);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      const challenge = randomBytes(32);
      expect(() => {
        simulator.as("buyer2").proofOwnership(ownerCommitment, challenge, buyer2);
      }).toThrow();
    });

    it("Seller withdraws accumulated funds", () => {
      mintAndPoolTokens(simulator, 1);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);

      simulator.as("seller").withdrawSellerFunds(seller);
    });
  });

  describe("Burn lifecycle testing", () => {
    it("Burn unsold token that is not listed or sold", () => {
      simulator
        .as("seller")
        .mint(Account_seller, TOKENID_1, createCertificate(1), TOKEN_PRICE, seller);

      expect(simulator.as("seller").balanceOf(Account_seller)).toBe(1n);
      simulator.as("seller").burn(TOKENID_1, seller);
      expect(simulator.as("seller").balanceOf(Account_seller)).toBe(0n);
    });

    it("Burn fails if token is listed in pool", () => {
      mintAndPoolTokens(simulator, 1);

      expect(() => {
        simulator.as("seller").burn(TOKENID_1, seller);
      }).toThrow("Token must be unlisted before burning");
    });

    it("Unlist then burn succeeds", () => {
      mintAndPoolTokens(simulator, 1);
      simulator.as("seller").removeFromPool(TOKENID_1, seller);
      simulator.as("seller").burn(TOKENID_1, seller);
      expect(simulator.as("seller").balanceOf(Account_seller)).toBe(0n);
    });

    it("Burn fails for sold token", () => {
      mintAndPoolTokens(simulator, 1);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);

      expect(() => {
        simulator.as("seller").burn(TOKENID_1, seller);
      }).toThrow("Sold tokens must be burned by commitment owner");
    });

    it("Burn purchased token via burnPurchased", () => {
      mintAndPoolTokens(simulator, 1);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      const challenge = randomBytes(32);
      simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

      simulator.as("deployer").burnPurchased(
        ownerCommitment,
        TOKENID_1,
        challenge,
        deployer
      );

      expect(simulator.as("seller").balanceOf(Account_seller)).toBe(0n);
    });

    it("burnPurchased fails with wrong challenge", () => {
      mintAndPoolTokens(simulator, 1);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      const challenge = randomBytes(32);
      simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

      const wrongChallenge = randomBytes(32);
      expect(() => {
        simulator.as("deployer").burnPurchased(
          ownerCommitment,
          TOKENID_1,
          wrongChallenge,
          deployer
        );
      }).toThrow();
    });

    it("burnPurchased fails with wrong commitment", () => {
      mintAndPoolTokens(simulator, 1);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);

      const fakeCommitment = randomBytes(32);
      const challenge = randomBytes(32);
      expect(() => {
        simulator.as("deployer").burnPurchased(
          fakeCommitment,
          TOKENID_1,
          challenge,
          deployer
        );
      }).toThrow();
    });

    it("Re-mint same token ID after burn works", () => {
      simulator
        .as("seller")
        .mint(Account_seller, TOKENID_1, createCertificate(1), TOKEN_PRICE, seller);

      simulator.as("seller").burn(TOKENID_1, seller);
      expect(simulator.as("seller").balanceOf(Account_seller)).toBe(0n);

      simulator
        .as("seller")
        .mint(Account_seller, TOKENID_1, createCertificate(1), TOKEN_PRICE, seller);
      expect(simulator.as("seller").balanceOf(Account_seller)).toBe(1n);
    });
  });

  describe("Full end-to-end flow", () => {
    it("mint -> pool -> purchase -> proof -> seller withdraw -> burnPurchased", () => {
      mintAndPoolTokens(simulator, 1);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      const challenge = randomBytes(32);
      simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

      simulator.as("seller").withdrawSellerFunds(seller);

      simulator.as("deployer").burnPurchased(
        ownerCommitment,
        TOKENID_1,
        challenge,
        deployer
      );

      const ledgerState = simulator.as("deployer").getLedger();
      expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
      expect(simulator.as("seller").balanceOf(Account_seller)).toBe(0n);
    });
  });
});
