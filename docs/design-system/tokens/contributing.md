# Contributing Tokens

## Workflow

1. Confirm an approved IOS item, stable foundation evidence ID, owner, and intended tier.
2. Search existing canonical sources and semantic roles before adding a token.
3. Add the smallest token to the owning `.tokens.json` file using the naming standard and DTCG shape.
4. Reference canonical values with aliases; never paste a generated CSS, JSON, TypeScript, Tailwind, or Figma value back into source.
5. Update the theme contract when a semantic color slot is added, and implement it in every theme.
6. Update documentation, evidence manifest, accessibility obligations, dependencies, and migration notes.
7. Run `pnpm tokens:validate`, `pnpm tokens:build`, and `pnpm quality`.
8. Review generated output locally but do not commit `dist/`.
9. Obtain design, engineering, accessibility, and governance review required by the change level.

## Review questions

- Is the token a durable decision rather than a one-off value?
- Is the tier correct, and does dependency direction move from consumers toward semantics and primitives?
- Does the name describe intent without platform or theme coupling?
- Are light/dark, reduced-motion, contrast, forced-colors, localization, zoom, and target-size implications addressed where applicable?
- Can every output be reproduced from the canonical source?
- Are Figma and evidence references current, or explicitly blocked?

Component tokens require a released component need and architecture approval. IOS-001 contributors must not add them.
