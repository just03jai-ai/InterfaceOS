# Design-to-Code Drift Management

Status: Approved contract; IOS-003.2 canonical promotion complete with Figma reconciliation blocked

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

ADR-0006 created one explicit temporary exception for the approved Figma-only Color Foundation V1 values. IOS-003.2 resolves the Git side of that exception by promoting the exact approved evidence into canonical tokens. Figma remains `changed — canonical promotion complete, variable reconciliation pending` because authenticated execution was blocked by the integration usage limit. Public library release remains blocked.

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

For IOS-003.2, run `pnpm figma:ios-003-2:check`. The deterministic plan preserves the 80 verified variable IDs and identifies 90 missing representations required to reach 100 Primitive, 35 Theme, and 35 Semantic color variables. It does not claim those pending variables exist.

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
