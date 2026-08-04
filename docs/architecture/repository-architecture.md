# InterfaceOS Repository Architecture

| Field          | Value                                    |
| -------------- | ---------------------------------------- |
| Status         | Proposed — awaiting Milestone 1 approval |
| Version        | 0.1.0                                    |
| Last updated   | 2026-08-04                               |
| Decision owner | InterfaceOS architecture owner           |
| Scope          | Logical repository architecture only     |

## 1. Purpose

This document defines the logical boundaries, authority model, dependency rules, and evolution strategy for the InterfaceOS repository. It does not define the final physical folder tree, application routes, database schema, component APIs, or implementation backlog. Those belong to later approval-gated milestones.

InterfaceOS is an AI-native Design Intelligence Platform. The repository must support human and machine consumers without allowing Figma, application code, documentation, Storybook, AI metadata, or operational records to drift into independent systems of truth.

## 2. Architectural Drivers

The architecture is constrained by the approved product direction:

- Figma is the visual source of truth and evidence for editable design decisions.
- Git is the version-controlled home of code, specifications, schemas, metadata, documentation, and release history.
- Supabase supports operational product data, identity, workflow state, and analytics where persistence is required.
- Next.js App Router and TypeScript power the platform experience.
- Tailwind CSS and shadcn/ui may support implementation without becoming the product's domain model.
- Storybook is the isolated implementation, documentation, and test surface for coded UI artifacts.
- Every governed artifact follows a reviewable lifecycle from research through release.
- Accessibility, documentation, AI readability, and machine validation are release requirements.

## 3. Architecture Decision

InterfaceOS will begin as a **modular monorepo and modular monolith**, with explicit domain boundaries and independently testable packages. It may add separately deployed workers only when synchronization, indexing, or compute workloads demonstrate a measurable need.

This choice optimizes for early consistency, atomic changes across related artifacts, shared type contracts, and maintainability by a growing but initially unified team. It deliberately gives up independent service deployment and per-domain infrastructure scaling until those benefits justify their operational cost.

### Alternatives considered

| Option                              | Advantages                                                                      | Costs and risks                                                     | Decision                                 |
| ----------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------- |
| Modular monorepo / modular monolith | Atomic changes, one review surface, shared contracts, simpler local development | Requires enforced boundaries; careless imports can create coupling  | Adopt                                    |
| Polyrepo                            | Independent ownership and release cadence                                       | Cross-repository drift, fragmented discovery, harder atomic updates | Reject for initial platform              |
| Microservices from inception        | Independent scaling and deployment                                              | High operational load, distributed consistency, premature contracts | Defer until evidence supports extraction |

## 4. Authority Model

InterfaceOS uses **one governed system with authority assigned by artifact type**, not competing universal sources of truth.

| Artifact or concern                                              | Authoritative system                   | Synchronized representations                                 |
| ---------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------ |
| Visual composition, variants, visual states, design annotations  | Figma                                  | Git specifications, previews, code mappings                  |
| Token definitions, semantic names, modes, transformation rules   | Git                                    | Figma variables/styles, CSS and platform outputs             |
| Component and pattern specifications                             | Git                                    | Figma documentation, Storybook documentation, platform pages |
| Production implementation                                        | Git                                    | Storybook, deployed platform, Figma Code Connect mappings    |
| AI metadata, schemas, relationships, knowledge graph definitions | Git                                    | Search indexes, embeddings, Supabase projections             |
| Lifecycle status, approvals, ownership assignments               | Supabase after workflow implementation | Git release records and audit exports                        |
| Released documentation                                           | Git-authored, build-derived            | InterfaceOS documentation UI, Storybook, AI indexes          |
| Immutable release identity and history                           | Git tags and release manifests         | Supabase release records, platform UI                        |
| Usage and quality telemetry                                      | Supabase or approved analytics store   | Governance dashboards and reports                            |

### Conflict policy

- Synchronization never silently overwrites an authoritative source.
- Every synchronized artifact carries a stable ID, schema version, artifact version, source revision, and content checksum.
- A mismatch creates a visible drift record with source, target, detected time, and resolution owner.
- Automated writes back to Figma or Git require an explicit policy and auditable actor identity.
- Generated projections are reproducible and are not edited directly.

