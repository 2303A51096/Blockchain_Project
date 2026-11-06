# Test Plan

## Objective
Validate the academic e-voting prototype's core election, authorization, voting, and results behavior.

## Scope
- Smart contract permissions and state.
- Election setup and candidate registration.
- Voter authorization.
- Voting-period checks.
- Duplicate-vote prevention.
- Vote totals and results.
- Frontend wallet and transaction feedback.

## Approach
Run automated Hardhat tests first, then perform manual end-to-end checks using local Hardhat accounts and MetaMask. Record the actual outcome and evidence for every test.

## Entry criteria
- Dependencies installed.
- Contract compiles.
- Local Hardhat node is available for manual tests.
- Contract deployed and frontend address configured.

## Exit criteria
- All planned test cases have an actual outcome recorded.
- Defects are documented and retested.
- Any known limitations are included in the final report.

## Risks and limitations
This educational prototype is not audited, does not establish unique real-world identity, and does not provide secret ballots.
