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
