# Contributing to InterfaceOS

## Before starting

Read the [documentation index](docs/README.md), confirm the owning domain and artifact ID, and verify the work belongs to an approved milestone. Component implementation is not currently approved.

## Workflow

1. Create a short-lived branch using the [Git strategy](docs/governance/git-strategy.md).
2. Update the canonical document or schema; do not duplicate sources of truth.
3. Add or update evidence, tests, relationships, migration notes, and ownership as applicable.
4. Run `pnpm quality`.
5. Open a pull request describing scope, evidence, risks, validation, and rollback.
6. Obtain the reviews required by the [governance model](docs/governance/governance-model.md).

## Standards

Follow the [coding](docs/standards/coding-standards.md), [documentation](docs/standards/documentation-standards.md), [AI metadata](docs/standards/ai-metadata-standard.md), and [evidence](docs/evidence/evidence-model.md) standards.

## Security and privacy

Do not commit credentials, personal data, proprietary third-party material, or unapproved production exports. Report suspected exposure privately to the repository owner; a public security contact has not yet been approved.

## Decision boundary

Hard-to-reverse architecture, public contract, infrastructure, security, authority, or policy choices require an ADR before implementation. A passing check proves only that check; it does not replace review or approval.
