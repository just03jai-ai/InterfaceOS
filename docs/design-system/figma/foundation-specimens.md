# Figma Foundation Specimen Requirements

Status: IOS-003.1 Color Foundation V1 visual baseline approved; other visual foundations not implemented

These requirements govern future manual boards on `03 Foundations`. They reference canonical sources and intentionally do not duplicate token values. Every board must use editable Figma variables/styles where an approved mapping exists and must link its InterfaceOS evidence ID.

IOS-003.1 specializes FSP-001 through FSP-003 with the [Color Foundation page blueprint](../foundations/color/figma-page-blueprint.md). The visual baseline is approved under ADR-0006. Figma-only approved values remain pending canonical token promotion, and public library release remains blocked.

## FSP-001 — Color primitives

- **Purpose:** Show the available raw color families without assigning product meaning.
- **Canonical token source:** `packages/tokens/src/primitives/color.tokens.json`.
- **Required content:** One labeled swatch per token, canonical path, color-space annotation, and source revision.
- **States or comparisons:** Group by family and ordered scale; do not label primitive steps as semantic states.
- **Accessibility checks:** Inspect lightness progression and distinguishability; do not claim contrast without an approved foreground/background pair.
- **Required annotations:** Token name, variable/style mapping status, evidence ID `IOS-FND-COLOR`, and review status.
- **Evidence screenshots:** Full board plus legible family-level captures.
- **Approval criteria:** Count and names match source; colors are variable-bound; no invented or copied palette values.

## FSP-002 — Semantic colors

- **Purpose:** Explain usage intent and semantic relationships independently of a theme.
- **Canonical token source:** `packages/tokens/src/semantic/color.tokens.json` and `packages/tokens/src/contracts/theme-contract.json`.
- **Required content:** Text, background, border, action, focus, and status roles with alias targets.
- **States or comparisons:** Default and authored state roles; never manufacture hover/pressed roles absent from source.
- **Accessibility checks:** WCAG 2.2 1.4.1 Use of Color, 1.4.3 Contrast (Minimum), and 1.4.11 Non-text Contrast for declared pairs.
- **Required annotations:** Semantic intent, prohibited use, alias target, minimum contrast obligation where declared, and evidence ID.
- **Evidence screenshots:** Complete role matrix and legible captures of each declared contrast pair.
- **Approval criteria:** All 24 semantic aliases are present, correctly bound, and reviewed in both themes.

## FSP-003 — Light and dark comparison

- **Purpose:** Prove that one semantic contract resolves coherently in both supported modes.
- **Canonical token source:** `packages/tokens/src/themes/light.tokens.json`, `dark.tokens.json`, and `contracts/theme-contract.json`.
- **Required content:** Side-by-side semantic roles using identical labels and layout in Light and Dark.
- **States or comparisons:** Every required theme slot and declared contrast pair across both modes.
- **Accessibility checks:** Re-run contrast from canonical sources; manually inspect adjacent-state differentiation, focus visibility, glare, and non-color cues.
- **Required annotations:** Mode, semantic path, primitive alias, automated ratio evidence link, limitations, and evidence ID `IOS-FND-THEME`.
- **Evidence screenshots:** Matched Light/Dark captures at the same zoom and Figma revision.
- **Approval criteria:** Mode completeness, correct aliases, no unresolved drift, and independent accessibility review.

## FSP-004 — Typography scale

IOS-004.1 specializes this requirement through the [Typography Foundation specification](../foundations/typography/typography-foundation-specification.md), [human Figma page blueprint](../foundations/typography/figma-page-blueprint.md), and [machine-readable blueprint](../foundations/typography/typography-figma-blueprint.json). The architecture is approved under ADR-0007, but no Figma mutation, font selection, or token change is implied.