## 5. Bounded Contexts

The repository is organized around product capabilities rather than framework layers.

### 5.1 Experience

Owns the InterfaceOS product shell and capability surfaces: Dashboard, Foundations, Tokens, Icons, Illustrations, Components, Patterns, Templates, Pages, Flows, Documentation, Playground, Code, Storybook, AI, Governance, Analytics, Search, and Settings.

It consumes domain APIs and contracts. It does not own canonical design-system data or synchronization rules.

### 5.2 Artifact Registry

Owns stable artifact identity, type, version, lifecycle state, ownership, dependencies, relationships, and release eligibility across all governed artifacts.

This is the shared kernel for tokens, assets, components, patterns, templates, pages, flows, and documentation. It stores common identity and governance fields without flattening domain-specific schemas into a generic untyped record.

### 5.3 Token Intelligence

Owns primitive, semantic, and component token definitions; modes and themes; aliases; validation; transformation; distribution; usage relationships; deprecation; and drift detection.

### 5.4 Asset Intelligence

Owns icons and illustrations, including metadata, variants, licenses, accessibility semantics, optimization rules, and code/design mappings.

### 5.5 Component Intelligence

Owns component specifications, variants, sizes, states, properties, interactions, motion, responsive behavior, accessibility contracts, implementation mappings, tests, dependencies, and version history.

### 5.6 Pattern and Experience Intelligence

Owns reusable patterns, templates, pages, and flows. It composes components through declared dependencies and documents intent, sequencing, content rules, responsive behavior, and accessibility at the experience level.

### 5.7 Documentation Intelligence

Owns authored guidance, examples, cross-references, generated reference pages, content quality rules, and documentation publishing. It consumes artifact schemas and must not duplicate canonical artifact data manually.

### 5.8 Design and Code Connectivity

Owns adapters and synchronization contracts for Figma, Storybook, source code, token build outputs, and future external integrations. External SDK types remain behind adapter boundaries and do not leak into core domain models.

### 5.9 AI and Knowledge Intelligence

Owns machine-readable metadata, schema validation, graph relationships, retrieval documents, provenance, prompt-safe representations, agent capabilities, and evaluation datasets. AI-generated proposals remain distinguishable from approved canonical records.

### 5.10 Governance and Release

Owns lifecycle transitions, review requirements, accessibility gates, approvals, ownership, exceptions, audit history, versioning, deprecation, release manifests, and policy evaluation.

### 5.11 Discovery and Analytics

Owns search indexing, filtering, relationship traversal, usage telemetry, adoption metrics, quality signals, and governance reporting. Indexes and dashboards are derived projections, never canonical artifact stores.

### 5.12 Identity and Platform Administration

Owns authentication, authorization, organizations, teams, roles, environment configuration, integration credentials, and administrative settings. Secrets must never enter design artifacts, client bundles, generated metadata, or repository content.

## 6. Logical Repository Layers

The physical folder structure will be proposed in Milestone 2. Regardless of folder names, repository content must fit one of these logical layers:

1. **Applications** — deployable user experiences and isolated documentation surfaces.
2. **Domain modules** — business rules and use cases for the bounded contexts.
3. **Contracts** — versioned schemas, types, events, and stable cross-boundary interfaces.
4. **Content** — reviewed specifications, documentation, decision records, and examples.
5. **Adapters** — Figma, Storybook, Supabase, GitHub, search, and analytics integrations.
6. **Tooling** — validation, generation, migration, synchronization, and release automation.
7. **Configuration** — shared build, lint, test, TypeScript, Tailwind, and Storybook policy.
8. **Generated outputs** — reproducible artifacts that are clearly marked and never hand-edited.

## 7. Dependency Rules

The allowed dependency direction is:

```text
applications -> domain modules -> contracts
applications -> adapters -> contracts
adapters     -> domain ports -> contracts
tooling      -> contracts and content
generated    <- tooling + canonical sources
```

Rules:

