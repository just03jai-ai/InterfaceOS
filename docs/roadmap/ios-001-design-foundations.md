# IOS-001 — Design Foundations and Token Architecture

Status: Proposed — implementation not authorized
Owner: Unassigned
Target date: Unscheduled

## Outcome

Create an approved, accessible, mode-aware foundation and token architecture that is editable in Figma, canonical and buildable from Git, documented for humans, represented for AI consumers, and supported by review evidence.

## Entry gates

- Foundation audit and ADR-0001/0002 approved.
- Design, engineering, accessibility, documentation, and release owners assigned.
- Canonical Figma Design System file provisioned with durable URL and permissions.
- Token format/build decision and browser/platform support targets approved.
- CI passes on the approved foundation baseline.

## Work breakdown

| ID          | Work item                                        | Depends on     | Deliverable                                                 | Approval gate          |
| ----------- | ------------------------------------------------ | -------------- | ----------------------------------------------------------- | ---------------------- |
| IOS-001-001 | Validate design principles against product needs | Entry gates    | Reviewed principles and gaps                                | Product + design       |
| IOS-001-002 | Define token taxonomy and naming convention      | 001            | Primitive, semantic, component, mode, and alias rules       | Design + engineering   |
| IOS-001-003 | Approve token JSON format and schema             | 002            | Versioned schema and examples                               | Architecture           |
| IOS-001-004 | Define Figma variable collections and modes      | 002            | Collection/mode/naming specification                        | Design                 |
| IOS-001-005 | Define token build and validation strategy       | 003            | Inputs, transforms, outputs, errors, determinism            | Engineering            |
| IOS-001-006 | Define color architecture                        | 001, 002       | Primitive palette roles, semantic roles, state strategy     | Design + accessibility |
| IOS-001-007 | Validate light-theme color mappings              | 006            | Contrast matrix and visual evidence                         | Accessibility          |
| IOS-001-008 | Validate dark-theme color mappings               | 006            | Contrast matrix and visual evidence                         | Accessibility          |
| IOS-001-009 | Define typography architecture                   | 001, 002       | Families, roles, scale, weight, line-height, fallback rules | Design + accessibility |
| IOS-001-010 | Define spacing scale                             | 001, 002       | Scale, semantic usage, exceptions                           | Design + engineering   |
| IOS-001-011 | Define sizing scale                              | 010            | Control, icon, container, and target-size rules             | Design + accessibility |
| IOS-001-012 | Define radius scale                              | 002            | Primitive and semantic radius rules                         | Design                 |
| IOS-001-013 | Define border system                             | 002, 006       | Width, style, semantic color mappings                       | Design + accessibility |
| IOS-001-014 | Define elevation and shadow system               | 006            | Levels, overlays, dark-mode behavior, non-color cues        | Design + accessibility |
| IOS-001-015 | Define grid and layout foundations               | 010, 011       | Columns, gutters, margins, containers, density rules        | Design + engineering   |
| IOS-001-016 | Define breakpoints                               | 015            | Content-driven ranges and validation cases                  | Design + engineering   |
| IOS-001-017 | Define motion foundations                        | 001, 002       | Duration, easing, choreography, reduced-motion rules        | Design + accessibility |
| IOS-001-018 | Define z-index architecture                      | 015            | Named layers and stacking-context rules                     | Engineering            |
| IOS-001-019 | Implement approved tokens in Figma               | 004, 006–018   | Editable variables, modes, descriptions, evidence           | Design review          |
| IOS-001-020 | Author canonical token JSON                      | 003, 006–018   | Schema-valid primitive and semantic token sources           | Design + engineering   |
| IOS-001-021 | Define component-token strategy                  | 002, 020       | Creation criteria, inheritance, override, lifecycle rules   | Architecture           |
| IOS-001-022 | Implement token build pipeline                   | 005, 020       | Reproducible CSS and typed outputs                          | Engineering review     |
| IOS-001-023 | Add token validation and contract tests          | 020, 022       | Alias, cycle, type, mode, output, and regression tests      | Engineering review     |
| IOS-001-024 | Reconcile Figma and Git mappings                 | 019, 020       | Stable-ID mapping and zero unresolved drift                 | Design + engineering   |
| IOS-001-025 | Write foundation and token documentation         | 006–024        | Human-readable specifications and usage guidance            | Documentation review   |
| IOS-001-026 | Create AI metadata                               | 024, 025       | Schema-valid, provenance-bearing metadata                   | Domain + AI review     |
| IOS-001-027 | Complete accessibility review                    | 007–017, 23–25 | Test evidence, findings, resolved issues/exceptions         | Accessibility approval |
| IOS-001-028 | Assemble release evidence                        | 19–27          | Evidence manifests, review records, source revisions        | Governance review      |
| IOS-001-029 | Release foundations and tokens                   | 028            | Version, changelog, release manifest, migration notes       | Release approval       |

Ranges such as `006–018` mean all listed items in that inclusive range.

## Documentation requirements

Document rationale, values and aliases, modes, intended and prohibited usage, accessibility constraints, platform outputs, Figma mappings, examples, dependencies, version history, owner, and migration guidance. Token specifications use the canonical [template](../design-system/templates/token-specification.md).

## Evidence requirements

Each foundation and token set has stable IDs, Figma file/node/revision, Git revision, schema and build results, visual evidence where relevant, accessibility results, reviewer identities/dates, documentation paths, dependency mappings, drift status, and release manifest linkage.

## Accessibility checks

- Text and non-text contrast across supported modes and interaction states.
- Focus visibility and forced-colors resilience.
- Minimum target-size implications.
- Zoom, text spacing, reflow, and localization stress cases.
- Reduced-motion and transparency preferences.
- Information remains perceivable without color, shadow, or motion alone.

## Acceptance criteria

- All items 001–029 meet their gate with linked evidence.
- Figma and Git mappings have no unresolved drift.
- Token sources validate, build deterministically, and have no alias cycles or unresolved references.
- Light and dark modes meet approved accessibility criteria or have approved time-bound exceptions.
- Documentation and AI metadata are complete and schema-valid.
- CI passes from a clean checkout and the release is reproducible from its Git tag.

## Explicit exclusions

No UI components, patterns, templates, pages, product UI, production Supabase schema, search, knowledge graph, or autonomous Figma write-back are part of IOS-001.
