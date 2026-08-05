# InterfaceOS

InterfaceOS is an AI-native Design Intelligence Platform connecting visual design, design tokens, components, patterns, documentation, accessibility, code, governance, and machine-readable knowledge.

## Project status

The repository is in **IOS-003.3 Figma color variable reconciliation ready for approval** status. The exact approved IOS-003.1 values exist in canonical hue and categorical data tokens with complete Light/Dark mappings and deterministic validation. Figma now contains the verified 170-variable color graph: 100 Primitive, 35 Semantic, and 35 Theme variables. Human review and unpublished-library verification are complete; file sharing permissions remain separate from library publication governance. No UI component, specialist accessibility approval, engineering specialist approval, library publication, or public release is claimed. See [IOS-003.3 — Figma Color Variable Reconciliation](docs/roadmap/ios-003-3-figma-color-reconciliation.md).

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