- Domain modules do not import Next.js, React, Tailwind, Storybook, Supabase clients, Figma SDKs, or analytics SDKs.
- Applications may compose domain modules and adapters but may not bypass domain policies for writes.
- Cross-context access uses public entry points and versioned contracts, never internal file imports.
- Cyclic package dependencies are prohibited.
- Shared code is promoted only after two real consumers demonstrate the same stable responsibility.
- UI primitives are not allowed to become a miscellaneous dependency bucket.
- Generated code and data never become the only location of business intent.
- Every external integration is accessed through a port and adapter with contract tests.

## 8. Artifact Contract

Every governed artifact must eventually conform to a versioned machine-readable envelope. Domain schemas may extend it but cannot remove its governance fields.

```ts
type ArtifactEnvelope = {
  schemaVersion: string;
  id: string;
  kind: string;
  name: string;
  version: string;
  status: string;
  owners: string[];
  source: {
    system: 'git' | 'figma' | 'supabase';
    locator: string;
    revision: string;
  };
  dependencies: Array<{ id: string; versionRange?: string }>;
  relationships: Array<{ type: string; targetId: string }>;
  accessibility: { status: string };
  lifecycle: { stage: string; updatedAt: string };
  provenance: { createdBy: string; updatedBy: string };
};
```

The exact field vocabulary, validation rules, and extensibility mechanism are intentionally deferred to Milestone 11, AI Metadata Standard, and the domain specification-template milestones.

## 9. Lifecycle Architecture

The required lifecycle is represented as a governed state machine:

```text
research -> specification -> design -> review -> accessibility
         -> documentation -> implementation -> storybook
         -> ai-metadata -> testing -> approval -> release
```

- A lifecycle stage has entry criteria, required evidence, accountable owner, and exit criteria.
- Progress is not inferred from file existence alone.
- Failed gates return the artifact to an explicit prior stage with review history preserved.
- Exceptions are time-bound, owned, justified, and auditable.
- Release requires all policy gates for the artifact kind and change level.
- The state machine vocabulary and approval roles will be finalized in the Governance Model milestone.

## 10. Synchronization Architecture

Synchronization uses adapters and manifests rather than direct point-to-point mutations between every system.

```text
Figma ---------> Figma adapter ------\
Git -----------> repository adapter ---> normalized artifact contracts
Storybook -----> Storybook adapter --/              |
Supabase <----> workflow adapter -------------------+
                                                     |
                           validators -> drift records -> projections
                                                     |
                          search / graph / docs / analytics / AI
```

The synchronization pipeline must be deterministic, idempotent where practical, observable, and safe to replay. Each run emits a report containing inputs, versions, changes, validation outcomes, drift, errors, and actor identity.

## 11. Data Classification and Persistence

Repository data is classified before storage:

| Class              | Examples                                                        | Persistence rule                                                    |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------- |
| Canonical authored | Specifications, tokens, schemas, policies                       | Versioned in Git                                                    |
| Canonical visual   | Figma nodes, variants, annotations                              | Versioned through Figma history and referenced by stable IDs        |
| Operational        | Approvals, assignments, sessions, workflow events               | Supabase with access controls and auditability                      |
| Derived            | Search indexes, graph projections, generated docs, token builds | Rebuildable from canonical sources                                  |
| Telemetry          | Searches, adoption, quality and usage events                    | Approved analytics storage with retention policy                    |
| Secret             | API keys, signing material, integration credentials             | Managed secret storage only; never committed or exposed client-side |

## 12. Quality Gates

Repository architecture must allow automated enforcement of:

- Schema and metadata validity.
- Type safety and boundary compliance.
- Unit, integration, contract, visual, interaction, and end-to-end tests where applicable.
- Accessibility criteria and documented exceptions.
- Token reference validity and forbidden hard-coded design values.
- Documentation completeness for the artifact type and lifecycle stage.
- Figma, code, Storybook, and metadata mapping integrity.
- Dependency, license, secret, and vulnerability checks.
- Versioning and release-manifest consistency.
- Generated-output freshness and reproducibility.

Specific tools and thresholds remain Technical Decisions and Coding Standards milestones.

