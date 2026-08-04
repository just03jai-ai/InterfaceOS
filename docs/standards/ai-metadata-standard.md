# AI Metadata Standard

Status: Proposed
Schema: [`schemas/ai-metadata.schema.json`](../../schemas/ai-metadata.schema.json)

## Purpose

AI metadata gives agents concise, structured, provenance-bearing context without granting authority to generated content.

## Required fields

- `schemaVersion`: contract version.
- `artifactId`: stable InterfaceOS identifier.
- `summary` and `intent`: factual description and intended job.
- `keywords`: controlled discovery terms.
- `capabilities`: supported uses.
- `constraints`: prohibited or unsupported uses.
- `relationships`: typed links to other artifacts.
- `provenance`: source path/revision, generator or author, timestamp, and review status.

## Rules

- Metadata is stored in Git and validated before merge.
- Generated metadata stays draft until reviewed by an accountable human owner.
- Summaries do not invent behavior missing from approved specifications or code.
- Provenance points to a reproducible source revision.
- Sensitive data, secrets, personal data, hidden prompts, and unrestricted source content are excluded.
- Retrieval projections may enrich indexing but cannot mutate canonical metadata.
- Schema changes follow semantic versioning and provide migration guidance.

## Evaluation

Before release, metadata must pass schema validation, source-grounding review, relationship integrity checks, unsafe-content checks, and representative retrieval tests. Evaluation thresholds will be approved before AI features ship.
