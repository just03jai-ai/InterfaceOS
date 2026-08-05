import { readFile, writeFile } from 'node:fs/promises';
import prettier from 'prettier';
import { flattenDocument } from '../packages/tokens/lib/token-core.mjs';

const outputPath = 'evidence/figma/ios-003-2-color-token-reconciliation.json';
const readJson = (path) => readFile(path, 'utf8').then(JSON.parse);
const reference = (value) =>
  typeof value === 'string' && /^\{.+\}$/.test(value)
    ? value.slice(1, -1)
    : null;

const [capture, huePrimitive, dataPrimitive, semantic, light, dark] =
  await Promise.all([
    readJson('evidence/figma/ios-003-1-color-variables.capture.json'),
    readJson('packages/tokens/src/primitives/color.tokens.json'),
    readJson('packages/tokens/src/primitives/color-data.tokens.json'),
    readJson('packages/tokens/src/semantic/color.tokens.json'),
    readJson('packages/tokens/src/themes/light.tokens.json'),
    readJson('packages/tokens/src/themes/dark.tokens.json'),
  ]);

const existing = new Map(
  [
    ...capture.primitiveVariables,
    ...capture.themeVariables,
    ...capture.semanticVariables,
  ].map((entry) => [entry.canonicalTokenPath, entry]),
);
const collectionIds = Object.fromEntries(
  capture.collections.map((collection) => [
    collection.name,
    collection.collectionId,
  ]),
);
const primitiveEntries = [
  ...flattenDocument(huePrimitive),
  ...flattenDocument(dataPrimitive),
];
const semanticEntries = flattenDocument(semantic);
const lightMap = new Map(
  flattenDocument(light).map(({ name, token }) => [name, token]),
);
const darkMap = new Map(
  flattenDocument(dark).map(({ name, token }) => [name, token]),
);

function pendingEntry(entry, collection, values) {
  return {
    canonicalTokenPath: entry.name,
    figmaName: entry.name.replaceAll('.', '/'),
    collection,
    collectionId: collectionIds[collection],
    variableType: 'COLOR',
    scopes: ['ALL_FILLS', 'STROKE_COLOR', 'EFFECT_COLOR'],
    values,
    variableId: { status: 'pending-human-capture', value: null },
    mutationStatus: 'pending-authenticated-figma-execution',
  };
}

const missingVariables = [];
for (const entry of primitiveEntries) {
  if (existing.has(entry.name)) continue;
  missingVariables.push(
    pendingEntry(entry, 'Primitive', {
      storage: reference(entry.token.$value)
        ? { kind: 'alias', canonicalTokenPath: reference(entry.token.$value) }
        : { kind: 'direct', value: entry.token.$value },
    }),
  );
}
for (const [name, lightToken] of lightMap) {
  if (existing.has(name)) continue;
  const entry = { name };
  missingVariables.push(
    pendingEntry(entry, 'Theme', {
      Light: {
        kind: 'alias',
        canonicalTokenPath: reference(lightToken.$value),
      },
      Dark: {
        kind: 'alias',
        canonicalTokenPath: reference(darkMap.get(name).$value),
      },
    }),
  );
}
for (const entry of semanticEntries) {
  if (existing.has(entry.name)) continue;
  missingVariables.push(
    pendingEntry(entry, 'Semantic', {
      storage: {
        kind: 'alias',
        canonicalTokenPath: reference(entry.token.$value),
      },
    }),
  );
}

const targetCounts = {
  Primitive: primitiveEntries.length,
  Semantic: semanticEntries.length,
  Theme: lightMap.size,
  Responsive: 0,
  Motion: 0,
};
const plan = {
  $schema: '../../schemas/figma-color-token-reconciliation.schema.json',
  schemaVersion: '1.0.0',
  id: 'IOS-003.2-FIGMA-COLOR-TOKEN-RECONCILIATION',
  milestone: 'IOS-003.2',
  status: 'blocked-pending-authenticated-figma-execution',
  fileKey: capture.fileKey,
  libraryState: 'private-unpublished',
  access: {
    liveVerification: 'blocked-integration-usage-limit',
    historicalBaseline: 'verified-ios-003.1-evidence',
    retryAfter: '2026-08-11T21:18:00+05:30',
  },
  baseline: {
    variableCount: existing.size,
    collectionIds,
    evidencePath: 'evidence/figma/ios-003-1-color-variables.capture.json',
  },
  target: {
    variableCount: Object.values(targetCounts).reduce(
      (sum, count) => sum + count,
      0,
    ),
    collectionCounts: targetCounts,
  },
  reconciliation: {
    existingVariablesToPreserve: existing.size,
    variablesToCreate: missingVariables.length,
    variablesToUpdate: 0,
    missingVariables,
  },
  controls: {
    preserveVerifiedIds: true,
    publishLibrary: false,
    createComponents: false,
    inventIds: false,
    mutationPerformed: false,
    accessibilitySpecialistReview: 'pending',
    independentReleaseApproval: 'pending',
  },
};

const serialized = await prettier.format(JSON.stringify(plan), {
  parser: 'json',
});
if (process.argv.includes('--check')) {
  const existingOutput = await readFile(outputPath, 'utf8');
  if (existingOutput !== serialized)
    throw new Error(
      `${outputPath} is stale; run pnpm figma:ios-003-2:generate.`,
    );
  console.log(
    `Validated IOS-003.2 Figma reconciliation plan for ${missingVariables.length} pending variables.`,
  );
} else {
  await writeFile(outputPath, serialized);
  console.log(
    `Generated IOS-003.2 Figma reconciliation plan for ${missingVariables.length} pending variables.`,
  );
}
