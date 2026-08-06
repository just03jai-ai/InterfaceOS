# IOS-004 Type Scale Strategy

Status: Architecture proposal; values not approved

## Method

Use a restrained, role-led scale rather than approving a mathematical ramp wholesale. The current canonical stops `100`–`800` remain the evaluation set. IOS-004.3 must test their actual values with the selected primary font, fallbacks, scripts, zoom, and density before keeping, changing, adding, or removing any stop.

The recommended active bands are:

| Band       | Intended roles                        | Behavior                                                        |
| ---------- | ------------------------------------- | --------------------------------------------------------------- |
| Supporting | Caption, helper, validation, metadata | Use sparingly; never the sole carrier of essential instructions |
| Compact    | Label, control text, dense table      | Governed dense contexts only                                    |
| Reading    | Body, input, standard table           | Stable default across contexts                                  |
| Title      | Title and section heading             | Limited responsive remapping                                    |
| Display    | Page and expressive display           | May reduce in compact contexts; excluded from controls          |

This architecture recommends retaining eight evaluation stops because they already exist, while approving only stops that serve documented roles. It does not approve their current pixel values.

## Role hierarchy

- Display: rare orientation or narrative emphasis; never a substitute for semantic heading markup.
- Heading: page and section hierarchy with distinguishable adjacent levels.
- Title: localized object, panel, or region title below page hierarchy.
- Body: default prose and product explanation; comfortable variant for sustained reading.
- Label and caption: concise supporting hierarchy; sentence case by default.
- Code: block and inline variants with distinct treatment but inherited surrounding line behavior where necessary.
- Numeric and data-table: tabular figures when supported, stable baselines, locale-aware formatting, and no ambiguous reliance on alignment alone.

## Responsive behavior

Body and essential control text remain stable by default. Display and large heading roles may map down one approved stop in compact contexts. Dense layouts may use the compact role mapping only when 200% text resize, 400% reflow, localization, and complete-value access pass. Breakpoints follow content failure, not device labels.

## Measure and spacing

- Design target for Latin prose: 45–75 characters per line; do not exceed 80 without a user-controlled presentation mechanism.
- CJK and other scripts require script-specific review; WCAG’s AAA reference uses 40 CJK glyphs.
- Body line height should target the current body/relaxed primitives during evaluation; no ratio is approved until the selected font is tested.
- Paragraph spacing belongs to composition. If represented as a typography primitive, its code mapping must state whether it becomes margin, layout gap, or a Figma-only Text Style property.

## Stop conditions

Do not promote a scale when any required role lacks a mapping, adjacent hierarchy is indistinguishable, fallback text clips, supported scripts fail, zoom/reflow fails, or the selected font’s delivered files differ from the evaluated version.
