# ADR-0003: DTCG-compatible token sources

## Status

Accepted — 2026-08-05

## Context

InterfaceOS needs platform-neutral canonical tokens that can map to Figma and produce CSS, JSON, TypeScript, and Tailwind-compatible output without maintaining parallel values.

## Options

- Adopt the stable Design Tokens Community Group (DTCG) 2025.10 format and own a small resolver/exporter.
- Use a vendor-specific token format, gaining vendor features but coupling the source of truth.
- Create an InterfaceOS-only format, gaining control but assuming avoidable interoperability and migration cost.

## Decision

Author `.tokens.json` files using DTCG 2025.10 token and group structures, curly-brace aliases, standard value types, and namespaced InterfaceOS extensions. Keep Git sources canonical and generate platform outputs deterministically with repository-owned tooling.

InterfaceOS theme files use the same token format and are resolved one context at a time. Full DTCG Resolver Module bundles remain a compatible future evolution rather than an initial dependency. Generated distributions remain ignored in Git and reproducible through CI artifacts.

## Consequences

The source format is portable and vendor-neutral, while the small exporter is inspectable and testable. InterfaceOS must maintain schema and resolver conformance, deterministic generation, and CI artifact retention policy. Advanced resolver features are deferred until required. Figma representation decisions are governed separately by [ADR-0004](0004-figma-foundation-representation.md).

## Approval

Accepted by Jai Singh, interim Design System Owner, on 2026-08-05. Engineering review of the repository-owned resolver/exporter remains required before IOS-001 release.

## References

- [DTCG Format Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/)
- [DTCG Color Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-color-20251028/)
- [DTCG Resolver Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-resolver-20251028/)
