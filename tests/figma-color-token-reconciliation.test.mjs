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

test('IOS-003.2 Figma reconciliation plan satisfies its schema', () => {
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
  const missing = plan.reconciliation.missingVariables.map(
    ({ canonicalTokenPath }) => canonicalTokenPath,
  );
  assert.equal(new Set([...existing, ...missing]).size, 170);
  assert.deepEqual(
    [...new Set([...existing, ...missing])].sort(),
    canonical.sort(),
  );
});

test('Figma reconciliation preserves all verified IDs and invents none', () => {
  assert.equal(plan.reconciliation.existingVariablesToPreserve, 80);
  assert.ok(
    plan.reconciliation.missingVariables.every(
      ({ variableId }) =>
        variableId.status === 'pending-human-capture' &&
        variableId.value === null,
    ),
  );
  assert.equal(plan.controls.preserveVerifiedIds, true);
  assert.equal(plan.controls.inventIds, false);
  assert.equal(plan.controls.mutationPerformed, false);
});

test('Figma library remains private and specialist/release gates remain pending', () => {
  assert.equal(plan.libraryState, 'private-unpublished');
  assert.equal(plan.controls.publishLibrary, false);
  assert.equal(plan.controls.accessibilitySpecialistReview, 'pending');
  assert.equal(plan.controls.independentReleaseApproval, 'pending');
});
