# Governance Model

## Roles

| Role                   | Accountability                                                    |
| ---------------------- | ----------------------------------------------------------------- |
| Author                 | Produces the change and evidence; cannot self-approve release     |
| Domain owner           | Owns artifact correctness, compatibility, and maintenance         |
| Design reviewer        | Validates intent, Figma evidence, states, and responsive behavior |
| Engineering reviewer   | Validates contracts, implementation, tests, and operability       |
| Accessibility reviewer | Validates requirements, evidence, and exceptions                  |
| Documentation reviewer | Validates clarity, completeness, and mappings                     |
| Release manager        | Confirms gates, version, manifest, and communication              |

People may hold multiple roles, but author and final approver must be separate for governed releases.

## IOS-001 interim assignments

| Role                   | Assignment            | Status                                                     |
| ---------------------- | --------------------- | ---------------------------------------------------------- |
| Design System Owner    | Jai Singh             | Interim                                                    |
| Design reviewer        | Jai Singh             | Temporary for Stage 2 decisions                            |
| Documentation reviewer | Jai Singh             | Temporary for Stage 2 decisions                            |
| Governance reviewer    | Jai Singh             | Temporary for Stage 2 decisions                            |
| Release reviewer       | Jai Singh             | Temporary for Stage 2 planning; not final release approval |
| Engineering reviewer   | Unassigned specialist | Pending                                                    |
| Accessibility reviewer | Unassigned specialist | Pending                                                    |

These temporary assignments do not waive independent final approval. Engineering and accessibility gates remain open, and Jai Singh cannot act as both author and final approver for an IOS-001 release.

## IOS-003.1 foundation acceptance

ADR-0006 records Jai Singh’s approval of the Color Foundation V1 visual baseline, including milestone-level engineering and accessibility dispositions. This closes the foundation review milestone but does not convert the decision into an independent public-release approval.

- The named accessibility specialist audit continues as a non-blocking foundation follow-up and remains required before public-release conformance claims.
- Jai Singh’s engineering disposition approves the IOS-003.1 architecture, token layering, and alias hierarchy; a separate engineer should review the canonical token-promotion diff before it is merged.
- Author and final public-release approver remain separate roles.
- Private, unpublished status is preserved until token promotion, named-version capture, drift verification, and independent release approval are complete.

## Lifecycle gates

Research → Specification → Design → Review → Accessibility → Documentation → Implementation → Storybook → AI Metadata → Testing → Approval → Release.

Each transition records stable ID, source and target stage, actor, timestamp, evidence, policy result, and comments. Failure returns to a named stage without deleting history.

## Change levels

- Patch: compatible correction with no intended contract change.
- Minor: backward-compatible capability or artifact addition.
- Major: breaking behavior, schema, token meaning, removal, or migration.

## Exceptions

Exceptions name the failed policy, justification, impact, compensating control, owner, approver, creation date, expiry, and remediation issue. Expired exceptions block release.

## AI participation

AI may research, draft, validate, map, or propose changes under a named actor identity. It may not approve its own work, hide provenance, resolve authority conflicts silently, or release without human authorization.

## Review cadence

Owners review released artifacts on material dependency changes and at a cadence set per artifact risk. Stale review dates are visible governance debt, not automatic approval.
