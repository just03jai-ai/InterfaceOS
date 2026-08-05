# Framepad Color Reference Assessment

Status: Complete requirement-coverage assessment; no visual values adopted  
Evidence ID: `IOS-FND-COLOR-REF-FRAMEPAD`  
Source: [Framepad Color Foundation preview](https://www.framepad.co/preview/foundations/color)  
Machine-readable record: [`framepad-reference-assessment.json`](framepad-reference-assessment.json)

## Use boundary

Framepad is an external reference, not an InterfaceOS source of truth. This assessment uses its public preview to identify coverage questions. It does not adopt Framepad assets, palette values, fixed Light/Dark pairings, wording, token names, or semantic decisions.

Every observed concept receives one of four outcomes:

- **Adapted:** the responsibility is useful and is expressed through original InterfaceOS architecture.
- **Deferred:** the responsibility may be useful but needs product evidence before it enters the semantic API.
- **Evaluation only:** the family becomes a Figma comparison candidate, not a token proposal.
- **Rejected as a primitive name:** the label describes semantic intent and must not be embedded in a hue-level primitive name.

## Semantic coverage matrix

| External concept | Coverage observed                                                               | InterfaceOS requirement                                                                                                   | Outcome                                                   |
| ---------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Neutral          | Main, subtle, and strong surfaces; inverse surfaces; normal and inverse strokes | Evaluate ordered surfaces and boundaries as explicit foreground/background/border relationships in Light and Dark         | Adapted                                                   |
| Primary / brand  | Subtle and strong surfaces; default, hover, active, and strong emphasis         | Test a complete primary interaction set while separating product action from future brand expression                      | Adapted                                                   |
| Secondary        | The same surface and interaction responsibilities at lower emphasis             | Add only when its product responsibility is distinct from primary, muted, and disabled                                    | Adapted as an evaluation requirement; token remains a gap |
| Tertiary         | A third surface and interaction emphasis tier                                   | Compare tertiary with accent and muted before expanding the semantic API                                                  | Deferred                                                  |
| Success          | Surface and interaction emphasis levels                                         | Complete background, foreground, border, and non-color relationships; interactive status use needs separate justification | Adapted                                                   |
| Warning          | Surface and interaction emphasis levels                                         | Distinguish caution from error, danger, information, and pending without relying on hue                                   | Adapted                                                   |
| Danger           | Surface and interaction emphasis levels                                         | Separate destructive action from validation failure before deciding whether mappings can be shared                        | Adapted                                                   |
| Text             | Main, subtle, subtlest, and inverse counterparts                                | Test ordered text emphasis on every permitted surface; names do not waive contrast requirements                           | Adapted                                                   |
| Alpha            | Translucent and transparent default/inverse behavior                            | Define compositing semantics and test resolved colors on every background; external percentages are not adopted           | Adapted                                                   |

The repeated state anatomy is treated as a completeness question, not a mandate that every semantic group receive every state. For example, a success message may need a surface, foreground, icon, and border but not hover or active colors. State tokens require an interaction responsibility, not merely symmetry.

## Base-family coverage matrix

| Reference family         | InterfaceOS disposition    | Evaluation requirement                                                                                                            |
| ------------------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Neutral                  | Existing candidate         | Review temperature, surface depth, text, border, and chart infrastructure capability.                                             |
| Success                  | Rejected as primitive name | Preserve success as semantic intent; evaluate hue-based primitives beneath it.                                                    |
| Warning                  | Rejected as primitive name | Preserve warning as semantic intent; evaluate Amber, Orange, and Yellow candidates beneath it.                                    |
| Danger                   | Rejected as primitive name | Preserve danger as semantic intent; evaluate Red or another approved hue beneath it.                                              |
| Slate, Grey, Zinc, Stone | Evaluation only            | Compare neutral temperature directions. Do not create multiple neutral families without a tenant, data, or hierarchy requirement. |
| Orange, Yellow           | Evaluation only            | Already open InterfaceOS candidates for attention, progress, charts, or caution.                                                  |
| Lime, Emerald            | Evaluation only            | Compare against Green only if status, chart, categorization, or identity requirements create a collision.                         |
| Teal                     | Evaluation only            | Already an InterfaceOS candidate; prove distinction from Green success and Blue information.                                      |
| Cyan, Sky                | Evaluation only            | Compare against Teal and Blue only if information or visualization requires additional separation.                                |
| Blue                     | Existing candidate         | Review primary-action, information, focus, selection, and chart collisions.                                                       |
| Indigo                   | Evaluation only            | Compare against Blue and Purple only if interaction, identity, or visualization requires it.                                      |
| Purple                   | Evaluation only            | Already an InterfaceOS candidate; no automatic brand or AI meaning.                                                               |
| Fuchsia                  | Evaluation only            | Compare against Purple and Pink only if categorization or visualization requires it.                                              |
| Pink                     | Evaluation only            | Already an InterfaceOS candidate; no automatic marketing meaning.                                                                 |
| Rose                     | Evaluation only            | Compare against Red and Pink only if identity or visualization requires it.                                                       |

The page’s `50` through `950` scale anatomy matches the stop labels independently recommended for InterfaceOS. This confirms a useful industry pattern but does not validate Framepad values or establish that every InterfaceOS family needs every stop.

## Requirements added to IOS-003.1

1. Review surface depth as main, subtle, and strong responsibilities, including inverse contexts.
2. Review strokes and inverse strokes separately from surfaces.
3. Test default, hover, active, and stronger emphasis as a reusable interaction anatomy; instantiate only justified states.
4. Decide whether tertiary is a real product responsibility or overlaps secondary, accent, and muted.
5. Test text hierarchy and inverse text as explicit relationship pairs.
6. Define alpha/compositing semantics independently from opacity primitives.
7. Compare neutral temperature directions before approving Neutral.
8. Include every listed chromatic family in the Figma comparison inventory while keeping non-InterfaceOS families evaluation-only.
9. Keep semantic labels such as success, warning, and danger out of primitive family names.
10. Record adopted, adapted, deferred, and rejected decisions so external-reference coverage remains auditable.

## Explicit non-adoption

- No Framepad color value, alpha percentage, or Light/Dark step pairing is copied.
- No external base family becomes an InterfaceOS token because it appears in the reference.
- No semantic role becomes canonical without InterfaceOS product evidence and cross-functional review.
- No Framepad asset, component, layout, or brand treatment is used.

## Review gate

This assessment is complete when the Figma research board shows all semantic patterns and all 21 base-family labels, each with its InterfaceOS disposition. Visual proposals and final choices remain governed by the IOS-003.1 approval boundary.
