import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { flattenDocument } from '../packages/tokens/lib/token-core.mjs';
import {
  buildBatchOnePlan,
  canonicalBatchProjection,
  PLAN_PATH,
  renderPrimitiveColorTable,
  SOURCE_PATH,
  TABLE_PATH,
} from '../scripts/lib/figma-variable-batch-1.mjs';

const [schema, plan, source] = await Promise.all([
  readFile('schemas/figma-variable-execution-batch.schema.json', 'utf8').then(
    JSON.parse,
  ),
  readFile(PLAN_PATH, 'utf8').then(JSON.parse),
  readFile(SOURCE_PATH, 'utf8').then(JSON.parse),
]);
const canonicalEntries = flattenDocument(source, SOURCE_PATH);
const executionEntries = plan.tasks.primitiveColors.entries;
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('IOS-002 Batch 1 plan satisfies its schema', () => {
  assert.equal(validate(plan), true, ajv.errorsText(validate.errors));
});

test('every canonical primitive color appears exactly once', () => {
  const canonicalNames = canonicalEntries.map(({ name }) => name).sort();
  const plannedNames = executionEntries
    .map(({ canonicalTokenPath }) => canonicalTokenPath)
    .sort();
  assert.deepEqual(plannedNames, canonicalNames);
  assert.equal(new Set(plannedNames).size, canonicalNames.length);
});

test('Batch 1 introduces no unsupported token or value', () => {
  const canonical = new Map(
    canonicalEntries.map(({ name, token }) => [name, token]),
  );
  for (const entry of executionEntries) {
    const token = canonical.get(entry.canonicalTokenPath);
    assert.ok(token, `Unsupported token ${entry.canonicalTokenPath}`);
    assert.deepEqual(entry.sourceValue, token.$value);
    assert.equal(entry.description, token.$description);
    assert.equal(entry.variableType, 'COLOR');
  }
});

test('Figma names and web code syntax follow approved conversions', () => {
  for (const entry of executionEntries) {
    assert.equal(
      entry.figmaVariableName,
      entry.canonicalTokenPath.replaceAll('.', '/'),
    );
    assert.equal(
      entry.codeSyntax,
      `var(--ios-${entry.canonicalTokenPath.replaceAll('.', '-')})`,
    );
  }
});

test('canonical and planned primitive color counts match', () => {
  assert.equal(canonicalEntries.length, 32);
  assert.equal(plan.source.tokenCount, canonicalEntries.length);
  assert.equal(
    plan.tasks.primitiveColors.expectedCount,
    canonicalEntries.length,
  );
  assert.equal(executionEntries.length, canonicalEntries.length);
});

test('Figma variable names are unique and use the governed color evidence ID', () => {
  assert.equal(
    new Set(executionEntries.map(({ figmaVariableName }) => figmaVariableName))
      .size,
    executionEntries.length,
  );
  assert.ok(
    executionEntries.every(({ evidenceId }) => evidenceId === 'IOS-FND-COLOR'),
  );
});

test('later Figma ID capture is explicit and contains no invented IDs', () => {
  for (const entry of executionEntries) {
    assert.deepEqual(entry.collectionId, {
      status: 'pending-human-capture',
      value: null,
    });
    assert.deepEqual(entry.variableId, {
      status: 'pending-human-capture',
      value: null,
    });
  }
  for (const collection of plan.tasks.collectionShells.collections) {
    assert.equal(collection.evidence.collectionId.value, null);
    assert.deepEqual(collection.evidence.screenshotPaths.values, []);
  }
});

test('schema accepts later verified collection and variable ID capture', () => {
  const captured = structuredClone(plan);
  captured.tasks.collectionShells.collections[0].evidence.collectionId = {
    status: 'captured',
    value: 'VariableCollectionId:verified-example',
  };
  captured.tasks.primitiveColors.entries[0].collectionId = {
    status: 'captured',
    value: 'VariableCollectionId:verified-example',
  };
  captured.tasks.primitiveColors.entries[0].variableId = {
    status: 'captured',
    value: 'VariableID:verified-example',
  };
  captured.tasks.primitiveColors.entries[0].reviewStatus = 'in-review';
  assert.equal(validate(captured), true, ajv.errorsText(validate.errors));
});

test('Batch 1 contains only primitive color variables', () => {
  assert.ok(
    executionEntries.every(
      (entry) =>
        entry.canonicalTokenPath.startsWith('color.primitive.') &&
        entry.figmaCollection === 'Primitive',
    ),
  );
  assert.deepEqual(
    plan.tasks.collectionShells.collections.map((collection) => [
      collection.displayName,
      collection.expectedFirstBatchContents.variableCount,
    ]),
    [
      ['Primitive', 32],
      ['Semantic', 0],
      ['Theme', 0],
      ['Responsive', 0],
      ['Motion', 0],
    ],
  );
});

test('generated Batch 1 artifacts are reproducible from canonical source', async () => {
  const expectedPlan = await buildBatchOnePlan();
  const [actualPlan, actualTable] = await Promise.all([
    readFile(PLAN_PATH, 'utf8'),
    readFile(TABLE_PATH, 'utf8'),
  ]);
  assert.deepEqual(
    canonicalBatchProjection(JSON.parse(actualPlan)),
    canonicalBatchProjection(expectedPlan),
  );
  assert.equal(actualTable, renderPrimitiveColorTable(expectedPlan));
});
