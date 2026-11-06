const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SecureEVoting", function () {
  async function fixture() {
    const [admin, voter, other] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("SecureEVoting");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();
    const now = (await ethers.provider.getBlock("latest")).timestamp;
    const start = now + 100;
    const end = now + 300;
    await contract.createElection("Demo Election", "Testing election", start, end);
    await contract.addCandidate(1, "Candidate A");
    await contract.addCandidate(1, "Candidate B");
    await contract.authorizeVoter(1, voter.address);
    return { contract, admin, voter, other, start, end };
  }

  it("sets deployer as administrator", async function () {
    const { contract, admin } = await fixture();
    expect(await contract.administrator()).to.equal(admin.address);
  });

  it("allows administrator to create elections and candidates", async function () {
    const { contract } = await fixture();
    const election = await contract.getElection(1);
    expect(election.title).to.equal("Demo Election");
    expect(election.candidateCount).to.equal(2n);
  });

  it("rejects election creation by non-admin", async function () {
    const { contract, voter, start, end } = await fixture();
    await expect(contract.connect(voter).createElection("Bad", "", start, end))
      .to.be.revertedWith("Only administrator");
  });

  it("allows authorized voter to vote once and counts vote", async function () {
    const { contract, voter, start } = await fixture();
    await ethers.provider.send("evm_setNextBlockTimestamp", [start]);
    await ethers.provider.send("evm_mine", []);
    await contract.connect(voter).vote(1, 1);
    expect(await contract.hasVoted(1, voter.address)).to.equal(true);
    expect((await contract.getElection(1)).totalVotes).to.equal(1n);
  });

  it("rejects duplicate voting", async function () {
    const { contract, voter, start } = await fixture();
    await ethers.provider.send("evm_setNextBlockTimestamp", [start]);
    await ethers.provider.send("evm_mine", []);
    await contract.connect(voter).vote(1, 1);
    await expect(contract.connect(voter).vote(1, 2)).to.be.revertedWith("Already voted");
  });

  it("rejects unauthorized voters", async function () {
    const { contract, other, start } = await fixture();
    await ethers.provider.send("evm_setNextBlockTimestamp", [start]);
    await ethers.provider.send("evm_mine", []);
    await expect(contract.connect(other).vote(1, 1)).to.be.revertedWith("Voter not authorized");
  });

  it("rejects invalid candidates", async function () {
    const { contract, voter, start } = await fixture();
    await ethers.provider.send("evm_setNextBlockTimestamp", [start]);
    await ethers.provider.send("evm_mine", []);
    await expect(contract.connect(voter).vote(1, 3)).to.be.revertedWith("Invalid candidate");
  });

  it("returns results after voting period ends", async function () {
    const { contract, end } = await fixture();
    await ethers.provider.send("evm_setNextBlockTimestamp", [end + 1]);
    await ethers.provider.send("evm_mine", []);
    const result = await contract.getResults(1);
    expect(result.names).to.deep.equal(["Candidate A", "Candidate B"]);
  });
});
