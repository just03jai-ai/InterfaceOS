# IOS-003.2 Figma Color Token Reconciliation

Status: Blocked pending authenticated Figma execution

File: `InterfaceOS — Design System` (`OJqxFKoGjRh4rrSZCKdkzi`)

Library state: Private and unpublished

Machine plan: `evidence/figma/ios-003-2-color-token-reconciliation.json`

## Verified baseline and target

| Collection | Verified IOS-003.1 | IOS-003.2 target | Delta |
| ---------- | -----------------: | ---------------: | ----: |
| Primitive  |                 32 |              100 |    68 |
| Theme      |                 24 |               35 |    11 |
| Semantic   |                 24 |               35 |    11 |
| Responsive |                  0 |                0 |     0 |
| Motion     |                  0 |                0 |     0 |
| Total      |                 80 |              170 |    90 |

The authenticated integration could not perform live discovery or mutation because its usage limit was reached. Existing IDs remain preserved from IOS-003.1 evidence; all 90 new IDs remain explicitly pending.

## Execution order

1. Re-run read-only discovery and verify the five collection IDs, Theme mode IDs, 80 existing variable IDs, private status, and exact names.
2. Compare every existing variable with canonical Git values and aliases. Stop on any difference; do not overwrite unexplained drift.
3. Create the 68 missing Primitive variables from the machine plan. Use aliases for Data 01–07 and 11; use direct approved values only for Data 08–10.
4. Create 11 Theme variables with Light and Dark aliases exactly as recorded.
5. Create 11 Semantic variables aliasing the new Theme variables.
6. Set COLOR type, governed scopes, web code syntax, descriptions, and `hiddenFromPublishing=true` on every new variable.
7. Preserve every verified IOS-003.1 collection, mode, and variable ID.
8. Capture every returned new variable ID, the final collection counts, screenshots, current Figma revision, and synchronization checksum.
9. Re-run `pnpm figma:ios-003-2:check`, repository validation, and the full Git-to-Figma drift comparison.
10. Keep the library private; do not publish or mark specialist accessibility/release approval complete.

## Completion criteria

- Exactly 170 color variables exist: 100 Primitive, 35 Theme, and 35 Semantic.
- No duplicate names or IDs exist.
- All 90 new entries match the machine plan and canonical Git graph.
- Existing 80 IDs and values remain verified or any drift is explicitly reviewed.
- Light and Dark aliases resolve to the approved values.
- The library remains private and unpublished.
- Evidence contains real IDs, screenshots, revisions, checksums, and reviewer disposition.
