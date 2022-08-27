// deployed to mumbai at: 0x8dD43c5F141e1b87c278861B1ABcE811545C81a7

import { ethers } from "hardhat";

async function main() {
  const GymBounty = await ethers.getContractFactory("GymBounty");
  const gymBounty = await GymBounty.deploy();
  // {
  //   nonce: 0,
  // });

  await gymBounty.deployed();

  console.log("Deployed to mumbai at:", gymBounty.address);

  // This solves the bug in Mumbai network where the contract address is not the real one
  // const txHash = gymBounty.deployTransaction.hash;
  // console.log(`Tx hash: ${txHash}\nWaiting for transaction to be mined...`);
  // const txReceipt = await ethers.provider.waitForTransaction(txHash);

  // console.log("Contract address:", txReceipt.contractAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
