# Evidence Model and Identifier Convention

Status: Proposed
Schema: [`schemas/evidence-manifest.schema.json`](../../schemas/evidence-manifest.schema.json)

## Stable identifiers

Identifiers are uppercase ASCII, immutable, globally unique, and never reused. Names may change without changing identity. Slugs use letters, numbers, and hyphens.

| Kind       | Pattern                            | Example                    |
| ---------- | ---------------------------------- | -------------------------- |
| Foundation | `IOS-FND-{NAME}`                   | `IOS-FND-COLOR`            |
| Token      | `IOS-TKN-{CATEGORY}-{NAME}`        | `IOS-TKN-COLOR-BRAND`      |
| Icon       | `IOS-ICO-{NAME}`                   | `IOS-ICO-SEARCH`           |
| Component  | `IOS-CMP-{NAME}`                   | `IOS-CMP-BUTTON`           |
| Pattern    | `IOS-PAT-{DOMAIN}-{NAME}`          | `IOS-PAT-AUTH-LOGIN`       |
| Template   | `IOS-TPL-{DOMAIN}-{NAME}`          | `IOS-TPL-SAAS-DASHBOARD`   |
| Page       | `IOS-PGE-{DOMAIN}-{NAME}`          | `IOS-PGE-BILLING-OVERVIEW` |
| Flow       | `IOS-FLW-{DOMAIN}-{NAME}`          | `IOS-FLW-AUTH-RECOVERY`    |
| Decision   | `IOS-DEC-{NNNN}`                   | `IOS-DEC-0001`             |
| Release    | `IOS-REL-V{MAJOR}-{MINOR}-{PATCH}` | `IOS-REL-V1-0-0`           |

Sequence numbers are zero-padded. A retired ID remains reserved. Environment, theme, variant, or status is metadata and must not be encoded into the stable identity unless it denotes a genuinely separate artifact.

## Evidence manifest

Every governed item has one JSON manifest validated against the canonical schema. All fields are present; non-applicable mappings use `null` or an empty array so absence is explicit.

Required fields are: ID, name, type, lifecycle status, semantic version, owner, Figma URL, Figma node ID, documentation path, code path, Storybook path, AI metadata path, accessibility status, review status, last reviewed date, dependencies, related items, and evidence links.

## Storage

```text
evidence/
  foundations/ governed foundation and token-system manifests
  figma/       design exports and references
  components/  component evidence manifests
  reviews/     review and accessibility evidence
  decisions/   decision evidence
  screenshots/ approved visual evidence
  releases/    immutable release manifests
```

Machine-readable manifests use `{stable-id}.json`. Large binaries are referenced from an approved durable store rather than committed by default. Screenshots supplement but never replace editable Figma evidence or behavioral tests.

## Integrity and review

- Paths are repository-relative and URLs are durable, access-controlled references.
- Dependencies express required artifacts; relationships express other typed connections.
- Every approval includes actor, date, source revisions, and evidence links.
- Changed source revisions make prior synchronization evidence stale until revalidated.
- Manifests are versioned in Git and pass schema and relationship validation before merge.
- Releases snapshot manifest revisions; released history is never silently rewritten.
