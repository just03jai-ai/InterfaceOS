import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const [schema, record] = await Promise.all([
  readFile('schemas/color-foundation-approval.schema.json', 'utf8').then(
    JSON.parse,
  ),
  readFile(
    'evidence/reviews/IOS-003-1-COLOR-FOUNDATION-APPROVAL.json',
    'utf8',
  ).then(JSON.parse),
]);
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('Color Foundation V1 approval record satisfies its schema', () => {
  assert.equal(validate(record), true, ajv.errorsText(validate.errors));
});

test('approval preserves the production and publication boundaries', () => {
  assert.equal(record.controls.canonicalTokenValuesChanged, false);
  assert.equal(record.controls.figmaVariablesChanged, false);
  assert.equal(record.controls.componentsCreated, false);
  assert.equal(record.controls.libraryPublished, false);
  assert.equal(record.reviews.independentRelease, 'pending');
  assert.equal(
    record.reviews.accessibilitySpecialistAudit,
    'pending-non-blocking',
  );
});

test('approval evidence paths exist after closure capture', async () => {
  await Promise.all(
    record.figmaEvidence.screenshots.map(async ({ path, sha256 }) => {
      await access(path);
      const bytes = await readFile(path);
      assert.equal(createHash('sha256').update(bytes).digest('hex'), sha256);
    }),
  );
});