## 13. Versioning and Evolution

- Repository releases use a single platform release identity initially, while governed artifacts retain independent semantic versions in their metadata.
- Schemas are versioned explicitly and changes include migration or compatibility handling.
- Public package boundaries expose stable entry points; internal modules remain private.
- Breaking contract changes require an architecture decision record, migration path, and deprecation window.
- Deployment topology may evolve without changing domain ownership or canonical artifact identity.
- A bounded context may be extracted into a separate service only after measured scaling, reliability, security, or ownership needs outweigh distributed-system costs.

Release mechanics, branch policy, and cadence are deferred to the Git Strategy and Release Strategy milestones.

## 14. Ownership Model

- Every domain module, contract, specification, and generated projection has an accountable owner.
- Code ownership follows domain responsibility, not file type alone.
- Changes crossing authority boundaries require review from each affected owner.
- AI agents act under named capabilities and policy constraints; their changes use the same review and audit model as human-authored changes.
- Ownership roles and escalation paths will be finalized in the Governance Model milestone.

## 15. Architectural Risks and Controls

| Risk                                 | Consequence                                       | Initial control                                                                      |
| ------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Figma/Git authority ambiguity        | Silent drift and conflicting edits                | Authority-by-artifact, stable IDs, checksums, drift records                          |
| Premature platform breadth           | Many shallow surfaces with no trusted core        | Establish contracts, tokens, governance, and sync foundations before feature breadth |
| Generic metadata model               | Loss of domain meaning and weak AI results        | Shared envelope plus typed domain schemas                                            |
| Framework coupling                   | Domain logic becomes difficult to test or migrate | Ports, adapters, and dependency rules                                                |
| Generated-content edits              | Non-reproducible state                            | Mark outputs, validate freshness, prohibit direct edits                              |
| AI-generated misinformation          | Untrusted specifications and unsafe releases      | Provenance, confidence/evidence fields, human approval gates, evaluations            |
| Knowledge graph as a second database | Conflicting canonical state                       | Derived projection from approved contracts only                                      |
| Early microservices                  | Operational complexity and consistency failures   | Modular monolith until extraction criteria are met                                   |
| Enterprise claims without evidence   | False assurance                                   | Tie quality claims to automated gates, reports, and release evidence                 |

## 16. Architecture Fitness Functions

The following properties must become continuously testable as implementation begins:

- No forbidden dependencies or cycles between bounded contexts.
- Every released artifact validates against a supported schema version.
- Every released component maps to approved specification, Figma evidence, Storybook evidence, and code identity.
- Every generated projection can be rebuilt from declared canonical inputs.
- Every synchronization run is traceable and produces a drift report.
- Every lifecycle transition records actor, evidence, timestamp, and policy result.
- No secret exists in repository content, public metadata, or client output.

Thresholds and CI implementation are deferred to later milestones.

## 17. Deferred Decisions

The following are intentionally not decided in Milestone 1:

- Exact folder and package names.
- Package manager and monorepo orchestration tool.
- Hosting topology and environment model.
- Supabase schema, region, tenancy, and row-level security policies.
- Figma API and Code Connect integration details.
- Search engine, vector store, embedding model, or graph implementation.
- Analytics vendor and telemetry taxonomy.
- Authentication provider and enterprise identity protocols.
- Component library scope or component implementation.
- Detailed branching, release, documentation, and coding policies.

These decisions require their assigned milestone, documented options, and approval before implementation.

## 18. Milestone 1 Acceptance Criteria

Milestone 1 is ready for approval when stakeholders confirm:

- The modular monorepo / modular monolith starting architecture.
- The authority-by-artifact model across Figma, Git, Supabase, and generated projections.
- The bounded contexts and their responsibilities.
- The dependency direction and integration boundaries.
- The governed artifact envelope as a preliminary cross-domain contract.
- The lifecycle, synchronization, quality-gate, ownership, and evolution principles.
- The explicit list of decisions deferred to later milestones.

Approval authorizes Milestone 2: defining and creating the physical folder structure. Approval does not authorize component implementation.
