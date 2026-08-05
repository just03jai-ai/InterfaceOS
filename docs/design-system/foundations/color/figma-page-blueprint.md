# IOS-003.1 Figma Color Foundation Blueprint

## Implementation status

The approved structure and current canonical color representation were implemented through the authenticated Figma integration on 2026-08-05. Human review then approved the Color Foundation V1 visual baseline under [ADR-0006](../../../decisions/0006-color-foundation-v1-visual-baseline.md). The verified top-level section is `Color` (`26:14`) on `03 Foundations` (`2:4`); all 18 board IDs are captured in the [machine-readable blueprint](figma-color-foundation-blueprint.json), [mutation record](../../../../evidence/figma/ios-003-1-color-foundation.mutation.json), and [closure evidence](../../../../evidence/reviews/IOS-003-1-COLOR-FOUNDATION-APPROVAL.json).

Five private collections and 80 color variables now represent the existing canonical Git graph: 32 Primitive values, 24 Theme variables with Light/Dark primitive aliases, and 24 Semantic variables aliasing Theme. Responsive and Motion contain zero color variables. No styles, components, token changes, or publish action occurred. A named Figma revision remains unavailable because the integration host does not expose a verified revision identifier; library visibility in the Figma UI still requires human confirmation.

Status: Color Foundation V1 visual baseline approved; canonical token promotion and public release pending  
Target file: `InterfaceOS — Design System`  
Target page: `03 Foundations` (`2:4`, verified 2026-08-05)  
Target section: `Color` (`26:14`)  
Evidence ID: `IOS-FND-COLOR`  
Machine-readable plan: [`figma-color-foundation-blueprint.json`](figma-color-foundation-blueprint.json)
Implementation report: [`figma-implementation-report.md`](figma-implementation-report.md)

## Scope and authority

This blueprint governs documentation, editable exploration scaffolding, and provisional representation of existing canonical token values. It does not approve token values or create styles, UI components, or published library assets.

The canonical Git architecture remains authoritative for token definitions. Primitive names remain hue-based. Blue is the approved Primary source family; `Primary` remains semantic intent rather than a duplicated primitive family. Green, Amber, and Red are the approved sources for Success, Warning, and Danger/Error. Data 01–11 is an approved categorical visual system and requires governed token promotion before code consumption.

## Exact hierarchy

```text
03 Foundations [page, verified id 2:4]
└── Color [section 26:14]
    ├── Color / 01 Philosophy
    ├── Color / 02 Architecture
    ├── Color / 03 Primitive Families
    ├── Color / 04 Semantic Colors
    ├── Color / 05 Theme Mapping
    ├── Color / 06 Text Hierarchy
    ├── Color / 07 Surface System
    ├── Color / 08 Border System
    ├── Color / 09 Alpha System
    ├── Color / 10 Interactive States
    ├── Color / 11 Feedback States
    ├── Color / 12 Accessibility
    ├── Color / 13 Dashboard Colors
    ├── Color / 14 Chart Colors
    ├── Color / 15 Light Theme
    ├── Color / 16 Dark Theme
    ├── Color / 17 Decision Log
    └── Color / 18 Review & Approval
```

Only the page and section use organizational names. Every board is a top-level auto-layout frame inside the `Color` section. Nested frames use `{Board number}.{two-digit item number} / {Label}`, for example `03.01 / Neutral` and `04.12 / Interactive`.

## Canvas and auto-layout contract

### Section placement

- Place `Color` to the right of the rightmost existing top-level node on `03 Foundations`; the page is currently empty, so the initial verified position may be `x=0`, `y=0`.
- Arrange boards vertically in numeric order with 240 px canvas separation. The 240 px separation is documentation-canvas scaffolding, not a canonical token.
- Do not put exploration and approval evidence in the same nested frame.

### Board frame

- Width: 1440 px fixed.
- Height: hug contents; minimum visual target 900 px.
- Direction: vertical auto layout.
- Padding: 64 px on all sides using `spacing.primitive.16`.
- Major section gap: 48 px using `spacing.primitive.12`.
- Related-group gap: 24 px using `spacing.primitive.6`.
- Item gap: 16 px using `spacing.primitive.4`.
- Compact metadata gap: 8 px using `spacing.primitive.2`.
- Never encode these spacing decisions as new color tokens or Figma variables in this milestone.

### Internal layout