- **Purpose:** Demonstrate hierarchy, rhythm, fallback behavior, and readable default candidates.
- **Canonical token source:** `packages/tokens/src/primitives/typography.tokens.json`.
- **Required content:** Font families, sizes, weights, line heights, letter spacing, specimen text, and mapping limitations.
- **States or comparisons:** Scale progression, long text, localized/expanded text, and fallback-font rendering.
- **Accessibility checks:** WCAG 1.4.4 Resize Text, 1.4.10 Reflow, and 1.4.12 Text Spacing; manual legibility review at 200% and 400% equivalent zoom.
- **Required annotations:** Canonical paths, exact primary-font availability/license status, full-fallback ownership in code, unit metadata, provisional Inter status, and evidence ID `IOS-FND-TYPOGRAPHY`.
- **Evidence screenshots:** Full scale, long-text stress case, and fallback comparison.
- **Approval criteria:** Source count matches, Figma uses the approved primary available font, code retains the complete fallback stack, text is not clipped, and no typography value is invented. Inter cannot be marked final before delivery and licensing approval.

## FSP-005 — Spacing scale

- **Purpose:** Show the compositional rhythm and optical exceptions represented by spacing primitives.
- **Canonical token source:** `packages/tokens/src/primitives/spacing.tokens.json`.
- **Required content:** Labeled spatial bars or gaps using variable bindings, ordered by canonical scale.
- **States or comparisons:** Adjacent-step comparison and compact/expanded usage examples without components.
- **Accessibility checks:** Review whether examples remain distinguishable under zoom and text spacing; spacing must not encode meaning alone.
- **Required annotations:** Canonical path, unit retained in metadata, intended/prohibited use, and evidence ID `IOS-FND-SPACING`.
- **Evidence screenshots:** Full scale and legible adjacent-step comparison.
- **Approval criteria:** Every source token appears once, aliases remain aliases, and measurements are variable-bound.

## FSP-006 — Sizing scale

- **Purpose:** Explain control, target, icon, and container size candidates without implementing components.
- **Canonical token source:** `packages/tokens/src/primitives/sizing.tokens.json`.
- **Required content:** Labeled dimension specimens and authored aliases to spacing.
- **States or comparisons:** Size progression and target-size reference comparisons.
- **Accessibility checks:** WCAG 2.5.8 Target Size (Minimum) implications; no claim that future controls conform until their spacing and exceptions are tested.
- **Required annotations:** Canonical path, alias target, unit metadata, intended object, and evidence ID `IOS-FND-SIZING`.
- **Evidence screenshots:** Full scale and target-size comparison.
- **Approval criteria:** Seven source tokens and three aliases reconcile with Figma; accessibility caveat remains visible.

## FSP-007 — Radius

- **Purpose:** Show the approved corner-radius scale independently of surface components.
- **Canonical token source:** `packages/tokens/src/primitives/radius.tokens.json`.
- **Required content:** Identically sized neutral shapes with one variable-bound radius each.
- **States or comparisons:** Ordered scale including the no-radius candidate where authored.
- **Accessibility checks:** Radius must not be the only indicator of role, state, or interactivity.
- **Required annotations:** Canonical path, unit metadata, intended/prohibited use, and evidence ID `IOS-FND-RADIUS`.
- **Evidence screenshots:** Full ordered comparison with legible labels.
- **Approval criteria:** Count, order, names, and bindings match source; no component styling is implied.

## FSP-008 — Borders

- **Purpose:** Explain border widths/styles and their relationship to semantic border colors.
- **Canonical token source:** `packages/tokens/src/primitives/border.tokens.json` and `packages/tokens/src/semantic/color.tokens.json`.
- **Required content:** Variable-bound border color, width, and radius examples plus Stroke Styles only for approved reusable composed treatments.
- **States or comparisons:** Width/style comparison in Light and Dark where color is involved.
- **Accessibility checks:** WCAG 1.4.11 Non-text Contrast for meaningful boundaries; borders cannot rely on shadow or color alone when state meaning is required.
- **Required annotations:** Canonical paths, variable bindings, any composed Stroke Style, alias/color/radius sources, and evidence ID `IOS-FND-BORDER`.
- **Evidence screenshots:** Full border matrix and matched Light/Dark captures.
- **Approval criteria:** Three width variables and two stroke-style metadata mappings are accounted for; color and radius use their owning variables, and no composed Stroke Style exists without a reusable approved treatment.

