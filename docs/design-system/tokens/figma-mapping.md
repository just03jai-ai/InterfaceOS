# Figma Variable Mapping

Status: Approved mapping; IOS-003.1 Color Foundation V1 visual baseline approved and token promotion pending

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

- The file key, Foundations page, Color section, five collection IDs, six storage/mode IDs, and all 80 current color variable IDs are captured. Jai Singh confirmed ownership, project location, private unpublished library state, publishing permission, and branching availability. The library key remains uncaptured and a named Figma version is required before public release.
- ADR-0006 approves the Figma visual extension. Figma-only approved values remain controlled drift until the token-promotion proposal is reviewed and executed; they are not canonical code tokens by implication.
- Figma number variables do not preserve CSS units; mapping must retain the DTCG type/unit in metadata.
- Shadow composites use Effect Styles; typography fallback stacks remain canonical in code and Figma records only the approved primary available font.
- Stroke styles and cubic-bezier values have no approved bindable Figma-variable representation; do not create lossy aliases to make counts match.
- Unattended automated write-back remains prohibited by ADR-0002. The IOS-003.1 mutation was an explicitly authorized, authenticated, audited operation; future mutation still requires scoped authorization and verification.

## Publishing

Keep the Figma library private during foundations. Publishing is blocked until variable mapping, visual review, evidence capture, and approval are complete. Generated distributions remain ignored in Git and reproducible through CI artifacts.

The [execution checklist](../figma/variable-execution-checklist.md), [IOS-002 Batch 1 guide](../figma/ios-002-batch-1-execution-guide.md), and [IOS-003.1 implementation report](../foundations/color/figma-implementation-report.md) preserve planning and execution history. The current verified graph contains 32 Primitive colors, 24 Theme variables, and 24 Semantic variables; Responsive and Motion contain zero color variables.
