# Source-of-Truth and Synchronization Model

## Authority

| System    | Authoritative for                                                                                                                               | Must not own                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Figma     | Editable foundations, variables, components, variants, states, patterns, templates, visual specifications, and design evidence                  | Code behavior, release identity, technical schemas |
| Git       | Token sources, component code, schemas, documentation, AI metadata, architecture, governance, tests, release manifests, and evidence references | Operational sessions or unversioned workflow state |
| Storybook | Implemented previews, interactive states, properties, accessibility checks, responsive behavior, and code examples                              | Visual design intent or canonical specifications   |
| Supabase  | Operational workflow, assignments, approvals, audit events, identity projections, and telemetry after approval                                  | Canonical authored specifications or token sources |

## Shared identity

Each system refers to the same stable artifact ID. The evidence manifest binds that ID to Figma node, documentation, code, Storybook, AI metadata, status, version, owner, and evidence. Paths and URLs are references; they do not transfer authority.

## Synchronization protocol

1. Read a source with its revision and actor identity.
2. Normalize fields into a supported schema version.
3. Validate identity, schema, relationships, provenance, and access policy.
4. Compare content checksums and recorded revisions.
5. Produce one of: synchronized, changed, drifted, blocked, or failed.
6. Require an accountable owner to resolve drift in the authoritative source.
7. Regenerate projections and record the run after canonical resolution.

## Conflict rules

- No last-write-wins behavior across authoritative boundaries.
- Tooling never edits a generated projection as a repair.
- Visual mismatch returns to Figma; code behavior mismatch returns to Git/Storybook; workflow mismatch returns to Supabase.
- Cross-boundary decisions require linked review evidence from affected owners.
- Automated write-back is disabled until a separate decision defines permissions, rollback, and audit.

## Required evidence

Released components must ultimately bind an approved Figma node/revision, specification path/revision, code path/revision, Storybook story/build, accessibility result, AI metadata revision, reviewers, and release manifest. Artifact-specific applicability is governed by the [evidence model](../evidence/evidence-model.md).
