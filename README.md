# InterfaceOS

InterfaceOS is an AI-native Design Intelligence Platform connecting visual design, design tokens, components, patterns, documentation, accessibility, code, governance, and machine-readable knowledge.

## Project status

The repository is in **IOS-002 Batch 1 prepared** status. IOS-001 Stage 2 architecture and governance are merged, and the schema-backed access, five-collection shell, and 32 primitive-color execution plan is ready for manual Figma work. No Figma mutation is claimed: real IDs, screenshots, permissions, drift review, engineering review, accessibility review, and release approval remain pending. No UI components or product application have been implemented. See [IOS-002 — Figma Variable Execution](docs/roadmap/ios-002-figma-variable-execution.md).

## Sources of truth

- **Figma:** editable visual intent and design evidence.
- **Git:** versioned specifications, tokens, schemas, code, documentation, governance, tests, and release manifests.
- **Storybook:** implemented component behavior, previews, accessibility checks, and code examples.
- **Supabase:** operational workflow data after its data model is approved.

Conflict and synchronization rules are defined in the [source-of-truth model](docs/architecture/source-of-truth.md).

## Repository map

| Path        | Responsibility                                                                    |
| ----------- | --------------------------------------------------------------------------------- |
| `apps/`     | Reserved deployable application boundaries                                        |
| `packages/` | Reserved reusable domain and platform packages                                    |
| `docs/`     | Canonical product, architecture, standards, governance, and roadmap documentation |
| `evidence/` | Reviewable evidence manifests and referenced artifacts                            |
| `schemas/`  | Versioned machine-readable contracts                                              |
| `scripts/`  | Repository validation automation                                                  |
| `tests/`    | Cross-cutting contract and repository tests                                       |
| `.github/`  | Continuous integration and repository automation                                  |

See the [documentation index](docs/README.md) and [repository architecture](docs/architecture/repository-architecture.md).

## Local verification

Requirements: Node.js 22 or newer and pnpm 11.11.0.

```sh
pnpm install --frozen-lockfile
pnpm quality
```

`pnpm quality` checks formatting, linting, TypeScript, tests, documentation links, JSON schemas, and common secret patterns. See [CONTRIBUTING.md](CONTRIBUTING.md) before proposing changes.

## License

No license has been approved. Until one is added, repository content is not licensed for redistribution.
