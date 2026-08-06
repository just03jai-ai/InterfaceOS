# IOS-004 Figma Typography Representation

Status: Specification only; no Figma mutation authorized

## Collection policy

Reuse the approved five-collection architecture. Typography primitives belong in `Primitive`; stable semantic typography aliases may belong in `Semantic` only after canonical promotion. `Theme` remains for theme-owned mappings and must not gain duplicate typography values merely to produce Light/Dark examples. `Responsive` may represent approved context aliases later. `Motion` has no typography responsibility.

No new collection or mode is approved in IOS-004.1.

## Representation map

| Canonical property | Figma representation                                                      | Limitation                                                                       |
| ------------------ | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Font family        | String variable scoped to `FONT_FAMILY`                                   | Figma uses one installed/shared/web family, not the complete code fallback stack |
| Font weight        | Number variable scoped to `FONT_WEIGHT`, plus verified style-name mapping | Unsupported numbers may resolve to the closest available weight                  |
| Font size          | Number variable scoped to `FONT_SIZE`                                     | Figma number variables do not preserve DTCG units                                |
| Line height        | Number variable scoped to `LINE_HEIGHT`                                   | Unit/ratio semantics must remain in metadata                                     |
| Letter spacing     | Number variable scoped to `LETTER_SPACING`                                | Figma interprets number variables as px rather than percentage                   |
| Paragraph spacing  | Number variable scoped to `PARAGRAPH_SPACING` after source approval       | Figma property and code composition spacing are not automatically equivalent     |
| Semantic role      | Composite Figma Text Style backed by approved variables                   | Style ID, bindings, and source revision require evidence                         |
| Variable-font axes | Text Style or text-node metadata where supported                          | Axis parity and handoff are font-specific; do not invent generic variables       |

## Naming

- Primitive variables: `typography/primitive/{property}/{stop-or-name}`
- Semantic variables, after promotion: `typography/semantic/{role}/{variant}/{property}`
- Text Styles: `Typography/{Role}/{Variant}`
- Context-specific styles: `Typography/{Role}/{Variant}/{Context}` only when a separate mapping is approved
- Code syntax: `var(--ios-typography-...)` for scalar/family variables and generated semantic APIs defined during promotion

Names use lowercase kebab-case in token paths, slash-separated Figma grouping, and title case only for Text Style display labels. HTML elements are not encoded in style names.

## Text Style policy

Text Styles package family, size, weight, line height, letter spacing, paragraph spacing, and supported OpenType/axis metadata. Text color remains a color token binding and is not embedded in the typography style unless an approved Figma limitation requires a documented exception.

## Publishing and evidence

All variables and Text Styles remain hidden from publishing while the library is unpublished. Publishing requires approved font licensing/delivery, complete canonical mapping, human visual review, accessibility and engineering review, captured IDs and screenshots, zero drift, named Figma revision, and independent release approval.

Capture file/page/section/frame IDs, collection/mode/variable/style IDs, exact Figma font family and style name, bound-variable IDs, full canonical references, code syntax, font source/version, screenshots, Git and Figma revisions, checksums, reviewer, date, limitations, and publication state. File-sharing permissions remain separate from library publication governance.
