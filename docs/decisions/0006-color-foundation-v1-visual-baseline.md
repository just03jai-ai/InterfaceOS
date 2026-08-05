# ADR-0006: Approve the Color Foundation V1 visual baseline

Status: Accepted  
Date: 2026-08-05  
Decision owner: Jai Singh

## Context

IOS-003.1 produced a reviewed Figma color foundation containing canonical Git-backed anchors and additional editable palette candidates. Human review approved the visual system, but the approved Indigo, Purple, Teal, Primary, and Data values do not yet exist in the canonical token source. Treating those Figma-only values as production tokens would violate the authority model in ADR-0002.

## Decision

Approve the reviewed Figma work as the official **InterfaceOS Color Foundation V1 visual baseline**.

- Blue is the canonical product Primary family.
- Neutral, Blue, Green, Amber, and Red are the core primitive families.
- Green, Amber, and Red carry Success, Warning, and Danger/Error intent respectively.
- Indigo, Purple, and Teal are approved extended families with the documented AI, automation, premium, analytics, information, and data-oriented boundaries.
- Data 01–11 is the approved V1 categorical analytics palette; future work may refine ordering without silently changing values.
- Light, Dark, semantic mappings, interactive states, text hierarchy, surfaces, borders, feedback states, dashboard use, and chart testing are approved for V1.
- Automated accessibility evidence and human V1 accessibility review are accepted. A named specialist audit remains non-blocking for foundation acceptance and required before public release claims.
- Engineering architecture, token layering, and alias hierarchy are approved for this milestone by Jai Singh. This is not an independent public-release approval.

The canonical Git token values remain unchanged. Figma-only approved values must move through a separately reviewed token-promotion change before code, generated distributions, or runtime consumers may treat them as canonical.

The library remains private and unpublished. A named Figma version and independent release approval are required before publication.

## Consequences

- IOS-003.1 may close as approved without claiming that public release gates are complete.
- Figma is the authority for the approved visual intent; Git remains the authority for canonical token definitions.
- The temporary cross-source difference is controlled and documented, not silently normalized.
- The next color work is a Token Promotion Proposal review and implementation milestone, not another ungoverned palette edit.
- IOS-004 is Typography Foundation; no UI component milestone starts until required foundations are released.

## Evidence

- `evidence/reviews/IOS-003-1-COLOR-FOUNDATION-APPROVAL.json`
- `evidence/foundations/IOS-FND-COLOR.json`
- `evidence/figma/ios-003-1-color-foundation.mutation.json`
- `evidence/figma/ios-003-1-color-candidates.mutation.json`
- `docs/design-system/foundations/color/token-promotion-proposal.md`
