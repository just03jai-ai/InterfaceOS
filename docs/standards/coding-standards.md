# Coding Standards

## Required language and boundaries

- TypeScript uses strict mode; avoid `any`, unchecked assertions, and unvalidated external input.
- Domain packages do not import React, Next.js, Storybook, Supabase clients, Figma SDKs, or analytics SDKs.
- Cross-package imports use declared public entry points; cycles and internal-path imports are prohibited.
- Server-only secrets and clients must never enter browser bundles.
- Generated files are labeled, reproducible, and not hand-edited.

## Naming

- Files and directories use kebab-case except framework-mandated names.
- React components use PascalCase; functions and variables use camelCase; constants use SCREAMING_SNAKE_CASE only for true constants.
- Public names describe domain meaning, not implementation technology.
- Artifact IDs follow the [evidence convention](../evidence/evidence-model.md).

## Implementation quality

- Prefer small pure functions and explicit inputs/outputs.
- Validate data at system boundaries with versioned schemas.
- Errors include actionable context without secrets or protected content.
- Accessibility requirements are part of public UI contracts.
- New dependencies require ownership, license, maintenance, security, and bundle/runtime impact review.

## Tests

Changes include the lowest-cost test that proves the contract: unit tests for rules, contract tests for adapters/schemas, interaction and accessibility tests for components, visual tests for approved rendering, and end-to-end tests for critical flows.

## Required checks

Run `pnpm quality`. Bypassing a failure requires a documented, owned, time-bound governance exception.
