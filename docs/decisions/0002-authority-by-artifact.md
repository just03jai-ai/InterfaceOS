# ADR-0002: Authority by artifact concern

## Status

Proposed

## Context

Calling Figma, Git, and Storybook universal sources of truth would create contradictory ownership and unsafe synchronization.

## Options

- Choose one universal system, losing native editability or implementation evidence.
- Allow last-write-wins synchronization, risking silent loss.
- Assign authority by concern and resolve drift explicitly.

## Decision

Adopt the authority matrix in the [source-of-truth model](../architecture/source-of-truth.md). Connect representations through stable IDs, revisions, checksums, manifests, and auditable synchronization runs.

## Consequences

Conflict resolution is explicit and safe, but adapters and governance must understand field ownership. Automated bidirectional writes remain deferred.
