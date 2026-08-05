import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import {
  flattenDocument,
  loadThemeEntries,
  validateTokenEntries,
} from '../packages/tokens/lib/token-core.mjs';

const readJson = (path) => readFile(path, 'utf8').then(JSON.parse);
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const sourceRoot = 'packages/tokens/src';
const [
  schema,
  manifest,
  approvedPalette,
  baseline,
  primitive,
  dataPrimitive,
  semantic,
  light,
  dark,
  contract,
] = await Promise.all([
  readJson('schemas/color-token-promotion.schema.json'),
  readJson(
    'docs/design-system/foundations/color/color-token-promotion.manifest.json',
  ),
  readJson(
    'docs/design-system/foundations/color/color-candidates.approved-v1.json',
  ),
  readJson('evidence/snapshots/ios-003-1-canonical-color.tokens.json'),
  readJson('packages/tokens/src/primitives/color.tokens.json'),
  readJson('packages/tokens/src/primitives/color-data.tokens.json'),
  readJson('packages/tokens/src/semantic/color.tokens.json'),
  readJson('packages/tokens/src/themes/light.tokens.json'),
  readJson('packages/tokens/src/themes/dark.tokens.json'),
  readJson('packages/tokens/src/contracts/theme-contract.json'),
]);
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('IOS-003.2 promotion manifest satisfies its schema and approved evidence checksums', async () => {
  assert.equal(validate(manifest), true, ajv.errorsText(validate.errors));
  assert.equal(
    manifest.source.approvedPaletteSha256,
    sha256(
      await readFile(
        'docs/design-system/foundations/color/color-candidates.approved-v1.json',
      ),
    ),
  );
  assert.equal(
    manifest.source.frozenCanonicalSha256,
    sha256(
      await readFile(
        'evidence/snapshots/ios-003-1-canonical-color.tokens.json',
      ),
    ),
  );
});

test('all approved hue families and stops are canonical with exact approved values', () => {
  const expectedStops = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ];
  for (const family of [
    'neutral',
    'blue',
    'green',
    'amber',
    'red',
    'indigo',
    'purple',
    'teal',
  ]) {
    const expected =
      family === 'neutral' ? ['0', ...expectedStops] : expectedStops;
    assert.deepEqual(Object.keys(primitive.color.primitive[family]), expected);
    const approved = new Map(
      approvedPalette.families[family].map((entry) => [entry.stop, entry.hex]),
    );
    for (const stop of expected)
      assert.equal(
        primitive.color.primitive[family][stop].$value.hex.toUpperCase(),
        approved.get(stop),
      );
  }
});

test('all pre-promotion canonical anchor values are preserved exactly', () => {
  for (const { name, token } of flattenDocument(baseline)) {
    const current = flattenDocument(primitive).find(
      (entry) => entry.name === name,
    );
    assert.ok(current, `${name} was removed`);
    assert.deepEqual(current.token.$value, token.$value, `${name} changed`);
  }
});

test('Primary remains a semantic and theme alias strategy backed by Blue', () => {
  assert.equal(primitive.color.primitive.primary, undefined);
  assert.equal(
    light.color.theme.interactive.primary.default.$value,
    '{color.primitive.blue.700}',
  );
  assert.equal(
    dark.color.theme.interactive.primary.default.$value,
    '{color.primitive.blue.400}',
  );
  assert.equal(
    semantic.color.semantic.interactive.primary.default.$value,
    '{color.theme.interactive.primary.default}',
  );
});

test('Data 01–11 use the dedicated categorical namespace and preserve approved values', async () => {
  const expectedStops = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
  ];
  assert.deepEqual(
    Object.keys(dataPrimitive.color.primitive.data)
      .filter((key) => !key.startsWith('$'))
      .sort(),
    expectedStops,
  );
  const approved = new Map(
    approvedPalette.dataColors.map((entry) => [entry.stop, entry.hex]),
  );
  for (const theme of ['light', 'dark']) {
    const result = validateTokenEntries(
      await loadThemeEntries(sourceRoot, theme),
      contract,
    );
    assert.deepEqual(result.errors, []);
    for (const stop of expectedStops) {
      const value = result.resolved.get(
        `color.semantic.data.categorical.${stop}`,
      );
      assert.equal(value.hex.toUpperCase(), approved.get(stop));
    }
  }
});

test('promotion and current candidate generation are deterministic', () => {
  assert.doesNotThrow(() =>
    execFileSync(process.execPath, [
      'scripts/promote-color-foundation-v1.mjs',
      '--check',
    ]),
  );
  assert.doesNotThrow(() =>
    execFileSync(process.execPath, [
      'scripts/generate-color-candidates.mjs',
      '--check',
    ]),
  );
});

test('the current candidate projection is tied to the promoted canonical source', async () => {
  const generated = await readJson(
    'docs/design-system/foundations/color/color-candidates.generated.json',
  );
  assert.equal(
    generated.source.canonicalSha256,
    sha256(await readFile('packages/tokens/src/primitives/color.tokens.json')),
  );
  assert.equal(generated.source.canonicalValuesModified, false);
});
