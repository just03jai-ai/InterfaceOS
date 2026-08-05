# Token Architecture

Status: IOS-003.2 Color Foundation V1 canonical promotion implemented; human review and specialist accessibility review pending

Version: 0.1.0

Owner: Jai Singh (interim)

## Purpose

InterfaceOS tokens express design decisions independently of Figma, CSS, Tailwind, React, or any component library. Git-authored `.tokens.json` files are canonical; every platform representation is generated.

The authoring shape follows the stable DTCG 2025.10 Format and Color modules: a token is an object containing `$value`, groups organize tokens, `$type` declares value type, curly braces express aliases, and namespaced `$extensions` carry InterfaceOS lifecycle data.

## Taxonomy

| Tier       | Responsibility                                                      | Allowed dependencies                                                      | Consumers                          |
| ---------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------- |
| Primitive  | Raw scales and platform-neutral values without usage intent         | None, except intentional cross-scale aliases such as sizing to spacing    | Semantic and theme tokens          |
| Theme      | Mode-specific mapping slots, such as light and dark color roles     | Primitive tokens only                                                     | Semantic tokens                    |
| Semantic   | Stable purpose-based API, such as primary text or canvas background | Theme or primitive tokens                                                 | Components, patterns, product code |
| Responsive | Layout intent and content-driven reference points                   | Breakpoint, spacing, and sizing primitives                                | Layout and pattern specifications  |
| Component  | Narrow contract for a proven component requirement                  | Semantic tokens first; primitive references require an approved exception | One component family               |

Motion contains primitives and semantic aliases because reduced-motion behavior is a semantic requirement. Theme files are selected as resolver contexts; consumers never reference `color.theme.*` directly.

## Canonical structure

```text
packages/tokens/
├── src/
│   ├── primitives/*.tokens.json
│   ├── semantic/*.tokens.json
│   ├── themes/{light,dark}.tokens.json
│   └── contracts/theme-contract.json
├── lib/token-core.mjs
├── scripts/{validate,build}.mjs
└── dist/                     generated, ignored
```

Small files own one domain. Full token names remain globally unique after all selected files are merged.

Color hue scales remain in `primitives/color.tokens.json`. The categorical Data 01–11 system is isolated in `primitives/color-data.tokens.json`; eight entries alias approved hue primitives and three retain direct approved V1 values. This keeps data-series identity stable without pretending it is a 50–950 hue scale.

## Source-of-truth ownership

- Git owns names, types, values, aliases, theme mappings, schema, transforms, and versions.
- Figma owns editable variable representations and visual evidence after synchronization.
- Generated CSS, JSON, TypeScript, and Tailwind files are projections and are never edited.
- Storybook will consume released outputs but does not own token values.
- Generated distributions remain ignored in Git and reproducible through CI artifacts.

This specializes, and does not replace, the repository [source-of-truth model](../../architecture/source-of-truth.md).

## Build outputs

`pnpm tokens:build` validates and resolves the source graph before creating:

- `dist/css/tokens.css`: `--ios-*` custom properties for light and dark selectors.
- `dist/json/tokens.light.json` and `tokens.dark.json`: resolved typed token maps.
- `dist/typescript/tokens.ts`: immutable theme maps and inferred token-name/theme types.
- `dist/tailwind/theme.css`: Tailwind v4-compatible `@theme inline` aliases referencing generated InterfaceOS CSS variables.

The output directory is deleted and recreated on every build. A build fails on duplicate names, invalid paths, unresolved or circular aliases, incomplete themes, or failed contrast obligations.

## Component-token strategy

No component tokens are created in Stage 1. A component token is justified only when a released component needs a stable customization or state contract not represented by an existing semantic token. Its path is `component.{component}.{property}.{variant-or-state}` and it aliases semantic tokens by default. Component values must not encode component implementation details or duplicate primitives.

## Value rationale

- Spacing follows a 4px root with documented 2px and 6px optical exceptions.
- Type starts at a 16px default body candidate, uses unitless readable line heights, and retains system fallbacks.
- Sizes record the 24px WCAG 2.2 AA target-size baseline and provide 40px/48px control candidates.
- Color uses sRGB for current Figma/web interoperability; scale steps are initial InterfaceOS values, not borrowed assets.
- Breakpoints are validation references, not device labels; container queries remain preferred for local ownership.
- Motion durations stay short and include a zero-duration reduced-motion alias.
- Shadows never act as the only boundary or state cue.

These values remain implementation candidates until visual, engineering, accessibility, and Figma review evidence is approved. Figma representations follow [ADR-0004](../../decisions/0004-figma-foundation-representation.md).
