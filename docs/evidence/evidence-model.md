# Evidence Model and Identifier Convention

Status: Evidence schema 2.0 accepted by [ADR-0005](../decisions/0005-evidence-manifest-v2.md); engineering review pending
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

Required fields are: ID, name, type, lifecycle status, semantic version, owner, Figma URL, Figma node ID, structured Figma evidence, documentation path, code path, Storybook path, AI metadata path, accessibility status, review status, last reviewed date, dependencies, related items, and evidence links.

Schema version 2.0 adds the required `figmaEvidence` contract for page links and node IDs, section IDs, collection IDs, variable IDs, screenshots, Git/Figma revisions, synchronization checksum, human review, and drift. This is a major schema migration because existing manifests must add the field. Unknown external values use `pending-human-capture` with `null` or an empty array; fake placeholder strings are invalid evidence.

### Version 1.0 to 2.0 migration

- Change `schemaVersion` to `2.0.0`.
- Add every required `figmaEvidence` field.
- Use `partial` when the file URL is known but external IDs or review evidence remain uncaptured.
- Preserve existing artifact IDs, artifact versions, lifecycle status, dependencies, and relationships.
- Do not manufacture external values to satisfy the schema.

All repository-owned foundation manifests migrate atomically with the schema. External consumers of version 1.0 must add explicit version dispatch before reading version 2.0; silent coercion is prohibited.

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

Machine-readable manifests use `{stable-id}.json`. Specialized schema-backed Figma architecture records may use a descriptive `.architecture.json` suffix under `evidence/figma/`. Large binaries are referenced from an approved durable store rather than committed by default. Screenshots supplement but never replace editable Figma evidence or behavioral tests.

## Integrity and review

- Paths are repository-relative and URLs are durable, access-controlled references.
- Dependencies express required artifacts; relationships express other typed connections.
- Every approval includes actor, date, source revisions, and evidence links.
- Changed source revisions make prior synchronization evidence stale until revalidated.
- Manifests are versioned in Git and pass schema and relationship validation before merge.
- Releases snapshot manifest revisions; released history is never silently rewritten.
