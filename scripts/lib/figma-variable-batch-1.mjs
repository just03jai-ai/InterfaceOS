import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  cssVariableName,
  flattenDocument,
} from '../../packages/tokens/lib/token-core.mjs';

export const SOURCE_PATH = 'packages/tokens/src/primitives/color.tokens.json';
export const SNAPSHOT_PATH =
  'evidence/snapshots/ios-003-1-canonical-color.tokens.json';
export const PLAN_PATH =
  'evidence/figma/ios-002-batch-1.variable-execution.json';
export const TABLE_PATH =
  'docs/design-system/figma/ios-002-batch-1-primitive-colors.md';

const pendingString = () => ({
  status: 'pending-human-capture',
  value: null,
});

const pendingPaths = () => ({
  status: 'pending-human-capture',
  values: [],
});

const accessChecks = [
  [
    'canonical-file-access',
    'Canonical file access',
    'Confirm the registered URL opens InterfaceOS — Design System.',
  ],
  [
    'edit-permission',
    'Edit permission',
    'Confirm Jai Singh can edit variables and styles in the canonical file.',
  ],
  [
    'file-ownership',
    'File ownership',
    'Capture the verified file owner shown by Figma.',
  ],
  [
    'team-project-location',
    'Team/project location',
    'Capture the owning Figma team and project.',
  ],
  [
    'library-publication-status',
    'Current library publication status',
    'Confirm the library has not been published. File sharing permissions are governed separately.',
  ],
  [
    'publishing-permission',
    'Publishing permission',
    'Record whether Jai Singh can publish; do not publish during this batch.',
  ],
  [
    'branching-availability',
    'Branching availability',
    'Record whether Figma branching is available for this file and plan.',
  ],
  [
    'existing-collections',
    'Existing collections',
    'Record every local variable collection before creating shells.',
  ],
  [
    'existing-variables',
    'Existing variables',
    'Record the existing local variable count and names before execution.',
  ],
  [
    'existing-styles',
    'Existing styles',
    'Record existing local Paint, Text, Effect, and Grid Styles.',
  ],
  [
    'duplicate-naming-risks',
    'Duplicate naming risks',
    'Search exact planned collection and variable names; record every collision.',
  ],
].map(([key, label, instruction]) => ({
  key,
  label,
  instruction,
  capture: pendingString(),
  screenshotPaths: pendingPaths(),
}));

const collections = [
  {
    displayName: 'Primitive',
    purpose: 'Raw platform-neutral values without product intent.',
    authoredModes: [],
    figmaStorageModeRule:
      'Keep the Figma-created default storage mode; it is not an authored product mode.',
    expectedFirstBatchContents: {
      tokenDomain: 'primitive-color',
      variableCount: 32,
    },
  },
  {
    displayName: 'Semantic',
    purpose: 'Stable product-intent aliases prepared for a later batch.',
    authoredModes: [],
    figmaStorageModeRule:
      'Keep the Figma-created default storage mode; it is not an authored product mode.',
    expectedFirstBatchContents: {
      tokenDomain: 'none',
      variableCount: 0,
    },
  },
  {
    displayName: 'Theme',
    purpose: 'Mode-specific slots that will map semantic intent to primitives.',
    authoredModes: ['Light', 'Dark'],
    figmaStorageModeRule:
      'Rename the default mode to Light and add exactly one Dark mode; create no variables in Batch 1.',
    expectedFirstBatchContents: {
      tokenDomain: 'none',
      variableCount: 0,
    },
  },
  {
    displayName: 'Responsive',
    purpose: 'Reference-only responsive decisions prepared for a later batch.',
    authoredModes: [],
    figmaStorageModeRule:
      'Keep the Figma-created default storage mode; it is not an authored product mode.',
    expectedFirstBatchContents: {
      tokenDomain: 'none',
      variableCount: 0,
    },
  },
  {
    displayName: 'Motion',
    purpose:
      'Motion primitives and semantic duration aliases prepared for a later batch.',
    authoredModes: [],
    figmaStorageModeRule:
      'Keep the Figma-created default storage mode; it is not an authored product mode.',
    expectedFirstBatchContents: {
      tokenDomain: 'none',
      variableCount: 0,
    },
  },
].map((collection) => ({
  ...collection,
  publishingState: 'unpublished',
  evidence: {
    collectionId: pendingString(),
    modeIds: {
      status: 'pending-human-capture',
      values: [],
    },
    screenshotPaths: pendingPaths(),
  },
  validationCriteria: [
    'The display name is an exact case-sensitive match.',
    'No duplicate collection with the same display name exists.',
    'Authored modes match the approved collection contract.',
    'The collection remains unpublished.',
    'The real collection ID and supporting screenshot are captured after creation.',
  ],
}));

