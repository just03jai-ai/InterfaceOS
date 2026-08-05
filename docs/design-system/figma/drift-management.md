# Design-to-Code Drift Management

Status: Approved contract; IOS-003.3 variable graph synchronized and ready for approval

## Comparison chain

```text
canonical token JSON
  -> resolved theme JSON
  -> generated CSS
  -> generated TypeScript
  -> Figma variables and styles
  -> Figma visual specimens
```

The first four representations are deterministic Git projections. Figma variables, styles, and specimens are manually synchronized representations until an approved audited adapter exists.

ADR-0006 created one explicit temporary exception for the approved Figma-only Color Foundation V1 values. IOS-003.2 resolved the Git side by promoting the approved evidence into canonical tokens. IOS-003.3 reconciled and re-read the Figma variable graph: 100 Primitive, 35 Theme, and 35 Semantic color variables now match canonical identity, value, alias, mode, scope, and syntax contracts. Human review of the 170-variable panel and unpublished-library state is complete. Public library release remains blocked by specialist and independent-release gates.

## What counts as drift

Drift exists when two representations that should describe the same approved revision disagree in identity, name, type, value, alias, mode, scope, code syntax, description, source revision, checksum, or specimen rendering. Missing evidence, unverifiable external IDs, and comparison against different revisions are `blocked`, not synchronized.

## Severity

| Level    | Definition                                                                           | Examples                                                                                                  | Release effect                                                                                 |
| -------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Critical | Authority, identity, or accessibility contract is violated.                          | Canonical source overwritten from Figma; wrong stable ID; inaccessible semantic pair approved as passing. | Blocks release and publishing.                                                                 |
| High     | Consumer-visible token meaning or resolved output differs.                           | Value, alias, type, light/dark mode, name, or required variable missing.                                  | Blocks release and affected library publishing.                                                |
| Medium   | Representation metadata can cause incorrect use without changing the resolved value. | Wrong scope, code syntax, description, unit metadata, or stale specimen annotation.                       | Blocks approval of the affected foundation; release requires resolution or approved exception. |
| Low      | Evidence presentation is stale but the synchronized contract is verified elsewhere.  | Screenshot crop or navigation link is outdated.                                                           | Must be scheduled; blocks only when required evidence becomes unverifiable.                    |

## Ownership

- Engineering owns canonical JSON, resolver, generated JSON, CSS, and TypeScript comparison.
- Design owns Figma variables, styles, specimens, and visual-intent review.
- Accessibility owns contrast, non-color cues, text/resizing, motion, and preference review claims.
- Governance confirms revisions, reviewers, exceptions, and release eligibility.
- The named foundation owner coordinates resolution and may not self-approve release.

## Review procedure

1. Build from a clean checkout and record the Git revision.
2. Compare canonical names, types, values, and aliases with resolved JSON for both themes.
3. Confirm generated CSS and TypeScript contain the same resolved token set and values.
4. Compare Figma collection names, modes, variables, types, aliases, scopes, descriptions, and code syntax against canonical sources and the execution checklist.
5. Compare every foundation specimen against the same Figma revision and mapped variables/styles.
6. Classify differences, identify the authoritative source, assign an owner, and record `changed`, `drifted`, `blocked`, or `failed`.
7. Resolve in the authoritative source, regenerate projections, repeat the full chain, and capture new evidence.
8. Mark `synchronized` only when the reviewer signs the exact Git and Figma revisions and checksum.

For IOS-002 Batch 1, run `pnpm figma:batch-1:check` before the manual comparison. The check proves that the execution plan still contains exactly the canonical 32 primitive colors and approved collection-shell contract; it does not prove that Figma artifacts or captured IDs exist.

For IOS-003.3, run `pnpm figma:ios-003-2:check`. The deterministic reconciliation record proves the exact 90 created IDs complete the 80-variable baseline and reproduce the canonical 170-variable graph. The authenticated capture records API verification; dated human UI screenshots verify the collection totals and current unpublished-library state. Final milestone approval remains separate from technical reconciliation.

File-level publication state is a documented manual evidence boundary. The Plugin API exposes collection and variable `hiddenFromPublishing` flags but not file publication history. IOS-003.3 therefore records explicit unpublished-state evidence while retaining the prohibition on publication and the independent release gate. File sharing permissions are documented separately and neither satisfy nor block this publication control.

## Release-blocking conditions

- Any unresolved Critical or High drift.
- Any unresolved accessibility-impacting Medium drift.
- Missing or fabricated identifiers, revisions, checksums, or reviewer evidence.
- Figma variables or specimens compared against a different token revision.
- Generated files edited manually or non-deterministic build output.
- Unapproved token names, values, types, aliases, modes, or collection mapping.
- A Figma variable created for z-index or cubic-bezier metadata, a shadow not reconciled through its Effect Style, or a grid style presented as a canonical token.
- Public Figma library publishing before variable mapping, visual review, evidence capture, and approval are complete.
- A required exception without owner, approver, expiry, and remediation issue.

## Sign-off evidence

Sign-off requires the Git revision, Figma revision, synchronization checksum, validation/build output, collection and variable identifiers, specimen links/screenshots, drift report, accessibility results, review date, reviewer, and approval state in the relevant evidence manifest.
