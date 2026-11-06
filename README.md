# Secure E-Voting System Using Blockchain

An academic prototype using Solidity, Hardhat, React, Vite, ethers.js, and MetaMask.

> **Important:** This is an educational prototype, not audited or suitable for official elections. Wallet authorization does not prove a unique real-world identity. Public blockchain transactions can reveal candidate selections; this prototype does not provide secret ballots.

## Requirements

- Node.js 20 or newer
- npm
- MetaMask browser extension
- VS Code (recommended)

## Install

Open a terminal in the root folder:

```bash
npm install
npm --prefix frontend install
```

## Compile and test the contract

```bash
npm run compile
npm test
```

## Run the local blockchain

Open terminal 1:

```bash
npm run chain
```

Keep this terminal open. Hardhat prints local development accounts and private keys. These keys are for local testing only; never use them on a public network or with real funds.

## Deploy the contract locally

Open terminal 2:

```bash
npm run deploy:local
```

Copy the deployed contract address from the output.

Open `frontend/src/services/contract.js` and replace:

```js
export const CONTRACT_ADDRESS = "PASTE_DEPLOYED_CONTRACT_ADDRESS_HERE";
```

with your deployed local contract address.

## Configure MetaMask

1. Add a local network with RPC URL `http://127.0.0.1:8545` and chain ID `31337`.
2. Import one of the disposable Hardhat development accounts into MetaMask for testing only.
3. The first account printed by Hardhat deploys the contract and is the administrator.
4. Use that administrator account to create elections, add candidates, and authorize voter addresses.
5. Switch to authorized voter accounts to test voting.

The local chain resets when its process stops. If you restart it, deploy again and update the contract address.

## Run the frontend

Open terminal 3:

```bash
npm run frontend:dev
```

Open the Vite URL printed in the terminal, usually `http://localhost:5173`.

## How to demo

1. Connect the administrator wallet.
2. Create an election with future start and end times.
3. Add candidates before the start time.
4. Authorize the addresses of test voter accounts before the start time.
5. Wait for the start time (or use Hardhat time controls in tests).
6. Switch to an authorized voter and cast a vote.
7. Try voting twice and confirm the second transaction is rejected.
8. After the end time, close the election and load results.

## Public website deployment

The frontend can be built with:

```bash
npm run frontend:build
```

The production files are created in `frontend/dist/`, which can be hosted by Vercel or Netlify. Deploying the frontend does **not** deploy the smart contract. Deploy the contract separately to a compatible public testnet, then update `CONTRACT_ADDRESS` and the frontend network instructions accordingly. Never publish real private keys.

## Troubleshooting

- **Contract not configured:** deploy locally and update `CONTRACT_ADDRESS`.
- **Could not read contract:** ensure Hardhat node is running, MetaMask is on chain ID 31337, and the address belongs to the current local chain.
- **No elections:** connect the administrator wallet and create one.
- **No candidates:** add candidates before the voting start time.
- **Cannot vote:** check election times and whether the wallet was authorized before voting started.
- **Local chain reset:** redeploy the contract and update the address.

## Project documentation

See `docs/` for the test plan, test cases, bug-report template, test summary, and architecture notes.
