# ADR-0001: Modular monorepo and modular monolith

## Status

Proposed

## Context

InterfaceOS needs atomic changes across schemas, documentation, tokens, application surfaces, and validation. Domain boundaries are defined, but independent deployment and scaling requirements are not yet demonstrated.

## Options

- pnpm workspaces and a modular monolith: low operational cost and enforceable package boundaries.
- Polyrepo: independent ownership but higher cross-repository drift.
- Microservices: independent deployment but premature network, consistency, and operational costs.

## Decision

Use pnpm workspaces without a task orchestrator initially. Preserve domain boundaries through public package entry points and architecture tests. Add deployment units or orchestration only from measured need.

## Consequences

Cross-artifact changes remain atomic and local setup stays small. The repository must actively prevent package cycles and internal imports. Independent scaling is deferred.
