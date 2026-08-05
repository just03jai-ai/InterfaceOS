import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import {
  findFiles,
  flattenDocument,
  loadThemeEntries,
  readJson,
  validateTokenEntries,
} from '../lib/token-core.mjs';

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const repositoryRoot = path.resolve(packageRoot, '../..');
const sourceRoot = path.join(packageRoot, 'src');
const tokenSchema = await readJson(
  path.join(repositoryRoot, 'schemas/token-file.schema.json'),
);
const contractSchema = await readJson(
  path.join(repositoryRoot, 'schemas/token-theme-contract.schema.json'),
);
const contractPath = path.join(sourceRoot, 'contracts/theme-contract.json');
const contract = await readJson(contractPath);
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validateTokenFile = ajv.compile(tokenSchema);
const validateContract = ajv.compile(contractSchema);
const failures = [];

const tokenFiles = await findFiles(sourceRoot, (file) =>
  file.endsWith('.tokens.json'),
);
for (const file of tokenFiles) {
  const document = await readJson(file);
  if (!validateTokenFile(document))
    failures.push(
      `${path.relative(repositoryRoot, file)}: ${ajv.errorsText(validateTokenFile.errors)}`,
    );
  if (!flattenDocument(document, file).length)
    failures.push(`${path.relative(repositoryRoot, file)} contains no tokens.`);
}
if (!validateContract(contract))
  failures.push(
    `${path.relative(repositoryRoot, contractPath)}: ${ajv.errorsText(validateContract.errors)}`,
  );

for (const theme of contract.themes) {
  const result = validateTokenEntries(
    await loadThemeEntries(sourceRoot, theme),
    contract,
  );
  failures.push(...result.errors.map((error) => `${theme}: ${error}`));
}

if (failures.length)
  throw new Error(`Token validation failed:\n${failures.join('\n')}`);
console.log(
  `Validated ${tokenFiles.length} token files across ${contract.themes.length} themes.`,
);
