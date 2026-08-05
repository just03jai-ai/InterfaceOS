# IOS-003.1 Token Promotion Proposal

Status: Implemented in IOS-003.2 — pending human review and Figma reconciliation

Owner: Jai Singh

Decision source: [ADR-0006](../../../decisions/0006-color-foundation-v1-visual-baseline.md)

## Purpose

Promote the approved Color Foundation V1 visual baseline into canonical, generated, and consumable token artifacts without manually copying Figma values or weakening the Git source-of-truth model.

This document records the executed promotion plan. Canonical mutations are generated deterministically from the frozen approved V1 artifact and validated by [`color-token-promotion.manifest.json`](color-token-promotion.manifest.json); no approved value is manually transcribed.

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
2. Produce a machine-readable promotion manifest by joining approved Figma nodes to the frozen `color-candidates.approved-v1.json`; no visual value may be transcribed by hand.
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

## Remaining human approval and release gates

- Review `color.primitive.data.{01-11}` and `color.semantic.data.categorical.{01-11}` as the implemented categorical namespace.
- Review the generated canonical diff and confirm the 32 anchors remain unchanged.
- Complete the pending 90-variable Figma reconciliation and capture real IDs.
- Obtain the named accessibility specialist audit and independent release approval.
- Capture a named Figma version before any library publication.

## Acceptance evidence

- Approved promotion manifest and schema.
- Canonical-source diff with unchanged unrelated tokens.
- Generated output checksums.
- Figma variable/node ID map with zero unsupported aliases.
- Deterministic pending reconciliation guide: [`../../figma/ios-003-2-color-token-reconciliation.md`](../../figma/ios-003-2-color-token-reconciliation.md).
- Light/Dark completeness and declared contrast results.
- Design, engineering, accessibility disposition, governance, and independent release records.
