const hre = require("hardhat");

async function main() {
  const Factory = await hre.ethers.getContractFactory("SecureEVoting");
  const contract = await Factory.deploy();
  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log("SecureEVoting deployed to:", address);
  console.log("Administrator:", await contract.administrator());
  console.log("\nCopy the contract address into frontend/src/services/contract.js");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
