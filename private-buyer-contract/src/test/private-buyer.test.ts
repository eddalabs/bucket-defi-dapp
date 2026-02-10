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
  convertFieldToBytes,
} from '@midnight-ntwrk/compact-runtime';
import { describe, it, expect, beforeEach } from "vitest";
import { randomBytes } from "./utils/utils";
import * as utils from "./utils/utils";

// Users private information
const admin_privateKey = randomBytes(32);
const minter_privateKey = randomBytes(32);
const poolOperator_privateKey = randomBytes(32);
const verifier_privateKey = randomBytes(32);
const buyer1_privateKey = randomBytes(32);
const buyer2_privateKey = randomBytes(32);

// Callers - use createCaller to ensure they match the accounts created by createEitherTestUser
export const admin = utils.createCaller("admin");
export const minter = utils.createCaller("minter");
export const poolOperator = utils.createCaller("poolOperator");
export const verifier = utils.createCaller("verifier");
export const buyer1 = utils.createCaller("buyer1");
export const buyer2 = utils.createCaller("buyer2");

// Encoded PK/Addresses Accounts
const Account_admin = utils.createEitherTestUser("admin");
const Account_admin2 = utils.createEitherTestUser("admin2");
const Account_minter = utils.createEitherTestUser("minter");
const Account_poolOperator = utils.createEitherTestUser("poolOperator");
const Account_verifier = utils.createEitherTestUser("verifier");
const Account_buyer1 = utils.createEitherTestUser("buyer1");
const Account_buyer2 = utils.createEitherTestUser("buyer2");

// Roles (flat hierarchy: Admin=0, Minter=1, PoolOperator=2, Verifier=3)
const admin_ROLE = utils.zeroUint8Array();
const minter_ROLE = convertFieldToBytes(32, 1n, '');
const poolOperator_ROLE = convertFieldToBytes(32, 2n, '');
const verifier_ROLE = convertFieldToBytes(32, 3n, '');

// Token IDs (1-20 for batch testing)
const TOKENID_1: bigint = 1n;
const TOKENID_2: bigint = 2n;
const TOKENID_3: bigint = 3n;
const TOKENID_4: bigint = 4n;
const TOKENID_5: bigint = 5n;
const TOKENID_6: bigint = 6n;
const TOKENID_7: bigint = 7n;
const TOKENID_8: bigint = 8n;
const TOKENID_9: bigint = 9n;
const TOKENID_10: bigint = 10n;
const TOKENID_11: bigint = 11n;
const TOKENID_12: bigint = 12n;
const TOKENID_13: bigint = 13n;
const TOKENID_14: bigint = 14n;
const TOKENID_15: bigint = 15n;
const TOKENID_16: bigint = 16n;
const TOKENID_17: bigint = 17n;
const TOKENID_18: bigint = 18n;
const TOKENID_19: bigint = 19n;
const TOKENID_20: bigint = 20n;
const NON_EXISTENT_TOKEN: bigint = BigInt(0xdead);
const MOCK_TOKEN: bigint = 0n;

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

// All token IDs in order
const ALL_TOKEN_IDS = [
  TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
  TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
  TOKENID_11, TOKENID_12, TOKENID_13, TOKENID_14, TOKENID_15,
  TOKENID_16, TOKENID_17, TOKENID_18, TOKENID_19, TOKENID_20
];

// Initialization
const name = "NAME";
const symbol = "SYMBOL";

function createSimulator() {
  const simulator = Simulator.deployContract(
    admin_privateKey,
    name,
    symbol
  );

  simulator.createPrivateState("admin", admin_privateKey);
  simulator.createPrivateState("minter", minter_privateKey);
  simulator.createPrivateState("poolOperator", poolOperator_privateKey);
  simulator.createPrivateState("verifier", verifier_privateKey);
  simulator.createPrivateState("buyer1", buyer1_privateKey);
  simulator.createPrivateState("buyer2", buyer2_privateKey);

  // Admin directly grants all roles
  simulator
    .as("admin")
    .grantRole(minter_ROLE, Account_minter, admin);
  simulator
    .as("admin")
    .grantRole(poolOperator_ROLE, Account_poolOperator, admin);
  simulator
    .as("admin")
    .grantRole(verifier_ROLE, Account_verifier, admin);

  return simulator;
}

/**
 * Helper: mint tokens and add them to the pool
 */
