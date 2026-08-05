# ADR-0004: Figma foundation representation and publishing

## Status

Accepted — 2026-08-05

## Context

InterfaceOS needs an editable Figma representation of canonical Git tokens without forcing DTCG values into lossy Figma variable types. Stage 1 proposed four collections, while the manually created Figma architecture and Stage 2 execution model require explicit homes for Primitive, Semantic, Theme, Responsive, and Motion decisions.

## Options

- Mirror every canonical token as a Figma variable, accepting lossy or fake representations for unsupported types.
- Keep only colors in Figma, leaving other foundations disconnected from visual documentation.
- Use five governed collections for lossless variable mappings, approved styles for reusable visual compositions, and technical metadata for non-bindable or non-lossless values.

## Decision

Use five Figma variable collections named `Primitive`, `Semantic`, `Theme`, `Responsive`, and `Motion`.

- `Theme` has `Light` and `Dark` modes.
- Primitive values have no authored modes; Figma's required default storage mode does not represent product theming.
- Semantic variables express stable product intent and alias theme values where appropriate.
- Motion semantic aliases remain in `Motion`. Duration values may use variables; cubic-bezier values remain canonical technical metadata because Figma cannot represent them losslessly.
- Canonical shadows remain in Git. Reusable visual compositions use Figma Effect Styles, with representation limitations recorded.
- Border color, width, and radius use variables. Stroke Styles are created only for approved reusable composed treatments.
- Code retains complete typography fallback stacks. Figma uses the approved primary available font; Inter remains provisional pending delivery and licensing approval.
- Z-index remains technical metadata and is not represented with fake visual variables.
- Breakpoints are reference variables and documentation, not directly bindable Figma layout properties.
- Grid uses manually created Figma Layout Grid styles. No canonical grid token value may be invented; the missing grid-token source remains an open decision.
- Elevation and Shadows remain separate documentation concepts and may reference the same canonical shadow source.
- The Figma library remains unpublished during foundations and may be published only after mapping, visual review, evidence capture, and approval. File sharing permissions are governed independently.

## Consequences

The mapping remains honest and reversible where Figma has equivalent concepts. Figma will not contain a one-to-one variable for every canonical token, so mapping evidence must distinguish variables, styles, and technical metadata. Manual Effect Styles and Layout Grid styles introduce reviewable representation work and drift risk. Inter cannot be treated as final until font governance is complete.

## Approval and pending reviews

Accepted by Jai Singh, interim Design System Owner and temporary design, documentation, governance, and release reviewer, on 2026-08-05. Engineering and accessibility specialist reviews remain pending. This acceptance authorizes planning and later human execution; it does not claim that variables, styles, specimens, or publishing exist.
