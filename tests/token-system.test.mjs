import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import {
  createTokenMap,
  findFiles,
  flattenDocument,
  loadThemeEntries,
  readJson,
  validateTokenEntries,
} from '../packages/tokens/lib/token-core.mjs';

const sourceRoot = 'packages/tokens/src';
const contract = await readJson(`${sourceRoot}/contracts/theme-contract.json`);
const emptyContract = { requiredMappings: [], contrastPairs: [] };

function token(name, value = 1) {
  return {
    name,
    source: '<test>',
    token: {
      $value: value,
      $type: 'number',
      $description: 'Test token.',
      $extensions: {
        'org.interfaceos': { tier: 'primitive', status: 'draft' },
      },
    },
  };
}

test('all canonical token files satisfy the token JSON Schema', async () => {
  const schema = await readJson('schemas/token-file.schema.json');
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const files = await findFiles(sourceRoot, (file) =>
    file.endsWith('.tokens.json'),
  );
  for (const file of files) {
    const document = await readJson(file);
    assert.equal(
      validate(document),
      true,
      `${path.relative('.', file)}: ${ajv.errorsText(validate.errors)}`,
    );
    assert.ok(flattenDocument(document, file).length > 0);
  }
});

test('duplicate token names are rejected', () => {
  const result = createTokenMap([
    token('spacing.primitive.1'),
    token('spacing.primitive.1'),
  ]);
  assert.match(result.errors.join('\n'), /Duplicate token name/);
});

test('invalid references are rejected', () => {
  const result = validateTokenEntries(
    [token('spacing.semantic.gap', '{spacing.primitive.missing}')],
    emptyContract,
  );
  assert.match(result.errors.join('\n'), /Invalid reference/);
});

test('missing semantic theme mappings are rejected', () => {
  const result = validateTokenEntries([token('color.primitive.neutral.0')], {
    requiredMappings: ['color.theme.background.canvas'],
    contrastPairs: [],
  });
  assert.match(result.errors.join('\n'), /Missing semantic theme mapping/);
});

test('light and dark themes implement the complete mapping contract', async () => {
  for (const theme of contract.themes) {
    const { map, errors } = createTokenMap(
      await loadThemeEntries(sourceRoot, theme),
    );
    assert.deepEqual(errors, []);
    for (const required of contract.requiredMappings)
      assert.ok(map.has(required), `${theme} misses ${required}`);
  }
});

test('circular references are rejected', () => {
  const result = validateTokenEntries(
    [
      token('motion.semantic.a', '{motion.semantic.b}'),
      token('motion.semantic.b', '{motion.semantic.a}'),
    ],
    emptyContract,
  );
  assert.match(result.errors.join('\n'), /Circular token reference/);
});

test('invalid naming conventions are rejected', () => {
  const result = validateTokenEntries(
    [token('Color.Primitive.Bad_Name')],
    emptyContract,
  );
  assert.match(result.errors.join('\n'), /Invalid token naming convention/);
});

test('canonical light and dark token graphs resolve with accessibility contrast obligations', async () => {
  for (const theme of contract.themes) {
    const result = validateTokenEntries(
      await loadThemeEntries(sourceRoot, theme),
      contract,
    );
    assert.deepEqual(result.errors, []);
    assert.ok(result.resolved?.size);
  }
});
