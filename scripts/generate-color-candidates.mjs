import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import prettier from 'prettier';

const sourcePath = 'packages/tokens/src/primitives/color.tokens.json';
const outputPath =
  'docs/design-system/foundations/color/color-candidates.generated.json';
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
const serializedNumberPrecision = 10;
const canonicalDocument = JSON.parse(await readFile(sourcePath, 'utf8'));
const sourceBytes = await readFile(sourcePath);
const sourceSha256 = createHash('sha256').update(sourceBytes).digest('hex');
const sourceRevision = execFileSync('git', ['rev-parse', 'HEAD'], {
  encoding: 'utf8',
}).trim();
const canonical = canonicalDocument.color.primitive;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const round = (value, places = 6) => Number(value.toFixed(places));

function normalizeGeneratedNumbers(value) {
  if (typeof value === 'number' && Number.isFinite(value))
    return round(value, serializedNumberPrecision);
  if (Array.isArray(value)) return value.map(normalizeGeneratedNumbers);
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        normalizeGeneratedNumbers(entry),
      ]),
    );
  return value;
}
const radians = (degrees) => (degrees * Math.PI) / 180;
const degrees = (radiansValue) => ((radiansValue * 180) / Math.PI + 360) % 360;

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((offset) =>
    parseInt(value.slice(offset, offset + 2), 16),
  );
}

function rgbToHex(rgb) {
  return `#${rgb
    .map((channel) =>
      Math.round(clamp(channel / 255) * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`.toUpperCase();
}

