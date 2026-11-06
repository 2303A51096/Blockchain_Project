# Test Cases

Record actual results only after executing each test. Initial status is Pending.

| ID | Scenario | Preconditions / Steps | Expected Result | Actual Result | Status | Defect ID |
|---|---|---|---|---|---|---|
| TC-01 | Deploy contract | Deploy to local Hardhat chain | Deployer is administrator | Pending | Pending | — |
| TC-02 | Create election | Admin submits valid title and period | Election is created | Pending | Pending | — |
| TC-03 | Non-admin creates election | Connect non-admin and submit create action | Transaction rejected | Pending | Pending | — |
| TC-04 | Add candidate | Admin adds candidate before start | Candidate is registered | Pending | Pending | — |
| TC-05 | Authorize voter | Admin authorizes valid address before start | Address is authorized | Pending | Pending | — |
| TC-06 | Valid vote | Authorized voter votes during period | Vote count increments once | Pending | Pending | — |
| TC-07 | Duplicate vote | Same wallet attempts second vote | Transaction rejected | Pending | Pending | — |
| TC-08 | Unauthorized vote | Unregistered wallet attempts vote | Transaction rejected | Pending | Pending | — |
| TC-09 | Early vote | Authorized wallet votes before start | Transaction rejected | Pending | Pending | — |
| TC-10 | Late vote | Authorized wallet votes after end | Transaction rejected | Pending | Pending | — |
| TC-11 | Invalid candidate | Submit candidate ID outside range | Transaction rejected | Pending | Pending | — |
| TC-12 | Results before end | Request results while election is open | Results request rejected | Pending | Pending | — |
| TC-13 | Results after end | Request results after end time | Candidate counts returned | Pending | Pending | — |
| TC-14 | Separate elections | Same wallet votes in two authorized elections | Each election tracks its own vote | Pending | Pending | — |
