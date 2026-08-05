# Canonical Figma File Registration

Status: IOS-002 Batch 1 repository preparation complete; Figma implementation and specialist review pending

| Field                    | Registered value                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| File name                | InterfaceOS — Design System                                                                                                                            |
| File URL                 | [Open canonical Figma file](https://www.figma.com/design/OJqxFKoGjRh4rrSZCKdkzi/InterfaceOS-%E2%80%94-Design-System?node-id=2-11&t=ooeNCCEtH5b0vcgR-1) |
| Date registered          | 2026-08-04                                                                                                                                             |
| Stage 2 decision date    | 2026-08-05                                                                                                                                             |
| Interim owner            | Jai Singh                                                                                                                                              |
| Current phase            | IOS-002 Batch 1 prepared                                                                                                                               |
| Implementation status    | Access, collection-shell, and primitive-color execution prepared; human Figma work pending                                                             |
| Publishing policy        | Unpublished during foundations; publish only after mapping, visual review, evidence capture, and approval                                              |
| Machine-readable record  | [`evidence/figma/interfaceos-design-system.architecture.json`](../../../evidence/figma/interfaceos-design-system.architecture.json)                    |
| Batch 1 execution record | [`evidence/figma/ios-002-batch-1.variable-execution.json`](../../../evidence/figma/ios-002-batch-1.variable-execution.json)                            |

The supplied URL is recorded verbatim. InterfaceOS does not derive or assert a file key, page ID, node ID, collection ID, variable ID, library key, access model, or revision from URL text. Those values remain `pending-human-capture` until a human verifies them in Figma and records evidence.

## Implemented architecture

The file contains the ordered pages `00 Cover` through `14 Archive`. Placeholder sections exist on `03 Foundations`, `04 Variables`, `07 Components`, `08 Patterns`, `09 Templates`, and `10 Playground`. No component, variable, or visual foundation implementation is claimed.

The architecture manifest records page order, section/category status, related foundation evidence IDs, planned documentation, and canonical token-source mappings. Its shape accepts verified external IDs later without structural migration.

## Audit conflicts and resolutions

| Severity                   | Finding                                                                                                                                                                   | Resolution for Stage 2                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Resolved contract mismatch | Stage 1 proposed four variable collections; the implemented Figma architecture exposes five variable sections. Motion semantic aliases had no exact proposed destination. | ADR-0004 approves five collections: Primitive, Semantic, Theme, Responsive, and Motion. Token names and values do not change.                                                   |
| Open gap                   | `03 Foundations` has no Z-index placeholder, while IOS-001 requires a Z-index specimen.                                                                                   | Keep the Z-index specimen requirement; create its Figma section only during approved human execution and then capture its node ID.                                              |
| Open gap                   | Grid has a Figma placeholder but no canonical grid token source.                                                                                                          | Treat Grid as a specification/specimen derived from spacing, sizing, and breakpoints. Do not invent grid values or variables.                                                   |
| Open gap                   | Elevation and Shadows are separate Figma sections but share `shadow.tokens.json` and one evidence ID.                                                                     | Use two visual explanations backed by the same canonical source; do not create a new elevation token tier without approval.                                                     |
| Representation constraint  | Figma variables cannot losslessly represent every DTCG composite or CSS unit.                                                                                             | ADR-0004 approves Effect Styles for shadows, Layout Grid styles for grid, the primary available font for Figma typography, and technical metadata for cubic-bezier and z-index. |
| Governance blocker         | Access verification, specialist reviews, and all external IDs are unknown.                                                                                                | Keep release gates blocked until human capture plus engineering and accessibility review. The library remains unpublished during foundations.                                   |

The architecture-only placeholders for Components, Patterns, and Templates are recorded for file completeness. They are outside IOS-001 implementation and do not authorize UI work.

## Ownership and authority

Git remains authoritative for token names, types, values, aliases, schemas, transforms, and versions. Figma becomes authoritative for editable visual representations after manual implementation and review. The owner listed here is interim; author and final approver must remain separate under the [governance model](../../governance/governance-model.md).

## Current blockers

- Capture the file, page, section, collection, variable/style, and revision identifiers from Figma.
- Verify file access separately from library publication state.
- Assign independent engineering and accessibility specialist reviewers.
- Finalize font delivery/licensing and the primary available Figma font; Inter remains provisional.
- Decide whether InterfaceOS will create canonical grid tokens in a later milestone.
