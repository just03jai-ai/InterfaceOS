# Figma Variable Execution Checklist

Status: IOS-002 active; Batch 1 repository preparation complete and human execution pending

Canonical file: [InterfaceOS — Design System](file-registration.md)

Git token sources are authoritative. Figma collections and variables are manual representations until an authenticated, governed, and auditable integration is approved. No repository record may claim an external mutation without captured Figma evidence.

## IOS-002 execution sequence

The IOS-001 Stage 2 checklist used `FIG-VAR-001–020` as representation-planning identifiers. IOS-002 re-baselines identifiers into small execution batches. This changes task tracking only; it does not change any approved collection, canonical token name or value, representation rule, ownership rule, or publishing gate.

## Batch 1

| Task          | Scope                                | Canonical input                                    | Expected Figma result                                                                                          | Repository status | External status         |
| ------------- | ------------------------------------ | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------- | ----------------------- |
| `FIG-VAR-001` | Verify file access and library state | Registered file and governance policy              | Verified access, ownership, location, permission, private status, branching, inventory, and duplicate risk     | Prepared          | Pending human capture   |
| `FIG-VAR-002` | Prepare collection shells            | ADR-0004 five-collection decision                  | `Primitive`, `Semantic`, `Theme`, `Responsive`, and `Motion`; only Theme has authored `Light` and `Dark` modes | Prepared          | Pending human execution |
| `FIG-VAR-003` | Execute primitive colors             | `packages/tokens/src/primitives/color.tokens.json` | 32 `COLOR` variables in `Primitive`; no aliases or authored product modes                                      | Prepared          | Pending human execution |

Batch 1 authorities:

- [Human execution guide](ios-002-batch-1-execution-guide.md)
- [Generated primitive-color table](ios-002-batch-1-primitive-colors.md)
- [`evidence/figma/ios-002-batch-1.variable-execution.json`](../../../evidence/figma/ios-002-batch-1.variable-execution.json)
- [`schemas/figma-variable-execution-batch.schema.json`](../../../schemas/figma-variable-execution-batch.schema.json)

## Batch 1 invariants

- Create exactly five collection shells with exact case-sensitive names.
- Create exactly 32 primitive color variables in `Primitive`.
- Keep `Semantic`, `Theme`, `Responsive`, and `Motion` empty of variables.
- Preserve the approved Theme shell modes `Light` and `Dark`; no other collection has authored product modes.
- Convert canonical dots to Figma `/` group separators without renaming a segment.
- Use explicit color scopes and approved Web code syntax.
- Preserve source names, descriptions, sRGB values, alpha, and direct-value/no-alias behavior.
- Keep the library private and unpublished.
- Capture real IDs and screenshots only after verifying them in Figma.
- Keep engineering, accessibility, and release reviews pending.

## Deferred execution

All non-color primitive tokens, semantic colors, theme mappings, responsive tokens, motion tokens, styles, specimens, and cross-cutting release checks are deferred to later approved batches. No later task ID is assigned here because its scope and acceptance evidence have not been reviewed.

## Completion rule

Repository preparation is not Figma completion. Batch 1 is ready for review only after the human steps, ID and screenshot capture, deterministic checks, and drift assessment in the execution guide are complete against the same Git and Figma revisions.
