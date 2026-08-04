# Release Strategy

## Version model

The platform uses semantic versions. Governed artifacts also carry independent semantic versions in evidence metadata. A repository release manifest binds included artifacts, schemas, evidence, and Git revision.

## Release classes

- Patch: compatible corrections.
- Minor: backward-compatible artifacts or capabilities.
- Major: breaking contracts, meaning, removals, or required migrations.
- Prerelease: explicit `-alpha`, `-beta`, or `-rc` versions that are not production approval.

## Release gate

A release requires passing CI, approved manifests, complete applicable evidence, accessibility disposition, dependency impact review, migration guidance for breaking changes, changelog, and release-manager approval.

## Deprecation

Deprecations identify replacement, rationale, first deprecated version, support window, removal version, migration steps, and consumers. Removal without a published migration is prohibited.

## Rollback

Releases must be reproducible from the tag. Runtime rollback restores the last approved release; data or schema rollback requires a tested migration plan. A corrective release does not rewrite an existing tag.

Package publication, registries, signing, cadence, and environments remain deferred until runtime and distribution decisions are approved.
