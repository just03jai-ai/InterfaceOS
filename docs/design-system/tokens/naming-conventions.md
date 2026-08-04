# Token Naming Conventions

## Grammar

Canonical names use lowercase dot-separated paths. Each segment uses lowercase letters, numbers, and internal hyphens. Numeric scale segments are allowed. Names encode meaning and tier, never platform, file location, theme name, or raw value.

```text
{domain}.{tier}.{category}.{role}.{state}
```

Aliases use an exact curly-brace path: `{color.primitive.neutral.950}`. Embedded string interpolation is prohibited.

## Domain patterns

| Domain             | Pattern                                               | Example                              |
| ------------------ | ----------------------------------------------------- | ------------------------------------ |
| Color primitive    | `color.primitive.{family}.{step}`                     | `color.primitive.blue.700`           |
| Color semantic     | `color.semantic.{purpose}.{role}.{state?}`            | `color.semantic.text.primary`        |
| Theme slot         | `color.theme.{purpose}.{role}.{state?}`               | `color.theme.background.canvas`      |
| Typography         | `typography.primitive.{property}.{step-or-role}`      | `typography.primitive.font-size.300` |
| Spacing            | `spacing.primitive.{step}`                            | `spacing.primitive.4`                |
| Sizing             | `sizing.primitive.{object}-{size}`                    | `sizing.primitive.control-lg`        |
| Radius             | `radius.primitive.{size}`                             | `radius.primitive.md`                |
| Border             | `border.primitive.{property}.{step}`                  | `border.primitive.width.1`           |
| Shadow             | `shadow.primitive.{level}`                            | `shadow.primitive.md`                |
| Elevation semantic | `elevation.semantic.{role}`                           | `elevation.semantic.overlay`         |
| Breakpoint         | `breakpoint.primitive.{range}`                        | `breakpoint.primitive.lg`            |
| Responsive         | `responsive.semantic.{property}.{context}`            | `responsive.semantic.gutter.compact` |
| Z-index            | `z-index.primitive.{layer}`                           | `z-index.primitive.modal`            |
| Motion             | `motion.{tier}.{property}.{role}`                     | `motion.semantic.duration.feedback`  |
| Opacity            | `opacity.primitive.{percentage}`                      | `opacity.primitive.40`               |
| Component          | `component.{component}.{property}.{variant-or-state}` | `component.dialog.padding.default`   |

The component example defines syntax only; it is not an implemented component token.

## Prohibited names

- Visual-use aliases such as `gray-text` or `blue-button`.
- Value-coupled names such as `spacing-16px`.
- Platform names such as `web-color-primary`.
- Theme names in semantic paths such as `color.semantic.dark-text`.
- Ambiguous buckets such as `misc`, `other`, `default-2`, or `special`.
- Case-only differences and underscores.

Renaming a released token is breaking. Add the replacement, deprecate the old token with migration guidance, and remove it only through the release policy.
