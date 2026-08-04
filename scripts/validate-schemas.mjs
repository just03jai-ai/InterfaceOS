import { readFile, readdir } from 'node:fs/promises';
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

const evidenceFiles = await findJsonFiles(path.join(root, 'evidence'));
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

console.log(
  `Validated ${schemaFiles.length} schemas, the evidence example, and ${manifests.length} evidence manifests.`,
);
