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
const adminMaster_privateKey = randomBytes(32);
const minterAdmin_privateKey = randomBytes(32);
const minter_privateKey = randomBytes(32);
const poolAdmin_privateKey = randomBytes(32);
const poolOperator_privateKey = randomBytes(32);
const verifierAdmin_privateKey = randomBytes(32);
const verifier_privateKey = randomBytes(32);
const buyer1_privateKey = randomBytes(32);
const buyer2_privateKey = randomBytes(32);

// Callers - use createCaller to ensure they match the accounts created by createEitherTestUser
export const adminMaster = utils.createCaller("adminMaster");
export const minterAdmin = utils.createCaller("minterAdmin");
export const minter = utils.createCaller("minter");
export const poolAdmin = utils.createCaller("poolAdmin");
export const poolOperator = utils.createCaller("poolOperator");
export const verifierAdmin = utils.createCaller("verifierAdmin");
export const verifier = utils.createCaller("verifier");
export const buyer1 = utils.createCaller("buyer1");
export const buyer2 = utils.createCaller("buyer2");

// Encoded PK/Addresses Accounts
const Account_adminMaster = utils.createEitherTestUser("adminMaster");
const Account_adminMaster2 = utils.createEitherTestUser("adminMaster2");
const Account_minterAdmin = utils.createEitherTestUser("minterAdmin");
const Account_minter = utils.createEitherTestUser("minter");
const Account_poolAdmin = utils.createEitherTestUser("poolAdmin");
const Account_poolOperator = utils.createEitherTestUser("poolOperator");
const Account_verifierAdmin = utils.createEitherTestUser("verifierAdmin");
const Account_verifier = utils.createEitherTestUser("verifier");
const Account_buyer1 = utils.createEitherTestUser("buyer1");
const Account_buyer2 = utils.createEitherTestUser("buyer2");

// Roles (new hierarchy: 0-6)
const adminMaster_ROLE = utils.zeroUint8Array();
const minterAdmin_ROLE = convertFieldToBytes(32, 1n, '');
const minter_ROLE = convertFieldToBytes(32, 2n, '');
const poolAdmin_ROLE = convertFieldToBytes(32, 3n, '');
const poolOperator_ROLE = convertFieldToBytes(32, 4n, '');
const verifierAdmin_ROLE = convertFieldToBytes(32, 5n, '');
const verifier_ROLE = convertFieldToBytes(32, 6n, '');

// Token IDs
const TOKENID_1: bigint = BigInt(1);
const TOKENID_2: bigint = BigInt(2);
const TOKENID_3: bigint = BigInt(3);
const NON_EXISTENT_TOKEN: bigint = BigInt(0xdead);

// Certificates
const Certificate_1: NonFungibleToken_Certificate = {
  id: "Certificate_1",
  source: NonFungibleToken_Source.Biomass,
  generation: 10000000n,
  vintage: 20n,
  impact: NonFungibleToken_Impact.High,
  location: NonFungibleToken_Location.RJ
};

const Certificate_2: NonFungibleToken_Certificate = {
  id: "Certificate_2",
  source: NonFungibleToken_Source.Solar,
  generation: 5000000n,
  vintage: 15n,
  impact: NonFungibleToken_Impact.Medium,
  location: NonFungibleToken_Location.SP
};

const Certificate_3: NonFungibleToken_Certificate = {
  id: "Certificate_3",
  source: NonFungibleToken_Source.Wind,
  generation: 8000000n,
  vintage: 25n,
  impact: NonFungibleToken_Impact.Low,
  location: NonFungibleToken_Location.MG
};

// Prices
const Certificate_1_Price = 100n;
const Certificate_2_Price = 200n;
const Certificate_3_Price = 150n;

// Initialization
const name = "NAME";
const symbol = "SYMBOL";

function createSimulator() {
  const simulator = Simulator.deployContract(
    adminMaster_privateKey,
    name,
    symbol
  );

  simulator.createPrivateState("adminMaster", adminMaster_privateKey);
  simulator.createPrivateState("minterAdmin", minterAdmin_privateKey);
  simulator.createPrivateState("minter", minter_privateKey);
  simulator.createPrivateState("poolAdmin", poolAdmin_privateKey);
  simulator.createPrivateState("poolOperator", poolOperator_privateKey);
  simulator.createPrivateState("verifierAdmin", verifierAdmin_privateKey);
  simulator.createPrivateState("verifier", verifier_privateKey);
  simulator.createPrivateState("buyer1", buyer1_privateKey);
  simulator.createPrivateState("buyer2", buyer2_privateKey);

  // Grant admin roles
  simulator
    .as("adminMaster")
    .grantRole(minterAdmin_ROLE, Account_minterAdmin, adminMaster);
  simulator
    .as("adminMaster")
    .grantRole(poolAdmin_ROLE, Account_poolAdmin, adminMaster);
  simulator
    .as("adminMaster")
    .grantRole(verifierAdmin_ROLE, Account_verifierAdmin, adminMaster);

  // Grant operator roles
  simulator
    .as("minterAdmin")
    .grantRole(minter_ROLE, Account_minter, minterAdmin);
  simulator
    .as("poolAdmin")
    .grantRole(poolOperator_ROLE, Account_poolOperator, poolAdmin);
  simulator
    .as("verifierAdmin")
    .grantRole(verifier_ROLE, Account_verifier, verifierAdmin);

  return simulator;
}

