# ADR-0007: Approve the IOS-004.1 Typography Foundation architecture

Status: Accepted  
Date: 2026-08-06  
Decision owner: Jai Singh

## Context

IOS-004.1 audited the 21 existing draft typography primitives and defined the architecture, proposed semantic roles, evaluation contexts, font-decision framework, accessibility obligations, Figma representation policy, 18-board blueprint, machine contracts, validation strategy, and staged IOS-004 roadmap. None of that work selects a font, approves a visual scale, changes canonical tokens, or implements Figma objects.

The architecture review must close before IOS-004.2 can evaluate human font decisions without conflating an approved system model with approved typography values.

## Decision

Approve IOS-004.1 as the InterfaceOS Typography Foundation architecture baseline.

- Typography uses primitive atomic properties, semantic composite styles, responsive and density contexts, Figma Text Styles for semantic composites, and complete fallback stacks in canonical code.
- The approved semantic role inventory is Display, Heading, Title, Body, Label, Caption, Code, Numeric, Data Table, Button Text, Input Text, Helper Text, and Validation Text.
- The approved evaluation contexts are Compact/Mobile, Medium/Tablet, Expanded/Desktop, and Dense Enterprise.
- Typography reuses the five approved Figma collection responsibilities: Primitive owns atomic properties; Semantic owns stable aliases; Responsive owns approved context mappings; Theme does not duplicate typography values; Motion has no typography responsibility.
- The 18-board blueprint under `03 Foundations` → `Typography` is approved for later human execution.
- The accessibility requirements baseline is approved. WCAG 2.2 contrast, 200% resize, 400% reflow, text-spacing overrides, localization, truncation, dense tables, numerals, and code remain mandatory execution tests. Specialist accessibility testing is not complete.
- The IOS-004.1 through IOS-004.6 stage sequence and stop conditions are approved.

## Unresolved decisions

Primary and monospace families, exact font versions and sources, licensing and redistribution, web delivery and `font-display`, fallback metrics, supported languages and scripts, weights and italics, variable axes, OpenType features, numeric and ligature policy, final scale values, semantic value mappings, responsive behavior, paragraph-spacing ownership, and specialist engineering and accessibility reviews remain unresolved.

## Consequences

- IOS-004.1 is approved and IOS-004.2 may begin after this change is reviewed and merged.
- Architecture approval does not approve Inter, another font, the current draft scale values, a Figma implementation, accessibility conformance, or public release.
- Canonical typography tokens remain unchanged and retain their current draft status.
- Figma mutation, font download or bundling, UI component work, and library publication remain prohibited.
- Later decisions that change this architecture require a superseding ADR.

## Evidence

- `evidence/reviews/IOS-004-1-TYPOGRAPHY-ARCHITECTURE-APPROVAL.json`
- `evidence/foundations/IOS-FND-TYPOGRAPHY.json`
- `docs/design-system/foundations/typography/typography-foundation.contract.json`
- `docs/design-system/foundations/typography/typography-figma-blueprint.json`
- `docs/roadmap/ios-004-typography-foundation.md`
