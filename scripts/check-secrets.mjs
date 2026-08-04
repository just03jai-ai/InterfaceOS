import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const files = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard'],
  { encoding: 'utf8' },
)
  .trim()
  .split('\n')
  .filter(Boolean)
  .filter((file) => !file.endsWith('pnpm-lock.yaml'));
const patterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(?:api[_-]?key|secret|token|password)\s*[:=]\s*['"][A-Za-z0-9_-]{16,}['"]/i,
  /(?:ghp|github_pat|sk_live|sk_test)_[A-Za-z0-9_-]{16,}/,
];
const failures = [];
for (const file of files) {
  const content = await readFile(file, 'utf8').catch(() => '');
  if (patterns.some((pattern) => pattern.test(content))) failures.push(file);
}
if (failures.length)
  throw new Error(`Potential secrets found in: ${failures.join(', ')}`);
console.log(
  `Scanned ${files.length} repository files for common secret patterns.`,
);
