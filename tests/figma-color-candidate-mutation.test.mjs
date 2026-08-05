import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const [schema, record] = await Promise.all([
  readFile('schemas/figma-color-candidate-mutation.schema.json', 'utf8').then(
    JSON.parse,
  ),
  readFile(
    'evidence/figma/ios-003-1-color-candidates.mutation.json',
    'utf8',
  ).then(JSON.parse),
]);
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('Figma candidate mutation evidence satisfies its schema', () => {
  assert.equal(validate(record), true, ajv.errorsText(validate.errors));
});

test('candidate mutation preserves the production boundary', () => {
  assert.equal(record.counts.canonicalAnchors, 32);
  assert.equal(record.counts.variablesBefore, record.counts.variablesAfter);
  assert.equal(record.verification.newVariablesCreated, false);
  assert.equal(record.verification.semanticMappingsCreated, false);
  assert.equal(record.verification.componentsCreated, false);
  assert.equal(record.verification.libraryPublished, false);
  assert.equal(record.approvals.accessibility, 'pending-specialist-review');
});

test('all palette-completion screenshots exist', async () => {
  await Promise.all(
    record.screenshots.map(async ({ path, sha256 }) => {
      const bytes = await readFile(path);
      assert.equal(createHash('sha256').update(bytes).digest('hex'), sha256);
    }),
  );
});

test('candidate artifact checksum matches the mutation source revision', async () => {
  const bytes = await readFile(record.sourceRevision.candidatePath);
  assert.equal(
    createHash('sha256').update(bytes).digest('hex'),
    record.sourceRevision.candidateSha256,
  );
});
