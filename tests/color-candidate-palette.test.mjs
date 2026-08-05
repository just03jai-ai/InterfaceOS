import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const [schema, palette, canonicalBytes] = await Promise.all([
  readFile('schemas/color-candidate-palette.schema.json', 'utf8').then(
    JSON.parse,
  ),
  readFile(
    'docs/design-system/foundations/color/color-candidates.generated.json',
    'utf8',
  ).then(JSON.parse),
  readFile('packages/tokens/src/primitives/color.tokens.json'),
]);
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('candidate palette satisfies its machine-readable schema', () => {
  assert.equal(validate(palette), true, ajv.errorsText(validate.errors));
});

test('candidate artifact is tied to the unmodified canonical source', () => {
  assert.equal(
    palette.source.canonicalSha256,
    createHash('sha256').update(canonicalBytes).digest('hex'),
  );
  assert.equal(palette.source.canonicalValuesModified, false);
});

test('standard families are complete, ordered, unique, and monotonic', () => {
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
    'blue',
    'green',
    'red',
    'amber',
    'indigo',
    'purple',
    'teal',
    'primary',
  ]) {
    const entries = palette.families[family];
    assert.deepEqual(
      entries.map(({ stop }) => stop),
      expectedStops,
    );
    assert.equal(new Set(entries.map(({ hex }) => hex)).size, entries.length);
    assert.ok(
      entries.every(({ diagnostics }) => diagnostics.monotonicLightness),
    );
  }
  assert.deepEqual(
    palette.families.neutral.map(({ stop }) => stop),
    ['0', ...expectedStops],
  );
});

test('canonical anchors remain exact and generated stops remain non-canonical', () => {
  const canonicalDocument = JSON.parse(canonicalBytes.toString('utf8'));
  const source = canonicalDocument.color.primitive;
  for (const family of ['neutral', 'blue', 'green', 'red', 'amber']) {
    for (const entry of palette.families[family]) {
      const token = source[family]?.[entry.stop];
      if (token) {
        assert.equal(entry.hex, token.$value.hex.toUpperCase());
        assert.equal(entry.source, 'Canonical Git token');
      } else {
        assert.equal(entry.canonicalStatus, 'Not canonical');
        assert.equal(entry.approval, 'Pending human review');
      }
    }
  }
});

test('Primary is a Blue alias candidate and data colors pass adjacent diagnostics', () => {
  for (const [index, entry] of palette.families.primary.entries()) {
    assert.equal(entry.hex, palette.families.blue[index].hex);
    assert.equal(entry.aliasCandidate, `Blue/${entry.stop}`);
    assert.equal(entry.canonicalStatus, 'Not a canonical primitive family');
  }
  assert.deepEqual(
    palette.dataColors.map(({ stop }) => stop),
    ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
  );
  assert.equal(new Set(palette.dataColors.map(({ hex }) => hex)).size, 11);
  assert.ok(palette.dataAssessment.pairs.every(({ warning }) => !warning));
});

test('candidate artifact contains no unsupported approvals or variable claims', () => {
  assert.equal(palette.status, 'provisional-not-canonical');
  assert.equal(palette.approvals.accessibility, 'pending-specialist-review');
  assert.equal(palette.approvals.engineering, 'pending-specialist-review');
  assert.equal(palette.approvals.release, 'not-approved');
  assert.equal(palette.method.externalPaletteValuesUsed, false);
});
