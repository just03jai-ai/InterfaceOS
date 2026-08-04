import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildBatchOnePlan,
  canonicalBatchProjection,
  PLAN_PATH,
  renderPrimitiveColorTable,
  TABLE_PATH,
} from './lib/figma-variable-batch-1.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const plan = await buildBatchOnePlan(root);
const outputs = new Map([
  [PLAN_PATH, `${JSON.stringify(plan, null, 2)}\n`],
  [TABLE_PATH, renderPrimitiveColorTable(plan)],
]);

if (process.argv.includes('--check')) {
  for (const [relativePath, expected] of outputs) {
    const actual = await readFile(path.join(root, relativePath), 'utf8');
    const matches =
      relativePath === PLAN_PATH
        ? JSON.stringify(canonicalBatchProjection(JSON.parse(actual))) ===
          JSON.stringify(canonicalBatchProjection(plan))
        : actual === expected;
    if (!matches)
      throw new Error(
        `${relativePath} is stale. Run pnpm figma:batch-1:generate.`,
      );
  }
  console.log(
    `Validated the generated IOS-002 Batch 1 plan for ${plan.source.tokenCount} primitive colors.`,
  );
} else {
  for (const [relativePath, contents] of outputs) {
    const outputPath = path.join(root, relativePath);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, contents);
  }
  console.log(
    `Generated the IOS-002 Batch 1 plan for ${plan.source.tokenCount} primitive colors.`,
  );
}
