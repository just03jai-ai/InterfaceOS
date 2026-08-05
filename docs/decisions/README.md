# Technical Decisions

Architectural decisions use ADRs with immutable numbers and statuses: Proposed, Accepted, Deprecated, or Superseded. Accepted ADRs are changed only by a superseding ADR.

| ADR                                                     | Decision                                                          | Status   |
| ------------------------------------------------------- | ----------------------------------------------------------------- | -------- |
| [ADR-0001](0001-modular-monorepo.md)                    | Start with a pnpm modular monorepo and modular monolith           | Proposed |
| [ADR-0002](0002-authority-by-artifact.md)               | Assign source-of-truth authority by artifact concern              | Proposed |
| [ADR-0003](0003-dtcg-token-format.md)                   | Use DTCG-compatible canonical token sources                       | Accepted |
| [ADR-0004](0004-figma-foundation-representation.md)     | Govern Figma collections, representations, and publishing         | Accepted |
| [ADR-0005](0005-evidence-manifest-v2.md)                | Require explicit Figma capture and drift evidence in schema 2.0   | Accepted |
| [ADR-0006](0006-color-foundation-v1-visual-baseline.md) | Approve Color Foundation V1 visual intent pending token promotion | Accepted |

## Decision policy

An ADR is required for a hard-to-reverse choice, public contract, new infrastructure dependency, security boundary, canonical data ownership change, or exception to architecture rules. Implementation waits for required ADR approval.
