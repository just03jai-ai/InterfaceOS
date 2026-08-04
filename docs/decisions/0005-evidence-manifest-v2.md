# ADR-0005: Evidence manifest schema 2.0

## Status

Accepted — 2026-08-05

## Context

Evidence schema 1.0 could record a Figma file URL and one node ID but could not distinguish pending capture from verified page, section, collection, variable, screenshot, revision, review, checksum, or drift evidence. Stage 2 requires those fields before Figma execution can be governed without fabricated identifiers.

## Options

- Keep schema 1.0 and encode additional evidence in unvalidated links or prose.
- Add optional fields in a minor release, allowing incomplete manifests to appear current.
- Introduce a required `figmaEvidence` contract as schema 2.0 and migrate repository-owned manifests atomically.

## Decision

Adopt evidence manifest schema `2.0.0`. Every manifest includes structured Figma capture, review, revision, checksum, screenshot, and drift fields. Pending external data uses `pending-human-capture` with `null` or an empty array. Fake placeholder identifiers are rejected. Artifact IDs and artifact semantic versions do not change merely because the evidence envelope migrates.

## Consequences

Evidence state is explicit and machine-valid, and external capture can be added without another structural migration. Consumers of schema 1.0 require version dispatch or migration before reading 2.0. Schema validation cannot prove that captured external identifiers exist; independent human review remains required.

## Approval

Accepted by Jai Singh, interim Design System Owner and temporary governance reviewer, on 2026-08-05. Engineering review of validators and downstream-consumer compatibility remains pending.
