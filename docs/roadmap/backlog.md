# Initial Backlog

This backlog is the traceability index. Detailed work is defined in the [IOS-001](ios-001-design-foundations.md) and [IOS-002](ios-002-figma-variable-execution.md) milestone specifications.

| ID          | Work item                                       | Depends on                            | Deliverable                            | Gate                      | Status    |
| ----------- | ----------------------------------------------- | ------------------------------------- | -------------------------------------- | ------------------------- | --------- |
| IOS-FND-001 | Approve repository foundation audit             | —                                     | Audit and readiness decision           | Architecture approval     | In review |
| IOS-FND-002 | Approve ADR-0001 and ADR-0002                   | IOS-FND-001                           | Accepted architecture decisions        | Architecture approval     | Proposed  |
| IOS-FND-003 | Assign governance and domain owners             | IOS-FND-001                           | Named ownership map                    | Governance approval       | Proposed  |
| IOS-FND-004 | Configure GitHub branch protection              | IOS-FND-003                           | Verified ruleset evidence              | Governance approval       | Proposed  |
| IOS-FND-005 | Approve repository license and security contact | IOS-FND-003                           | License and reporting policy           | Legal/governance approval | Proposed  |
| IOS-FND-006 | Provision canonical Figma Design System file    | IOS-FND-003                           | File URL, access model, page structure | Design approval           | In review |
| IOS-001     | Design Foundations and Token Architecture       | IOS-FND-002, IOS-FND-003, IOS-FND-006 | See milestone breakdown                | Release approval          | Active    |
| IOS-002     | Figma Variable Execution                        | IOS-001 Stage 2 merged                | Evidence-backed Figma variable batches | Design and release gates  | Active    |

Backlog status is one of Proposed, Ready, Active, Blocked, In review, Done, or Cancelled. “Done” requires linked acceptance evidence, not only completed activity.
