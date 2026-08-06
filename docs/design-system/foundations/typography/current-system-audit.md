# IOS-004.1 Typography System Audit

Status: Complete for research and architecture review

Audit date: 2026-08-06

Canonical source: `packages/tokens/src/primitives/typography.tokens.json`

## Inventory

The canonical source contains 21 draft primitives and no semantic typography tokens.

| Group               | Count | Current inventory                 |
| ------------------- | ----: | --------------------------------- |
| Font family         |     2 | Sans stack and monospace stack    |
| Font size           |     8 | Numeric stops `100` through `800` |
| Font weight         |     4 | Regular, medium, semibold, bold   |
| Line height         |     4 | Tight, heading, body, relaxed     |
| Letter spacing      |     3 | Tight, normal, wide               |
| Paragraph spacing   |     0 | Missing                           |
| Semantic styles     |     0 | Missing                           |
| Responsive mappings |     0 | Missing                           |

All 21 values are marked `draft`. This milestone treats them as an existing evaluation baseline, not as approved visual decisions, and does not modify them.

## Current assumptions

- The sans stack starts with `Inter`, followed by `ui-sans-serif`, `system-ui`, and `sans-serif`. Inter is provisional under ADR-0004; no repository record approves its delivery, subset, version, licensing review, or final use.
- The mono stack uses platform-oriented fallbacks. No primary monospace face, ligature policy, slashed-zero policy, or language coverage has been approved.
- Sizes are stored as pixels. Generated CSS preserves those values, but a future promotion decision must determine whether authored web typography should expose relative units without changing platform-neutral source semantics.
- Line heights are unitless ratios. Letter spacing is stored in pixels. There is no paragraph-spacing source.
- No theme dependency exists. Typography is not expected to vary between Light and Dark; only text-color pairings vary by theme.

## Gaps and conflicts

### Critical before implementation

1. Font delivery and licensing have no decision record. An OFL repository does not by itself approve an InterfaceOS distribution process.
2. Figma font availability and exact style names are unverified. Code fallback stacks cannot be represented losslessly in a Figma text style.
3. No semantic typography API exists for display, heading, title, body, label, caption, code, numeric, data-table, button, input, helper, or validation text.
4. No mapping exists from canonical primitives to Figma variables or Text Styles, and no Typography section or style IDs are captured.

### Serious before visual approval

1. Paragraph spacing, readable measure, content expansion, truncation, and dense-table policies are missing.
2. Responsive behavior is undefined. Mobile, tablet, desktop, and dense layouts have no governed mapping or fluid-type decision.
3. Numeric requirements are absent: tabular figures, slashed zero, decimal alignment, currency, percentages, and live-updating metrics need explicit behavior.
4. International-script coverage, RTL behavior, CJK line measure, fallback metric compatibility, and localization expansion targets are unapproved.

### Accessibility gaps

- No recorded manual tests for WCAG 2.2 1.4.4 Resize Text, 1.4.10 Reflow, or 1.4.12 Text Spacing.
- No minimum readable-size policy, text-role contrast binding, 200%/400% zoom evidence, or text-spacing override fixture.
- No rules prevent all-caps body copy, full justification, inaccessible truncation, or fixed-height clipping.
- No assistive-technology or specialist accessibility review exists. IOS-004.1 defines obligations only and does not claim conformance.

## Hardcoded-value audit

No application or component typography implementation exists outside the canonical token package. The only runtime typography transformation is the token builder joining font-family arrays into CSS stacks. Existing pixel and ratio values are canonical draft values, not scattered hardcoded application values.

## Browser and platform support state

No supported browser, operating-system, native-platform, font-loading, or Figma-editor matrix is approved. The source format can export font stacks and scalar properties, but that does not prove glyph availability, weight matching, variable-axis support, fallback metrics, or layout stability. IOS-004.2 must freeze the target environments and exact font files or platform families; later visual and engineering stages must test loading failure, synthetic styles, zoom, fallback substitution, and platform-specific mappings.

## Evidence state

Evidence ID `IOS-FND-TYPOGRAPHY` exists, but its Figma locators, collection IDs, variable IDs, Text Style IDs, screenshots, source revision, Figma revision, and drift checksum remain uncaptured. Drift is therefore `not-assessed`, not synchronized.
