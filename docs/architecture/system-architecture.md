# System Architecture

Status: Proposed
Version: 0.1.0

## System context

InterfaceOS connects designers, developers, product managers, reviewers, maintainers, and AI agents to governed design intelligence. Figma, Git, Storybook, and Supabase retain explicit responsibilities defined by the [source-of-truth model](source-of-truth.md).

```text
People and AI agents
        |
InterfaceOS experience and APIs
        |
Artifact registry + domain intelligence + governance
        |
Contracts, synchronization, validation, indexing
   /          |             |             \
Figma        Git        Storybook      Supabase
```

## Containers

| Container                  | Responsibility                                                            | Status                                       |
| -------------------------- | ------------------------------------------------------------------------- | -------------------------------------------- |
| Documentation/platform app | Discovery, documentation, governance, search, and administration surfaces | Reserved, not initialized                    |
| Storybook app              | Isolated implementation evidence and interaction testing                  | Reserved, not initialized                    |
| Domain packages            | Tokens, components, assets, patterns, metadata, and governance contracts  | Boundaries reserved                          |
| Validation tooling         | Schema, link, secret, type, lint, format, and test gates                  | Foundation implementation                    |
| Supabase                   | Operational identity, workflow, audit, and analytics data                 | Deferred pending data and security decisions |
| Sync/index workers         | Normalize external sources and build derived projections                  | Deferred until contracts are proven          |

## Architectural style

The starting style is a modular monolith in a pnpm monorepo. Domain logic depends on versioned contracts, while external systems sit behind adapters. Generated search, graph, documentation, and analytics data are disposable projections of canonical sources.

## Data flow

1. An authoritative source changes at a known revision.
2. An adapter normalizes the change into a versioned artifact contract.
3. Validators check identity, schema, relationships, policy, and provenance.
4. Drift or policy failure is recorded and blocks promotion.
5. Approved canonical data produces derived documentation, search, graph, and analytics projections.
6. Releases bind artifact versions and evidence to an immutable Git revision.

## Security boundaries

- Secrets remain in approved secret stores and server-only environments.
- External input is validated at adapter boundaries.
- Least-privilege service identities separate reads, proposals, approvals, and releases.
- Supabase row-level security and tenancy remain mandatory design work before persistence is enabled.
- AI agents cannot approve their own changes or bypass lifecycle gates.

## Reliability and observability

Synchronization must be idempotent where practical, retry-safe, and traceable by run ID. Logs must identify source revision, contract version, actor, outcome, and drift without recording secrets or protected content.

## Deployment evolution

The initial deployment topology remains undecided because no runtime exists. A context may become a worker or service only when measured reliability, security, scaling, or ownership constraints justify the additional distributed-system cost.

Repository boundaries and dependency rules are detailed in [repository architecture](repository-architecture.md).
