# System Architecture

## Components
- **React + Vite:** User interface and responsive dashboards.
- **ethers.js:** Reads contract state and submits signed transactions.
- **MetaMask:** Wallet selection and transaction signing.
- **Solidity contract:** Authoritative election rules, voter authorization, vote counting, and result access.
- **Hardhat:** Local EVM development network, compilation, deployment, and tests.

## Transaction path
Voter/Admin → React UI → ethers.js → MetaMask signature/approval → Smart contract → Blockchain state and events → UI refresh.

## Read path
React UI → ethers.js provider → Smart contract view function → Rendered election state.

## Limitations
This prototype uses wallet-address authorization rather than real-world identity verification. Public transaction data can reveal votes. The system is not audited and is not suitable for official elections.
