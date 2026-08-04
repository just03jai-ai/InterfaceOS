# Technical Decisions

Architectural decisions use ADRs with immutable numbers and statuses: Proposed, Accepted, Deprecated, or Superseded. Accepted ADRs are changed only by a superseding ADR.

| ADR                                       | Decision                                                | Status   |
| ----------------------------------------- | ------------------------------------------------------- | -------- |
| [ADR-0001](0001-modular-monorepo.md)      | Start with a pnpm modular monorepo and modular monolith | Proposed |
| [ADR-0002](0002-authority-by-artifact.md) | Assign source-of-truth authority by artifact concern    | Proposed |
| [ADR-0003](0003-dtcg-token-format.md)     | Use DTCG-compatible canonical token sources             | Proposed |

## Decision policy

An ADR is required for a hard-to-reverse choice, public contract, new infrastructure dependency, security boundary, canonical data ownership change, or exception to architecture rules. Implementation waits for required ADR approval.
