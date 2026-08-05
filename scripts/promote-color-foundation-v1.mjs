import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import prettier from 'prettier';

const paths = {
  approval: 'evidence/reviews/IOS-003-1-COLOR-FOUNDATION-APPROVAL.json',
  approvedPalette:
    'docs/design-system/foundations/color/color-candidates.approved-v1.json',
  baseline: 'evidence/snapshots/ios-003-1-canonical-color.tokens.json',
  primitive: 'packages/tokens/src/primitives/color.tokens.json',
  dataPrimitive: 'packages/tokens/src/primitives/color-data.tokens.json',
  semantic: 'packages/tokens/src/semantic/color.tokens.json',
  light: 'packages/tokens/src/themes/light.tokens.json',
  dark: 'packages/tokens/src/themes/dark.tokens.json',
  themeContract: 'packages/tokens/src/contracts/theme-contract.json',
  manifest:
    'docs/design-system/foundations/color/color-token-promotion.manifest.json',
};

const standardStops = [
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
const familyStops = {
  neutral: ['0', ...standardStops],
  blue: standardStops,
  green: standardStops,
  amber: standardStops,
  red: standardStops,
  indigo: standardStops,
  purple: standardStops,
  teal: standardStops,
};
const dataStops = [
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
const dataAliases = {
  '01': '{color.primitive.blue.600}',
  '02': '{color.primitive.amber.600}',
  '03': '{color.primitive.purple.600}',
  '04': '{color.primitive.green.700}',
  '05': '{color.primitive.indigo.500}',
  '06': '{color.primitive.red.600}',
  '07': '{color.primitive.teal.500}',
  11: '{color.primitive.neutral.500}',
};

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const clone = (value) => structuredClone(value);
const tokenStatus = (tier) => ({
  'org.interfaceos': { tier, status: 'approved' },
});
const colorValue = (entry) => ({
  colorSpace: 'srgb',
  components: entry.rgb.map((channel) => Number((channel / 255).toFixed(6))),
  alpha: 1,
  hex: entry.hex.toLowerCase(),
});
const colorToken = ({ value, description, tier }) => ({
  $value: value,
  $type: 'color',
  $description: description,
  $extensions: tokenStatus(tier),
});

function approveTokens(node) {
  if (!node || typeof node !== 'object') return;
  if ('$value' in node && node.$extensions?.['org.interfaceos']) {
    node.$extensions['org.interfaceos'].status = 'approved';
    return;
  }
  for (const value of Object.values(node)) approveTokens(value);
}

function indexByStop(entries) {
  return new Map(entries.map((entry) => [entry.stop, entry]));
}

const [
  approval,
  palette,
  baselineText,
  primitive,
  semantic,
  light,
  dark,
  contract,
] = await Promise.all([
  readJson(paths.approval),
  readJson(paths.approvedPalette),
  readFile(paths.baseline, 'utf8'),
  readJson(paths.primitive),
  readJson(paths.semantic),
  readJson(paths.light),
  readJson(paths.dark),
  readJson(paths.themeContract),
]);

if (approval.status !== 'approved-visual-baseline-pending-token-promotion')
  throw new Error('IOS-003.1 visual baseline is not approved for promotion.');
if (approval.baseline.primaryFamily !== 'blue')
  throw new Error('The approved Primary family is not Blue.');
if (sha256(baselineText) !== palette.source.canonicalSha256)
  throw new Error(
    'The approved palette does not match the frozen canonical baseline.',
  );

const baseline = JSON.parse(baselineText);
const baselinePrimitive = baseline.color.primitive;
const promotedPrimitive = clone(primitive);
const retainedAnchors = [];
const promotedStops = [];

for (const [family, stops] of Object.entries(familyStops)) {
  const approved = indexByStop(palette.families[family]);
  const currentFamily = promotedPrimitive.color.primitive[family] ?? {};
  const ordered = {};
  for (const stop of stops) {
    const entry = approved.get(stop);
    if (!entry) throw new Error(`Approved palette misses ${family}.${stop}.`);
    const existing = currentFamily[stop];
    const baselineToken = baselinePrimitive[family]?.[stop];
    if (baselineToken) {
      if (baselineToken.$value.hex.toUpperCase() !== entry.hex)
        throw new Error(`Approved evidence changes anchor ${family}.${stop}.`);
      ordered[stop] = clone(existing ?? baselineToken);
      ordered[stop].$extensions['org.interfaceos'].status = 'approved';
      retainedAnchors.push({
        token: `color.primitive.${family}.${stop}`,
        hex: baselineToken.$value.hex,
      });
      continue;
    }
    if (existing && existing.$value.hex.toUpperCase() !== entry.hex)
      throw new Error(`Canonical value conflicts with ${family}.${stop}.`);
    ordered[stop] = colorToken({
      value: colorValue(entry),
      description: `${family[0].toUpperCase()}${family.slice(1)} ${stop} approved Color Foundation V1 scale step.`,
      tier: 'primitive',
    });
    promotedStops.push({
      token: `color.primitive.${family}.${stop}`,
      hex: entry.hex,
      evidenceId: entry.evidenceId,
    });
  }
  promotedPrimitive.color.primitive[family] = ordered;
}

const approvedData = indexByStop(palette.dataColors);
const dataDocument = {
  $schema: '../../../../../schemas/token-file.schema.json',
  $description:
    'InterfaceOS categorical data-visualization primitives. Numeric labels identify stable series positions, not hue-scale lightness.',
  color: {
    primitive: {
      data: {
        $type: 'color',
      },
    },
  },
};
for (const stop of dataStops) {
  const entry = approvedData.get(stop);
  if (!entry) throw new Error(`Approved data palette misses ${stop}.`);
  dataDocument.color.primitive.data[stop] = colorToken({
    value: dataAliases[stop] ?? colorValue(entry),
    description: `Approved categorical data series ${stop}; pair with labels, shapes, patterns, or a data table.`,
    tier: 'primitive',
  });
}

const promotedSemantic = clone(semantic);
approveTokens(promotedSemantic);
promotedSemantic.color.semantic.data = { categorical: { $type: 'color' } };
for (const stop of dataStops)
  promotedSemantic.color.semantic.data.categorical[stop] = colorToken({
    value: `{color.theme.data.categorical.${stop}}`,
    description: `Theme-aware categorical data series ${stop}; never use color as the only series cue.`,
    tier: 'semantic',
  });

function promoteTheme(document, mode) {
  const promoted = clone(document);
  approveTokens(promoted);
  promoted.color.theme.data = { categorical: { $type: 'color' } };
  for (const stop of dataStops)
    promoted.color.theme.data.categorical[stop] = colorToken({
      value: `{color.primitive.data.${stop}}`,
      description: `${mode} categorical data series ${stop} mapping.`,
      tier: 'theme',
    });
  return promoted;
}
const promotedLight = promoteTheme(light, 'Light');
const promotedDark = promoteTheme(dark, 'Dark');

const promotedContract = clone(contract);
for (const stop of dataStops) {
  const mapping = `color.theme.data.categorical.${stop}`;
  if (!promotedContract.requiredMappings.includes(mapping))
    promotedContract.requiredMappings.push(mapping);
}

const manifest = {
  $schema: '../../../../schemas/color-token-promotion.schema.json',
  schemaVersion: '1.0.0',
  id: 'IOS-003.2-COLOR-TOKEN-PROMOTION',
  milestone: 'IOS-003.2',
  status: 'implemented-pending-human-review',
  owner: 'Jai Singh',
  source: {
    approval: paths.approval,
    approvedPalette: paths.approvedPalette,
    approvedPaletteSha256: sha256(await readFile(paths.approvedPalette)),
    frozenCanonicalBaseline: paths.baseline,
    frozenCanonicalSha256: sha256(baselineText),
  },
  counts: {
    retainedAnchors: retainedAnchors.length,
    promotedHueStops: promotedStops.length,
    primitiveHueTokens: Object.values(familyStops).reduce(
      (sum, stops) => sum + stops.length,
      0,
    ),
    dataTokens: dataStops.length,
    dataAliases: Object.keys(dataAliases).length,
    dataDirectValues: dataStops.length - Object.keys(dataAliases).length,
    semanticDataTokens: dataStops.length,
    themeDataMappingsPerMode: dataStops.length,
  },
  retainedAnchors,
  promotedStops,
  primaryAlias: {
    primitiveFamilyCreated: false,
    sourceFamily: 'color.primitive.blue',
    existingThemeMappings: {
      light: {
        default: 'color.primitive.blue.700',
        hover: 'color.primitive.blue.800',
        active: 'color.primitive.blue.900',
      },
      dark: {
        default: 'color.primitive.blue.400',
        hover: 'color.primitive.blue.200',
        active: 'color.primitive.blue.50',
      },
    },
  },
  dataArchitecture: dataStops.map((stop) => ({
    token: `color.primitive.data.${stop}`,
    value: dataAliases[stop] ?? approvedData.get(stop).hex,
    semantic: `color.semantic.data.categorical.${stop}`,
    theme: `color.theme.data.categorical.${stop}`,
  })),
  controls: {
    approvedValuesChanged: false,
    existingAnchorValuesChanged: false,
    duplicatePrimaryPrimitiveCreated: false,
    libraryPublished: false,
    accessibilitySpecialistApproval: 'pending',
    independentPublicReleaseApproval: 'pending',
  },
};

const outputs = new Map([
  [paths.primitive, promotedPrimitive],
  [paths.dataPrimitive, dataDocument],
  [paths.semantic, promotedSemantic],
  [paths.light, promotedLight],
  [paths.dark, promotedDark],
  [paths.themeContract, promotedContract],
  [paths.manifest, manifest],
]);
const serialized = new Map();
for (const [path, value] of outputs)
  serialized.set(
    path,
    await prettier.format(JSON.stringify(value), { parser: 'json' }),
  );

if (process.argv.includes('--check')) {
  for (const [path, expected] of serialized) {
    const actual = await readFile(path, 'utf8');
    if (actual !== expected)
      throw new Error(`${path} is stale; run pnpm color:promote.`);
  }
  console.log('Validated deterministic IOS-003.2 color token promotion.');
} else {
  for (const [path, contents] of serialized) await writeFile(path, contents);
  console.log(
    `Promoted ${promotedStops.length} hue stops and ${dataStops.length} data tokens while preserving ${retainedAnchors.length} anchors.`,
  );
}
