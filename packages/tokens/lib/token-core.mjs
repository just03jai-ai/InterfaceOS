import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const REFERENCE = /^\{([a-z0-9][a-z0-9.-]*)\}$/;
const SEGMENT =
  /^(?:[a-z][a-z0-9]*(?:-[a-z0-9]+)*|[0-9]+(?:-[0-9]+)*|[0-9]+xl)$/;

export async function findFiles(directory, predicate = () => true) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory())
      files.push(...(await findFiles(entryPath, predicate)));
    else if (predicate(entryPath)) files.push(entryPath);
  }
  return files.sort();
}

export async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

export function flattenDocument(document, source = '<memory>') {
  const tokens = [];
  function visit(node, segments) {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    if (Object.hasOwn(node, '$value')) {
      tokens.push({ name: segments.join('.'), source, token: node });
      return;
    }
    for (const [key, value] of Object.entries(node)) {
      if (!key.startsWith('$')) visit(value, [...segments, key]);
    }
  }
  visit(document, []);
  return tokens;
}

export function collectReferences(value) {
  if (typeof value === 'string') {
    const match = value.match(REFERENCE);
    return match ? [match[1]] : [];
  }
  if (Array.isArray(value)) return value.flatMap(collectReferences);
  if (value && typeof value === 'object')
    return Object.values(value).flatMap(collectReferences);
  return [];
}

export function createTokenMap(entries) {
  const map = new Map();
  const errors = [];
  for (const entry of entries) {
    if (map.has(entry.name)) {
      errors.push(
        `Duplicate token name "${entry.name}" in ${map.get(entry.name).source} and ${entry.source}.`,
      );
    } else {
      map.set(entry.name, entry);
    }
  }
  return { map, errors };
}

export function resolveTokens(map) {
  const resolved = new Map();
  const resolving = [];

  function resolveValue(value) {
    if (typeof value === 'string') {
      const match = value.match(REFERENCE);
      return match ? resolveToken(match[1]) : value;
    }
    if (Array.isArray(value)) return value.map(resolveValue);
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, child]) => [key, resolveValue(child)]),
      );
    }
    return value;
  }

  function resolveToken(name) {
    if (resolved.has(name)) return resolved.get(name);
    const entry = map.get(name);
    if (!entry) throw new Error(`Invalid token reference "${name}".`);
    const cycleIndex = resolving.indexOf(name);
    if (cycleIndex >= 0)
      throw new Error(
        `Circular token reference: ${[...resolving.slice(cycleIndex), name].join(' -> ')}.`,
      );
    resolving.push(name);
    const value = resolveValue(entry.token.$value);
    resolving.pop();
    resolved.set(name, value);
    return value;
  }

  for (const name of map.keys()) resolveToken(name);
  return resolved;
}

function srgbChannel(value) {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(color) {
  if (
    !color ||
    color.colorSpace !== 'srgb' ||
    !Array.isArray(color.components)
  ) {
    throw new Error(
      'Contrast validation requires resolved sRGB color objects.',
    );
  }
  const [red = 0, green = 0, blue = 0] = color.components.map(srgbChannel);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function contrastRatio(foreground, background) {
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

export function validateTokenEntries(entries, contract) {
  const { map, errors } = createTokenMap(entries);

  for (const entry of entries) {
    const segments = entry.name.split('.');
    if (
      !segments.length ||
      segments.some((segment) => !SEGMENT.test(segment))
    ) {
      errors.push(
        `Invalid token naming convention "${entry.name}" in ${entry.source}.`,
      );
    }
    for (const reference of collectReferences(entry.token.$value)) {
      if (!map.has(reference))
        errors.push(`Invalid reference "${reference}" from "${entry.name}".`);
    }
  }

  for (const mapping of contract.requiredMappings) {
    if (!map.has(mapping))
      errors.push(`Missing semantic theme mapping "${mapping}".`);
  }

  const semanticColors = entries.filter((entry) =>
    entry.name.startsWith('color.semantic.'),
  );
  for (const entry of semanticColors) {
    const expected = entry.name.replace('color.semantic.', 'color.theme.');
    const references = collectReferences(entry.token.$value);
    if (!references.includes(expected))
      errors.push(`Semantic color "${entry.name}" must map to "${expected}".`);
  }

  let resolved;
  try {
    resolved = resolveTokens(map);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  if (resolved) {
    for (const pair of contract.contrastPairs) {
      try {
        const ratio = contrastRatio(
          resolved.get(pair.foreground),
          resolved.get(pair.background),
        );
        if (ratio + Number.EPSILON < pair.minimum) {
          errors.push(
            `${pair.wcag}: ${pair.foreground} on ${pair.background} is ${ratio.toFixed(2)}:1; requires ${pair.minimum}:1.`,
          );
        }
      } catch (error) {
        errors.push(
          `Cannot validate contrast pair ${pair.foreground}/${pair.background}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  }

  return { errors, map, resolved };
}

export async function loadThemeEntries(sourceRoot, theme) {
  const sharedRoots = [
    path.join(sourceRoot, 'primitives'),
    path.join(sourceRoot, 'semantic'),
  ];
  const files = [];
  for (const root of sharedRoots)
    files.push(
      ...(await findFiles(root, (file) => file.endsWith('.tokens.json'))),
    );
  files.push(path.join(sourceRoot, 'themes', `${theme}.tokens.json`));
  const documents = await Promise.all(
    files.map(async (file) => ({ file, document: await readJson(file) })),
  );
  return documents.flatMap(({ file, document }) =>
    flattenDocument(document, file),
  );
}

export function cssValue(value, type) {
  if (type === 'color')
    return (
      value.hex ??
      `color(${value.colorSpace} ${value.components.join(' ')} / ${value.alpha ?? 1})`
    );
  if (type === 'dimension' || type === 'duration')
    return `${value.value}${value.unit}`;
  if (type === 'fontFamily') return value.join(', ');
  if (type === 'cubicBezier') return `cubic-bezier(${value.join(', ')})`;
  if (type === 'shadow') {
    if (!value.length) return 'none';
    return value
      .map((shadow) => {
        const color = shadow.color;
        const rgb = color.components
          .map((channel) => Math.round(channel * 255))
          .join(' ');
        return `${shadow.offsetX.value}${shadow.offsetX.unit} ${shadow.offsetY.value}${shadow.offsetY.unit} ${shadow.blur.value}${shadow.blur.unit} ${shadow.spread.value}${shadow.spread.unit} rgb(${rgb} / ${color.alpha ?? 1})`;
      })
      .join(', ');
  }
  return String(value);
}

export function cssVariableName(name) {
  return `--ios-${name.replaceAll('.', '-')}`;
}