function mintAndPoolTokens(sim: Simulator, count: number): void {
  for (let i = 0; i < count; i++) {
    const tokenId = ALL_TOKEN_IDS[i];
    sim.as("minter").mint(
      Account_minter,
      tokenId,
      createCertificate(i + 1),
      TOKEN_PRICE,
      minter
    );
    sim.as("poolOperator").addToPool(tokenId, poolOperator);
  }
}

/**
 * Helper: verify buyer in identity module
 */
function verifyBuyer(sim: Simulator): void {
  sim.as("verifier").setUser(Account_buyer1.left, verifier);
}

let simulator: Simulator;

describe("Smart Contract Testing", () => {
  beforeEach(() => {
    simulator = createSimulator();
  });

  describe("Access Control module testing", () => {
    it("properly initializes ledger state and private state", () => {
      const initialLedgerState = simulator.as("admin").getLedger();
      expect(initialLedgerState.NonFungibleToken__name).toEqual("NAME");
      expect(initialLedgerState.NonFungibleToken__symbol).toEqual("SYMBOL");
      const initialPrivateState = simulator.as("admin").getPrivateState();
      expect(initialPrivateState).toEqual({
        secretNonce: admin_privateKey
      });
    });

    it("Confirm the roles using assertOnlyRole", () => {
      simulator.as("admin").assertOnlyRole(admin_ROLE, admin);
      simulator.as("minter").assertOnlyRole(admin_ROLE, admin);
      simulator.as("poolOperator").assertOnlyRole(admin_ROLE, admin);
      simulator.as("verifier").assertOnlyRole(admin_ROLE, admin);
    });

    it("Setting Roles should fail if not Admin", () => {
      expect(() => {
        simulator
          .as("minter")
          .grantRole(poolOperator_ROLE, Account_poolOperator, minter);
      }).toThrow();
      expect(() => {
        simulator
          .as("poolOperator")
          .grantRole(minter_ROLE, Account_minter, poolOperator);
      }).toThrow();
      expect(() => {
        simulator
          .as("verifier")
          .grantRole(minter_ROLE, Account_minter, verifier);
      }).toThrow();
    });

    it("Creating a new Admin", () => {
      simulator
        .as("admin")
        .grantRole(admin_ROLE, Account_admin2, admin);
      expect(() => {
        simulator
          .as("minter")
          .grantRole(admin_ROLE, Account_admin2, minter);
      }).toThrow();
    });

    it("Pause Access Control", () => {
      simulator.as("admin").pauseAccessControl(admin);
      expect(() => {
        simulator
          .as("admin")
          .grantRole(minter_ROLE, Account_admin2, admin);
      }).toThrow();
      simulator.as("admin").unpauseAccessControl(admin);
      expect(() => {
        simulator.as("admin").unpauseAccessControl(admin);
      }).toThrow();
      expect(() => {
        simulator.as("minter").pauseAccessControl(minter);
      }).toThrow();
    });
  });

  describe("Identity module testing", () => {
    it("Setting User should fail if not verifier", () => {
      expect(() => {
        simulator.as("minter").setUser(Account_minter.left, minter);
      }).toThrow();
      expect(() => {
        simulator.as("poolOperator").setUser(Account_poolOperator.left, poolOperator);
      }).toThrow();
      simulator.as("verifier").setUser(Account_minter.left, verifier);
    });

    it("Removing User should fail if not verifier", () => {
      expect(() => {
        simulator.as("minter").removeUser(Account_minter.left, minter);
      }).toThrow();
      expect(() => {
        simulator.as("poolOperator").removeUser(Account_poolOperator.left, poolOperator);
      }).toThrow();
      simulator.as("verifier").removeUser(Account_minter.left, verifier);
    });

    it("Pause Identity", () => {
      simulator.as("admin").pauseIdentity(admin);
      expect(() => {
        simulator.as("admin").setUser(Account_minter.left, admin);
      }).toThrow();
      simulator.as("admin").unpauseIdentity(admin);
      expect(() => {
        simulator.as("admin").unpauseIdentity(admin);
      }).toThrow();
      expect(() => {
        simulator.as("minter").pauseIdentity(minter);
      }).toThrow();
    });
  });

  describe("Token module testing", () => {
    it("Minting a token and checking status", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          minter
        );
      expect(() => {
        simulator
          .as("verifier")
          .mint(
            Account_minter,
            TOKENID_1,
            createCertificate(1),
            TOKEN_PRICE,
            verifier
          );
      }).toThrow();
      expect(() => {
        simulator
          .as("poolOperator")
          .mint(
            Account_minter,
            TOKENID_1,
            createCertificate(1),
            TOKEN_PRICE,
            poolOperator
          );
      }).toThrow();

      // Checking status
      expect(simulator.as("minter").balanceOf(Account_minter)).toBe(1n);
      expect(simulator.as("minter").ownerOf(TOKENID_1)).toStrictEqual(
        Account_minter
      );
      expect(simulator.as("minter").tokenCertificate(TOKENID_1)).toStrictEqual(
        createCertificate(1)
      );

      // Set a price - PoolOperator can set price (role 2)
      simulator.as("poolOperator").setTokenPrice(TOKENID_1, 20n, poolOperator);

      // Minter cannot set price (no PoolOperator role)
      expect(() => {
        simulator.as("minter").setTokenPrice(TOKENID_1, 20n, minter);
      }).toThrow();
    });

    it("PoolOperator can update price of a listed NFT", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          minter
        );

      // List the NFT in the pool
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);

      // PoolOperator can update price even when listed
      simulator.as("poolOperator").setTokenPrice(TOKENID_1, 50n, poolOperator);

      // Verify price was updated
      expect(simulator.as("poolOperator").tokenPrice(TOKENID_1)).toBe(50n);
    });

    it("Burning a token (Minter role)", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          minter
        );
      // Non-minter roles should fail to burn
      expect(() => {
        simulator.as("poolOperator").burn(TOKENID_1, poolOperator);
      }).toThrow();
      expect(() => {
        simulator.as("verifier").burn(TOKENID_1, verifier);
      }).toThrow();
      // Minter can burn (minter/burner combined role)
      simulator.as("minter").burn(TOKENID_1, minter);

      // Checking status
      expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);
    });

    it("Admin can also burn (has all roles)", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          minter
        );
      // Admin has minter role, so can burn too
      simulator.as("admin").burn(TOKENID_1, admin);
      expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);
    });
  });

  describe("NFT Pool module testing", () => {
    it("properly initializes ledger state", () => {
      const initialLedgerState = simulator.as("admin").getLedger();
      expect(initialLedgerState.NFTPool__purchaseCounter).toEqual(0n);
    });

    it("Add NFT to pool (owner or PoolOperator)", () => {
      // Mint a token first
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          minter
        );

      // PoolOperator can add to pool
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);

      // Token owner (minter) can also add to pool
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_2,
          createCertificate(2),
          TOKEN_PRICE,
          minter
        );
      simulator.as("minter").addToPool(TOKENID_2, minter);

      // Non-owner and non-PoolOperator should fail
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_3,
          createCertificate(3),
          TOKEN_PRICE,
          minter
        );
      expect(() => {
        simulator.as("verifier").addToPool(TOKENID_3, verifier);
      }).toThrow();
    });

    it("Add non-existent token to pool should fail", () => {
      expect(() => {
        simulator.as("poolOperator").addToPool(NON_EXISTENT_TOKEN, poolOperator);
      }).toThrow();
    });

    it("Add already-listed token should fail", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          minter
        );
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      expect(() => {
        simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      }).toThrow();
    });

    it("Remove NFT from pool (owner or PoolOperator)", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          minter
        );
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      // PoolOperator can remove
      simulator.as("poolOperator").removeFromPool(TOKENID_1, poolOperator);

      // Token owner (minter) can also remove
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      simulator.as("minter").removeFromPool(TOKENID_1, minter);

      // Non-owner and non-PoolOperator should fail
      simulator.as("minter").addToPool(TOKENID_1, minter);
      expect(() => {
        simulator.as("verifier").removeFromPool(TOKENID_1, verifier);
      }).toThrow();
    });

    it("Remove non-listed token should fail", () => {
      expect(() => {
        simulator.as("poolOperator").removeFromPool(TOKENID_1, poolOperator);
      }).toThrow();
    });

    it("Purchase single NFT (verified buyer)", () => {
      mintAndPoolTokens(simulator, 1);
      verifyBuyer(simulator);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      expect(ownerCommitment).toBeDefined();
      expect(ownerCommitment.length).toBe(32);

      const ledgerState = simulator.as("admin").getLedger();
      expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
    });

    it("Purchase fails for non-whitelisted buyer", () => {
      mintAndPoolTokens(simulator, 1);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      expect(() => {
        simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);
      }).toThrow();
    });

    it("Purchase fails for non-listed token", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          minter
        );
      verifyBuyer(simulator);

      // Token not added to pool
      const coin1 = utils.coin(Number(TOKEN_PRICE));
      expect(() => {
        simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);
      }).toThrow();
    });

    it("Purchase fails with insufficient payment", () => {
      mintAndPoolTokens(simulator, 1);
      verifyBuyer(simulator);

      const insufficientCoin = utils.coin(Number(TOKEN_PRICE) - 1);
      expect(() => {
        simulator.as("buyer1").purchaseNFT(TOKENID_1, insufficientCoin, buyer1);
      }).toThrow();
    });

    it("Double-purchase of same token fails", () => {
      mintAndPoolTokens(simulator, 1);
      verifyBuyer(simulator);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);

      const coin2 = utils.coin(Number(TOKEN_PRICE));
      expect(() => {
        simulator.as("buyer1").purchaseNFT(TOKENID_1, coin2, buyer1);
      }).toThrow();
    });

    it("Proof of ownership (owner succeeds)", () => {
      mintAndPoolTokens(simulator, 1);
      verifyBuyer(simulator);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      const challenge = randomBytes(32);
      simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);
    });

    it("Proof of ownership (non-owner fails)", () => {
      mintAndPoolTokens(simulator, 1);
      verifyBuyer(simulator);
      simulator.as("verifier").setUser(Account_buyer2.left, verifier);

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
      verifyBuyer(simulator);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);

      simulator.as("minter").withdrawSellerFunds(minter);
    });

    it("Pause and unpause NFTPool", () => {
      simulator.as("admin").pauseNFTPool(admin);

      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          createCertificate(1),
          TOKEN_PRICE,
          minter
        );
      expect(() => {
        simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      }).toThrow();

      simulator.as("admin").unpauseNFTPool(admin);

      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
    });

    it("Full end-to-end flow: mint -> pool -> verify buyer -> purchase -> proof -> seller withdraw", () => {
      mintAndPoolTokens(simulator, 1);
      verifyBuyer(simulator);

      const coin1 = utils.coin(Number(TOKEN_PRICE));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      const challenge = randomBytes(32);
      simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

      simulator.as("minter").withdrawSellerFunds(minter);

      const ledgerState = simulator.as("admin").getLedger();
      expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
    });
  });

  describe("Batch purchase testing", () => {
    describe("purchaseBatch5", () => {
      it("Batch5 with all 5 real tokens - single shared commitment", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const totalPrice = Number(TOKEN_PRICE) * 5;
        const batchCoin = utils.coin(totalPrice);

        const ownerCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        // Single commitment returned
        expect(ownerCommitment).toBeDefined();
        expect(ownerCommitment.length).toBe(32);

        // Counter incremented by 1 (one commitment for the batch)
        const ledgerState = simulator.as("admin").getLedger();
        expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
      });

      it("Batch5 with 3 real + 2 mock tokens", () => {
        mintAndPoolTokens(simulator, 3);
        verifyBuyer(simulator);

        const totalPrice = Number(TOKEN_PRICE) * 3;
        const batchCoin = utils.coin(totalPrice);

        const ownerCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, MOCK_TOKEN, MOCK_TOKEN,
          batchCoin, buyer1
        );

        expect(ownerCommitment).toBeDefined();
        expect(ownerCommitment.length).toBe(32);

        const ledgerState = simulator.as("admin").getLedger();
        expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
      });

      it("Batch5 with 1 real + 4 mock tokens", () => {
        mintAndPoolTokens(simulator, 1);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE));

        const ownerCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          batchCoin, buyer1
        );

        expect(ownerCommitment).toBeDefined();
        expect(ownerCommitment.length).toBe(32);

        const ledgerState = simulator.as("admin").getLedger();
        expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
      });

      it("Batch5 fails with insufficient payment", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const insufficientCoin = utils.coin(Number(TOKEN_PRICE) * 5 - 1);

        expect(() => {
          simulator.as("buyer1").purchaseBatch5(
            TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
            insufficientCoin, buyer1
          );
        }).toThrow();
      });

      it("Batch5 fails for non-whitelisted buyer", () => {
        mintAndPoolTokens(simulator, 5);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);

        expect(() => {
          simulator.as("buyer1").purchaseBatch5(
            TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
            batchCoin, buyer1
          );
        }).toThrow();
      });

      it("Batch5 proof of ownership works with shared commitment", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);

        const ownerCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        // Proof of ownership with the shared commitment
        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);
      });

      it("Batch5 proof of ownership fails for non-owner", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);
        simulator.as("verifier").setUser(Account_buyer2.left, verifier);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);

        const ownerCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        const challenge = randomBytes(32);
        expect(() => {
          simulator.as("buyer2").proofOwnership(ownerCommitment, challenge, buyer2);
        }).toThrow();
      });

      it("Batch5 purchased tokens cannot be re-purchased", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);
        simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        // Try to purchase an already-sold token
        const singleCoin = utils.coin(Number(TOKEN_PRICE));
        expect(() => {
          simulator.as("buyer1").purchaseNFT(TOKENID_1, singleCoin, buyer1);
        }).toThrow();
      });

      it("Batch5 seller can withdraw accumulated funds", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);
        simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        // Seller (minter) withdraws accumulated funds from all 5 sales
        simulator.as("minter").withdrawSellerFunds(minter);
      });
    });

    describe("purchaseBatch10", () => {
      it("Batch10 with all 10 real tokens", () => {
        mintAndPoolTokens(simulator, 10);
        verifyBuyer(simulator);

        const totalPrice = Number(TOKEN_PRICE) * 10;
        const batchCoin = utils.coin(totalPrice);

        const ownerCommitment = simulator.as("buyer1").purchaseBatch10(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          batchCoin, buyer1
        );

        expect(ownerCommitment).toBeDefined();
        expect(ownerCommitment.length).toBe(32);

        const ledgerState = simulator.as("admin").getLedger();
        expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
      });

      it("Batch10 with 5 real + 5 mock tokens", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const totalPrice = Number(TOKEN_PRICE) * 5;
        const batchCoin = utils.coin(totalPrice);

        const ownerCommitment = simulator.as("buyer1").purchaseBatch10(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          batchCoin, buyer1
        );

        expect(ownerCommitment).toBeDefined();
        expect(ownerCommitment.length).toBe(32);

        const ledgerState = simulator.as("admin").getLedger();
        expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
      });

      it("Batch10 with 1 real + 9 mock tokens", () => {
        mintAndPoolTokens(simulator, 1);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE));

        const ownerCommitment = simulator.as("buyer1").purchaseBatch10(
          TOKENID_1, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          batchCoin, buyer1
        );

        expect(ownerCommitment).toBeDefined();
        expect(ownerCommitment.length).toBe(32);
      });

      it("Batch10 fails with insufficient payment", () => {
        mintAndPoolTokens(simulator, 10);
        verifyBuyer(simulator);

        const insufficientCoin = utils.coin(Number(TOKEN_PRICE) * 10 - 1);

        expect(() => {
          simulator.as("buyer1").purchaseBatch10(
            TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
            TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
            insufficientCoin, buyer1
          );
        }).toThrow();
      });

      it("Batch10 proof of ownership works with shared commitment", () => {
        mintAndPoolTokens(simulator, 10);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 10);

        const ownerCommitment = simulator.as("buyer1").purchaseBatch10(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          batchCoin, buyer1
        );

        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);
      });
    });

    describe("purchaseBatch20", () => {
      it("Batch20 with all 20 real tokens", () => {
        mintAndPoolTokens(simulator, 20);
        verifyBuyer(simulator);

        const totalPrice = Number(TOKEN_PRICE) * 20;
        const batchCoin = utils.coin(totalPrice);

        const ownerCommitment = simulator.as("buyer1").purchaseBatch20(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          TOKENID_11, TOKENID_12, TOKENID_13, TOKENID_14, TOKENID_15,
          TOKENID_16, TOKENID_17, TOKENID_18, TOKENID_19, TOKENID_20,
          batchCoin, buyer1
        );

        expect(ownerCommitment).toBeDefined();
        expect(ownerCommitment.length).toBe(32);

        const ledgerState = simulator.as("admin").getLedger();
        expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
      });

      it("Batch20 with 5 real + 15 mock tokens", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const totalPrice = Number(TOKEN_PRICE) * 5;
        const batchCoin = utils.coin(totalPrice);

        const ownerCommitment = simulator.as("buyer1").purchaseBatch20(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          batchCoin, buyer1
        );

        expect(ownerCommitment).toBeDefined();
        expect(ownerCommitment.length).toBe(32);

        const ledgerState = simulator.as("admin").getLedger();
        expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
      });

      it("Batch20 with 10 real + 10 mock tokens", () => {
        mintAndPoolTokens(simulator, 10);
        verifyBuyer(simulator);

        const totalPrice = Number(TOKEN_PRICE) * 10;
        const batchCoin = utils.coin(totalPrice);

        const ownerCommitment = simulator.as("buyer1").purchaseBatch20(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          batchCoin, buyer1
        );

        expect(ownerCommitment).toBeDefined();
        expect(ownerCommitment.length).toBe(32);
      });

      it("Batch20 fails with insufficient payment", () => {
        mintAndPoolTokens(simulator, 20);
        verifyBuyer(simulator);

        const insufficientCoin = utils.coin(Number(TOKEN_PRICE) * 20 - 1);

        expect(() => {
          simulator.as("buyer1").purchaseBatch20(
            TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
            TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
            TOKENID_11, TOKENID_12, TOKENID_13, TOKENID_14, TOKENID_15,
            TOKENID_16, TOKENID_17, TOKENID_18, TOKENID_19, TOKENID_20,
            insufficientCoin, buyer1
          );
        }).toThrow();
      });

      it("Batch20 proof of ownership works with shared commitment", () => {
        mintAndPoolTokens(simulator, 20);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 20);

        const ownerCommitment = simulator.as("buyer1").purchaseBatch20(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          TOKENID_11, TOKENID_12, TOKENID_13, TOKENID_14, TOKENID_15,
          TOKENID_16, TOKENID_17, TOKENID_18, TOKENID_19, TOKENID_20,
          batchCoin, buyer1
        );

        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);
      });

      it("Batch20 seller can withdraw accumulated funds", () => {
        mintAndPoolTokens(simulator, 20);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 20);
        simulator.as("buyer1").purchaseBatch20(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          TOKENID_11, TOKENID_12, TOKENID_13, TOKENID_14, TOKENID_15,
          TOKENID_16, TOKENID_17, TOKENID_18, TOKENID_19, TOKENID_20,
          batchCoin, buyer1
        );

        simulator.as("minter").withdrawSellerFunds(minter);
      });
    });

    describe("Batch + single purchase interaction", () => {
      it("Single purchase after batch purchase works", () => {
        mintAndPoolTokens(simulator, 6);
        verifyBuyer(simulator);

        // Batch5 first
        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);
        const batchCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        // Then single purchase of token 6
        const singleCoin = utils.coin(Number(TOKEN_PRICE));
        const singleCommitment = simulator.as("buyer1").purchaseNFT(
          TOKENID_6, singleCoin, buyer1
        );

        // Both commitments exist but are different
        expect(batchCommitment).toBeDefined();
        expect(singleCommitment).toBeDefined();
        expect(batchCommitment.length).toBe(32);
        expect(singleCommitment.length).toBe(32);

        // Counter should be 2 (1 for batch, 1 for single)
        const ledgerState = simulator.as("admin").getLedger();
        expect(ledgerState.NFTPool__purchaseCounter).toEqual(2n);
      });

      it("Full end-to-end batch flow: mint -> pool -> verify -> batch purchase -> proof -> withdraw", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);
        const ownerCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        // Proof of ownership with shared commitment
        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

        // Seller withdraws
        simulator.as("minter").withdrawSellerFunds(minter);

        const ledgerState = simulator.as("admin").getLedger();
        expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
      });
    });
  });

  describe("Burn lifecycle testing", () => {
    describe("Burn unsold tokens (Minter role)", () => {
      it("Minter burns unsold token that is not listed or sold", () => {
        // Mint a token but don't add to pool
        simulator
          .as("minter")
          .mint(Account_minter, TOKENID_1, createCertificate(1), TOKEN_PRICE, minter);

        expect(simulator.as("minter").balanceOf(Account_minter)).toBe(1n);

        // Minter burns unsold token
        simulator.as("minter").burn(TOKENID_1, minter);

        expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);
      });

      it("Burn fails if token is listed in pool (must unlist first)", () => {
        mintAndPoolTokens(simulator, 1);

        // Try to burn listed token - should fail
        expect(() => {
          simulator.as("minter").burn(TOKENID_1, minter);
        }).toThrow("Token must be unlisted before burning");
      });

      it("Unlist then burn succeeds", () => {
        mintAndPoolTokens(simulator, 1);

        // Remove from pool first
        simulator.as("poolOperator").removeFromPool(TOKENID_1, poolOperator);

        // Now burn succeeds
        simulator.as("minter").burn(TOKENID_1, minter);

        expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);
      });

      it("Burn fails for sold token (must be burned by commitment owner)", () => {
        mintAndPoolTokens(simulator, 1);
        verifyBuyer(simulator);

        const coin1 = utils.coin(Number(TOKEN_PRICE));
        simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);

        // Minter tries to burn sold token - should fail
        expect(() => {
          simulator.as("minter").burn(TOKENID_1, minter);
        }).toThrow("Sold tokens must be burned by commitment owner");
      });

      it("Non-minter roles cannot burn", () => {
        simulator
          .as("minter")
          .mint(Account_minter, TOKENID_1, createCertificate(1), TOKEN_PRICE, minter);

        expect(() => {
          simulator.as("poolOperator").burn(TOKENID_1, poolOperator);
        }).toThrow();
        expect(() => {
          simulator.as("verifier").burn(TOKENID_1, verifier);
        }).toThrow();
      });
    });

    describe("Burn purchased tokens (commitment owner)", () => {
      it("burnPurchasedBatch5 - burn all 5 real tokens", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);
        const ownerCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        // Buyer proves ownership and stores challenge
        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

        // Bot (minter role) executes burn with same challenge
        simulator.as("minter").burnPurchasedBatch5(
          ownerCommitment,
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          challenge, minter
        );

        // All tokens should be burned (balance 0)
        expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);
      });

      it("burnPurchasedBatch5 - burn partial batch (3 real + 2 mock)", () => {
        mintAndPoolTokens(simulator, 3);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 3);
        const ownerCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, MOCK_TOKEN, MOCK_TOKEN,
          batchCoin, buyer1
        );

        // Buyer proves ownership and stores challenge
        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

        // Bot (minter role) executes burn with same challenge
        simulator.as("minter").burnPurchasedBatch5(
          ownerCommitment,
          TOKENID_1, TOKENID_2, TOKENID_3, MOCK_TOKEN, MOCK_TOKEN,
          challenge, minter
        );

        // All 3 real tokens should be burned
        expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);
      });

      it("burnPurchasedBatch5 - wrong challenge fails", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);
        const ownerCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        // Buyer proves ownership with one challenge
        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

        // Bot tries to burn with a different challenge - should fail
        const wrongChallenge = randomBytes(32);
        expect(() => {
          simulator.as("minter").burnPurchasedBatch5(
            ownerCommitment,
            TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
            wrongChallenge, minter
          );
        }).toThrow();
      });

      it("burnPurchasedBatch5 - non-minter cannot burn", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);
        const ownerCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        // Buyer proves ownership
        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

        // Buyer (not minter) tries to burn - should fail
        expect(() => {
          simulator.as("buyer1").burnPurchasedBatch5(
            ownerCommitment,
            TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
            challenge, buyer1
          );
        }).toThrow();
      });

      it("burnPurchasedBatch5 - wrong commitment fails", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);
        simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        // Use a fake commitment - no proofOwnership stored for it
        const fakeCommitment = randomBytes(32);
        const challenge = randomBytes(32);
        expect(() => {
          simulator.as("minter").burnPurchasedBatch5(
            fakeCommitment,
            TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
            challenge, minter
          );
        }).toThrow();
      });

      it("burnPurchasedBatch10 - burn all 10 real tokens", () => {
        mintAndPoolTokens(simulator, 10);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 10);
        const ownerCommitment = simulator.as("buyer1").purchaseBatch10(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          batchCoin, buyer1
        );

        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

        simulator.as("minter").burnPurchasedBatch10(
          ownerCommitment,
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          challenge, minter
        );

        expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);
      });

      it("burnPurchasedBatch10 - burn partial batch (5 real + 5 mock)", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);
        const ownerCommitment = simulator.as("buyer1").purchaseBatch10(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          batchCoin, buyer1
        );

        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

        simulator.as("minter").burnPurchasedBatch10(
          ownerCommitment,
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          challenge, minter
        );

        expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);
      });

      it("burnPurchasedBatch20 - burn all 20 real tokens", () => {
        mintAndPoolTokens(simulator, 20);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 20);
        const ownerCommitment = simulator.as("buyer1").purchaseBatch20(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          TOKENID_11, TOKENID_12, TOKENID_13, TOKENID_14, TOKENID_15,
          TOKENID_16, TOKENID_17, TOKENID_18, TOKENID_19, TOKENID_20,
          batchCoin, buyer1
        );

        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

        simulator.as("minter").burnPurchasedBatch20(
          ownerCommitment,
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          TOKENID_11, TOKENID_12, TOKENID_13, TOKENID_14, TOKENID_15,
          TOKENID_16, TOKENID_17, TOKENID_18, TOKENID_19, TOKENID_20,
          challenge, minter
        );

        expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);
      });

      it("burnPurchasedBatch20 - burn partial batch (10 real + 10 mock)", () => {
        mintAndPoolTokens(simulator, 10);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 10);
        const ownerCommitment = simulator.as("buyer1").purchaseBatch20(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          batchCoin, buyer1
        );

        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

        simulator.as("minter").burnPurchasedBatch20(
          ownerCommitment,
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN, MOCK_TOKEN,
          challenge, minter
        );

        expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);
      });

      it("burnPurchasedBatch10 - wrong challenge from bot fails", () => {
        mintAndPoolTokens(simulator, 10);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 10);
        const ownerCommitment = simulator.as("buyer1").purchaseBatch10(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
          batchCoin, buyer1
        );

        // Buyer proves ownership with one challenge
        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

        // Bot tries with a different challenge - should fail
        const wrongChallenge = randomBytes(32);
        expect(() => {
          simulator.as("minter").burnPurchasedBatch10(
            ownerCommitment,
            TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
            TOKENID_6, TOKENID_7, TOKENID_8, TOKENID_9, TOKENID_10,
            wrongChallenge, minter
          );
        }).toThrow();
      });
    });

    describe("End-to-end burn lifecycle", () => {
      it("Full flow: mint -> pool -> purchase -> prove ownership -> burn -> verify gone", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        // Purchase batch
        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);
        const ownerCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        // Seller withdraws
        simulator.as("minter").withdrawSellerFunds(minter);

        // Buyer proves ownership and stores challenge
        const challenge = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

        // Bot (minter role) burns purchased tokens using the stored challenge
        simulator.as("minter").burnPurchasedBatch5(
          ownerCommitment,
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          challenge, minter
        );

        // Verify all tokens are burned
        expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);

        // Verify pool state is cleaned up (tokens are no longer sold)
        const ledgerState = simulator.as("admin").getLedger();
        expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
      });

      it("Cannot re-mint same token ID after burn (would need fresh mint)", () => {
        // Mint and pool
        simulator
          .as("minter")
          .mint(Account_minter, TOKENID_1, createCertificate(1), TOKEN_PRICE, minter);

        // Burn (unsold path - minter can burn)
        simulator.as("minter").burn(TOKENID_1, minter);

        expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);

        // Re-minting the same token ID should work (token was fully destroyed)
        simulator
          .as("minter")
          .mint(Account_minter, TOKENID_1, createCertificate(1), TOKEN_PRICE, minter);

        expect(simulator.as("minter").balanceOf(Account_minter)).toBe(1n);
      });

      it("Purchased token cannot be burned twice", () => {
        mintAndPoolTokens(simulator, 5);
        verifyBuyer(simulator);

        const batchCoin = utils.coin(Number(TOKEN_PRICE) * 5);
        const ownerCommitment = simulator.as("buyer1").purchaseBatch5(
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          batchCoin, buyer1
        );

        // First burn: buyer proves, bot burns
        const challenge1 = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge1, buyer1);
        simulator.as("minter").burnPurchasedBatch5(
          ownerCommitment,
          TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
          challenge1, minter
        );

        // Trying to burn again should fail (commitment was reset, tokens already burned)
        const challenge2 = randomBytes(32);
        simulator.as("buyer1").proofOwnership(ownerCommitment, challenge2, buyer1);
        expect(() => {
          simulator.as("minter").burnPurchasedBatch5(
            ownerCommitment,
            TOKENID_1, TOKENID_2, TOKENID_3, TOKENID_4, TOKENID_5,
            challenge2, minter
          );
        }).toThrow();
      });
    });
  });
});
