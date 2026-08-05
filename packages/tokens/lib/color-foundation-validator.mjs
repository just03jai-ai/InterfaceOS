import { contrastRatio } from './token-core.mjs';

const PRIMITIVE_NAME = /^color\.primitive\.[a-z][a-z0-9-]*\.(?:0|[1-9][0-9]*)$/;
const SEMANTIC_NAME = /^color\.semantic(?:\.[a-z][a-z0-9-]*){2,}$/;
const THEME_NAME = /^color\.theme(?:\.[a-z][a-z0-9-]*){2,}$/;

function colorValueKey(value) {
  if (!value || value.colorSpace !== 'srgb' || !Array.isArray(value.components))
    return null;
  return JSON.stringify({
    colorSpace: value.colorSpace,
    components: value.components,
    alpha: value.alpha ?? 1,
  });
}

export function validateColorFoundation({
  primitiveEntries,
  semanticEntries,
  themeEntriesByMode,
  requiredSemanticMappings,
  requiredThemeMappings,
  contrastObligations,
  resolvedByMode,
  duplicateExceptions = [],
}) {
  const errors = [];
  const allowedDuplicates = new Set(
    duplicateExceptions.map((names) => [...names].sort().join('|')),
  );

  for (const entry of primitiveEntries) {
    if (!PRIMITIVE_NAME.test(entry.name))
      errors.push(`Invalid primitive color name "${entry.name}".`);
  }
  for (const entry of semanticEntries) {
    if (!SEMANTIC_NAME.test(entry.name))
      errors.push(`Invalid semantic color name "${entry.name}".`);
  }
  for (const [mode, entries] of Object.entries(themeEntriesByMode)) {
    for (const entry of entries) {
      if (!THEME_NAME.test(entry.name))
        errors.push(`Invalid ${mode} theme color name "${entry.name}".`);
    }
  }

  const primitiveValues = new Map();
  for (const entry of primitiveEntries) {
    const key = colorValueKey(entry.token.$value);
    if (!key) continue;
    const names = primitiveValues.get(key) ?? [];
    names.push(entry.name);
    primitiveValues.set(key, names);
  }
  for (const names of primitiveValues.values()) {
    if (names.length < 2) continue;
    const sorted = [...names].sort();
    if (!allowedDuplicates.has(sorted.join('|')))
      errors.push(`Duplicate primitive color value: ${sorted.join(', ')}.`);
  }

  const semanticNames = new Set(semanticEntries.map((entry) => entry.name));
  for (const required of requiredSemanticMappings) {
    if (!semanticNames.has(required))
      errors.push(`Missing semantic color mapping "${required}".`);
  }

  for (const mode of ['light', 'dark']) {
    const entries = themeEntriesByMode[mode];
    if (!entries) {
      errors.push(`Missing required ${mode} color theme.`);
      continue;
    }
    const names = new Set(entries.map((entry) => entry.name));
    for (const required of requiredThemeMappings) {
      if (!names.has(required))
        errors.push(`Missing ${mode} theme color mapping "${required}".`);
    }
  }

  for (const mode of ['light', 'dark']) {
    const resolved = resolvedByMode[mode];
    if (!resolved) continue;
    for (const obligation of contrastObligations) {
      const foreground = resolved.get(obligation.foreground);
      const background = resolved.get(obligation.background);
      if (!foreground || !background) {
        errors.push(
          `Cannot evaluate ${mode} contrast obligation ${obligation.foreground}/${obligation.background}.`,
        );
        continue;
      }
      const ratio = contrastRatio(foreground, background);
      if (ratio + Number.EPSILON < obligation.minimum)
        errors.push(
          `${mode} contrast obligation ${obligation.foreground}/${obligation.background} is ${ratio.toFixed(2)}:1; requires ${obligation.minimum}:1.`,
        );
    }
  }

  return errors;
}
