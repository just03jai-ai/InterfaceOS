# Information Architecture

## Primary navigation

| Area                  | User question                                       | Principal content                                 |
| --------------------- | --------------------------------------------------- | ------------------------------------------------- |
| Dashboard             | What needs attention?                               | Readiness, drift, reviews, releases, adoption     |
| Foundations           | What visual rules shape the system?                 | Color, typography, spacing, layout, motion        |
| Tokens                | What named decisions can implementations consume?   | Primitive, semantic, component tokens and modes   |
| Icons / Illustrations | What governed visual assets exist?                  | Assets, semantics, variants, licenses             |
| Components            | What reusable controls exist and are they approved? | Specifications, evidence, API, behavior, status   |
| Patterns / Templates  | How are components composed for recurring jobs?     | Composition, content, accessibility, dependencies |
| Pages / Flows         | How do complete experiences behave?                 | Page models, task flows, states, evidence         |
| Documentation         | What guidance governs use?                          | Concepts, standards, recipes, migrations          |
| Playground            | How can approved artifacts be explored safely?      | Controlled examples and experiments               |
| Code / Storybook      | What is implemented?                                | Source mappings, builds, stories, tests           |
| AI                    | What machine-readable knowledge is available?       | Metadata, provenance, relationships, evaluations  |
| Governance            | Who owns and approves change?                       | Lifecycle, reviews, exceptions, releases          |
| Analytics             | What is used and what is failing?                   | Adoption, quality, search, drift                  |
| Search                | Where is a specific artifact or decision?           | Federated discovery and graph traversal           |
| Settings              | How is the platform administered?                   | Teams, roles, integrations, environments          |

## Artifact page model

Every artifact resolves from a stable URL keyed by stable ID and presents: overview, purpose, current status/version, owners, visual and implementation evidence, properties, tokens, accessibility, interactions, responsive behavior, usage, relationships, code/Storybook/AI mappings, dependencies, review history, and releases. Sections not applicable to an artifact kind are explicitly marked rather than silently absent.

## Taxonomy

The primary hierarchy is foundation → token/asset → component → pattern → template/page → flow. Relationships may cross the hierarchy and are typed; containment must not be inferred from folder location.

## Findability rules

- Stable IDs and canonical names are searchable.
- Synonyms are metadata, not duplicate artifacts.
- Filters use controlled vocabularies for kind, status, owner, accessibility, and release.
- Deprecated items remain discoverable with replacements and migration guidance.
- Search results distinguish canonical, draft, generated, and archived content.