## FSP-009 — Shadows

- **Purpose:** Visualize shadow composites as supplemental depth cues.
- **Canonical token source:** `packages/tokens/src/primitives/shadow.tokens.json`.
- **Required content:** One neutral surface and reusable Figma Effect Style per shadow token, plus source metadata and any representation limitation.
- **States or comparisons:** Ordered comparison on representative Light and Dark canvases.
- **Accessibility checks:** Shadow is never the sole boundary or state cue; verify meaningful edges remain visible without effects.
- **Required annotations:** Canonical path, composite representation, fallback boundary requirement, and evidence ID `IOS-FND-SHADOW-ELEVATION`.
- **Evidence screenshots:** Effects-on and effects-suppressed comparisons in both modes.
- **Approval criteria:** Four Effect Styles are reconciled to the four canonical source composites, every non-lossless difference is recorded, and visible boundaries survive without shadow.

## FSP-010 — Elevation

- **Purpose:** Explain depth intent separately from the raw shadow effect scale.
- **Canonical token source:** `packages/tokens/src/primitives/shadow.tokens.json`; no dedicated elevation token source currently exists.
- **Required content:** Conceptual layer ordering tied to existing shadow candidates and boundary fallbacks.
- **States or comparisons:** Base, raised, and overlay concepts only where supported by source descriptions.
- **Accessibility checks:** Reading/focus order must not be inferred from visual depth; meaningful hierarchy must survive high-contrast/forced-colors review later.
- **Required annotations:** Explicit `specification-only` status, shared evidence ID, and prohibition on inventing elevation tokens.
- **Evidence screenshots:** Concept board plus boundary-without-shadow comparison.
- **Approval criteria:** Board introduces no canonical value or tier; any new elevation semantics require separate token approval.

## FSP-011 — Grid

- **Purpose:** Define how future layouts will demonstrate columns, gutters, margins, and containers.
- **Canonical token source:** No dedicated grid file; references may use `spacing.tokens.json`, `sizing.tokens.json`, `breakpoint.tokens.json`, and `semantic/responsive.tokens.json` only.
- **Required content:** A manually created Figma Layout Grid style plan, source/ownership annotations, and an explicit open-decision state for the missing canonical grid-token source.
- **States or comparisons:** Compact and expanded layout hypotheses labeled as unapproved when not directly sourced.
- **Accessibility checks:** WCAG 1.4.10 Reflow, zoom, localization expansion, reading order, and content-driven breakpoint review.
- **Required annotations:** Missing canonical token source, design-decision provenance for any manually approved Layout Grid style, decision owner, and related evidence IDs.
- **Evidence screenshots:** Layout Grid style settings and specimen board after manual implementation, with the open canonical-token decision visible.
- **Approval criteria:** Layout Grid styles are manually reviewed and never presented as canonical tokens; no grid value is invented by automation, and the missing canonical grid-token source remains tracked.

## FSP-012 — Breakpoints

- **Purpose:** Present content-driven validation references without device labels.
- **Canonical token source:** `packages/tokens/src/primitives/breakpoint.tokens.json` and `packages/tokens/src/semantic/responsive.tokens.json`.
- **Required content:** Ordered reference points, compact/expanded semantic aliases, and container-query guidance.
- **States or comparisons:** Immediately below, at, and above each reference in future validation frames; no phone/tablet/desktop naming.
- **Accessibility checks:** WCAG 1.4.10 Reflow, 200%/400% zoom implications, text expansion, and orientation independence.
- **Required annotations:** Canonical paths, aliases, content-driven rationale, and evidence ID `IOS-FND-BREAKPOINT`.
- **Evidence screenshots:** Reference overview and annotated boundary test plan.
- **Approval criteria:** Six primitive and two responsive breakpoint aliases reconcile; intermediate widths are not omitted from review.

## FSP-013 — Z-index

