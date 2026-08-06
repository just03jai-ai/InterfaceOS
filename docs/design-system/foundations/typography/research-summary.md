# IOS-004.1 Enterprise Typography Research

Status: Architecture synthesis; no values or fonts approved

## Primary sources reviewed

- [Material Design 3 type scale tokens](https://m3.material.io/styles/typography/type-scale-tokens)
- [IBM Carbon typography](https://carbondesignsystem.com/elements/typography/type-sets/)
- [Atlassian typography](https://atlassian.design/foundations/typography/)
- [GitHub Primer typography](https://primer.style/product/getting-started/foundations/typography/)
- [Microsoft Fluent 2 typography](https://fluent2.microsoft.design/typography)
- [Ant Design font system](https://ant.design/docs/spec/font/)
- [Figma typography variables](https://developers.figma.com/docs/plugins/working-with-variables/)
- [Figma text styles](https://help.figma.com/hc/en-us/articles/360039957034-Create-and-apply-text-styles)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [CSS Fonts Module Level 4](https://www.w3.org/TR/css-fonts-4/)

## Findings

1. Mature systems separate raw type properties from purpose-based composite styles. Carbon distinguishes productive and expressive use; Atlassian connects Figma Text Styles to code tokens; Primer uses opinionated shorthand styles; Material and Fluent use semantic ramps.
2. Enterprise product typography is deliberately restrained. Productive roles prioritize task completion and data density; expressive display roles are bounded and do not leak into controls or tables.
3. Relative web units improve user scaling. Atlassian and Primer expose `rem`-based typography, while unitless line height remains resilient. InterfaceOS must decide export behavior separately from canonical draft storage.
4. A scale formula is a generation aid, not an approval substitute. Carbon uses a governed equation, Atlassian uses a rounded minor-third approach, and Ant recommends a small active set. InterfaceOS should evaluate the current eight stops, then approve only role-needed mappings.
5. Cross-platform consistency does not mean forcing identical glyphs. Fluent intentionally uses native platform families; system stacks reduce delivery cost but introduce metric and weight variance that must be tested.
6. Numeric typography is a first-class product need. Atlassian and Ant explicitly address tabular figures, and code faces need unambiguous glyphs and a governed ligature policy.
7. Composite Text Styles remain necessary in Figma even when properties are variable-bound. Figma supports variables for family, style, weight, size, line height, letter spacing, and paragraph spacing, but styles package those properties into reusable intent.
8. Variable fonts add deployment and representation risk. Weight should use the high-level `font-weight` property; optical sizing may use `font-optical-sizing` only when the chosen font supports an `opsz` axis and tests prove consistent output.

## InterfaceOS-derived principles

- Use semantic role names and keep HTML semantics independent from visual size.
- Default to productive enterprise typography; isolate expressive display roles.
- Treat dense typography as a constrained layout context, never a blanket reduction.
- Preserve the complete code fallback stack while documenting Figma’s single-family limitation.
- Require language, fallback, zoom, reflow, and metric tests before font or scale approval.
- Do not make Light and Dark typography modes; validate identical styles against theme-owned text colors.
- Keep variable-font axes and OpenType features explicit, testable metadata.
- Prefer fewer approved styles with clear intent over a combinatorial style matrix.

## Research boundary

No proprietary value, typeface, token name, or visual asset is copied. External systems inform architecture only. InterfaceOS font, scale, role, and delivery decisions remain human-owned.
