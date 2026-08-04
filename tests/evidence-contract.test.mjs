import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const schema = JSON.parse(
  await readFile('schemas/evidence-manifest.schema.json', 'utf8'),
);
const example = JSON.parse(
  await readFile('schemas/examples/evidence-manifest.example.json', 'utf8'),
);
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('example evidence manifest satisfies the canonical schema', () => {
  assert.equal(validate(example), true, ajv.errorsText(validate.errors));
});

test('evidence manifest rejects an invalid stable identifier', () => {
  assert.equal(validate({ ...example, id: 'button' }), false);
});

test('pending Figma evidence cannot contain identifier-shaped placeholders', () => {
  const invalid = structuredClone(example);
  invalid.figmaEvidence.pageNodeId.value = 'page-id-here';
  assert.equal(validate(invalid), false);
});

test('captured Figma evidence requires a real non-empty value', () => {
  const invalid = structuredClone(example);
  invalid.figmaEvidence.pageNodeId.status = 'captured';
  assert.equal(validate(invalid), false);
});
