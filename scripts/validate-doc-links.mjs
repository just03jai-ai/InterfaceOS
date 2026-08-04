import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ignored = new Set([
  '.git',
  'node_modules',
  '.next',
  'dist',
  'coverage',
  'storybook-static',
]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const entryPath = path.join(directory, entry.name);
    files.push(...(entry.isDirectory() ? await walk(entryPath) : [entryPath]));
  }
  return files;
}

const markdownFiles = (await walk(root)).filter((file) => file.endsWith('.md'));
const failures = [];
for (const file of markdownFiles) {
  const content = await readFile(file, 'utf8');
  const links = [...content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map(
    (match) => match[1],
  );
  for (const rawLink of links) {
    const link = rawLink.replace(/^<|>$/g, '').split('#')[0];
    if (!link || /^(https?:|mailto:)/.test(link)) continue;
    const target = path.resolve(path.dirname(file), decodeURIComponent(link));
    try {
      await access(target);
    } catch {
      failures.push(`${path.relative(root, file)} -> ${rawLink}`);
    }
  }
}

if (failures.length)
  throw new Error(`Broken documentation links:\n${failures.join('\n')}`);
console.log(`Validated links in ${markdownFiles.length} Markdown files.`);
