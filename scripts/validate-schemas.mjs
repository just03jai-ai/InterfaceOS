import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const schemasDir = path.join(root, 'schemas');
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

const schemaFiles = (await readdir(schemasDir)).filter((file) =>
  file.endsWith('.schema.json'),
);
for (const file of schemaFiles) {
  const schema = JSON.parse(
    await readFile(path.join(schemasDir, file), 'utf8'),
  );
  ajv.addSchema(schema);
}

const evidenceSchema = ajv.getSchema(
  'https://interfaceos.dev/schemas/evidence-manifest.schema.json',
);
const figmaArchitectureSchema = ajv.getSchema(
  'https://interfaceos.dev/schemas/figma-architecture-manifest.schema.json',
);
const figmaVariableBatchSchema = ajv.getSchema(
  'https://interfaceos.dev/schemas/figma-variable-execution-batch.schema.json',
);
const example = JSON.parse(
  await readFile(
    path.join(schemasDir, 'examples/evidence-manifest.example.json'),
    'utf8',
  ),
);
if (!evidenceSchema?.(example)) {
  throw new Error(
    `Evidence example is invalid: ${ajv.errorsText(evidenceSchema?.errors)}`,
  );
}

async function findJsonFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await findJsonFiles(entryPath)));
    else if (entry.name.endsWith('.json')) files.push(entryPath);
  }
  return files;
}

const figmaArchitecturePath = path.join(
  root,
  'evidence/figma/interfaceos-design-system.architecture.json',
);
const figmaArchitecture = JSON.parse(
  await readFile(figmaArchitecturePath, 'utf8'),
);
if (!figmaArchitectureSchema?.(figmaArchitecture)) {
  throw new Error(
    `Figma architecture manifest is invalid: ${ajv.errorsText(figmaArchitectureSchema?.errors)}`,
  );
}

const figmaVariableBatchPath = path.join(
  root,
  'evidence/figma/ios-002-batch-1.variable-execution.json',
);
const figmaVariableBatch = JSON.parse(
  await readFile(figmaVariableBatchPath, 'utf8'),
);
if (!figmaVariableBatchSchema?.(figmaVariableBatch)) {
  throw new Error(
    `Figma variable Batch 1 record is invalid: ${ajv.errorsText(figmaVariableBatchSchema?.errors)}`,
  );
}

const evidenceFiles = (await findJsonFiles(path.join(root, 'evidence'))).filter(
  (file) =>
    !file.endsWith('.architecture.json') &&
    !file.endsWith('.variable-execution.json'),
);
const manifests = [];
for (const file of evidenceFiles) {
  const manifest = JSON.parse(await readFile(file, 'utf8'));
  if (!evidenceSchema?.(manifest)) {
    throw new Error(
      `${path.relative(root, file)} is invalid: ${ajv.errorsText(evidenceSchema?.errors)}`,
    );
  }
  manifests.push({ file, manifest });
}

const evidenceIds = new Set(manifests.map(({ manifest }) => manifest.id));
if (evidenceIds.size !== manifests.length)
  throw new Error('Evidence manifests contain duplicate stable IDs.');
for (const { file, manifest } of manifests) {
  const targets = [
    ...manifest.dependencies.map((dependency) => dependency.id),
    ...manifest.relatedItems.map((relationship) => relationship.targetId),
  ];
  for (const target of targets) {
    if (!evidenceIds.has(target))
      throw new Error(
        `${path.relative(root, file)} references missing evidence ID ${target}.`,
      );
  }
}

const fakeExternalValue =
  /^(?:tbd|todo|unknown|pending|pending-human-capture|page-id|node-id|section-id|collection-id|variable-id)(?:$|[-_ :])/i;
function assertNoFakeCapturedValues(value, location) {
  if (!value || typeof value !== 'object') return;
  if (
    value.status === 'captured' &&
    typeof value.value === 'string' &&
    fakeExternalValue.test(value.value)
  ) {
    throw new Error(`${location} contains a fake captured external value.`);
  }
  if (value.status === 'captured' && Array.isArray(value.values)) {
    for (const captured of value.values) {
      if (fakeExternalValue.test(captured))
        throw new Error(`${location} contains a fake captured external ID.`);
    }
  }
  for (const [key, child] of Object.entries(value))
    assertNoFakeCapturedValues(child, `${location}.${key}`);
}

for (const { file, manifest } of manifests)
  assertNoFakeCapturedValues(manifest.figmaEvidence, path.relative(root, file));
assertNoFakeCapturedValues(figmaArchitecture, 'Figma architecture manifest');
assertNoFakeCapturedValues(figmaVariableBatch, 'Figma variable Batch 1 record');

for (const page of figmaArchitecture.pages) {
  for (const item of page.items) {
    for (const evidenceId of item.relatedEvidenceIds) {
      if (!evidenceIds.has(evidenceId))
        throw new Error(
          `Figma architecture item ${page.name}/${item.name} references missing evidence ID ${evidenceId}.`,
        );
    }
    for (const repositoryPath of [
      ...item.plannedDocumentationPaths,
      ...item.plannedTokenSourceMappings,
    ]) {
      try {
        await access(path.join(root, repositoryPath));
      } catch {
        throw new Error(
          `Figma architecture item ${page.name}/${item.name} references missing path ${repositoryPath}.`,
        );
      }
    }
  }
}

console.log(
  `Validated ${schemaFiles.length} schemas, the evidence example, ${manifests.length} evidence manifests, the Figma architecture manifest, and the IOS-002 Batch 1 execution record.`,
);