- Board header: full-width vertical auto layout.
- Documentation block: two-column auto layout at desktop board width; stack vertically below 960 px during future responsive documentation work.
- Content regions: vertical auto layout containing wrapped horizontal rows or comparison columns.
- Swatch rows: horizontal auto layout with wrap enabled; each swatch cell remains editable.
- Light/Dark comparisons: equal-width side-by-side frames with identical child order.
- Review lanes: five equal columns when space permits; otherwise one vertical sequence preserving review order.

## Grid recommendation

Use a manually created Figma Layout Grid on each board:

- 12 stretch columns.
- 80 px left/right margins.
- 24 px gutters.
- 8 px square baseline grid for documentation alignment.

These are documentation-board layout recommendations, not canonical grid tokens. They must remain manual until InterfaceOS approves a canonical grid-token source. Content may span 3, 4, 6, 8, or 12 columns; arbitrary spans require an annotation.

## Shared board header and documentation block

Every board begins with:

1. Eyebrow: `IOS-003.1 · COLOR FOUNDATION · {STATUS}`.
2. Board number and title.
3. One-sentence purpose.
4. Approval badge: `PROPOSAL`, `PENDING REVIEW`, `APPROVED`, `REJECTED`, or `ARCHIVED`.

Every board then includes one frame named `{Board number}.00 / Documentation` with these fields:

| Field                 | Required content                                                                               |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| Purpose               | The decision or capability the board supports.                                                 |
| Usage                 | How reviewers and future consumers use the board.                                              |
| Dependencies          | Git paths, collections, other boards, and unresolved decisions.                                |
| Related documentation | Repository-relative paths; no duplicated canonical text.                                       |
| Evidence              | Evidence ID, page/section/frame IDs, screenshot path, Git revision, Figma revision, checksum.  |
| Approval status       | Lifecycle state plus Design, Accessibility, Engineering, Governance, and Release dispositions. |

Unknown external identifiers stay visibly labeled `Pending capture`; never use identifier-shaped placeholders.

## Annotation style

Use a small metadata block rather than relying on color-coded labels:

- Label: uppercase text.
- Value: sentence case or machine identifier.
- Status is always written as text and may later receive a semantic fill.
- `Decision required` uses a visible outline plus text; it does not rely on a warning hue.
- `Evidence missing` includes the missing field name and responsible owner.
- `Representation limitation` includes impact, workaround, owner, expiry, and issue link.
- Arrows show alias direction from source to consumer; never imply bidirectional synchronization.

Every swatch or mapping candidate records:

- display name;
- canonical or proposed token path;
- future HEX, RGB, and OKLCH fields;
- contrast result and tested relationship;
- evidence ID;
- review status;
- Figma variable ID and collection ID when the swatch is canonical and bound; approved visual-extension swatches remain explicitly unbound pending token promotion;
- intended and prohibited usage;
- owner and last-reviewed date.

## Variable connections

The file contains the approved collection shells and current canonical color representation. The verified IDs and every variable-to-alias relationship are stored in [`ios-003-1-color-variables.capture.json`](../../../../evidence/figma/ios-003-1-color-variables.capture.json):

| Collection | Color-board responsibility            | Placeholder fields                                                      |
| ---------- | ------------------------------------- | ----------------------------------------------------------------------- |
| Primitive  | Existing raw color families and stops | 32 color variables; required storage mode only; canonical direct values |
| Semantic   | Stable product intent                 | 24 color variables; required storage mode only; aliases to Theme        |
| Theme      | Light/Dark mapping layer              | 24 color variables; exactly Light and Dark; aliases to Primitive        |
| Responsive | Documentation dependency only         | Collection exists; zero color variables                                 |
| Motion     | Documentation dependency only         | Collection exists; zero color variables                                 |

Future components consume Semantic variables only. A component may not bind directly to Primitive or Theme variables. Any exception requires an ADR, migration plan, and approval.

## Board specifications

### 01 Philosophy

Purpose: establish the non-visual rules reviewers use before evaluating color.

Required blocks:

- Design goals: meaning, hierarchy, operability, trust, and long-session comfort.
- Enterprise principles: neutral-led structure, restrained chroma, dense-state coexistence, and auditability.
- AI-ready principles: deterministic names, machine-readable intent, evidence links, lifecycle state, and prohibited-use metadata.
- Accessibility principles: relational contrast, non-color redundancy, forced-colors survival, and no token-level conformance claim.
- Originality principles: external systems inform coverage only; values, branding, assets, and fixed mappings remain original.

### 02 Architecture

Purpose: show the only approved dependency direction.

```text
Primitive → Theme → Semantic → Components → Patterns → Applications
              ├── Light
              ├── Dark
              ├── Future brand themes
              └── Future high contrast
```

