# IOS-003.1 Color Foundation Research Summary

Status: Research complete; Color Foundation V1 visual decisions approved under ADR-0006

Scope: Architectural principles only. No third-party palette values, brand treatments, token names, or proprietary assets are adopted.

External requirement coverage: [`framepad-reference-assessment.md`](framepad-reference-assessment.md)

## Systems reviewed

| System                                                                                           | Architectural observations                                                                                                                                      | InterfaceOS implication                                                                                                                       |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [Material Design 3](https://developer.android.com/develop/ui/compose/designsystems/material3)    | Key colors generate tonal palettes; components consume named roles and paired foreground/container roles; Light and Dark are complete schemes.                  | Evaluate role pairs and systematic tonal coverage, but do not import Material roles, generation algorithms, or values.                        |
| [IBM Carbon](https://carbondesignsystem.com/elements/color/overview/)                            | Role names stay stable while theme values change; neutral layering organizes dense product surfaces; core roles precede component-specific tokens.              | Keep semantic identity stable, document surface layering, and require evidence before component-level exceptions.                             |
| [Atlassian Design System](https://atlassian.design/foundations/color-new/)                       | Property-first tokens combine role, emphasis, and interaction state; neutrals, saturated colors, and alpha colors have distinct responsibilities.               | Preserve InterfaceOS property-first naming and require each semantic role to declare property, intent, emphasis, and state.                   |
| [Shopify Polaris](https://polaris-react.shopify.com/design/colors)                               | Color is purposeful and restrained; a neutral backdrop increases the signal of status and action colors; meaning is reinforced by other cues.                   | Optimize for enterprise task clarity, not decorative color density, and prohibit color-only status communication.                             |
| [GitHub Primer](https://www.primer.style/product/getting-started/foundations/color-usage/)       | Base, functional, and limited component/pattern tiers support many color modes; neutral and semantic scales are tested by UI responsibility.                    | Maintain primitive, semantic/theme, and exceptional component tiers; validate every supported mode rather than assuming inversion.            |
| [Fluent 2](https://fluent2.microsoft.design/color)                                               | Neutral, shared, and brand palettes have separate jobs; global tokens feed alias tokens; shared semantic colors are not decorative.                             | Separate product semantics from future brand expression and reserve accent families for governed purposes.                                    |
| [Ant Design](https://ant.design/docs/spec/colors/)                                               | System-level palettes and product-level application are distinct; enterprise UI uses color with restraint for information, guidance, and feedback.              | Keep raw scale design separate from product semantics and require dashboard-specific review before approval.                                  |
| [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) | Scale positions have predictable responsibilities for backgrounds, interactive states, borders, solid fills, and text, with Light and Dark variants.            | Give each InterfaceOS scale stop a documented capability and test obligation rather than treating steps as arbitrary tints.                   |
| [Framepad Color Foundation](https://www.framepad.co/preview/foundations/color)                   | The public preview exposes neutral/inverse surfaces and strokes, repeated emphasis/state anatomy, text hierarchy, alpha use, and a broad base-family inventory. | Use the concepts as a coverage checklist; do not import its values, fixed mappings, names, or assumption that every family/state is required. |

## Convergent principles

1. **Layered abstraction:** raw values support semantic roles; semantic roles support products; component-specific tokens are exceptional.
2. **Stable intent across themes:** Light, Dark, brand, and high-contrast modes remap values without changing semantic meaning.
3. **Neutral-first hierarchy:** enterprise products rely primarily on neutral surfaces, text, and boundaries; chromatic color carries scarce signal.
4. **Purposeful state color:** success, warning, error/danger, information, selection, and focus require distinct documented meanings.
5. **Scale responsibility:** a scale is useful only when its stops cover required backgrounds, borders, foregrounds, and interactive states.
6. **Paired roles:** colored surfaces need explicit compatible foregrounds and borders; visually similar colors are not interchangeable.
7. **Accessibility is relational:** no color is accessible by itself; approval concerns foreground/background/state combinations in context.
8. **Non-color redundancy:** text, iconography, pattern, position, or shape preserves meaning for color-vision and forced-colors users.
9. **Mode-specific design:** Dark and high-contrast modes require intentional mapping and visual review, not numeric reversal.
10. **Governed evolution:** palette expansion follows demonstrated semantic, chart, identity, or brand requirements—not spectrum completeness.

## Framepad requirement coverage

The Framepad review is recorded separately because it is a user-supplied implementation reference, not evidence that its design choices are correct for InterfaceOS. Its entire visible color inventory is accounted for in a machine-readable assessment:

- nine semantic patterns: Neutral, Primary/Brand, Secondary, Tertiary, Success, Warning, Danger, Text, and Alpha;
- 21 base-family labels;
- the repeated subtle/strong/default/hover/active/strong state anatomy;
- the `50` through `950` scale labels;
- normal and inverse surface, stroke, text, and alpha responsibilities.

The assessment adapts responsibilities, defers unjustified API expansion, rejects semantic names at the primitive tier, and keeps every additional hue evaluation-only. See [`framepad-reference-assessment.md`](framepad-reference-assessment.md) and its [`machine-readable record`](framepad-reference-assessment.json).

## Significant differences and trade-offs

| Decision axis   | Observed approaches                                                                      | InterfaceOS position for review                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Scale length    | Systems use roughly ten to thirteen functional steps or tones.                           | Preserve the current numeric naming family; recommend a consistent future stop set without adopting third-party values.                        |
| Dark primitives | Some systems create distinct dark scales; others remap shared primitives through themes. | Keep the approved theme-alias architecture; assess whether future palette expansion needs mode-specific primitives only through an ADR.        |
| Brand color     | Some systems embed brand prominently; others keep product UI nearly neutral.             | Defer brand palette selection. Brand themes may override approved theme slots without changing semantic APIs.                                  |
| Error vs danger | Some systems combine them; others distinguish failure from destructive action.           | Treat the relationship as an explicit open decision because InterfaceOS currently has `danger` semantics and the requested model adds `error`. |
| Chart colors    | Some systems publish separate visualization palettes; others reuse accents.              | Require a dedicated visualization decision and testing model before chart series colors become canonical.                                      |
| High contrast   | Some systems provide first-class themes; others defer to forced-colors behavior.         | Plan both: a future authored high-contrast theme and robust user-agent forced-colors behavior are separate obligations.                        |

## Research conclusion

InterfaceOS uses a restrained, neutral-led, role-based architecture with explicit surface/foreground/border relationships, stable semantics across themes, and evidence-driven expansion. Human review approved the Color Foundation V1 visual baseline in Figma. Canonical Git token promotion remains a separate governed change, so the approval does not silently rewrite production values.
