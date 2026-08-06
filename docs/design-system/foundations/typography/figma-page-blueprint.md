# IOS-004 Typography Figma Page Blueprint

Status: Architecture approved; human execution not authorized

Target: `03 Foundations` → `Typography`

## Section structure

Create one top-level auto-layout section named `Typography`. Inside it, place 18 ordered top-level frames. This blueprint defines content architecture only; it does not authorize variables, Text Styles, font installation, or Figma mutation.

### Shared frame contract

- Width: use the existing Foundations documentation-board width; do not invent a grid token.
- Auto layout: vertical, top-left, content-height, governed spacing references where available.
- Internal regions: eyebrow, title, purpose, status, specimen/content area, annotations, evidence footer.
- Annotation style: neutral documentation treatment with explicit `Current`, `Candidate`, `Constraint`, `Decision`, `Accessibility`, and `Evidence` labels.
- Evidence fields: evidence ID, source path, Git revision, Figma revision, frame ID, variable/style IDs, screenshot path, reviewer, date, review status, drift status, and limitations.
- Initial review state: `approved-specification`; no Figma frame is implemented, approved, or published.

## Boards

### 01 Typography / Philosophy

Purpose: establish productive enterprise tone, AI-content requirements, density boundaries, localization, and brand-expression limits. Include principles, prohibited uses, and product-versus-expressive comparison. Related docs: typography specification and research summary.

### 02 Typography / Font family candidates

Purpose: compare Inter, system UI, IBM Plex Sans, Source Sans 3, and monospace strategy without selecting a winner. Include common multilingual, numeric, punctuation, ambiguous-glyph, and fallback specimens. Related docs: font decision framework.

### 03 Typography / Font delivery and licensing

Purpose: show candidate version, source, license evidence, redistribution/subsetting decision, delivery option, loading behavior, file budget, and owner. Unresolved fields remain visibly pending. Related docs: font decision framework.

### 04 Typography / Type scale anatomy

Purpose: explain existing primitive stops, size/line-height/tracking relationships, baseline, cap height, x-height, and role-led scale method. Do not relabel draft values as approved. Related docs: type-scale strategy.

### 05 Typography / Display styles

Purpose: compare rare display candidates across compact and expanded contexts, long headings, and fallback fonts. Show product boundary and semantic-heading caveat. Related docs: type-style catalog.

### 06 Typography / Heading styles

Purpose: demonstrate page and section hierarchy, adjacent-level differentiation, multiline behavior, and correct structural ordering. Related docs: typography specification and accessibility requirements.

### 07 Typography / Body styles

Purpose: compare default, comfortable, and compact reading hypotheses using short UI copy and sustained prose. Include measure, paragraph spacing, lists, links, and emphasis. Related docs: type-scale strategy.

### 08 Typography / Labels and captions

Purpose: test concise labels, metadata, helper text, and captions with sentence case, icons, long translations, and wrapping. Include all-caps restrictions. Related docs: accessibility requirements.

### 09 Typography / Numeric and data typography

Purpose: test metrics, tables, dates, time, percentages, currency, decimals, negative values, tabular/proportional figures, and locale changes. Related docs: typography specification.

### 10 Typography / Code typography

Purpose: compare inline and block code, ambiguous glyphs, indentation, long lines, wrapping/scroll behavior, syntax coloring dependency, and ligature policy. Related docs: font decision framework.

### 11 Typography / Responsive typography

Purpose: compare compact/mobile, medium/tablet, and expanded/desktop evaluation contexts at boundary and intermediate widths. Show fixed versus fluid hypotheses without approving either. Related docs: type-scale strategy.

### 12 Typography / Dense enterprise typography

Purpose: stress tables, filters, logs, dashboards, and monitoring views. Compare information density without creating UI components; use abstract specimen rows and text blocks. Related docs: typography specification.

### 13 Typography / Internationalization

Purpose: test expansion, RTL, CJK, combining marks, long unbroken identifiers, locale numerals, currency, date/time, and font fallback coverage. Related docs: accessibility requirements and font decision framework.

### 14 Typography / Accessibility

Purpose: document contrast dependencies, hierarchy, 200% resize, 400% reflow, WCAG text-spacing overrides, non-color meaning, truncation access, and manual-test status. Never label the system conformant before specialist review. Related docs: accessibility requirements.

### 15 Typography / Light and Dark examples

Purpose: show identical typography styles against approved theme color roles. Typography does not gain Light/Dark modes; only text-color bindings change. Include contrast evidence and glare review. Related docs: Figma representation policy.

### 16 Typography / Decision log

Purpose: record font, scale, density, responsive, paragraph-spacing, OpenType, axis, localization, and delivery decisions with owner, date, alternatives, rationale, and supersession links. Related docs: IOS-004 roadmap.

### 17 Typography / Review and approval

Purpose: show separate design, engineering, accessibility, licensing, governance, and independent-release dispositions. Temporary ownership cannot self-approve public release. Related docs: governance model and evidence manifest.

### 18 Typography / Handoff and evidence

Purpose: map every approved variable and Text Style to canonical sources, generated code, IDs, screenshots, checksums, revisions, Storybook future scope, and AI metadata future scope. Include drift result and unpublished-library proof. Related docs: Figma representation and validation strategy.

## Approval gate

The section is not ready for implementation until IOS-004.2 selects a licensed and deliverable font setup. No board is approved until it has an exact source revision, Figma revision, IDs, screenshots, accessibility disposition, reviewer, date, and drift result.
