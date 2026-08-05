import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { flattenDocument } from '../packages/tokens/lib/token-core.mjs';

const readJson = (path) => readFile(path, 'utf8').then(JSON.parse);
const [schema, current, baseline, hue, data, semantic, light] =
  await Promise.all([
    readJson('schemas/figma-color-variable-reconciliation-capture.schema.json'),
    readJson('evidence/figma/ios-003-3-color-variables.capture.json'),
    readJson('evidence/figma/ios-003-1-color-variables.capture.json'),
    readJson('packages/tokens/src/primitives/color.tokens.json'),
    readJson('packages/tokens/src/primitives/color-data.tokens.json'),
    readJson('packages/tokens/src/semantic/color.tokens.json'),
    readJson('packages/tokens/src/themes/light.tokens.json'),
  ]);
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('IOS-003.3 capture satisfies its schema', () => {
  assert.equal(validate(current), true, ajv.errorsText(validate.errors));
});

test('captured delta exactly completes the canonical 170-variable graph', () => {
  const canonical = [
    ...flattenDocument(hue),
    ...flattenDocument(data),
    ...flattenDocument(semantic),
    ...flattenDocument(light).filter(({ name }) =>
      name.startsWith('color.theme.'),
    ),
  ].map(({ name }) => name);
  const oldPaths = [
    ...baseline.primitiveVariables,
    ...baseline.semanticVariables,
    ...baseline.themeVariables,
  ].map(({ canonicalTokenPath }) => canonicalTokenPath);
  const newPaths = current.createdVariables.map(
    ({ canonicalTokenPath }) => canonicalTokenPath,
  );
  assert.equal(new Set(oldPaths).size, 80);
  assert.equal(new Set(newPaths).size, 90);
  assert.equal(new Set([...oldPaths, ...newPaths]).size, 170);
  assert.deepEqual(
    [...new Set([...oldPaths, ...newPaths])].sort(),
    canonical.sort(),
  );
});

test('captured IDs, names, collection counts, and scopes are exact', () => {
  assert.equal(
    new Set(current.createdVariables.map(({ variableId }) => variableId)).size,
    90,
  );
  assert.equal(
    new Set(current.createdVariables.map(({ figmaName }) => figmaName)).size,
    90,
  );
  const count = (collection) =>
    current.createdVariables.filter((entry) => entry.collection === collection)
      .length;
  assert.equal(count('Primitive'), 68);
  assert.equal(count('Theme'), 11);
  assert.equal(count('Semantic'), 11);
  for (const entry of current.createdVariables) {
    const expected =
      entry.collection === 'Primitive'
        ? ['ALL_FILLS', 'STROKE_COLOR', 'EFFECT_COLOR']
        : entry.collection === 'Semantic'
          ? ['ALL_FILLS', 'STROKE_COLOR']
          : [];
    assert.deepEqual(entry.scopes, expected, entry.canonicalTokenPath);
  }
});

test('captured alias targets exist in the complete verified graph', () => {
  const ids = new Set(
    [
      ...baseline.primitiveVariables,
      ...baseline.semanticVariables,
      ...baseline.themeVariables,
    ].map(({ variableId }) => variableId),
  );
  for (const entry of current.createdVariables) ids.add(entry.variableId);
  for (const entry of current.createdVariables) {
    for (const binding of Object.values(entry.modeBindings)) {
      if (binding.kind === 'alias')
        assert.ok(ids.has(binding.targetVariableId));
    }
  }
});

test('captured screenshots exist and match their recorded checksums', async () => {
  for (const screenshot of current.screenshots) {
    const bytes = await readFile(screenshot.path);
    const hash = createHash('sha256').update(bytes).digest('hex');
    assert.equal(hash, screenshot.sha256, screenshot.path);
  }
});

test('human review evidence proves final counts and current unpublished state', async () => {
  assert.equal(current.status, 'ready-for-approval');
  assert.equal(current.approvals.design, 'human-review-complete');
  assert.deepEqual(current.humanReviewClosure.technicalBlockers, []);

  const variablesEvidence = current.humanReviewClosure.variablesPanelEvidence;
  assert.deepEqual(
    {
      primitive: variablesEvidence.primitiveCount,
      semantic: variablesEvidence.semanticCount,
      theme: variablesEvidence.themeCount,
      total: variablesEvidence.totalColorVariableCount,
    },
    { primitive: 100, semantic: 35, theme: 35, total: 170 },
  );

  const publicationEvidence = current.humanReviewClosure.publicationEvidence;
  assert.equal(publicationEvidence.verifiedState, 'unpublished');
  assert.equal(
    publicationEvidence.visibleIndicator,
    'Publish action available',
  );

  for (const evidence of [variablesEvidence, publicationEvidence]) {
    const bytes = await readFile(evidence.path);
    assert.equal(
      createHash('sha256').update(bytes).digest('hex'),
      evidence.sha256,
    );
  }
});

test('release and specialist approvals remain pending', () => {
  assert.equal(current.approvals.accessibility, 'pending-specialist-review');
  assert.equal(current.approvals.engineering, 'pending-specialist-review');
  assert.equal(current.approvals.independentRelease, 'pending');
  assert.equal(current.approvals.release, 'blocked');
  assert.equal(current.library.publishAction, 'not-invoked');
});

test('unpublished library state uses governed human attestation and screenshot evidence', () => {
  assert.equal(
    current.library.fileSharingPermissionsGovernance,
    'separate-from-library-publication',
  );
  assert.equal(
    current.library.publicationStateVerification,
    'human-confirmed-unpublished',
  );
  assert.equal(current.library.humanConfirmation.screenshotStatus, 'captured');
  assert.equal(current.library.humanConfirmation.confirmedDate, '2026-08-06');
  assert.equal(current.library.humanConfirmation.screenshotStatus, 'captured');
  assert.match(
    current.library.humanConfirmation.limitation,
    /Publish action.*unpublished.*Plugin API.*publication history/i,
  );
});
