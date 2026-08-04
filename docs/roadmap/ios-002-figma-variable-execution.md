# IOS-002 — Figma Variable Execution

Status: Active — Batch 1 repository preparation complete; human execution pending

Owner: Jai Singh (interim Design System Owner)  
Entry gate: IOS-001 Stage 2 architecture and governance merged  
Release boundary: Private Figma library; no component implementation

## Objective

Execute the approved Git-to-Figma variable architecture in small, evidence-backed batches without treating unverified external state as complete. Git remains authoritative for canonical token names and values; Figma remains the editable visual representation.

## Batch 1

| Task          | Outcome                                                | Repository status | External status         |
| ------------- | ------------------------------------------------------ | ----------------- | ----------------------- |
| `FIG-VAR-001` | Verify canonical file access and current library state | Prepared          | Pending human capture   |
| `FIG-VAR-002` | Create the five approved empty collection shells       | Prepared          | Pending human execution |
| `FIG-VAR-003` | Create the 32 canonical primitive color variables      | Prepared          | Pending human execution |

The [human execution guide](../design-system/figma/ios-002-batch-1-execution-guide.md), generated [primitive-color table](../design-system/figma/ios-002-batch-1-primitive-colors.md), and schema-backed [execution record](../../evidence/figma/ios-002-batch-1.variable-execution.json) define the batch.

## Batch 1 acceptance

- Access, ownership, location, permissions, private status, branching, and existing artifact inventory are captured from Figma.
- Five exact collection names exist with approved authored-mode behavior.
- The Primitive collection contains exactly the 32 planned primitive colors.
- The other four collections contain no variables.
- Names, values, descriptions, scopes, code syntax, alias status, modes, and counts match the canonical source.
- Real collection, mode, and variable IDs plus screenshots are captured.
- Drift is assessed against one Git revision and one Figma revision.
- The library remains private and unpublished.
- Engineering, accessibility, and independent release reviews remain pending until performed.

## Exclusions

Batch 1 excludes every non-color primitive, semantic, theme, responsive, motion, style, component, pattern, template, and product UI implementation. It does not authorize automated Figma mutation or library publishing.

## Sequencing note

The Stage 2 `FIG-VAR-001–020` list was a representation-planning checklist. IOS-002 execution re-baselines task identifiers by reviewable batch; the three Batch 1 task definitions above supersede the earlier planning labels without changing canonical token names, values, collection decisions, or representation policy.
