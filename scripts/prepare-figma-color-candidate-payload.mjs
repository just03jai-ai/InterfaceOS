import { readFile } from 'node:fs/promises';

const palette = JSON.parse(
  await readFile(
    'docs/design-system/foundations/color/color-candidates.generated.json',
    'utf8',
  ),
);

const pass = (value) => (value ? 'PASS' : 'FAIL');
function compact(entry) {
  const contrast = Object.entries(entry.contrast).map(
    ([name, value]) =>
      `${name} ${value.ratio}:1 N${pass(value.normalText)} L${pass(value.largeText)} B${pass(value.meaningfulBoundary)}`,
  );
  const delta =
    entry.diagnostics.deltaLightness === null
      ? 'start'
      : entry.diagnostics.deltaLightness.toFixed(4);
  const head =
    entry.family === 'data'
      ? `Data ${entry.stop}`
      : `${entry.family[0].toUpperCase()}${entry.family.slice(1)}/${entry.stop}`;
  return {
    stop: entry.stop,
    rgb: entry.rgb,
    canonical: entry.source === 'Canonical Git token',
    metadata: [
      head,
      `${entry.hex} · rgb(${entry.rgb.join(', ')})`,
      `oklch(${(entry.oklch.L * 100).toFixed(2)}% ${entry.oklch.C.toFixed(4)} ${entry.oklch.h.toFixed(2)})`,
      `ΔL ${delta} · Adjacent ${entry.diagnostics.adjacentDistinction ? 'PASS' : 'WARN'}`,
      `Gamut ${entry.diagnostics.gamutWarning ? 'ADJUSTED' : 'PASS'} · Duplicate ${entry.diagnostics.duplicateValue ? 'WARN' : 'PASS'}`,
      ...contrast,
      `Use: ${entry.likelyUse}`,
      entry.aliasCandidate ? `Alias candidate: ${entry.aliasCandidate}` : null,
      `Source: ${entry.source}`,
      `Canonical: ${entry.canonicalStatus}`,
      `Review: ${entry.reviewStatus}`,
      `Approval: ${entry.approval}`,
      `Evidence: ${entry.evidenceId}`,
    ]
      .filter(Boolean)
      .join('\n'),
  };
}

const family = process.argv[2];
const entries =
  family === 'data' ? palette.dataColors : palette.families[family];
if (!entries) throw new Error(`Unknown color candidate family: ${family}`);
process.stdout.write(JSON.stringify(entries.map(compact)));
