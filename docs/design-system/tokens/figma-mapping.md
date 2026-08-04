# Figma Variable Mapping

Status: Stage 2 mapping approved; variables pending human implementation

Canonical file: [InterfaceOS — Design System](https://www.figma.com/design/OJqxFKoGjRh4rrSZCKdkzi/InterfaceOS-%E2%80%94-Design-System?node-id=2-11&t=ooeNCCEtH5b0vcgR-1)

## Collections

| Git source                                    | Figma collection | Authored modes  | Rule                                                                 |
| --------------------------------------------- | ---------------- | --------------- | -------------------------------------------------------------------- |
| `src/primitives/*.tokens.json`, except motion | `Primitive`      | None            | Preserve domain and tier paths; document units and composite limits  |
| `src/semantic/color.tokens.json`              | `Semantic`       | None            | Alias `Theme`; never paste resolved colors                           |
| `src/themes/{light,dark}.tokens.json`         | `Theme`          | `Light`, `Dark` | Create one variable per shared slot and one value per mode           |
| `src/semantic/responsive.tokens.json`         | `Responsive`     | None            | Preserve aliases and content-driven naming                           |
| `src/primitives/motion.tokens.json`           | `Motion`         | None            | Keep primitive and semantic paths; document reduced-motion semantics |

The four-collection Stage 1 proposal separated color primitives from other primitives and omitted motion semantic aliases. No variables were created under that proposal. [ADR-0004](../../decisions/0004-figma-foundation-representation.md) replaces it with the approved five collections above so the repository mapping matches the manually created `04 Variables` sections and every canonical token has one planned representation. This is a pre-implementation contract correction, not a token rename or value migration. Figma may expose a required internal default storage mode for a collection with no authored modes; that storage detail does not create a product mode.

## Approved representation policy

- Shadows remain canonical Git composites and use Figma Effect Styles for reusable visual compositions. Record any non-lossless mapping.
- Border color, width, and radius use variables. Stroke Styles exist only for reusable composed treatments.
- Cubic-bezier values remain technical metadata; do not encode them as lossy strings or fake variables.
- Code retains complete typography fallbacks. Figma uses the approved primary available font; Inter remains provisional pending delivery and licensing.
- Z-index remains technical metadata and has no Figma variable.
- Breakpoints may be reference variables and documentation but are not directly bindable layout properties.
- Grid uses manually created Layout Grid styles without inventing canonical grid tokens. The missing grid-token source remains open.
- Elevation and Shadows remain separate documentation concepts while sharing canonical shadow sources where applicable.

## Name conversion

Git dots become Figma group separators: `color.semantic.text.primary` → `color/semantic/text/primary`. The canonical Git name, evidence ID, token version, and source revision belong in variable descriptions or plugin data. Figma IDs are recorded only after variables exist.

## Synchronization evidence

For each mapped foundation, record Figma file URL, page link, page and section node IDs, collection and variable IDs, screenshot path, Git and Figma revisions, Git source path, token name, resolved type, alias target, synchronization checksum, review result, and drift status. Use the [evidence capture contract](../figma/evidence-capture.md). A mismatch creates drift; neither source is silently overwritten.

## Limitations and blocked work

- The Figma file URL and private-during-foundations publishing policy are registered, but file key, team/library key, page and section IDs, collection and variable IDs, revision, and access verification await human capture.
- Figma number variables do not preserve CSS units; mapping must retain the DTCG type/unit in metadata.
- Shadow composites use Effect Styles; typography fallback stacks remain canonical in code and Figma records only the approved primary available font.
- Stroke styles and cubic-bezier values have no approved bindable Figma-variable representation; do not create lossy aliases to make counts match.
- Automated write-back remains prohibited by ADR-0002 until permissions, rollback, and audit are approved.

## Publishing

Keep the Figma library private during foundations. Publishing is blocked until variable mapping, visual review, evidence capture, and approval are complete. Generated distributions remain ignored in Git and reproducible through CI artifacts.

The [human execution checklist](../figma/variable-execution-checklist.md) is the authority for the next manual step. This document does not claim that variables or synchronization exist.