function srgbChannelToLinear(channel) {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function linearChannelToSrgb(channel) {
  const value =
    channel <= 0.0031308
      ? 12.92 * channel
      : 1.055 * channel ** (1 / 2.4) - 0.055;
  return value * 255;
}

function linearRgbToOklab([r, g, b]) {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const lRoot = Math.cbrt(l);
  const mRoot = Math.cbrt(m);
  const sRoot = Math.cbrt(s);
  return [
    0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot,
    1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot,
    0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot,
  ];
}

function oklabToLinearRgb([L, a, b]) {
  const lRoot = L + 0.3963377774 * a + 0.2158037573 * b;
  const mRoot = L - 0.1055613458 * a - 0.0638541728 * b;
  const sRoot = L - 0.0894841775 * a - 1.291485548 * b;
  const l = lRoot ** 3;
  const m = mRoot ** 3;
  const s = sRoot ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function rgbToOklch(rgb) {
  const [L, a, b] = linearRgbToOklab(rgb.map(srgbChannelToLinear));
  return { L, C: Math.hypot(a, b), h: degrees(Math.atan2(b, a)) };
}

function oklchToRawRgb({ L, C, h }) {
  const angle = radians(h);
  return oklabToLinearRgb([L, C * Math.cos(angle), C * Math.sin(angle)]).map(
    linearChannelToSrgb,
  );
}

function inSrgbGamut(rgb) {
  return rgb.every((channel) => channel >= -0.0001 && channel <= 255.0001);
}

function gamutMap(spec) {
  const requestedChroma = spec.C;
  let mapped = { ...spec };
  let raw = oklchToRawRgb(mapped);
  if (!inSrgbGamut(raw)) {
    let low = 0;
    let high = requestedChroma;
    for (let index = 0; index < 28; index += 1) {
      const candidate = (low + high) / 2;
      const candidateRgb = oklchToRawRgb({ ...spec, C: candidate });
      if (inSrgbGamut(candidateRgb)) low = candidate;
      else high = candidate;
    }
    mapped = { ...spec, C: low };
    raw = oklchToRawRgb(mapped);
  }
  const rgb = raw.map((channel) => Math.round(clamp(channel / 255) * 255));
  return {
    rgb,
    hex: rgbToHex(rgb),
    oklch: rgbToOklch(rgb),
    requestedOklch: spec,
    gamutAdjusted: requestedChroma - mapped.C > 0.0005,
    chromaReduction: round(requestedChroma - mapped.C, 5),
  };
}

function hueInterpolate(from, to, ratio) {
  let delta = ((to - from + 540) % 360) - 180;
  if (
    Math.abs(delta) > 90 &&
    Math.min(from, to) < 30 &&
    Math.max(from, to) > 330
  )
    delta = ((to - from + 540) % 360) - 180;
  return (from + delta * ratio + 360) % 360;
}

function interpolate(from, to, ratio) {
  return {
    L: from.L + (to.L - from.L) * ratio,
    C: from.C + (to.C - from.C) * ratio,
    h: hueInterpolate(from.h, to.h, ratio),
  };
}

function canonicalEntry(family, stop) {
  const token = canonical[family]?.[stop];
  if (!token) return null;
  const rgb = hexToRgb(token.$value.hex);
  return {
    family,
    stop,
    hex: token.$value.hex.toUpperCase(),
    rgb,
    oklch: rgbToOklch(rgb),
    source: 'Canonical Git token',
    canonicalStatus: 'Existing technical token',
    reviewStatus: 'Provisional visual review',
    approval: 'Pending human review',
    evidenceId: 'IOS-FND-COLOR',
    sourcePath,
    aliasCandidate: null,
    gamutAdjusted: false,
    chromaReduction: 0,
  };
}

function candidateEntry(family, stop, spec, aliasCandidate = null) {
  const mapped = gamutMap(spec);
  return {
    family,
    stop,
    hex: mapped.hex,
    rgb: mapped.rgb,
    oklch: mapped.oklch,
    requestedOklch: mapped.requestedOklch,
    source: 'Generated InterfaceOS candidate',
    canonicalStatus: 'Not canonical',
    reviewStatus: 'Pending human design review',
    approval: 'Pending human review',
    evidenceId: `IOS-FND-COLOR-CANDIDATE-${family.toUpperCase().replaceAll(' ', '-')}-${stop.toUpperCase()}`,
    sourcePath: outputPath,
    aliasCandidate,
    gamutAdjusted: mapped.gamutAdjusted,
    chromaReduction: mapped.chromaReduction,
  };
}

function buildAnchoredFamily(family, endpointOverride = null) {
  const anchors = new Map();
  for (const stop of standardStops) {
    const entry = canonicalEntry(family, stop);
    if (entry) anchors.set(stop, entry);
  }
  const result = [];
  for (let index = 0; index < standardStops.length; index += 1) {
    const stop = standardStops[index];
    if (anchors.has(stop)) {
      result.push(anchors.get(stop));
      continue;
    }
    let previousIndex = index - 1;
    while (previousIndex >= 0 && !anchors.has(standardStops[previousIndex]))
      previousIndex -= 1;
    let nextIndex = index + 1;
    while (
      nextIndex < standardStops.length &&
      !anchors.has(standardStops[nextIndex])
    )
      nextIndex += 1;
    let spec;
    if (previousIndex >= 0 && nextIndex < standardStops.length) {
      const from = anchors.get(standardStops[previousIndex]).oklch;
      const to = anchors.get(standardStops[nextIndex]).oklch;
      spec = interpolate(
        from,
        to,
        (index - previousIndex) / (nextIndex - previousIndex),
      );
    } else if (endpointOverride && stop === '950') {
      spec = endpointOverride;
    } else {
      throw new Error(
        `No bounded interpolation strategy for ${family}.${stop}`,
      );
    }
    result.push(candidateEntry(family, stop, spec));
  }
  return result;
}

const neutral = [
  canonicalEntry('neutral', '0'),
  ...buildAnchoredFamily('neutral'),
];
const blue = buildAnchoredFamily('blue', { L: 0.225, C: 0.078, h: 265 });
const green = buildAnchoredFamily('green');
const red = buildAnchoredFamily('red');
const amber = buildAnchoredFamily('amber');

const newFamilySpecs = {
  indigo: {
    lightness: [
      0.972, 0.94, 0.885, 0.81, 0.72, 0.63, 0.55, 0.475, 0.4, 0.325, 0.225,
    ],
    chroma: [
      0.018, 0.035, 0.072, 0.115, 0.16, 0.195, 0.205, 0.19, 0.16, 0.12, 0.07,
    ],
    hue: 282,
  },
  purple: {
    lightness: [
      0.974, 0.942, 0.89, 0.815, 0.73, 0.645, 0.565, 0.485, 0.405, 0.325, 0.225,
    ],
    chroma: [0.02, 0.04, 0.08, 0.125, 0.17, 0.2, 0.205, 0.19, 0.16, 0.12, 0.07],
    hue: 310,
  },
  teal: {
    lightness: [
      0.975, 0.945, 0.895, 0.825, 0.745, 0.66, 0.575, 0.495, 0.415, 0.335, 0.23,
    ],
    chroma: [
      0.018, 0.035, 0.068, 0.1, 0.125, 0.14, 0.145, 0.13, 0.105, 0.08, 0.045,
    ],
    hue: 190,
  },
};

function buildNewFamily(family, spec) {
  return standardStops.map((stop, index) =>
    candidateEntry(family, stop, {
      L: spec.lightness[index],
      C: spec.chroma[index],
      h: spec.hue,
    }),
  );
}

const indigo = buildNewFamily('indigo', newFamilySpecs.indigo);
const purple = buildNewFamily('purple', newFamilySpecs.purple);
const teal = buildNewFamily('teal', newFamilySpecs.teal);
const primary = blue.map((entry) => ({
  ...entry,
  family: 'primary',
  source: 'Generated InterfaceOS alias candidate',
  canonicalStatus: 'Not a canonical primitive family',
  reviewStatus: 'Provisional',
  evidenceId: `IOS-FND-COLOR-CANDIDATE-PRIMARY-${entry.stop}`,
  aliasCandidate: `Blue/${entry.stop}`,
}));

const byStop = (family, stop) =>
  family.find((entry) => entry.stop === String(stop));
const dataSeeds = [
  ['blue', byStop(blue, 600)],
  ['amber', byStop(amber, 600)],
  ['purple', byStop(purple, 600)],
  ['green', byStop(green, 700)],
  ['indigo', byStop(indigo, 500)],
  ['red', byStop(red, 600)],
  ['teal', byStop(teal, 500)],
  ['rose-like', candidateEntry('data', '08', { L: 0.58, C: 0.19, h: 8 })],
  ['cyan-like', candidateEntry('data', '09', { L: 0.69, C: 0.12, h: 220 })],
  ['lime-like', candidateEntry('data', '10', { L: 0.72, C: 0.15, h: 125 })],
  ['neutral-accent', byStop(neutral, 500)],
];
const data = dataSeeds.map(([region, seed], index) => ({
  ...seed,
  family: 'data',
  stop: String(index + 1).padStart(2, '0'),
  source: 'Generated InterfaceOS categorical candidate',
  canonicalStatus: 'Not canonical',
  reviewStatus: 'Pending human design review',
  evidenceId: `IOS-FND-COLOR-CANDIDATE-DATA-${String(index + 1).padStart(2, '0')}`,
  sourcePath: outputPath,
  aliasCandidate: null,
  hueRegion: region,
}));

function luminance(rgb) {
  const [r, g, b] = rgb.map(srgbChannelToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

const contrastBackgrounds = {
  white: [255, 255, 255],
  neutral950: hexToRgb(canonical.neutral['950'].$value.hex),
  lightCanvas: hexToRgb(canonical.neutral['50'].$value.hex),
  darkCanvas: hexToRgb(canonical.neutral['900'].$value.hex),
};

function addDiagnostics(entries, sequential = true) {
  const seen = new Set();
  return entries.map((entry, index) => {
    const previous = index > 0 ? entries[index - 1] : null;
    const deltaLightness = previous ? previous.oklch.L - entry.oklch.L : null;
    const hueDelta = previous
      ? Math.abs(((entry.oklch.h - previous.oklch.h + 540) % 360) - 180)
      : null;
    const chromaDelta = previous
      ? Math.abs(entry.oklch.C - previous.oklch.C)
      : null;
    const duplicate = seen.has(entry.hex);
    seen.add(entry.hex);
    const contrast = Object.fromEntries(
      Object.entries(contrastBackgrounds).map(([name, background]) => {
        const ratio = contrastRatio(entry.rgb, background);
        return [
          name,
          {
            ratio: round(ratio, 2),
            normalText: ratio >= 4.5,
            largeText: ratio >= 3,
            meaningfulBoundary: ratio >= 3,
          },
        ];
      }),
    );
    return {
      ...entry,
      diagnostics: {
        deltaLightness:
          deltaLightness === null ? null : round(deltaLightness, 4),
        monotonicLightness:
          !sequential || deltaLightness === null || deltaLightness > 0,
        adjacentDistinction:
          !sequential || deltaLightness === null || deltaLightness >= 0.025,
        chromaAbrupt: sequential && chromaDelta !== null && chromaDelta > 0.085,
        hueShiftUnexpected:
          sequential &&
          hueDelta !== null &&
          Math.min(previous.oklch.C, entry.oklch.C) > 0.02 &&
          hueDelta > 18,
        duplicateValue: duplicate,
        gamutWarning: entry.gamutAdjusted,
      },
      contrast,
      likelyUse:
        index <= 1
          ? 'Background'
          : index <= 3
            ? 'Subtle surface'
            : index === 4
              ? 'Border / interactive'
              : index <= 6
                ? 'Main action / data mark'
                : index <= 8
                  ? 'Strong action'
                  : 'Foreground candidate',
    };
  });
}

const families = Object.fromEntries(
  Object.entries({
    neutral,
    blue,
    green,
    red,
    amber,
    indigo,
    purple,
    teal,
    primary,
  }).map(([name, entries]) => [name, addDiagnostics(entries)]),
);
const diagnosedData = addDiagnostics(data, false);

function simulateCvd(rgb, matrix) {
  const linear = rgb.map(srgbChannelToLinear);
  return matrix.map((row) =>
    clamp(
      row.reduce(
        (sum, coefficient, index) => sum + coefficient * linear[index],
        0,
      ),
    ),
  );
}

const cvdMatrices = {
  protan: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deutan: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  tritan: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.3039],
  ],
};

function labDistance(rgbA, rgbB) {
  const labA = linearRgbToOklab(rgbA);
  const labB = linearRgbToOklab(rgbB);
  return Math.hypot(labA[0] - labB[0], labA[1] - labB[1], labA[2] - labB[2]);
}

const dataPairAssessments = diagnosedData.slice(1).map((entry, index) => {
  const previous = diagnosedData[index];
  const normal = labDistance(
    entry.rgb.map(srgbChannelToLinear),
    previous.rgb.map(srgbChannelToLinear),
  );
  const simulations = Object.fromEntries(
    Object.entries(cvdMatrices).map(([name, matrix]) => [
      name,
      round(
        labDistance(
          simulateCvd(previous.rgb, matrix),
          simulateCvd(entry.rgb, matrix),
        ),
        4,
      ),
    ]),
  );
  const grayscaleDelta = Math.abs(
    luminance(entry.rgb) - luminance(previous.rgb),
  );
  return {
    pair: [`Data ${previous.stop}`, `Data ${entry.stop}`],
    oklabDistance: round(normal, 4),
    grayscaleLuminanceDelta: round(grayscaleDelta, 4),
    cvdOklabDistance: simulations,
    warning:
      normal < 0.08 ||
      grayscaleDelta < 0.035 ||
      Object.values(simulations).some((value) => value < 0.05),
  };
});

const result = {
  $schema: '../../../../../schemas/color-candidate-palette.schema.json',
  schemaVersion: '1.0.0',
  id: 'IOS-FND-COLOR-CANDIDATE-PALETTE',
  milestone: 'IOS-003.1',
  status: 'provisional-not-canonical',
  generatedAt: '2026-08-05T00:00:00.000Z',
  source: {
    canonicalPath: sourcePath,
    canonicalSha256: sourceSha256,
    gitCommit: sourceRevision,
    canonicalValuesModified: false,
  },
  method: {
    colorSpace: 'OKLCH',
    interpolation:
      'Piecewise linear interpolation in OKLCH between fixed canonical anchors; shortest-path hue interpolation.',
    endpointStrategy:
      'Blue/950 uses an authored low-chroma OKLCH endpoint because no darker canonical anchor exists.',
    gamutStrategy:
      'Binary-search chroma reduction at fixed lightness and hue until the candidate is inside sRGB.',
    newFamilyStrategy:
      'Original authored monotonic lightness and controlled chroma curves for Indigo, Purple, and Teal.',
    externalPaletteValuesUsed: false,
  },
  families,
  dataColors: diagnosedData,
  dataAssessment: {
    method:
      'Adjacent OKLab distance, relative-luminance difference, and approximate protan/deutan/tritan simulation.',
    pairs: dataPairAssessments,
  },
  approvals: {
    design: 'pending-human-review',
    accessibility: 'pending-specialist-review',
    engineering: 'pending-specialist-review',
    release: 'not-approved',
  },
};

const checkOnly = process.argv.includes('--check');
const existing = checkOnly ? await readFile(outputPath, 'utf8') : null;
if (checkOnly) result.source.gitCommit = JSON.parse(existing).source.gitCommit;
const serialized = await prettier.format(
  JSON.stringify(normalizeGeneratedNumbers(result)),
  {
    parser: 'json',
  },
);
if (checkOnly) {
  if (existing !== serialized)
    throw new Error(
      `${outputPath} is stale; run pnpm color:candidates:generate.`,
    );
  console.log(
    `Color candidate artifact is current (${Object.values(families).reduce((sum, entries) => sum + entries.length, 0) + diagnosedData.length} swatches).`,
  );
} else {
  await writeFile(outputPath, serialized);
  console.log(`Generated ${outputPath}.`);
}
