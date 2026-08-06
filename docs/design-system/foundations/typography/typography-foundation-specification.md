# InterfaceOS Typography Foundation Specification

Milestone: IOS-004.1

Status: Architecture approved under ADR-0007; implementation not started

Owner: Jai Singh

## Philosophy

InterfaceOS typography should make complex product state understandable before it expresses brand. It is calm, precise, scan-friendly, and capable of carrying prose, commands, identifiers, code, and dense numeric data without relying on color or weight alone.

## Objectives

- Establish one platform-neutral vocabulary for typography properties and semantic roles.
- Preserve readable hierarchy across browser zoom, viewport changes, localization, and fallback fonts.
- Support AI-native interfaces containing generated prose, citations, code, structured data, confidence labels, and streaming status.
- Separate product typography from limited expressive or marketing use.
- Map canonical primitives to Figma variables, composite Text Styles, generated code, and evidence without lossy claims.

## Design principles

1. **Meaning before appearance:** semantic roles describe intent; headings in markup follow document structure rather than visual size.
2. **Productive by default:** body, label, table, and code roles prioritize sustained work and scanning.
3. **Density with safeguards:** dense contexts may alter approved role mappings but cannot bypass minimum readability, zoom, or truncation rules.
4. **Fallbacks are part of the design:** every candidate is evaluated with platform fallbacks, missing weights, and metric changes.
5. **International text is normal text:** scripts, RTL, longer translations, combining marks, and locale-specific numerals are acceptance inputs.
6. **Composite styles are governed:** consumers select a semantic style instead of assembling arbitrary size, weight, and spacing.
7. **Accessibility claims require testing:** token validation can prove structure, not real-world readability or WCAG conformance.

## Architecture

```text
Font decision and delivery policy
              |
Primitive properties (family, weight, size, line height, tracking, paragraph spacing)
              |
Semantic type styles (display, heading, title, body, label, caption, code, numeric, data, control text)
              |
Context mappings (compact/mobile, medium/tablet, expanded/desktop, dense enterprise)
              |
Figma Text Styles + generated platform representations + evidence
```

### Primitive layer

| Category          | Rule                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Font family       | Store ordered fallback stacks in Git. A primary face is not approved until licensing and delivery close.                 |
| Font weight       | Use named intent backed by supported numeric weights; prohibit synthetic or silently substituted weights.                |
| Font size         | Maintain an ordered evaluation scale; role mappings determine which stops become active.                                 |
| Line height       | Prefer unitless ratios in canonical/code contracts; test actual glyph bounds and scripts.                                |
| Letter spacing    | Default to font metrics; exceptions require role, script, casing, and fallback evidence.                                 |
| Paragraph spacing | Add only after the composition model is approved; code layout spacing and Figma paragraph spacing must not be conflated. |

### Semantic layer

The proposed role inventory is Display, Heading, Title, Body, Label, Caption, Code, Numeric, Data Table, Button Text, Input Text, Helper Text, and Validation Text. These are specification names, not new canonical tokens. Each approved style must reference primitives for family, size, weight, line height, tracking, and optional paragraph spacing; document allowed contexts and prohibited substitutions.

### Responsive contexts

- **Compact/mobile:** preserve body readability, wrap labels, reduce only approved large-display roles, and avoid fixed-height text containers.
- **Medium/tablet:** maintain hierarchy while accommodating split views and touch-oriented density.
- **Expanded/desktop:** permit wider hierarchy but constrain prose measure and avoid scaling every role upward.
- **Dense enterprise:** use a separately approved mapping for tables, logs, and consoles; never shrink errors, instructions, or essential actions to achieve density.

Responsive names describe test contexts, not automatic Figma modes or device guarantees. Fluid sizing requires a separate decision defining minimum, maximum, interpolation, zoom behavior, and deterministic exports.

### Future support

- Variable-font axes remain optional metadata until a selected font, supported axis ranges, browser matrix, and Figma parity are approved.
- International-script mappings may substitute approved families and adjust metrics without changing semantic role names.
- Large-text and user preference modes may remap semantic roles in a future governed collection.
- High contrast changes text color and decoration, not the typography hierarchy by default.
- Native platforms may map semantic roles to platform text styles when behavior and scaling are equivalent and drift is recorded.

## Enterprise requirements

- Data tables require tabular figures where supported, stable decimal alignment, locale-aware separators, and readable headers.
- Code requires distinct ambiguous glyphs, horizontal-scroll containment, wrapping guidance, and an explicit ligature policy.
- AI content must distinguish user text, generated text, citations, code, metadata, and system status through structure and labels—not typeface novelty alone.
- Long-form prose targets a readable measure; 45–75 Latin characters is the design target, with an 80-character maximum reference and a shorter script-aware limit for CJK.
- Truncation is prohibited for instructions, errors, validation, and essential decisions. Where truncation is necessary, the complete value must be programmatically and visibly discoverable.

## Governance

The IOS-004.1 architecture is approved under ADR-0007. Canonical tokens remain unchanged. Font selection, scale approval, Figma creation, token promotion, and reconciliation are later stages with separate evidence and approval. The Figma library remains unpublished.
