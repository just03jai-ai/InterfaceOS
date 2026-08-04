# Figma Variable Mapping

Status: Mapping contract defined; execution blocked pending canonical Figma file

## Collections

| Git source                         | Proposed Figma collection       | Modes                 | Rule                                           |
| ---------------------------------- | ------------------------------- | --------------------- | ---------------------------------------------- |
| `src/primitives/color.tokens.json` | `IOS / Color / Primitive`       | One default mode      | Preserve numeric scale names                   |
| Other primitive files              | `IOS / Foundations / Primitive` | One default mode      | Preserve domain groups and types               |
| `src/themes/*.tokens.json`         | `IOS / Color / Theme`           | Light, Dark           | Same variable names in every mode              |
| `src/semantic/*.tokens.json`       | `IOS / Semantic`                | Inherited theme modes | Preserve aliases; do not paste resolved values |

## Name conversion

Git dots become Figma group separators: `color.semantic.text.primary` → `color/semantic/text/primary`. The canonical Git name, evidence ID, token version, and source revision belong in variable descriptions or plugin data. Figma IDs are recorded only after variables exist.

## Synchronization evidence

For each mapped foundation, record Figma file URL, collection ID, variable ID, mode IDs, Git source path/revision, token name, resolved type, alias target, synchronization checksum, run ID, and review result. A mismatch creates drift; neither source is silently overwritten.

## Limitations and blocked work

- No Figma file, team/library key, node IDs, collection IDs, or access policy has been provided.
- Figma number variables do not preserve CSS units; mapping must retain the DTCG type/unit in metadata.
- Shadow and typography composites may require styles or structured metadata rather than one variable.
- Automated write-back remains prohibited by ADR-0002 until permissions, rollback, and audit are approved.

Stage 1 therefore defines the mapping contract but does not claim Figma synchronization.
