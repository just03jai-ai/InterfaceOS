# Color Foundation Review Checklist

Status: Template — review evidence, not visual preference alone

## Scope and authority

- [ ] The reviewed artifact and exact Git/Figma revisions are identified.
- [ ] Existing canonical token names and values were not silently changed.
- [ ] Proposals, implementation candidates, and approved decisions are visibly distinct.
- [ ] The owner, reviewers, lifecycle stage, and exclusions are recorded.
- [ ] No third-party palette value or proprietary asset was copied.

## Primitive review

- [ ] Every proposed family has a demonstrated semantic, chart, identity, or brand need.
- [ ] Stop names follow the approved convention.
- [ ] Progression is perceptually reviewed for luminance, chroma, hue drift, and gamut.
- [ ] Adjacent stops are distinguishable in their intended contexts.
- [ ] Surface, border, solid, foreground, and interaction responsibilities are covered.
- [ ] Duplicate values are absent or have explicit reviewed exceptions.
- [ ] Missing stops are intentional; no value was invented to complete a scale.

## Semantic review

- [ ] Roles are named by meaning and property, not current hue.
- [ ] Primary, Secondary, Accent, statuses, surfaces, borders, text, interaction, focus, selection, overlay, disabled, inverse, and muted responsibilities are addressed.
- [ ] Error versus destructive danger has an explicit disposition.
- [ ] Info does not collide with primary interaction.
- [ ] Focus, hover, active, and selection remain distinct.
- [ ] Every role has intended/prohibited uses and compatible pairings.
- [ ] Component-specific tokens are absent unless an approved exception exists.

## Theme review

- [ ] Light and Dark implement the same semantic contract completely.
- [ ] Dark is intentionally mapped rather than mechanically inverted.
- [ ] Surface layering remains visible without relying on shadows.
- [ ] Future brand and high-contrast mappings can override theme slots without changing semantics.
- [ ] Unsupported theme fallback behavior is documented.

## Accessibility review

- [ ] Declared text pairs meet WCAG 2.2 contrast obligations.
- [ ] Meaningful boundaries and graphical objects meet applicable non-text contrast.
- [ ] Alpha values are tested after compositing on every allowed background.
- [ ] Status and interaction meaning has text, icon, pattern, position, or shape redundancy.
- [ ] Color-vision and grayscale collision reviews are recorded.
- [ ] Focus remains visible and distinct from selection.
- [ ] Disabled content remains perceivable and understandable.
- [ ] Forced-colors behavior is specified; shadows/background images may disappear safely.
- [ ] Dashboard tables and chart palettes have dedicated evidence.
- [ ] Automated results are not presented as WCAG conformance.

## Enterprise review

- [ ] Dense, simultaneous states are tested.
- [ ] Security, operational, financial, and workflow statuses cannot be confused.
- [ ] Charts support direct labels, markers, patterns, or text alternatives where needed.
- [ ] Long-session comfort, glare, dark-mode halation, print/export, and localization implications are reviewed.
- [ ] Tenant/brand customization boundaries are explicit.

## Outcome

- [ ] Retain
- [ ] Revise
- [ ] Reject
- [ ] Decision required

Reviewer:  
Date:  
Evidence:  
Blocking findings:
