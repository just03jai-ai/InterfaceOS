# IOS-003.1 Token Promotion Proposal

Status: Proposed — implementation requires a separate approved change  
Owner: Jai Singh  
Decision source: [ADR-0006](../../../decisions/0006-color-foundation-v1-visual-baseline.md)

## Purpose

Promote the approved Color Foundation V1 visual baseline into canonical, generated, and consumable token artifacts without manually copying Figma values or weakening the Git source-of-truth model.

This document is a promotion plan, not a token mutation. Canonical token names and values are unchanged in this milestone.

## Approved visual baseline

| Layer               | Approved V1 decision                                                                                                 | Promotion implication                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Core primitives     | Neutral, Blue, Green, Amber, Red                                                                                     | Preserve existing anchors; propose approved missing scale stops where present in Figma.                                    |
| Primary             | Blue                                                                                                                 | Map product Primary intent to Blue through governed semantic/theme aliases; do not duplicate a second raw Primary palette. |
| Extended primitives | Indigo, Purple, Teal                                                                                                 | Propose new primitive families with constrained AI, automation, premium, analytics, information, and data usage.           |
| Data                | Data 01–11                                                                                                           | Propose a distinct categorical analytics token namespace; do not encode display order into semantic meaning.               |
| Themes              | Light and Dark                                                                                                       | Preserve complete semantic-to-theme-to-primitive resolution in both modes.                                                 |
| Semantic systems    | Primary, Secondary, Success, Warning, Danger/Error, Surface, Background, Border, Text, Interactive, Focus, Selection | Propose only missing aliases or mappings; do not rename existing public token paths without a migration.                   |

## Proposed promotion sequence

1. Freeze the approved Figma review evidence and candidate artifact checksums.
2. Produce a machine-readable promotion manifest by joining approved Figma nodes to `color-candidates.generated.json`; no visual value may be transcribed by hand.
3. Classify each candidate as `add-primitive`, `add-data-token`, `add-alias`, `retain-canonical`, or `no-code-token`.
4. Run duplicate-value, naming, reference, circularity, theme-completeness, contrast-obligation, and migration-impact validation before editing canonical sources.
5. Present the exact token diff, alias graph, generated CSS/JSON/TypeScript/Tailwind diff, and consumer impact for human approval.
6. Apply the approved canonical token change in one reviewable commit; regenerate every distribution from source.
7. Synchronize Figma variables to the accepted canonical source and replace provisional hardcoded fills with bound variables where representable.
8. Re-run drift checks, accessibility diagnostics, full repository validation, and evidence capture.

## Non-negotiable controls

- No manual value duplication between Figma and Git.
- No generated distribution is edited directly.
- No existing token is renamed or removed without compatibility analysis and migration guidance.
- Blue Primary is an alias strategy, not a duplicated primitive family.
- Extended families do not become status semantics by implication.
- Data colors require labels, shapes, patterns, or other redundant encoding in product charts.
- Accessibility specialist audit remains required before public-release claims.
- The library stays private until token promotion, named-version capture, drift validation, and independent release approval are complete.

## Required human approval before execution

- Exact namespace for extended and categorical data tokens.
- Whether approved missing stops extend existing families in V1 or are introduced as a later minor version.
- Semantic aliases to add versus relationships that remain documentation-only.
- Migration treatment for any consumer-visible alias change.
- Named engineering reviewer and independent release approver for publication.

## Acceptance evidence

- Approved promotion manifest and schema.
- Canonical-source diff with unchanged unrelated tokens.
- Generated output checksums.
- Figma variable/node ID map with zero unsupported aliases.
- Light/Dark completeness and declared contrast results.
- Design, engineering, accessibility disposition, governance, and independent release records.