let simulator: Simulator;

describe("Smart Contract Testing", () => {
  beforeEach(() => {
    simulator = createSimulator();
  });

  describe("Access Control module testing", () => {
    it("properly initializes ledger state and private state", () => {
      const initialLedgerState = simulator.as("adminMaster").getLedger();
      expect(initialLedgerState.NonFungibleToken__name).toEqual("NAME");
      expect(initialLedgerState.NonFungibleToken__symbol).toEqual("SYMBOL");
      const initialPrivateState = simulator.as("adminMaster").getPrivateState();
      expect(initialPrivateState).toEqual({
        secretNonce: adminMaster_privateKey
      });
    });

    it("Confirm the roles using assertOnlyRole", () => {
      simulator.as("adminMaster").assertOnlyRole(adminMaster_ROLE, adminMaster);
      simulator.as("minterAdmin").assertOnlyRole(adminMaster_ROLE, adminMaster);
      simulator.as("minter").assertOnlyRole(adminMaster_ROLE, adminMaster);
      simulator.as("poolAdmin").assertOnlyRole(adminMaster_ROLE, adminMaster);
      simulator.as("poolOperator").assertOnlyRole(adminMaster_ROLE, adminMaster);
      simulator.as("verifierAdmin").assertOnlyRole(adminMaster_ROLE, adminMaster);
      simulator.as("verifier").assertOnlyRole(adminMaster_ROLE, adminMaster);
    });

    it("Setting Roles Admins should fail if not AdminMaster", () => {
      expect(() => {
        simulator
          .as("minterAdmin")
          .setRoleAdmin(minter_ROLE, minterAdmin_ROLE, minterAdmin);
      }).toThrow();
      expect(() => {
        simulator
          .as("minter")
          .setRoleAdmin(minter_ROLE, minterAdmin_ROLE, minter);
      }).toThrow();
      expect(() => {
        simulator
          .as("poolAdmin")
          .setRoleAdmin(poolOperator_ROLE, poolAdmin_ROLE, poolAdmin);
      }).toThrow();
      expect(() => {
        simulator
          .as("poolOperator")
          .setRoleAdmin(poolOperator_ROLE, poolAdmin_ROLE, poolOperator);
      }).toThrow();
      expect(() => {
        simulator
          .as("verifierAdmin")
          .setRoleAdmin(verifier_ROLE, verifierAdmin_ROLE, verifierAdmin);
      }).toThrow();
      expect(() => {
        simulator
          .as("verifier")
          .setRoleAdmin(verifier_ROLE, verifierAdmin_ROLE, verifier);
      }).toThrow();
    });

    it("Setting Roles should fail if not correct Admin", () => {
      expect(() => {
        simulator
          .as("minterAdmin")
          .grantRole(poolOperator_ROLE, Account_poolOperator, minterAdmin);
      }).toThrow();
      expect(() => {
        simulator
          .as("poolAdmin")
          .grantRole(minter_ROLE, Account_minter, poolAdmin);
      }).toThrow();
      expect(() => {
        simulator
          .as("verifierAdmin")
          .grantRole(minter_ROLE, Account_minter, verifierAdmin);
      }).toThrow();
    });

    it("Creating a new Admin Master", () => {
      simulator
        .as("adminMaster")
        .grantRole(adminMaster_ROLE, Account_adminMaster2, adminMaster);
      expect(() => {
        simulator
          .as("minterAdmin")
          .grantRole(adminMaster_ROLE, Account_adminMaster2, minterAdmin);
      }).toThrow();
    });

    it("Pause Access Control", () => {
      simulator.as("adminMaster").pauseAccessControl(adminMaster);
      expect(() => {
        simulator
          .as("adminMaster")
          .setRoleAdmin(minter_ROLE, minterAdmin_ROLE, adminMaster);
      }).toThrow();
      simulator.as("adminMaster").unpauseAccessControl(adminMaster);
      expect(() => {
        simulator.as("adminMaster").unpauseAccessControl(adminMaster);
      }).toThrow();
      expect(() => {
        simulator.as("minterAdmin").pauseAccessControl(minterAdmin);
      }).toThrow();
    });
  });

  describe("Identity module testing", () => {
    it("Setting User should fail if not verifier", () => {
      expect(() => {
        simulator.as("minterAdmin").setUser(Account_minter.left, minterAdmin);
      }).toThrow();
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
        simulator
          .as("minterAdmin")
          .removeUser(Account_minter.left, minterAdmin);
      }).toThrow();
      expect(() => {
        simulator.as("minter").removeUser(Account_minter.left, minter);
      }).toThrow();
      expect(() => {
        simulator.as("poolOperator").removeUser(Account_poolOperator.left, poolOperator);
      }).toThrow();
      simulator.as("verifier").removeUser(Account_minter.left, verifier);
    });

    it("Pause Identity", () => {
      simulator.as("adminMaster").pauseIdentity(adminMaster);
      expect(() => {
        simulator.as("adminMaster").setUser(Account_minter.left, adminMaster);
      }).toThrow();
      simulator.as("adminMaster").unpauseIdentity(adminMaster);
      expect(() => {
        simulator.as("adminMaster").unpauseIdentity(adminMaster);
      }).toThrow();
      expect(() => {
        simulator.as("minterAdmin").pauseIdentity(minterAdmin);
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
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      expect(() => {
        simulator
          .as("minterAdmin")
          .mint(
            Account_minter,
            TOKENID_1,
            Certificate_1,
            Certificate_1_Price,
            minterAdmin
          );
      }).toThrow();
      expect(() => {
        simulator
          .as("verifier")
          .mint(
            Account_minter,
            TOKENID_1,
            Certificate_1,
            Certificate_1_Price,
            verifier
          );
      }).toThrow();
      expect(() => {
        simulator
          .as("poolOperator")
          .mint(
            Account_minter,
            TOKENID_1,
            Certificate_1,
            Certificate_1_Price,
            poolOperator
          );
      }).toThrow();

      // Checking status
      expect(simulator.as("minter").balanceOf(Account_minter)).toBe(1n);
      expect(simulator.as("minter").ownerOf(TOKENID_1)).toStrictEqual(
        Account_minter
      );
      expect(simulator.as("minter").tokenCertificate(TOKENID_1)).toStrictEqual(
        Certificate_1
      );

      // Set a price
      simulator.as("minter").setTokenPrice(TOKENID_1, 20n, minter);
      expect(() => {
        simulator.as("poolOperator").setTokenPrice(TOKENID_1, 20n, poolOperator);
      }).toThrow();
    });

    it("Burning a token (MasterAdmin only)", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      // Non-admin roles should fail to burn
      expect(() => {
        simulator.as("minter").burn(TOKENID_1, minter);
      }).toThrow();
      expect(() => {
        simulator.as("poolOperator").burn(TOKENID_1, poolOperator);
      }).toThrow();
      expect(() => {
        simulator.as("verifier").burn(TOKENID_1, verifier);
      }).toThrow();
      // Admin master can burn
      simulator.as("adminMaster").burn(TOKENID_1, adminMaster);

      // Checking status
      expect(simulator.as("minter").balanceOf(Account_minter)).toBe(0n);
    });
  });

  describe("NFT Pool module testing", () => {
    it("properly initializes ledger state", () => {
      const initialLedgerState = simulator.as("adminMaster").getLedger();
      expect(initialLedgerState.NFTPool__purchaseCounter).toEqual(0n);
    });

    it("Add NFT to pool (only PoolOperator)", () => {
      // Mint a token first
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          Certificate_1,
          Certificate_1_Price,
          minter
        );

      // PoolOperator can add to pool
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);

      // Non-PoolOperator should fail
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_2,
          Certificate_2,
          Certificate_2_Price,
          minter
        );
      expect(() => {
        simulator.as("minter").addToPool(TOKENID_2, minter);
      }).toThrow();
      expect(() => {
        simulator.as("verifier").addToPool(TOKENID_2, verifier);
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
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      expect(() => {
        simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      }).toThrow();
    });

    it("Remove NFT from pool (only PoolOperator)", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      simulator.as("poolOperator").removeFromPool(TOKENID_1, poolOperator);

      // Non-PoolOperator should fail
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      expect(() => {
        simulator.as("minter").removeFromPool(TOKENID_1, minter);
      }).toThrow();
    });

    it("Remove non-listed token should fail", () => {
      expect(() => {
        simulator.as("poolOperator").removeFromPool(TOKENID_1, poolOperator);
      }).toThrow();
    });

    it("Purchase single NFT (verified buyer)", () => {
      // Setup: mint, add to pool, verify buyer
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      simulator.as("verifier").setUser(Account_buyer1.left, verifier);

      // Purchase
      const coin1 = utils.coin(Number(Certificate_1_Price));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      // Verify commitment was returned
      expect(ownerCommitment).toBeDefined();
      expect(ownerCommitment.length).toBe(32);

      // Check purchase counter incremented
      const ledgerState = simulator.as("adminMaster").getLedger();
      expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
    });

    it("Purchase fails for non-whitelisted buyer", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);

      // buyer1 is NOT verified
      const coin1 = utils.coin(Number(Certificate_1_Price));
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
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      simulator.as("verifier").setUser(Account_buyer1.left, verifier);

      // Token not added to pool
      const coin1 = utils.coin(Number(Certificate_1_Price));
      expect(() => {
        simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);
      }).toThrow();
    });

    it("Purchase fails with insufficient payment", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      simulator.as("verifier").setUser(Account_buyer1.left, verifier);

      // Coin value less than price
      const insufficientCoin = utils.coin(Number(Certificate_1_Price) - 1);
      expect(() => {
        simulator.as("buyer1").purchaseNFT(TOKENID_1, insufficientCoin, buyer1);
      }).toThrow();
    });

    it("Double-purchase of same token fails", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      simulator.as("verifier").setUser(Account_buyer1.left, verifier);

      const coin1 = utils.coin(Number(Certificate_1_Price));
      simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);

      // Second purchase should fail (token removed from pool after first purchase)
      const coin2 = utils.coin(Number(Certificate_1_Price));
      expect(() => {
        simulator.as("buyer1").purchaseNFT(TOKENID_1, coin2, buyer1);
      }).toThrow();
    });

    it("Proof of ownership (owner succeeds)", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      simulator.as("verifier").setUser(Account_buyer1.left, verifier);

      const coin1 = utils.coin(Number(Certificate_1_Price));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      const challenge = randomBytes(32);
      simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);
    });

    it("Proof of ownership (non-owner fails)", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      simulator.as("verifier").setUser(Account_buyer1.left, verifier);
      simulator.as("verifier").setUser(Account_buyer2.left, verifier);

      const coin1 = utils.coin(Number(Certificate_1_Price));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      // buyer2 tries to prove ownership of buyer1's purchase
      const challenge = randomBytes(32);
      expect(() => {
        simulator.as("buyer2").proofOwnership(ownerCommitment, challenge, buyer2);
      }).toThrow();
    });

    it("Seller withdraws accumulated funds", () => {
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      simulator.as("verifier").setUser(Account_buyer1.left, verifier);

      const coin1 = utils.coin(Number(Certificate_1_Price));
      simulator.as("buyer1").purchaseNFT(TOKENID_1, coin1, buyer1);

      // Seller (minter who owns the NFT) withdraws
      simulator.as("minter").withdrawSellerFunds(minter);
    });

    it("Pause and unpause NFTPool", () => {
      simulator.as("adminMaster").pauseNFTPool(adminMaster);

      // Operations should fail when paused
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          Certificate_1,
          Certificate_1_Price,
          minter
        );
      expect(() => {
        simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
      }).toThrow();

      // Unpause
      simulator.as("adminMaster").unpauseNFTPool(adminMaster);

      // Operations should work again
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);
    });

    it("Full end-to-end flow: mint -> pool -> verify buyer -> purchase -> proof -> seller withdraw", () => {
      // Mint tokens
      simulator
        .as("minter")
        .mint(
          Account_minter,
          TOKENID_1,
          Certificate_1,
          Certificate_1_Price,
          minter
        );

      // Add to pool
      simulator.as("poolOperator").addToPool(TOKENID_1, poolOperator);

      // Verify buyer
      simulator.as("verifier").setUser(Account_buyer1.left, verifier);

      // Purchase
      const coin1 = utils.coin(Number(Certificate_1_Price));
      const ownerCommitment = simulator
        .as("buyer1")
        .purchaseNFT(TOKENID_1, coin1, buyer1);

      // Proof of ownership
      const challenge = randomBytes(32);
      simulator.as("buyer1").proofOwnership(ownerCommitment, challenge, buyer1);

      // Seller withdraws
      simulator.as("minter").withdrawSellerFunds(minter);

      // Verify final state
      const ledgerState = simulator.as("adminMaster").getLedger();
      expect(ledgerState.NFTPool__purchaseCounter).toEqual(1n);
    });
  });
});