export async function buildBatchOnePlan(root = process.cwd()) {
  const sourceFile = path.join(root, SNAPSHOT_PATH);
  const sourceText = await readFile(sourceFile, 'utf8');
  const document = JSON.parse(sourceText);
  const tokens = flattenDocument(document, SOURCE_PATH).sort((a, b) =>
    a.name.localeCompare(b.name, 'en'),
  );

  const primitiveColors = tokens.map(({ name, token }) => ({
    evidenceId: 'IOS-FND-COLOR',
    canonicalTokenPath: name,
    figmaVariableName: name.replaceAll('.', '/'),
    figmaCollection: 'Primitive',
    variableType: 'COLOR',
    sourceValue: structuredClone(token.$value),
    description: token.$description,
    scopes: ['ALL_FILLS', 'STROKE_COLOR', 'EFFECT_COLOR'],
    codeSyntax: `var(${cssVariableName(name)})`,
    aliasStatus: { kind: 'none', target: null },
    expectedModeBehavior:
      'One value in Figma’s required default storage mode; no authored product or theme modes.',
    reviewStatus: 'pending-human-execution',
    collectionId: pendingString(),
    variableId: pendingString(),
  }));

  return {
    schemaVersion: '1.0.0',
    id: 'IOS-FIGMA-IOS-002-BATCH-1',
    milestone: 'IOS-002',
    batch: 1,
    status: 'prepared-pending-human-execution',
    owner: 'Jai Singh',
    canonicalFigmaFile: {
      name: 'InterfaceOS — Design System',
      url: 'https://www.figma.com/design/OJqxFKoGjRh4rrSZCKdkzi/InterfaceOS-%E2%80%94-Design-System?node-id=2-11&t=ooeNCCEtH5b0vcgR-1',
      fileKey: pendingString(),
      pageNodeId: pendingString(),
      sourceRevision: pendingString(),
      figmaRevision: pendingString(),
    },
    source: {
      path: SOURCE_PATH,
      sha256: createHash('sha256').update(sourceText).digest('hex'),
      tokenCount: primitiveColors.length,
    },
    tasks: {
      accessVerification: {
        id: 'FIG-VAR-001',
        status: 'prepared-pending-human-execution',
        checks: accessChecks,
      },
      collectionShells: {
        id: 'FIG-VAR-002',
        status: 'prepared-pending-human-execution',
        collections,
      },
      primitiveColors: {
        id: 'FIG-VAR-003',
        status: 'prepared-pending-human-execution',
        expectedCount: primitiveColors.length,
        entries: primitiveColors,
      },
    },
    batchEvidence: {
      screenshotPaths: pendingPaths(),
      synchronizationChecksum: pendingString(),
      driftStatus: 'not-assessed',
      review: {
        design: 'pending-human-review',
        engineering: 'pending-specialist-review',
        accessibility: 'pending-specialist-review',
        release: 'blocked',
      },
    },
    exclusions: [
      'semantic-variables',
      'theme-variables',
      'responsive-variables',
      'motion-variables',
      'non-color-primitive-variables',
      'ui-components',
      'library-publishing',
      'automated-figma-mutation',
    ],
  };
}

function escapeCell(value) {
  return String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
}

export function renderPrimitiveColorTable(plan) {
  const rows = plan.tasks.primitiveColors.entries.map((entry) => {
    const value = `${entry.sourceValue.hex}; sRGB [${entry.sourceValue.components.join(', ')}]; alpha ${entry.sourceValue.alpha}`;
    return `| ${[
      entry.evidenceId,
      `\`${entry.canonicalTokenPath}\``,
      `\`${entry.figmaVariableName}\``,
      entry.figmaCollection,
      entry.variableType,
      `\`${value}\``,
      entry.description,
      entry.scopes.map((scope) => `\`${scope}\``).join(', '),
      `\`${entry.codeSyntax}\``,
      'Direct value; no alias',
      entry.expectedModeBehavior,
      entry.reviewStatus,
      'Pending human capture',
      'Pending human capture',
    ]
      .map(escapeCell)
      .join(' | ')} |`;
  });

  return `# IOS-002 Batch 1 Primitive Color Execution Table

Status: Generated from the canonical source; pending human Figma execution

Source: \`${plan.source.path}\`  
Source SHA-256: \`${plan.source.sha256}\`  
Expected variables: ${plan.source.tokenCount}

Do not edit token names or values in this table. Regenerate it with \`pnpm figma:batch-1:generate\` after an approved canonical-source change. External IDs remain pending until captured from Figma.

<!-- prettier-ignore -->
| Evidence ID | Canonical token path | Figma variable name | Collection | Type | Source value | Description | Scope | Web code syntax | Alias status | Expected mode behavior | Review status | Collection ID | Variable ID |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rows.join('\n')}
`;
}

export function canonicalBatchProjection(plan) {
  return {
    identity: {
      schemaVersion: plan.schemaVersion,
      id: plan.id,
      milestone: plan.milestone,
      batch: plan.batch,
      owner: plan.owner,
      canonicalFigmaFile: {
        name: plan.canonicalFigmaFile.name,
        url: plan.canonicalFigmaFile.url,
      },
    },
    source: plan.source,
    accessChecks: plan.tasks.accessVerification.checks.map(
      ({ key, label, instruction }) => ({ key, label, instruction }),
    ),
    collectionShells: plan.tasks.collectionShells.collections.map(
      (collection) =>
        Object.fromEntries(
          Object.entries(collection).filter(([key]) => key !== 'evidence'),
        ),
    ),
    primitiveColors: plan.tasks.primitiveColors.entries.map((entry) =>
      Object.fromEntries(
        Object.entries(entry).filter(
          ([key]) =>
            !['collectionId', 'variableId', 'reviewStatus'].includes(key),
        ),
      ),
    ),
    exclusions: plan.exclusions,
  };
}
