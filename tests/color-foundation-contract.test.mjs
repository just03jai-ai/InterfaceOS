import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { flattenDocument } from '../packages/tokens/lib/token-core.mjs';

const [schema, contract, primitiveSource, dataPrimitiveSource, semanticSource] =
  await Promise.all([
    readFile('schemas/color-foundation-contract.schema.json', 'utf8').then(
      JSON.parse,
    ),
    readFile(
      'docs/design-system/foundations/color/color-foundation.contract.json',
      'utf8',
    ).then(JSON.parse),
    readFile('packages/tokens/src/primitives/color.tokens.json', 'utf8').then(
      JSON.parse,
    ),
    readFile(
      'packages/tokens/src/primitives/color-data.tokens.json',
      'utf8',
    ).then(JSON.parse),
    readFile('packages/tokens/src/semantic/color.tokens.json', 'utf8').then(
      JSON.parse,
    ),
  ]);
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('IOS-003.1 color foundation contract satisfies its schema', () => {
  assert.equal(validate(contract), true, ajv.errorsText(validate.errors));
});

test('color foundation baseline counts derive from canonical sources', () => {
  assert.equal(
    contract.currentBaseline.primitiveCount,
    flattenDocument(primitiveSource).length +
      flattenDocument(dataPrimitiveSource).length,
  );
  assert.equal(
    contract.currentBaseline.semanticCount,
    flattenDocument(semanticSource).length,
  );
});

test('color foundation contract introduces no visual color values', () => {
  assert.doesNotMatch(JSON.stringify(contract), /#[a-f0-9]{3,8}\b/i);
  assert.equal(
    contract.currentBaseline.classification,
    'canonical-color-foundation-v1-promoted-unpublished',
  );
});

test('token promotion does not claim public release', () => {
  assert.equal(contract.approvalState.visual, 'approved');
  assert.equal(
    contract.approvalState.release,
    'blocked-pending-independent-approval',
  );
  assert.equal(
    contract.status,
    'canonical-token-promotion-implemented-pending-review',
  );
});

test('approved and deferred primitive families match the V1 decision', () => {
  const proposed = contract.primitiveArchitecture.families.filter(
    ({ disposition }) => disposition === 'not-selected-v1',
  );
  assert.deepEqual(
    proposed.map(({ name }) => name),
    ['orange', 'yellow', 'pink'],
  );
  assert.deepEqual(
    contract.primitiveArchitecture.families
      .filter(({ disposition }) => disposition === 'approved-extended-v1')
      .map(({ name }) => name),
    ['indigo', 'purple', 'teal'],
  );
});

test('primitive and semantic category inventories are complete and ordered', () => {
  assert.deepEqual(
    contract.primitiveArchitecture.families.map(({ name }) => name),
    [
      'neutral',
      'blue',
      'green',
      'red',
      'amber',
      'orange',
      'yellow',
      'indigo',
      'purple',
      'teal',
      'pink',
    ],
  );
  assert.deepEqual(
    contract.semanticArchitecture.categories.map(({ name }) => name),
    [
      'primary',
      'secondary',
      'accent',
      'success',
      'warning',
      'error',
      'info',
      'surface',
      'background',
      'border',
      'text',
      'interactive',
      'focus',
      'selection',
      'overlay',
      'disabled',
      'inverse',
      'muted',
      'data',
    ],
  );
});

test('all canonical sources referenced by the color contract exist', async () => {
  for (const source of contract.canonicalSources) await access(source);
});
