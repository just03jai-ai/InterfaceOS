import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const [schema, blueprint] = await Promise.all([
  readFile('schemas/figma-color-foundation-blueprint.schema.json', 'utf8').then(
    JSON.parse,
  ),
  readFile(
    'docs/design-system/foundations/color/figma-color-foundation-blueprint.json',
    'utf8',
  ).then(JSON.parse),
]);
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

const expectedBoardNames = [
  'Color / 01 Philosophy',
  'Color / 02 Architecture',
  'Color / 03 Primitive Families',
  'Color / 04 Semantic Colors',
  'Color / 05 Theme Mapping',
  'Color / 06 Text Hierarchy',
  'Color / 07 Surface System',
  'Color / 08 Border System',
  'Color / 09 Alpha System',
  'Color / 10 Interactive States',
  'Color / 11 Feedback States',
  'Color / 12 Accessibility',
  'Color / 13 Dashboard Colors',
  'Color / 14 Chart Colors',
  'Color / 15 Light Theme',
  'Color / 16 Dark Theme',
  'Color / 17 Decision Log',
  'Color / 18 Review & Approval',
];

test('Figma Color Foundation blueprint satisfies its schema', () => {
  assert.equal(validate(blueprint), true, ajv.errorsText(validate.errors));
});

test('Figma Color Foundation board hierarchy is exact and ordered', () => {
  assert.deepEqual(
    blueprint.boards.map(({ order }) => order),
    Array.from({ length: 18 }, (_, index) => index + 1),
  );
  assert.deepEqual(
    blueprint.boards.map(({ name }) => name),
    expectedBoardNames,
  );
});

test('implemented Color section and board IDs are captured without placeholders', () => {
  assert.equal(blueprint.status, 'implemented-pending-human-review');
  assert.deepEqual(blueprint.section, {
    name: 'Color',
    id: '26:14',
    captureStatus: 'captured',
  });
  assert.equal(
    blueprint.boards.every(
      ({ frameId, status }) =>
        /^[0-9]+:[0-9]+$/.test(frameId) && status === 'verified',
    ),
    true,
  );
  assert.equal(
    new Set(blueprint.boards.map(({ frameId }) => frameId)).size,
    18,
  );
});

test('all approved collections have verified captured IDs', () => {
  assert.deepEqual(
    blueprint.variablePlaceholders.map(({ collection }) => collection),
    ['Primitive', 'Semantic', 'Theme', 'Responsive', 'Motion'],
  );
  assert.equal(
    blueprint.variablePlaceholders.every(({ collectionId }) =>
      /^VariableCollectionId:[0-9]+:[0-9]+$/.test(collectionId),
    ),
    true,
  );
  assert.equal(
    new Set(
      blueprint.variablePlaceholders.map(({ collectionId }) => collectionId),
    ).size,
    5,
  );
});

test('blueprint permits canonical variable representation but forbids components, styles, invented final values, and publishing', () => {
  assert.equal(blueprint.constraints.createComponents, false);
  assert.equal(blueprint.constraints.createVariables, true);
  assert.equal(blueprint.constraints.createStyles, false);
  assert.equal(blueprint.constraints.createFinalColorValues, false);
  assert.equal(blueprint.constraints.publishLibrary, false);
  assert.doesNotMatch(JSON.stringify(blueprint), /#[a-f0-9]{3,8}\b/i);
});
