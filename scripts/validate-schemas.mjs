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

console.log(
  `Validated ${schemaFiles.length} schemas and the evidence example.`,
);