- **Purpose:** Document named layer order and stacking-context intent without implying Figma canvas order is production behavior.
- **Canonical token source:** `packages/tokens/src/primitives/z-index.tokens.json`.
- **Required content:** Ordered conceptual layers, stacking-context caveats, and technical-metadata status; no Figma variable is created.
- **States or comparisons:** Layer order and nested-context failure examples as diagrams, not UI components.
- **Accessibility checks:** Focus order, reading order, and assistive-technology order must remain logical independently of visual stacking.
- **Required annotations:** Canonical paths, code-only limitations, and evidence ID `IOS-FND-Z-INDEX`.
- **Evidence screenshots:** Full layer diagram and caveat callout.
- **Approval criteria:** All seven source tokens are accounted for as technical metadata, zero fake visual variables exist, and the future Z-index section ID is captured without conflating it with the implemented Color section.

## FSP-014 — Motion

- **Purpose:** Explain duration, easing, semantic transition intent, and reduced-motion behavior.
- **Canonical token source:** `packages/tokens/src/primitives/motion.tokens.json`.
- **Required content:** Duration-variable timeline, easing curves sourced from canonical technical metadata, semantic aliases, and reduced-motion comparison.
- **States or comparisons:** Essential versus non-essential motion; default versus reduced behavior.
- **Accessibility checks:** WCAG 2.2.2 Pause, Stop, Hide where applicable and 2.3.3 Animation from Interactions; review vestibular triggers manually.
- **Required annotations:** Canonical paths, alias targets, composite mapping status, reduced-motion rule, and evidence ID `IOS-FND-MOTION`.
- **Evidence screenshots:** Static timeline/curve board plus evidence link to future prototype capture; screenshots alone cannot prove motion behavior.
- **Approval criteria:** Seven duration variables and four cubic-bezier metadata entries reconcile to all eleven tokens; three duration aliases remain variable aliases, the semantic easing alias remains metadata, and reduced motion preserves meaning and task completion.

## FSP-015 — Opacity

- **Purpose:** Show the opacity scale and restrictions on using transparency for state or hierarchy.
- **Canonical token source:** `packages/tokens/src/primitives/opacity.tokens.json`.
- **Required content:** Identical foreground/background specimens bound to each source token.
- **States or comparisons:** Compare composited results on representative Light and Dark backgrounds.
- **Accessibility checks:** Recalculate contrast after alpha compositing; opacity cannot be the only disabled, selected, or status cue.
- **Required annotations:** Canonical path, background dependency, contrast caveat, and evidence ID `IOS-FND-OPACITY`.
- **Evidence screenshots:** Full scale on both modes with compositing context visible.
- **Approval criteria:** Six source tokens reconcile and every meaningful example retains perceivable non-opacity cues.

## FSP-016 — Accessibility

- **Purpose:** Consolidate test obligations and limitations across foundations without claiming conformance prematurely.
- **Canonical token source:** `packages/tokens/src/contracts/theme-contract.json` plus all foundation sources referenced above.
- **Required content:** Contrast obligations, non-color cues, target sizing, zoom/reflow, text spacing, reduced motion, transparency, forced-colors, and review status.
- **States or comparisons:** Light/Dark, default/reduced motion, effects on/off, zoom/text expansion, and pending forced-colors evidence.
- **Accessibility checks:** WCAG 2.2 AA criteria cited by each foundation; automated contrast plus manual visual, keyboard/order, preference, and assistive-technology review when an implemented interface exists.
- **Required annotations:** What was automated, what requires manual review, evidence paths, reviewer, date, exceptions, and no-conformance disclaimer.
- **Evidence screenshots:** Summary board plus links to foundation-specific captures and review records.
- **Approval criteria:** No unsupported accessibility claim; every open manual check has an owner and release disposition.

## Global specimen approval gate

No board is approved until its source revision, Figma revision, IDs, bindings, screenshots, accessibility review, drift result, reviewer, and date are captured in evidence. Placeholder architecture and attractive screenshots are not substitutes for these checks.
