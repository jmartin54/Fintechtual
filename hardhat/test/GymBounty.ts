import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("GymBounty", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // an reset Hardhat Network to that snapshot in every test.
  async function deployOneYearGymBountyFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const GymBounty = await ethers.getContractFactory("GymBounty");
    const gymBounty = await GymBounty.deploy();

    return { gymBounty, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right price30", async function () {
      const { gymBounty } = await loadFixture(deployOneYearGymBountyFixture);

      expect(await gymBounty.price30()).to.equal(`90000000000000000000`);
    });

    it("Should set the right owner", async function () {
      const { gymBounty, owner } = await loadFixture(
        deployOneYearGymBountyFixture
      );

      expect(await gymBounty.owner()).to.equal(owner.address);
    });
  });
});
