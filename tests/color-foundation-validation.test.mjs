import assert from 'node:assert/strict';
import test from 'node:test';
import { validateColorFoundation } from '../packages/tokens/lib/color-foundation-validator.mjs';

const color = (name, components = [0, 0, 0]) => ({
  name,
  source: '<test>',
  token: {
    $type: 'color',
    $value: { colorSpace: 'srgb', components, alpha: 1, hex: '#000000' },
  },
});
const alias = (name, target) => ({
  name,
  source: '<test>',
  token: { $type: 'color', $value: `{${target}}` },
});

function baseline(overrides = {}) {
  const black = { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1 };
  const white = { colorSpace: 'srgb', components: [1, 1, 1], alpha: 1 };
  return {
    primitiveEntries: [
      color('color.primitive.neutral.0', [1, 1, 1]),
      color('color.primitive.neutral.950', [0, 0, 0]),
    ],
    semanticEntries: [
      alias('color.semantic.text.primary', 'color.theme.text.primary'),
    ],
    themeEntriesByMode: {
      light: [
        alias('color.theme.text.primary', 'color.primitive.neutral.950'),
        alias('color.theme.background.canvas', 'color.primitive.neutral.0'),
      ],
      dark: [
        alias('color.theme.text.primary', 'color.primitive.neutral.0'),
        alias('color.theme.background.canvas', 'color.primitive.neutral.950'),
      ],
    },
    requiredSemanticMappings: ['color.semantic.text.primary'],
    requiredThemeMappings: [
      'color.theme.text.primary',
      'color.theme.background.canvas',
    ],
    contrastObligations: [
      {
        foreground: 'color.theme.text.primary',
        background: 'color.theme.background.canvas',
        minimum: 4.5,
      },
    ],
    resolvedByMode: {
      light: new Map([
        ['color.theme.text.primary', black],
        ['color.theme.background.canvas', white],
      ]),
      dark: new Map([
        ['color.theme.text.primary', white],
        ['color.theme.background.canvas', black],
      ]),
    },
    enforceApprovedV1Completeness: false,
    ...overrides,
  };
}

test('complete color foundation fixture passes', () => {
  assert.deepEqual(validateColorFoundation(baseline()), []);
});

test('missing semantic mappings are rejected', () => {
  const errors = validateColorFoundation(baseline({ semanticEntries: [] }));
  assert.match(errors.join('\n'), /Missing semantic color mapping/);
});

test('duplicate primitive color values are rejected', () => {
  const fixture = baseline();
  fixture.primitiveEntries.push(color('color.primitive.blue.500', [0, 0, 0]));
  const errors = validateColorFoundation(fixture);
  assert.match(errors.join('\n'), /Duplicate primitive color value/);
});

test('missing dark theme values are rejected', () => {
  const fixture = baseline();
  fixture.themeEntriesByMode.dark = [];
  const errors = validateColorFoundation(fixture);
  assert.match(errors.join('\n'), /Missing dark theme color mapping/);
});

test('contrast obligation failures are rejected', () => {
  const lowContrast = {
    colorSpace: 'srgb',
    components: [0.5, 0.5, 0.5],
    alpha: 1,
  };
  const fixture = baseline();
  fixture.resolvedByMode.light.set('color.theme.text.primary', lowContrast);
  fixture.resolvedByMode.light.set(
    'color.theme.background.canvas',
    lowContrast,
  );
  const errors = validateColorFoundation(fixture);
  assert.match(errors.join('\n'), /contrast obligation/);
});

test('color naming violations are rejected', () => {
  const fixture = baseline();
  fixture.primitiveEntries.push(color('color.primitive.Blue.bad_name'));
  const errors = validateColorFoundation(fixture);
  assert.match(errors.join('\n'), /Invalid primitive color name/);
});
