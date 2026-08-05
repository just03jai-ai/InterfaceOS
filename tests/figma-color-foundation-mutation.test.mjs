import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const [schema, record] = await Promise.all([
  readFile('schemas/figma-color-foundation-mutation.schema.json', 'utf8').then(
    JSON.parse,
  ),
  readFile(
    'evidence/figma/ios-003-1-color-foundation.mutation.json',
    'utf8',
  ).then(JSON.parse),
]);
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('Figma Color Foundation mutation record satisfies its schema', () => {
  assert.equal(validate(record), true, ajv.errorsText(validate.errors));
});

test('mutation evidence records exact structure without prohibited assets', () => {
  assert.equal(record.section.id, '26:14');
  assert.equal(record.boards.length, 18);
  assert.deepEqual(
    record.boards.map(({ order }) => order),
    Array.from({ length: 18 }, (_, index) => index + 1),
  );
  assert.equal(new Set(record.boards.map(({ id }) => id)).size, 18);
  assert.equal(record.verification.componentCount, 0);
  assert.equal(record.verification.unboundColorLiteralCount, 0);
  assert.equal(record.verification.localStyleCount, 0);
  assert.equal(record.verification.editableSwatchCount, 110);
  assert.equal(record.verification.canonicalBoundSwatchCount, 32);
  assert.equal(record.verification.emptyEditableSwatchCount, 78);
  assert.equal(record.verification.semanticAliasCount, 24);
  assert.equal(record.verification.themeAliasCount, 48);
  assert.equal(record.collections.localCollectionCount, 5);
  assert.equal(record.collections.localVariableCount, 80);
  assert.equal(record.verification.publishAction, 'not-invoked');
});

test('all required Figma screenshots exist in the repository', async () => {
  await Promise.all(record.screenshots.map(({ path }) => access(path)));
});

test('unavailable revision and specialist approvals remain honest', () => {
  assert.deepEqual(record.figmaRevision.value, null);
  assert.equal(record.figmaRevision.status, 'unavailable');
  assert.equal(record.approvals.accessibility, 'pending-specialist-review');
  assert.equal(record.approvals.engineering, 'pending-specialist-review');
  assert.equal(record.approvals.independentRelease, 'pending');
});