Include ownership, alias, release, and evidence annotations at each transition. Responsive and Motion collections appear as adjacent cross-foundation dependencies, not color layers.

### 03 Primitive Families

Purpose: display canonical primitive anchors beside explicitly non-canonical palette candidates for human visual review.

Required lanes:

- Neutral — canonical family, 10 current stops including endpoint `0`.
- Green — canonical family, 5 current stops.
- Amber — canonical family, 5 current stops.
- Red — canonical family, 5 current stops.
- Blue — canonical family, 7 current stops.
- Primary — semantic mapping exploration only; no primitive values.
- Indigo — evaluation-only hue candidate.
- Purple — proposed hue candidate.
- Teal — proposed hue candidate.
- Data Colors — visualization exploration lane; not a primitive family.

Each canonical token cell remains bound to its verified Primitive variable and records canonical name, HEX, RGB, deterministic OKLCH, source path, evidence ID, and provisional review status. The authorized palette-completion pass fills missing stops and exploration lanes with visibly non-canonical, non-variable candidates derived by the [candidate-generation method](candidate-generation-method.md). These fills are review evidence and must not be mistaken for token approval.

Add an `Extended reference candidates` subframe containing Slate, Grey, Zinc, Stone, Orange, Yellow, Lime, Emerald, Cyan, Sky, Fuchsia, Pink, and Rose. These remain comparison-only and do not create token families.

### 04 Semantic Colors

Purpose: define stable product intent independently from hue.

Required groups:

Neutral, Primary, Secondary, Tertiary, Success, Warning, Danger, Text, Background, Surface, Border, Interactive, Focus, Selection, Overlay, Disabled, Inverse, Alpha, and Data.

Each current group shows the canonical Semantic path, Theme alias, Light and Dark Primitive mappings, purpose, declared contrast obligation, evidence, and provisional status. Missing groups remain labeled `Not yet canonical`; raw values are not pasted into alias variables.

### 05 Theme Mapping

Purpose: compare complete mappings while preserving semantic identity.

Create equal comparison columns for Light, Dark, Future Brand Themes, and Future High Contrast. Each row shows Semantic path → Theme path → Primitive alias, completeness status, contrast evidence, and open decision. Future columns remain visibly hypothetical.

### 06 Text Hierarchy

Purpose: validate readable emphasis across permitted surfaces.

Rows: Primary, Secondary, Tertiary, Inverse, Disabled, Placeholder, and Link. Each row shows permitted backgrounds, minimum contrast obligation, interaction behavior if applicable, prohibited use, and Light/Dark mapping placeholders.

### 07 Surface System

Purpose: define hierarchy without depending on shadow.

Rows: Surface Main, Surface Subtle, Surface Strong, Raised, Overlay, Sunken, Selected, Disabled, and Inverse. Compare adjacent surfaces with shadows enabled and suppressed. Record boundary fallback, elevation relationship, and nested-depth limit.

### 08 Border System

Purpose: distinguish structure, state, and focus boundaries.

Rows: Default, Subtle, Strong, Interactive, Focus, Disabled, and Inverse. Each row records supported surfaces, width/radius dependencies, non-text contrast obligation, and whether a composed Stroke Style is justified later.

### 09 Alpha System

Purpose: govern compositing rather than treating opacity as a color shortcut.

Rows: White Alpha, Black Alpha, Overlay, Glass, Scrim, and Transparent. Each row records source color role, future opacity, permitted backgrounds, resolved composite value, contrast result, fallback, forced-colors behavior, and representation limitation. No external percentage is prefilled.

### 10 Interactive States

Purpose: demonstrate state ordering without creating components.

Columns: Default, Hover, Pressed, Focused, Disabled, Selected, and Loading. Use abstract state tiles rather than Button/Input/Card examples. Test pointer, keyboard, touch, and programmatic state meaning; Focused and Selected must remain distinct.

### 11 Feedback States

Purpose: distinguish operational meaning with redundant cues.

Rows: Success, Warning, Danger, Information, and Neutral. Each includes background, foreground, border, icon/shape, label, optional action, severity definition, and prohibited ambiguity. Add an explicit Error-versus-Danger decision card.

### 12 Accessibility

Purpose: consolidate release obligations and evidence.

Required blocks: text contrast, non-text contrast, color-only meaning, CVD simulations, grayscale, forced colors, focus visibility, status ambiguity, dashboard density, charts, Do examples, Don’t examples, automated-test results, and manual specialist review. Simulations are diagnostic evidence, not proof of conformance.

