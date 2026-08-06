# IOS-004 — Typography Foundation

Status: Active; IOS-004.1 architecture approved under ADR-0007

Owner: Jai Singh (interim Design System Owner)  
Entry gate: IOS-003.1 Color Foundation V1 approved; canonical typography source and Figma foundation architecture available  
Exit gate: Approved typography baseline, canonical mapping, accessibility evidence, engineering review, Figma evidence, and independent release disposition

## Objective

Define and validate the InterfaceOS Typography Foundation across Figma, canonical tokens, documentation, generated code outputs, and AI-readable evidence. This milestone does not create UI components.

## Authoritative inputs

- `packages/tokens/src/primitives/typography.tokens.json`
- `docs/design-system/foundations/typography/typography-foundation.contract.json`
- `docs/design-system/foundations/typography/typography-figma-blueprint.json`
- `docs/design-system/figma/foundation-specimens.md`
- `docs/design-system/tokens/figma-mapping.md`
- ADR-0003, ADR-0004, ADR-0005, and ADR-0006
- Evidence ID `IOS-FND-TYPOGRAPHY`

## Staged roadmap

| Stage     | Scope                                                                                                        | Deliverables                                                                                                                                                      | Dependencies                                                        | Human decisions                                                                 | Evidence and acceptance                                                                                               | Stop condition                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| IOS-004.1 | Research, audit, architecture, accessibility obligations, machine contracts, validation, and Figma blueprint | Source audit; research synthesis; foundation, scale, font, accessibility, representation, validation, and blueprint documents; four JSON contracts and schemas    | Existing 21-token source; Figma architecture; evidence schema 2.0.0 | Approved 2026-08-06 under ADR-0007                                              | Schemas and tests pass; checksum and inventory match source; no values, font files, or Figma objects change           | Complete; IOS-004.2 remains a separate human font decision                                      |
| IOS-004.2 | Human font decision                                                                                          | Approved primary and monospace decisions; exact versions; fallback, delivery, license, language, axis, numeric, ligature, Figma source, and file-budget decisions | IOS-004.1 approved; legal/licensing input; target locales           | Select or reject each candidate and approve delivery constraints                | Decision record, source/version proof, license review, Figma availability capture, reviewers and dates                | Stop if licensing, required script coverage, or exact font source is unresolved                 |
| IOS-004.3 | Visual type-scale evaluation in Figma                                                                        | Editable specimens for approved fonts; proposed scale, weights, line heights, tracking, paragraph behavior, roles, and contexts                                   | IOS-004.2 approved; fonts available in Figma                        | Approve visual values and semantic mappings; decide fixed versus fluid behavior | Board/node captures, screenshots, visual review, stress examples; library remains unpublished                         | Stop before canonical promotion; no Figma-only value is silently canonical                      |
| IOS-004.4 | Figma typography implementation                                                                              | Approved typography variables, semantic Text Styles, and editable specimen boards; IDs captured                                                                   | IOS-004.3 visual approval; authenticated/manual Figma execution     | Approve mapping exceptions and representation limits                            | Collection/mode/style/variable/node IDs, screenshots, Figma revision; library unpublished                             | Stop before canonical promotion; no Figma-only value is silently canonical                      |
| IOS-004.5 | Canonical token promotion                                                                                    | Approved primitive additions or changes, semantic typography tokens, responsive mappings, contract updates, and generated CSS/JSON/TypeScript/Tailwind outputs    | IOS-004.4 approved Figma evidence                                   | Approve migration and compatibility impact                                      | Source diffs, provenance, deterministic generation, naming/reference/schema tests                                     | Stop if approved Figma values cannot be proven or compatibility is unclear                      |
| IOS-004.6 | Typography reconciliation and closure                                                                        | Figma-to-code reconciliation plus engineering, accessibility, localization, and independent release reviews                                                       | IOS-004.5 merged; testable Figma/code specimens                     | Resolve drift, exceptions, and release disposition                              | IDs, checksums, zero unresolved drift, resize/reflow/text-spacing/fallback/locale evidence, named reviewers and dates | Complete only after all required approvals; publication requires a separate authorized decision |

## IOS-004.1 completion record

- Architecture decision: approved by Jai Singh on 2026-08-06 under ADR-0007.
- Canonical source inventory: 21 draft primitives; 2 families, 8 sizes, 4 weights, 4 line heights, and 3 letter-spacing values.
- Canonical source checksum is recorded in the machine contract; values remain untouched.
- Thirteen semantic roles and four responsive contexts are proposed without value mappings.
- Five font candidates are documented; no candidate is selected or licensed.
- The Figma plan reuses the approved collection architecture, proposes semantic Text Styles, contains 18 review boards, and authorizes no mutation.
- Automated checks cover schemas, inventory, checksum, role and board completeness, and prohibited approval claims.
- Manual accessibility, font rendering, localization, Figma evidence, and specialist reviews remain pending by design.
- Approval evidence: `IOS-DEC-TYPOGRAPHY-ARCHITECTURE`; this closes architecture review only.

## Cross-stage constraints

- Do not invent or silently change typography values.
- Do not collapse the canonical fallback stack into a single Figma font.
- Do not claim Inter is final before delivery and licensing approval.
- Do not create Button, Input, Card, or any other UI component.
- Do not publish the Figma library.
- Generated distributions must derive from canonical sources.
- Treat file sharing permissions separately from library publication state.

## Final acceptance criteria

- Canonical token count and values are derived, documented, and schema-valid.
- Figma text specimens and styles map to approved roles with captured node/style IDs.
- No text clipping occurs at supported zoom, width, content-expansion, and fallback scenarios.
- Accessibility evidence covers readability, hierarchy, resizing, reflow, spacing overrides, and non-color meaning.
- Code retains complete fallback stacks and Figma representation limitations are explicit.
- Drift checks pass and all required reviews are truthfully recorded.
- No UI component or library publication is introduced.

## Out of scope

UI components, component typography APIs, marketing typography, illustration lettering, application pages, Storybook stories, library publishing, and unrelated token changes.
