# IOS-002 Batch 1 Human Figma Execution Guide

Status: Repository preparation complete; human Figma execution and evidence capture pending

Owner: Jai Singh  
Scope: `FIG-VAR-001`, `FIG-VAR-002`, and `FIG-VAR-003` only  
Canonical file: [InterfaceOS — Design System](https://www.figma.com/design/OJqxFKoGjRh4rrSZCKdkzi/InterfaceOS-%E2%80%94-Design-System?node-id=2-11&t=ooeNCCEtH5b0vcgR-1)

The machine-readable execution record is [`evidence/figma/ios-002-batch-1.variable-execution.json`](../../../evidence/figma/ios-002-batch-1.variable-execution.json). All external values intentionally remain `pending-human-capture`. Do not infer IDs from the registered URL.

## Stop conditions

Stop without creating or renaming anything when:

- the opened file name or ownership context differs from the registered file;
- edit permission, variable creation permission, or unpublished-library state cannot be verified;
- an exact collection or variable name already exists;
- the source checksum, expected count, name, type, scope, or value differs from the generated plan;
- creating the shells would publish the library without completing the approved publication gates;
- any work outside primitive colors is required to proceed.

Record the mismatch as pending or blocked. Do not resolve it by deleting, renaming, overwriting, or publishing existing Figma artifacts.

## 1. Verify access and library state — FIG-VAR-001

1. Open the canonical URL and confirm the visible file name is `InterfaceOS — Design System`.
2. Confirm Jai Singh has edit access and can open the Variables and Styles management surfaces.
3. Capture the verified file owner and the exact team/project location.
4. Confirm the library is unpublished. Record file sharing permissions separately as access metadata.
5. Record whether Jai has publishing permission, but do not publish.
6. Record whether Figma branching is available for this file and plan.
7. Inventory all existing local collections, variables, Paint Styles, Text Styles, Effect Styles, and Grid Styles.
8. Search for exact matches to all five collection names and all 32 planned primitive-color names.
9. Capture screenshots that show the file identity, permission context where safe, current collections, current variables, styles, and any collision.
10. Replace only the corresponding pending fields in the Batch 1 execution record with verified captured values. Do not store credentials, personal data, or private unrelated work.

## 2. Create the five collection shells — FIG-VAR-002

Create collections in this exact order after the preflight passes:

| Display name | Purpose                                                     | Authored modes  | Batch 1 contents    | Publishing state |
| ------------ | ----------------------------------------------------------- | --------------- | ------------------- | ---------------- |
| `Primitive`  | Raw platform-neutral values without product intent          | None            | 32 primitive colors | Unpublished      |
| `Semantic`   | Stable product-intent aliases for a later batch             | None            | Empty               | Unpublished      |
| `Theme`      | Mode-specific slots for later semantic-to-primitive mapping | `Light`, `Dark` | Empty               | Unpublished      |
| `Responsive` | Reference-only responsive decisions for a later batch       | None            | Empty               | Unpublished      |
| `Motion`     | Motion primitives and semantic durations for a later batch  | None            | Empty               | Unpublished      |

For `Primitive`, `Semantic`, `Responsive`, and `Motion`, retain Figma's required default storage mode without treating it as a product mode. For `Theme`, rename the default mode to `Light` and add exactly one `Dark` mode. Do not create variables in the four deferred collections.

After each shell:

1. Confirm the case-sensitive name and modes.
2. Confirm no duplicate collection exists.
3. Capture the real collection and mode IDs from Figma.
4. Capture a screenshot showing the collection name and modes.
5. Confirm the library remains unpublished.

## 3. Create primitive color variables only — FIG-VAR-003

Use the generated [primitive color execution table](ios-002-batch-1-primitive-colors.md). It is derived from the canonical source and includes the exact source value, description, scopes, code syntax, and pending evidence fields for every variable.

For each row, in order:

1. Reconfirm the exact variable name does not already exist.
2. Create one `COLOR` variable in `Primitive` using the exact slash-delimited name.
3. Set scopes to `ALL_FILLS`, `STROKE_COLOR`, and `EFFECT_COLOR`; do not leave `ALL_SCOPES`.
4. Enter the exact canonical hex/alpha shown in the generated row and verify the displayed sRGB value.
5. Use the single required default storage mode only. Do not add authored modes or aliases.
6. Copy the canonical description and include the canonical path, evidence ID, source path, source SHA-256, and Git revision in the governed description/metadata.
7. Set Web code syntax to the exact `var(--ios-...)` expression shown in the table.
8. Capture the real collection ID and variable ID in the matching machine-readable entry.
9. Capture legible screenshots in family-sized groups showing names and values.

Do not create semantic, theme, responsive, motion, typography, spacing, sizing, radius, border, shadow, z-index, breakpoint, opacity, or component variables.

## 4. Capture evidence

Capture and record:

- file key, Variables page node ID, Figma revision, and the Git revision used;
- all five collection IDs and applicable mode IDs;
- all 32 primitive-color variable IDs;
- access/library inventory results and duplicate-name result;
- screenshots for access state, collection shells, and all primitive-color families;
- the source SHA-256 and a synchronization checksum for the completed comparison;
- reviewer, review date, and any limitation or blocked item.

Keep engineering and accessibility reviews pending. Jai may perform temporary design/documentation/governance review but cannot supply independent specialist or final release approval.

## 5. Run the drift check

1. Pull the exact reviewed Git revision and run `pnpm figma:batch-1:check`.
2. Confirm the command reports 32 primitive colors and no stale generated artifact.
3. Compare each Figma variable against the generated table for identity, name, type, source value, scope, code syntax, alias status, mode behavior, description, and IDs.
4. Confirm `Semantic`, `Theme`, `Responsive`, and `Motion` contain zero variables.
5. Confirm the library remains unpublished.
6. Classify every mismatch using the [drift-management contract](drift-management.md). Missing or unverifiable evidence is `blocked`, not synchronized.
7. Set drift to `synchronized` only after all 32 rows and the five shells match the same Git and Figma revisions.

## 6. Mark ready for review

Batch 1 is ready for human review only when:

- all FIG-VAR-001 checks have captured values or explicit blockers;
- exactly five approved collection shells exist with correct modes;
- exactly 32 primitive color variables exist and no other Batch 1 variables were added;
- all collection, mode, and variable IDs plus screenshots are captured;
- the deterministic repository checks pass;
- drift is synchronized or every exception is documented;
- the library remains unpublished;
- design review is requested while engineering, accessibility, and release remain pending.
