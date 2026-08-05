import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { flattenDocument } from '../packages/tokens/lib/token-core.mjs';

const readJson = (path) => readFile(path, 'utf8').then(JSON.parse);
const [schema, plan, capture, hue, data, semantic, light] = await Promise.all([
  readJson('schemas/figma-color-token-reconciliation.schema.json'),
  readJson('evidence/figma/ios-003-2-color-token-reconciliation.json'),
  readJson('evidence/figma/ios-003-1-color-variables.capture.json'),
  readJson('packages/tokens/src/primitives/color.tokens.json'),
  readJson('packages/tokens/src/primitives/color-data.tokens.json'),
  readJson('packages/tokens/src/semantic/color.tokens.json'),
  readJson('packages/tokens/src/themes/light.tokens.json'),
]);
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('IOS-003.3 Figma reconciliation record satisfies its schema', () => {
  assert.equal(validate(plan), true, ajv.errorsText(validate.errors));
});

test('Figma reconciliation accounts for every promoted canonical color token', () => {
  const canonical = [
    ...flattenDocument(hue),
    ...flattenDocument(data),
    ...flattenDocument(semantic),
    ...flattenDocument(light).filter(({ name }) =>
      name.startsWith('color.theme.'),
    ),
  ].map(({ name }) => name);
  const existing = [
    ...capture.primitiveVariables,
    ...capture.semanticVariables,
    ...capture.themeVariables,
  ].map(({ canonicalTokenPath }) => canonicalTokenPath);
  const reconciled = plan.reconciliation.reconciledVariables.map(
    ({ canonicalTokenPath }) => canonicalTokenPath,
  );
  assert.equal(new Set([...existing, ...reconciled]).size, 170);
  assert.deepEqual(
    [...new Set([...existing, ...reconciled])].sort(),
    canonical.sort(),
  );
});

test('Figma reconciliation preserves baseline IDs and records all returned IDs', () => {
  assert.equal(plan.reconciliation.existingVariablesToPreserve, 80);
  assert.ok(
    plan.reconciliation.reconciledVariables.every(
      ({ variableId }) =>
        variableId.status === 'captured' &&
        /^VariableID:[0-9]+:[0-9]+$/.test(variableId.value),
    ),
  );
  assert.equal(plan.controls.preserveVerifiedIds, true);
  assert.equal(plan.controls.inventIds, false);
  assert.equal(plan.controls.mutationPerformed, true);
  assert.equal(
    new Set(
      plan.reconciliation.reconciledVariables.map(
        ({ variableId }) => variableId.value,
      ),
    ).size,
    90,
  );
});

test('Figma scopes follow the approved collection-specific contract', () => {
  for (const entry of plan.reconciliation.reconciledVariables) {
    const expected =
      entry.collection === 'Primitive'
        ? ['ALL_FILLS', 'STROKE_COLOR', 'EFFECT_COLOR']
        : entry.collection === 'Semantic'
          ? ['ALL_FILLS', 'STROKE_COLOR']
          : [];
    assert.deepEqual(entry.scopes, expected, entry.canonicalTokenPath);
  }
});

test('Figma library remains unpublished and specialist/release gates remain pending', () => {
  assert.equal(plan.libraryState, 'unpublished');
  assert.equal(plan.controls.publishLibrary, false);
  assert.equal(plan.controls.accessibilitySpecialistReview, 'pending');
  assert.equal(plan.controls.independentReleaseApproval, 'pending');
});
