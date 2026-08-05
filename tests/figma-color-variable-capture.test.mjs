import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { flattenDocument } from '../packages/tokens/lib/token-core.mjs';

const [schema, capture, primitive, semantic, light, dark] = await Promise.all([
  readFile('schemas/figma-color-variable-capture.schema.json', 'utf8').then(
    JSON.parse,
  ),
  readFile(
    'evidence/figma/ios-003-1-color-variables.capture.json',
    'utf8',
  ).then(JSON.parse),
  readFile('packages/tokens/src/primitives/color.tokens.json', 'utf8').then(
    JSON.parse,
  ),
  readFile('packages/tokens/src/semantic/color.tokens.json', 'utf8').then(
    JSON.parse,
  ),
  readFile('packages/tokens/src/themes/light.tokens.json', 'utf8').then(
    JSON.parse,
  ),
  readFile('packages/tokens/src/themes/dark.tokens.json', 'utf8').then(
    JSON.parse,
  ),
]);
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);
const reference = (value) => value.slice(1, -1);

test('Figma color variable capture satisfies its schema', () => {
  assert.equal(validate(capture), true, ajv.errorsText(validate.errors));
});

test('captured primitive, semantic, and theme names exactly match canonical sources', () => {
  const expectedPrimitive = flattenDocument(primitive)
    .map(({ name }) => name)
    .sort();
  const expectedSemantic = flattenDocument(semantic)
    .map(({ name }) => name)
    .sort();
  const expectedTheme = flattenDocument(light)
    .filter(({ name }) => name.startsWith('color.theme.'))
    .map(({ name }) => name)
    .sort();
  assert.deepEqual(
    capture.primitiveVariables
      .map(({ canonicalTokenPath }) => canonicalTokenPath)
      .sort(),
    expectedPrimitive,
  );
  assert.deepEqual(
    capture.semanticVariables
      .map(({ canonicalTokenPath }) => canonicalTokenPath)
      .sort(),
    expectedSemantic,
  );
  assert.deepEqual(
    capture.themeVariables
      .map(({ canonicalTokenPath }) => canonicalTokenPath)
      .sort(),
    expectedTheme,
  );
});

test('captured IDs and names are unique and all aliases target captured variables', () => {
  const variables = [
    ...capture.primitiveVariables,
    ...capture.themeVariables,
    ...capture.semanticVariables,
  ];
  assert.equal(new Set(variables.map(({ variableId }) => variableId)).size, 80);
  assert.equal(new Set(variables.map(({ figmaName }) => figmaName)).size, 80);
  const ids = new Set(variables.map(({ variableId }) => variableId));
  for (const entry of capture.themeVariables) {
    assert.ok(ids.has(entry.lightAlias.variableId));
    assert.ok(ids.has(entry.darkAlias.variableId));
  }
  for (const entry of capture.semanticVariables)
    assert.ok(ids.has(entry.themeAlias.variableId));
});

test('captured aliases reproduce canonical Light, Dark, and Semantic references', () => {
  const lightMap = new Map(
    flattenDocument(light).map(({ name, token }) => [
      name,
      reference(token.$value),
    ]),
  );
  const darkMap = new Map(
    flattenDocument(dark).map(({ name, token }) => [
      name,
      reference(token.$value),
    ]),
  );
  const semanticMap = new Map(
    flattenDocument(semantic).map(({ name, token }) => [
      name,
      reference(token.$value),
    ]),
  );
  for (const entry of capture.themeVariables) {
    assert.equal(
      entry.lightAlias.canonicalTokenPath,
      lightMap.get(entry.canonicalTokenPath),
    );
    assert.equal(
      entry.darkAlias.canonicalTokenPath,
      darkMap.get(entry.canonicalTokenPath),
    );
  }
  for (const entry of capture.semanticVariables) {
    assert.equal(
      entry.themeAlias.canonicalTokenPath,
      semanticMap.get(entry.canonicalTokenPath),
    );
  }
});

test('collection modes and color counts match the approved five-collection model', () => {
  assert.deepEqual(
    capture.collections.map(({ name, colorVariableCount }) => [
      name,
      colorVariableCount,
    ]),
    [
      ['Primitive', 32],
      ['Semantic', 24],
      ['Theme', 24],
      ['Responsive', 0],
      ['Motion', 0],
    ],
  );
  assert.deepEqual(
    capture.collections
      .find(({ name }) => name === 'Theme')
      .modes.map(({ name }) => name),
    ['Light', 'Dark'],
  );
});