### 13 Dashboard Colors

Purpose: stress-test simultaneous enterprise states.

Placeholder palettes: Charts, Status, Heatmaps, KPIs, Progress, and Tables. Include abstract table rows, thresholds, selection, focus, hover, inline validation, edited state, disabled content, stale data, and loading. No UI component or final palette is created.

### 14 Chart Colors

Purpose: keep data visualization separate from product status semantics.

Lanes: Categorical, Sequential, Diverging, and Heatmaps. Each lane records data meaning, series count, order, background, labels/markers/patterns, missing/null data, selection/focus, CVD collision results, grayscale result, Light/Dark behavior, and text/table alternative.

### 15 Light Theme

Purpose: test the complete semantic system in one application-scale composition.

Use abstract documentation regions—not reusable UI components—to show navigation, canvas, layered surfaces, text hierarchy, boundaries, interaction states, feedback, dashboard density, chart context, overlay, and focus. Every colored region points to a semantic placeholder.

### 16 Dark Theme

Purpose: independently validate the same semantic composition as Light.

Mirror Board 15 exactly in content, hierarchy, labels, and zoom. Do not numerically reverse the Light palette. Record surface separation, chroma inflation, halation, focus persistence, and long-session review findings.

### 17 Decision Log

Purpose: preserve the reasoning behind every accepted and rejected visual choice.

Each record contains Candidate, Decision question, Reason, Rejected alternatives, Trade-offs, Reviewer, Evidence, Approval date, Affected paths, Migration impact, Status, and Revisit trigger. Rejected alternatives remain documented without retaining proprietary reference values.

### 18 Review & Approval

Purpose: enforce independent review and release truthfulness.

Lanes: Design, Accessibility, Engineering, Documentation, Governance, and Release. Each lane includes reviewer, date, scope, findings, evidence, disposition, and status. At V1 closure Jai Singh approved the first five scoped lanes; the Accessibility lane preserves its named specialist audit as pending/non-blocking, and independent Release remains pending.

## Evidence placeholders

Capture these after creation:

- Color section node ID.
- All 18 board frame IDs.
- Screenshot of the complete section and one screenshot per board.
- File key, page ID, Figma revision, Git revision, and synchronization checksum.
- Collection and variable IDs only after those objects genuinely exist.
- Reviewer names, roles, dates, findings, and approval state.
- Representation limitations and unresolved decisions.

## Review checklist

- [ ] Exact 18-board order and names match this blueprint.
- [ ] All boards use auto layout and the shared documentation block.
- [ ] Placeholder swatches contain no invented color values.
- [ ] Semantic mapping placeholders contain no pasted primitive values.
- [ ] Primary, Success, Warning, Danger, and Data Colors are not presented as canonical primitive families.
- [ ] Light and Dark boards have identical information architecture.
- [ ] Accessibility includes contrast, CVD, grayscale, forced colors, focus, dashboards, and charts.
- [ ] Every status has a written label; color is never the only cue.
- [ ] All external IDs are verified or explicitly pending.
- [x] Engineering and V1 Accessibility dispositions are recorded; specialist Accessibility audit and independent Release remain pending.
- [ ] The library remains private and unpublished.
- [x] No UI components or component sets exist, and no canonical token value was changed by visual approval.

## Final implementation checklist

- [ ] Run read-only discovery immediately before creation and confirm `03 Foundations` is still compatible.
- [ ] Create one section named `Color`; capture its returned ID.
- [ ] Create the 18 top-level board frames in order; capture every returned ID.
- [ ] Populate one board per focused mutation step and validate before continuing.
- [ ] Apply canonical spacing values where available; keep grid/canvas scaffolding non-canonical and annotated.
- [x] Add editable swatches and visible metadata; canonical anchors stay variable-bound and generated fills stay explicitly non-canonical.
- [ ] Add collection/variable binding placeholders without creating variables or fake IDs.
- [ ] Validate hierarchy and node counts after each board.
- [ ] Capture screenshots and visually inspect clipping, overlap, alignment, and missing metadata.
- [ ] Record Figma IDs and evidence in Git only after verification.
- [ ] Run repository drift, schema, links, lint, typecheck, tests, and build checks.
- [ ] Stop for human review; do not publish the library.

## Completion gate

The blueprint is complete when the repository contract validates and the exact hierarchy, layout, annotations, documentation fields, variable placeholders, evidence fields, review requirements, and creation checklist are approved. Figma implementation is complete only after all returned node IDs and screenshots are verified; visual color design remains a later human activity.
