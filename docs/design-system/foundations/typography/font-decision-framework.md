# IOS-004 Font Decision Framework

Status: Human decision required

No candidate is approved. Licensing observations are research inputs and require the designated governance or legal reviewer to approve the actual files, version, delivery, attribution, subsetting, and redistribution process.

## Decision matrix

| Candidate       | Role                        | Readability                                           | Licensing evidence                                                    | Web delivery                                                   | Native compatibility                       | Variable font                 | Language coverage                            | Size risk                                   | Brand fit                                           | Figma availability                                            |
| --------------- | --------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------ | ----------------------------- | -------------------------------------------- | ------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------- |
| Inter           | Product sans candidate      | Strong screen-oriented x-height and numeric features  | Upstream SIL OFL 1.1; reserved-name and redistribution review pending | WOFF2/static/variable available; self-host strategy unapproved | Not native; current system fallbacks exist | Available; axes need approval | Broad; test required locales                 | Medium until subset and styles are selected | Neutral, technical                                  | Commonly available; exact source and style names need capture |
| System UI stack | Delivery-free baseline      | Familiar and platform-optimized; metrics differ by OS | Governed by platform terms; no bundled file                           | No font download                                               | Strongest native integration               | Platform-dependent            | Platform-dependent                           | Low network cost; high metric variance      | Neutral, low differentiation                        | Cannot be represented as one cross-platform family            |
| IBM Plex Sans   | Enterprise sans alternative | Strong enterprise and technical candidate             | Upstream SIL OFL 1.1; InterfaceOS review pending                      | Multiple packages and formats; strategy unapproved             | Not native; fallbacks required             | Verify chosen package/version | Broad script packages; approve product scope | Potentially high across multiple scripts    | Technical; external brand association needs review  | Pending human verification                                    |
| Source Sans 3   | Humanist sans alternative   | Open forms designed for UI environments               | Upstream SIL OFL 1.1; InterfaceOS review pending                      | Static and variable web formats; strategy unapproved           | Not native; fallbacks required             | Available; axes need approval | Test against approved locale and script list | Medium until subset and styles are selected | Humanist, neutral                                   | Pending human verification                                    |
| JetBrains Mono  | Monospace candidate         | High x-height and differentiated code glyphs          | Upstream SIL OFL 1.1; InterfaceOS review pending                      | Static and variable formats; strategy unapproved               | Not native; mono fallbacks required        | Available; axes need approval | Verify code symbols and approved scripts     | Medium until subset and styles are selected | Developer-forward; restrict to code and identifiers | Pending human verification                                    |

Sources: [Inter](https://github.com/rsms/inter), [IBM Plex](https://github.com/IBM/plex), [Source Sans 3](https://github.com/adobe-fonts/source-sans), and [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono).

## Evaluation protocol

1. Freeze exact candidate versions and file hashes without adding them to this milestone.
2. Confirm license, reserved font names, redistribution, subsetting, attribution, privacy, and CDN/self-host rules.
3. Compare target scripts, combining marks, punctuation, currency, math, emoji fallback, and RTL samples.
4. Test every required weight and italic. Reject synthetic weights and unexpected fallback substitution.
5. Compare layout shift, fallback metrics, loading behavior, cache strategy, and bundle budget.
6. Verify Figma family/style names on every editor environment that must author the library.
7. Test tabular figures, slashed zero, code ligatures, and ambiguous glyph pairs.
8. Record human design, engineering, accessibility, and licensing dispositions independently.

## Human decisions

- Primary product sans family and exact version
- System-stack-only versus self-hosted font delivery
- Approved fallback order and metric-adjustment strategy
- Required language/script coverage for V1
- Required weights, italics, OpenType features, and variable axes
- Monospace primary and whether code ligatures are disabled
- Numeric feature defaults, including tabular figures and slashed zero
- Figma font source and exact available style names
- File-size budget, preload policy, `font-display` policy, and failure behavior
- License owner and approval evidence

## Rejection conditions

Reject a candidate if required glyphs or weights are missing, fallback causes clipping or material reflow, delivery creates an unapproved privacy or performance dependency, Figma cannot reproduce approved styles, or license/distribution evidence is incomplete.
