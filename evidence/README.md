# InterfaceOS evidence

This directory stores governed evidence manifests and lightweight review artifacts. Follow the [evidence model](../docs/evidence/evidence-model.md) and validate JSON against [`schemas/evidence-manifest.schema.json`](../schemas/evidence-manifest.schema.json).

Subdirectories are organized by evidence purpose, not source-of-truth ownership. Do not place secrets, personal data, inaccessible Figma exports, or unapproved third-party assets here.

`foundations/` contains the draft manifests for IOS-001 token and foundation domains. The canonical Figma URL is registered; null external identifiers and `pending-human-capture` fields remain intentional blockers, not evidence of synchronization.

`figma/` may contain schema-backed architecture and capture records in addition to evidence manifests. `interfaceos-design-system.architecture.json` records the manually created file structure without claiming that its external node or variable identifiers have been captured. `ios-002-batch-1.variable-execution.json` is the canonical Batch 1 execution and capture record; its pending values do not claim that collection or variable creation has occurred.

`reviews/IOS-003-1-COLOR-FOUNDATION-APPROVAL.json` records the scoped human approval of the Color Foundation V1 visual baseline, the authenticated Figma closure-board mutation, screenshot checksums, unchanged production boundary, and the remaining token-promotion, specialist-audit, named-version, and independent-release gates.
