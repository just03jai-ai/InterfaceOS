import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const [schema, assessment] = await Promise.all([
  readFile('schemas/color-reference-assessment.schema.json', 'utf8').then(
    JSON.parse,
  ),
  readFile(
    'docs/design-system/foundations/color/framepad-reference-assessment.json',
    'utf8',
  ).then(JSON.parse),
]);
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('Framepad color reference assessment satisfies its schema', () => {
  assert.equal(validate(assessment), true, ajv.errorsText(validate.errors));
});

test('all observed semantic patterns are dispositioned once', () => {
  assert.deepEqual(
    assessment.semanticPatterns.map(({ name }) => name),
    [
      'neutral',
      'primary-brand',
      'secondary',
      'tertiary',
      'success',
      'warning',
      'danger',
      'text',
      'alpha',
    ],
  );
});

test('all observed base-family labels are dispositioned once', () => {
  assert.deepEqual(
    assessment.baseFamilyCandidates.map(({ name }) => name),
    [
      'neutral',
      'success',
      'warning',
      'danger',
      'slate',
      'grey',
      'zinc',
      'stone',
      'orange',
      'yellow',
      'lime',
      'emerald',
      'teal',
      'cyan',
      'sky',
      'blue',
      'indigo',
      'purple',
      'fuchsia',
      'pink',
      'rose',
    ],
  );
});

test('reference assessment adopts no visual values or fixed pairings', () => {
  const serialized = JSON.stringify(assessment);
  assert.doesNotMatch(serialized, /#[a-f0-9]{3,8}\b/i);
  assert.match(assessment.policy, /no-values-assets-or-token-names-adopted/);
  assert.equal(
    assessment.baseFamilyCandidates.some(
      ({ disposition }) => disposition === 'adopted',
    ),
    false,
  );
});
