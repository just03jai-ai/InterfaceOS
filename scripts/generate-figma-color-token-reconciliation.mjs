import { readFile, writeFile } from 'node:fs/promises';
import prettier from 'prettier';
import { flattenDocument } from '../packages/tokens/lib/token-core.mjs';

const outputPath = 'evidence/figma/ios-003-2-color-token-reconciliation.json';
const readJson = (path) => readFile(path, 'utf8').then(JSON.parse);
const reference = (value) =>
  typeof value === 'string' && /^\{.+\}$/.test(value)
    ? value.slice(1, -1)
    : null;

const [
  capture,
  reconciliationCapture,
  huePrimitive,
  dataPrimitive,
  semantic,
  light,
  dark,
] = await Promise.all([
  readJson('evidence/figma/ios-003-1-color-variables.capture.json'),
  readJson('evidence/figma/ios-003-3-color-variables.capture.json'),
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

const capturedByPath = new Map(
  reconciliationCapture.createdVariables.map((entry) => [
    entry.canonicalTokenPath,
    entry,
  ]),
);

function reconciledEntry(entry, collection, values) {
  const captured = capturedByPath.get(entry.name);
  if (!captured)
    throw new Error(`Missing IOS-003.3 capture for ${entry.name}.`);
  if (captured.collection !== collection)
    throw new Error(
      `${entry.name} was captured in ${captured.collection}, expected ${collection}.`,
    );
  return {
    canonicalTokenPath: entry.name,
    figmaName: entry.name.replaceAll('.', '/'),
    collection,
    collectionId: collectionIds[collection],
    variableType: 'COLOR',
    scopes: captured.scopes,
    values,
    variableId: { status: 'captured', value: captured.variableId },
    mutationStatus: 'created-and-verified',
  };
}

const reconciledVariables = [];
for (const entry of primitiveEntries) {
  if (existing.has(entry.name)) continue;
  reconciledVariables.push(
    reconciledEntry(entry, 'Primitive', {
      storage: reference(entry.token.$value)
        ? { kind: 'alias', canonicalTokenPath: reference(entry.token.$value) }
        : { kind: 'direct', value: entry.token.$value },
    }),
  );
}
for (const [name, lightToken] of lightMap) {
  if (existing.has(name)) continue;
  const entry = { name };
  reconciledVariables.push(
    reconciledEntry(entry, 'Theme', {
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
  reconciledVariables.push(
    reconciledEntry(entry, 'Semantic', {
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
  schemaVersion: '1.1.0',
  id: 'IOS-003.2-FIGMA-COLOR-TOKEN-RECONCILIATION',
  milestone: 'IOS-003.2',
  status: 'implemented-pending-human-review',
  fileKey: capture.fileKey,
  libraryState: 'unpublished',
  access: {
    liveVerification: 'verified-authenticated-figma-plugin-api',
    historicalBaseline: 'verified-ios-003.1-evidence',
    capturePath: 'evidence/figma/ios-003-3-color-variables.capture.json',
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
    variablesToCreate: reconciledVariables.length,
    variablesToUpdate: 0,
    reconciledVariables,
  },
  controls: {
    preserveVerifiedIds: true,
    publishLibrary: false,
    createComponents: false,
    inventIds: false,
    mutationPerformed: true,
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
    `Validated IOS-003.3 Figma reconciliation for ${reconciledVariables.length} created variables.`,
  );
} else {
  await writeFile(outputPath, serialized);
  console.log(
    `Generated IOS-003.3 Figma reconciliation for ${reconciledVariables.length} created variables.`,
  );
}
