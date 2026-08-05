# IOS-004 — Typography Foundation

Status: Ready for research and specification; implementation not started

Owner: Jai Singh (interim Design System Owner)  
Entry gate: IOS-003.1 Color Foundation V1 approved; canonical typography source and Figma foundation architecture available  
Exit gate: Approved typography visual baseline, canonical mapping, accessibility evidence, engineering review, Figma evidence, and independent release disposition

## Objective

Define and validate the InterfaceOS Typography Foundation across Figma, canonical tokens, documentation, generated code outputs, and AI-readable evidence. This milestone does not create UI components.

## Authoritative inputs

- `packages/tokens/src/primitives/typography.tokens.json`
- `docs/design-system/figma/foundation-specimens.md`
- `docs/design-system/tokens/figma-mapping.md`
- ADR-0003, ADR-0004, ADR-0005, and ADR-0006
- Evidence ID `IOS-FND-TYPOGRAPHY`

## Scope

- Typography philosophy, content roles, hierarchy, and enterprise-density requirements.
- Font-family and fallback ownership: full stacks remain canonical in code; Figma represents only an approved available primary font.
- Font-size, weight, line-height, and letter-spacing architecture.
- Readability, zoom, text reflow, localization expansion, truncation, data tables, code/identifier text, and numeric alignment obligations.
- Figma specimen boards, text-style strategy, variable representation limits, and evidence capture.
- Machine-readable contract, validation rules, drift policy, review templates, and promotion proposal if visual decisions differ from canonical tokens.

## Explicit open decisions

- Font delivery and licensing, including whether Inter becomes final or is replaced.
- Approved Figma primary font and verified available style names.
- Semantic text-style roles and naming.
- Responsive type behavior and whether any fluid scale is justified.
- Monospace selection and numeric-feature requirements.
- Minimum supported localization expansion and language/script coverage.

## Constraints

- Do not invent or silently change typography values.
- Do not collapse the canonical fallback stack into a single Figma font.
- Do not claim Inter is final before delivery and licensing approval.
- Do not create Button, Input, Card, or any other UI component.
- Do not publish the Figma library.
- Generated distributions must derive from canonical sources.

## Acceptance criteria

- Canonical token count and values are derived, documented, and schema-valid.
- Figma text specimens and styles map to approved roles with captured node/style IDs.
- No text clipping occurs at supported zoom, width, content-expansion, and fallback scenarios.
- Accessibility evidence covers readability, hierarchy, resizing, reflow, spacing overrides, and non-color meaning.
- Code retains complete fallback stacks and Figma representation limitations are explicit.
- Drift checks pass and all required reviews are truthfully recorded.
- No UI component or public-library publication is introduced.

## Initial work packages

| ID          | Work package                                     | Deliverable                                | Gate                 |
| ----------- | ------------------------------------------------ | ------------------------------------------ | -------------------- |
| IOS-004-001 | Audit typography sources and current Figma state | Source inventory and gap analysis          | Architecture review  |
| IOS-004-002 | Research enterprise typography systems           | Original principle synthesis               | Design review        |
| IOS-004-003 | Define typography contract and roles             | Specification and machine-readable schema  | Design + engineering |
| IOS-004-004 | Resolve font delivery and licensing              | Approved font decision                     | Governance + legal   |
| IOS-004-005 | Design Figma specimens                           | Editable typography boards                 | Design review        |
| IOS-004-006 | Define Text Style and variable mapping           | Mapping and representation record          | Engineering review   |
| IOS-004-007 | Validate accessibility and localization          | Test evidence and findings                 | Accessibility review |
| IOS-004-008 | Capture evidence and drift state                 | IDs, screenshots, checksums, review record | Approval             |

## Out of scope

UI components, component typography APIs, marketing typography, illustration lettering, application pages, Storybook stories, public library publishing, and unrelated token changes.
