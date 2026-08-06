# IOS-004 Typography Validation Strategy

Status: Contract checks implemented for IOS-004.1; visual/runtime checks planned

## Automated now

- Canonical typography inventory remains exactly 21 draft primitives with unchanged names and values.
- Foundation, font-decision, Figma-blueprint, and type-style artifacts satisfy their schemas.
- Required semantic roles appear exactly once and names follow the governed convention.
- Every candidate includes fallback, licensing, delivery, variable-font, coverage, size, brand, and Figma assessments.
- The 18 required Figma boards are present, ordered, reviewable, and mutation-free.
- Evidence references exist and remain pending rather than containing invented Figma IDs.

## Automated after promotion

- Reject missing semantic styles, duplicate names, unsupported weights, invalid primitive references, and absent fallbacks.
- Validate line-height relationships and letter-spacing bounds against role-specific policy rather than one universal ratio.
- Require every responsive mapping to define compact, medium, expanded, and dense dispositions.
- Reject an approved primary font without an exact version, license disposition, delivery method, and fallback stack.
- Compare canonical type-style composites with generated CSS/TypeScript and captured Figma bindings.
- Detect Figma-to-token drift in name, family, weight, size, line height, tracking, paragraph spacing, feature settings, axes, and style IDs.

## Manual gates

- Glyph, hierarchy, rhythm, measure, brand, and density review
- Font loading blocked, fallback substitution, layout shift, and missing-weight review
- 200% resize, 400% reflow, and WCAG text-spacing override tests
- Localization expansion, RTL, CJK, combining marks, currency, and numeral review
- Data-table alignment, truncation access, code ambiguity, and ligature review
- Figma availability, exact style names, variable bindings, and Text Style inspection

No automated result is sufficient to claim accessibility, licensing, or design approval.
