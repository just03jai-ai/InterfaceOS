# IOS-004 Typography Accessibility Requirements

Status: Requirements defined; specialist review and conformance testing pending

Target: WCAG 2.2 Level AA, with selected AAA readability guidance used as a design target rather than a conformance claim.

## Normative obligations

| Requirement    | Standard             | IOS-004 obligation                                                                                                                                                      |
| -------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Text contrast  | WCAG 1.4.3           | Bind each semantic text role to approved color pairs; 4.5:1 for normal text and 3:1 only where the rendered large-text exception genuinely applies.                     |
| Use of color   | WCAG 1.4.1           | Status, validation, links, and AI confidence cannot rely on color alone.                                                                                                |
| Resize text    | WCAG 1.4.4           | Text must resize to 200% without loss of content or functionality.                                                                                                      |
| Reflow         | WCAG 1.4.10          | At 400% zoom and the equivalent 320 CSS-pixel viewport, content reflows without two-dimensional scrolling except permitted content such as genuine data tables or code. |
| Text spacing   | WCAG 1.4.12          | User overrides for 1.5× line height, 2× paragraph spacing, 0.12em letter spacing, and 0.16em word spacing must not clip or hide content.                                |
| Images of text | WCAG 1.4.5           | Use real text except essential or user-customizable exceptions.                                                                                                         |
| Structure      | WCAG 1.3.1 and 2.4.6 | Visual styles do not determine HTML heading levels; labels and headings remain programmatically meaningful.                                                             |

## Foundation requirements

- Do not approve text below the smallest readable role without context-specific evidence. The current 12px primitive is a supporting-text candidate, never a default body decision.
- Body and long-form content should begin evaluation at the current default body candidate and retain a comfortable line height. This is an evaluation rule, not approval of a value.
- Avoid all caps. If an approved short label requires uppercase, do not transform user-generated content and do not add tracking without script testing.
- Do not justify blocks of text. Respect logical start alignment for LTR and RTL scripts.
- Never use fixed-height containers for wrapping text. Prefer intrinsic height and safe overflow.
- Truncated values require a keyboard, pointer, touch, and assistive-technology path to the complete text. Errors and essential instructions cannot be truncated.
- Localization tests must include expansion, long unbroken values, mixed scripts, RTL, CJK, diacritics, and locale-specific numbers.
- Dyslexia-supportive behavior means clear hierarchy, adjustable spacing, non-justified text, stable shapes, and user overrides; it does not justify claiming that one font is universally “dyslexia friendly.”

## Data and code

- Dense tables retain readable text, distinguish headers structurally, allow column resizing or alternate detail access, and preserve complete cell content on focus or activation when truncation is used.
- Numeric styles require tabular figures only when the chosen font supports them and proportional figures remain available for prose.
- Code blocks preserve indentation, expose horizontal scrolling when wrapping would corrupt meaning, and allow zoom without clipping. Inline code inherits surrounding semantic scale unless an approved exception exists.
- Ambiguous glyph pairs (`0/O`, `1/l/I`) and code ligatures require manual review with the selected monospace face.

## Test matrix

- Browser zoom: 100%, 200%, 400%
- Text-spacing override fixture at WCAG 1.4.12 values
- Compact through expanded widths, including intermediate widths
- Default and fallback fonts with font loading blocked
- Light, Dark, forced colors, and user-selected contrast settings
- English expansion samples plus approved target scripts and RTL
- Dense table, dashboard metric, code block, validation message, long-form prose, and AI-generated response samples

Automated checks can validate references, ranges, required mappings, and contrast inputs. Only manual review can assess glyph clarity, hierarchy, truncation discoverability, reflow behavior, and assistive-technology usability. Accessibility remains `pending-specialist-review` until those tests are captured.
