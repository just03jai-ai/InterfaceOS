# IOS-003.1 Candidate Color Generation Method

Status: Reproducible exploration method; generated visual outputs approved for V1 and canonical token promotion pending

## Boundary

The generated palette is visual exploration evidence, not a token source. The canonical source remains [`color.tokens.json`](../../../../packages/tokens/src/primitives/color.tokens.json). Running the generator never writes beneath `packages/tokens/src`, creates Figma variables, changes semantic mappings, or approves a color.

The current reproducible artifact is [`color-candidates.generated.json`](color-candidates.generated.json). Generate it with `pnpm color:candidates:generate` and verify drift with `pnpm color:candidates:check`. The exact IOS-003.1 promotion input is frozen separately as [`color-candidates.approved-v1.json`](color-candidates.approved-v1.json); its checksum remains historical evidence and it must not be regenerated after canonical promotion.

## Existing families

Canonical Neutral, Blue, Green, Red, and Amber values are immutable anchors. Missing stops are interpolated piecewise in OKLCH using the shortest hue path. This preserves the exact source HEX values while producing a monotonic perceived-lightness sequence between anchors.

Blue has no canonical value beyond `900`. Its `950` candidate therefore uses a separately authored low-lightness, reduced-chroma endpoint. It is explicitly recorded as an endpoint candidate, not an interpolated fact.

Neutral retains the canonical `0` endpoint and adds the standard `50–950` review sequence. The Figma board therefore needs 12 Neutral cells rather than silently dropping `400`.

## New families

Indigo, Purple, and Teal use original InterfaceOS OKLCH curves:

- lightness decreases monotonically from subtle surfaces to dark foreground candidates;
- chroma rises toward the middle of each family and falls near both endpoints;
- hue remains stable unless sRGB gamut mapping changes the rendered result;
- a binary search reduces chroma, while keeping lightness and hue fixed, when a requested color is outside sRGB.

No external design-system palette values are inputs to the generator.

## Diagnostics

Each sequential family records:

- measured OKLCH and RGB;
- perceived-lightness delta from the previous stop;
- monotonicity, adjacent-step, chroma, hue-shift, duplicate, and gamut warnings;
- WCAG contrast against white, Neutral/950, the Light canvas candidate, and the Dark canvas candidate;
- likely-use guidance that does not imply automatic text suitability.

The contrast flags are measurements, not accessibility approval. Meaningful non-text boundaries use a `3:1` diagnostic threshold; large text uses `3:1`; normal text uses `4.5:1`.

## Data colors

Data 01–11 is a categorical palette, not a scale. The generator checks adjacent colors using OKLab distance, relative-luminance difference, and approximate protan, deutan, and tritan simulations. Passing those automated checks does not replace chart-context testing, labels, shapes, patterns, or specialist review.

## Approval boundary

Jai Singh must approve, revise, or reject each candidate family in Figma. Approved values require a separate governance step before any token-source or variable mutation.
