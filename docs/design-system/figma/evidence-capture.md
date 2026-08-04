# Figma Evidence Capture Contract

Status: Stage 2 contract approved; external capture values pending

## Purpose

Evidence connects an InterfaceOS stable ID to verified Figma, Git, documentation, accessibility, and review state. A URL or screenshot alone is not proof of synchronization.

## Capture sequence

1. Open the registered Figma file and verify its name and access context.
2. Copy links and IDs from Figma; do not transcribe them from memory or derive them from unrelated URLs.
3. Record the Figma file URL in `figmaUrl` and the verified page link, page node ID, section node ID, collection IDs, and variable IDs in `figmaEvidence`.
4. Save review screenshots under `evidence/screenshots/` only when repository storage is approved; otherwise use a durable approved URL in `evidenceLinks`.
5. Record the exact Git source revision, Figma revision/version, synchronization checksum, review date, reviewer, approval status, and drift result.
6. Validate schemas and relationships, then obtain a reviewer other than the author.

## Field contract

| Evidence                    | Field                           | Pending representation                                 | Capture rule                                                                           |
| --------------------------- | ------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Figma file URL              | `figmaUrl`                      | `null` only when no file is registered                 | Use the durable file URL supplied by the owner.                                        |
| Page link                   | `figmaEvidence.pageUrl`         | `{ "status": "pending-human-capture", "value": null }` | Capture a link that opens the intended page.                                           |
| Page node ID                | `figmaEvidence.pageNodeId`      | Same pending object                                    | Verify in Figma; do not infer from a file-level link.                                  |
| Section or specimen node ID | `figmaEvidence.sectionNodeId`   | Same pending object                                    | Capture the governed section or frame, not an arbitrary child.                         |
| Collection IDs              | `figmaEvidence.collectionIds`   | Pending status with an empty `values` array            | Record every collection used by the artifact.                                          |
| Variable IDs                | `figmaEvidence.variableIds`     | Pending status with an empty `values` array            | Record created variables after name, type, mode, alias, scope, and description checks. |
| Screenshot paths            | `figmaEvidence.screenshotPaths` | Pending status with an empty `values` array            | Use repository-relative paths; screenshots supplement editable evidence.               |
| Review                      | `figmaEvidence.review`          | Null date/reviewer and `pending` approval              | Record a human reviewer and ISO date only after review.                                |
| Drift                       | `figmaEvidence.drift`           | `not-assessed`                                         | Set only after the complete comparison chain is checked.                               |

`captured` requires a real non-empty value. `pending-human-capture` and `not-applicable` require `null` or an empty array. Strings such as `TBD`, `unknown`, `page-id-here`, or fabricated identifier-shaped values are prohibited.

## Screenshot requirements

- Include the Figma page and governed section name in the visible capture.
- Include all compared light/dark modes or states in one capture when legible; otherwise provide paired captures with matching framing.
- Keep sufficient zoom to inspect labels, aliases, and visual differences.
- Do not include credentials, private comments, personal data, or unrelated unpublished work.
- Record the screenshot path and Figma revision together so stale evidence is detectable.

## Review boundary

Repository validation proves schema shape and internal traceability. It does not prove that an external Figma ID exists, a screenshot matches the current file, or a visual result is accessible. Those claims require human verification and the review record defined here.

For Stage 2, Jai Singh is the interim Design System Owner and temporary design, documentation, governance, and release reviewer. Evidence remains `in-review`; engineering and accessibility specialist approvals are pending and cannot be inferred from Jai Singh's temporary review or automated contrast tests.
