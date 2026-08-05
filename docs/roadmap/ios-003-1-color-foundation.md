# IOS-003.1 — Color Foundation

Status: Approved — Color Foundation V1 visual baseline accepted; canonical token promotion and public release remain separate gates

Owner: Jai Singh (interim Design System Owner)  
Entry gate: Token architecture, Figma architecture, evidence model, and variable execution framework merged  
Exit gate: Human visual decision, closure evidence, V1 accessibility disposition, engineering disposition, and governed token-promotion boundary

## Objective

Establish and approve the architecture, research basis, accessibility model, Figma representation, validation strategy, documentation, and governance gates for the InterfaceOS Color Foundation V1 visual baseline. Canonical Git token values remain unchanged until a separate token-promotion milestone is approved.

## Deliverables

| Deliverable                                      | Authority                                                                                                           | Status                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Research synthesis                               | [`research-summary.md`](../design-system/foundations/color/research-summary.md)                                     | Complete                        |
| Framepad requirement-coverage assessment         | [`framepad-reference-assessment.md`](../design-system/foundations/color/framepad-reference-assessment.md)           | Complete; no values adopted     |
| Color specification and architecture diagrams    | [`color-foundation-specification.md`](../design-system/foundations/color/color-foundation-specification.md)         | Approved V1 architecture        |
| Machine-readable contract                        | [`color-foundation.contract.json`](../design-system/foundations/color/color-foundation.contract.json)               | Schema-valid                    |
| Figma page blueprint                             | [`figma-page-blueprint.md`](../design-system/foundations/color/figma-page-blueprint.md)                             | Structurally implemented        |
| Machine-readable Figma board plan                | [`figma-color-foundation-blueprint.json`](../design-system/foundations/color/figma-color-foundation-blueprint.json) | Schema-valid; IDs captured      |
| Figma mutation and verification record           | [`ios-003-1-color-foundation.mutation.json`](../../evidence/figma/ios-003-1-color-foundation.mutation.json)         | Values and boards synchronized  |
| Figma variable capture                           | [`ios-003-1-color-variables.capture.json`](../../evidence/figma/ios-003-1-color-variables.capture.json)             | 5 collections; 80 IDs captured  |
| Figma screenshot evidence                        | [`primitive-families.png`](../../evidence/screenshots/ios-003-1/primitive-families.png)                             | Nine current views captured     |
| Figma implementation report                      | [`figma-implementation-report.md`](../design-system/foundations/color/figma-implementation-report.md)               | Complete; V1 approved           |
| Validation strategy and implementation           | [`color-validation-strategy.md`](../design-system/foundations/color/color-validation-strategy.md)                   | Structural baseline implemented |
| Documentation/review/approval/evidence templates | [`templates/`](../design-system/foundations/color/templates/)                                                       | Complete                        |
| Human visual palette exploration                 | Canonical Figma file                                                                                                | Approved V1                     |
| Human review closure                             | [`IOS-003-1-COLOR-FOUNDATION-APPROVAL.json`](../../evidence/reviews/IOS-003-1-COLOR-FOUNDATION-APPROVAL.json)       | Approved                        |
| Token promotion proposal                         | [`token-promotion-proposal.md`](../design-system/foundations/color/token-promotion-proposal.md)                     | Proposed; not executed          |
| Public release approval                          | Evidence and release manifest                                                                                       | Pending; library unpublished    |

## Acceptance criteria

- Research uses official sources and derives architecture without copying proprietary values.
- Every visible Framepad color pattern and base-family label is dispositioned as adapted, deferred, evaluation-only, or rejected without importing values.
- Existing token names and values remain unchanged. Figma-only approved values are an official visual baseline but are not canonical runtime tokens before promotion.
- Primitive family/stop recommendations contain no visual values and preserve current token compatibility.
- Semantic categories and mapping rules cover the requested enterprise responsibilities without prematurely creating tokens.
- Light, Dark, future brand, and future high-contrast models are defined.
- WCAG contrast, focus, color-only meaning, forced colors, CVD, charts, status, and dense-dashboard obligations are explicit.
- The Figma blueprint names exact boards, comparisons, annotations, review lanes, and evidence requirements.
- Automated checks reject missing mappings, duplicates, missing Dark values, contrast failures, and naming violations.
- The authorized Figma mutation represents only existing canonical values through 32 Primitive variables, 24 Theme aliases, and 24 Semantic aliases; no token mutation, style, component, or library publishing occurs.
- Returned Figma IDs, live structural checks, screenshots, and known integration limitations are recorded without invented external values.
- Human V1 design, accessibility, engineering, documentation, and governance decisions are recorded with scope and reviewer. A named accessibility specialist audit and independent public-release approval remain open without blocking IOS-003.1 foundation acceptance.

## Approved V1 decisions

- Neutral is approved, including the `0 → 50` distinction.
- Blue is approved as the product Primary family.
- Green, Amber, and Red are approved for Success, Warning, and Danger/Error intent.
- Indigo, Purple, and Teal are approved as constrained extended families.
- Data 01–11, Light, Dark, semantic mapping, interaction, text, surface, border, feedback, dashboard, chart, and V1 accessibility models are approved.
- Engineering architecture, token layering, and alias hierarchy are approved for the milestone.
- The private library remains unpublished; a named Figma version is required before public release.

See [ADR-0006](../decisions/0006-color-foundation-v1-visual-baseline.md) and the [closure evidence](../../evidence/reviews/IOS-003-1-COLOR-FOUNDATION-APPROVAL.json).

## Exclusions

IOS-003.1 excludes canonical token additions/renames/value changes, UI components, data-visualization implementation, marketing color, Storybook, application UI, and library publishing. The approved Figma visual extension requires the separately governed token-promotion milestone before code consumption.
