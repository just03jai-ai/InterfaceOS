# Theme Model

## Model

Light and dark are resolver contexts implementing one semantic contract. Semantic token names stay constant; only `color.theme.*` mappings change.

```text
consumer -> color.semantic.text.primary
                  -> color.theme.text.primary
                            -> color.primitive.neutral.{step}
```

The theme contract lists every required slot and accessibility contrast pair. Validation fails if either theme omits a slot, adds a broken reference, creates a cycle, or fails a declared contrast threshold.

## Runtime selection

Generated CSS provides `:root` and `[data-theme='light']` for light values and `[data-theme='dark']` for dark values. The future application must respect `prefers-color-scheme` only through an explicit user-preference policy; Stage 1 does not implement runtime selection.

## Accessibility requirements

- Normal text pairs target at least 4.5:1 under WCAG 2.2 criterion 1.4.3.
- Focus indication targets at least 3:1 against the adjacent canvas under criterion 1.4.11; actual component boundaries still require manual verification.
- Status meaning needs text, iconography, or structure in addition to color under criterion 1.4.1.
- Disabled colors are documented but excluded from a conformance claim; components must keep unavailable state perceivable.
- Forced-colors behavior and high-contrast themes require implementation and manual testing later.
- Reduced motion maps non-essential animation to zero duration, but each future interaction must still be manually assessed under criterion 2.3.3.

Automated contrast calculation is evidence for declared opaque sRGB pairs only. It is not a full accessibility audit or WCAG conformance claim.

## Stage 1 automated contrast evidence

Ratios are computed from resolved canonical sRGB components by the token validator.

| Pair                                   |   Light |    Dark | Required |
| -------------------------------------- | ------: | ------: | -------: |
| Primary text / canvas                  | 17.94:1 | 17.94:1 |    4.5:1 |
| Secondary text / canvas                |  8.76:1 | 11.26:1 |    4.5:1 |
| Inverse text / inverse background      | 17.94:1 | 17.94:1 |    4.5:1 |
| Primary action foreground / background |  6.16:1 |  5.17:1 |    4.5:1 |
| Success foreground / background        |  8.71:1 | 11.83:1 |    4.5:1 |
| Warning foreground / background        |  8.92:1 | 12.46:1 |    4.5:1 |
| Danger foreground / background         | 10.10:1 | 10.82:1 |    4.5:1 |
| Focus ring / canvas                    |  6.16:1 |  5.17:1 |      3:1 |

The palette contains only steps required by the initial semantic mappings plus neutral layout steps. Values prioritize clear lightness separation, text/action contrast, and sRGB portability; visual harmony, color-vision evaluation, adjacent-state differentiation, and real Figma rendering remain human review gates.
