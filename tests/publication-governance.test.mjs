import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const governedFiles = [
  'schemas/figma-architecture-manifest.schema.json',
  'schemas/figma-color-token-reconciliation.schema.json',
  'schemas/figma-color-variable-reconciliation-capture.schema.json',
  'schemas/figma-variable-execution-batch.schema.json',
  'evidence/figma/interfaceos-design-system.architecture.json',
  'evidence/figma/ios-002-batch-1.variable-execution.json',
  'evidence/figma/ios-003-2-color-token-reconciliation.json',
  'evidence/figma/ios-003-3-color-variables.capture.json',
  'docs/design-system/figma/evidence-capture.md',
  'docs/design-system/figma/variable-execution-checklist.md',
  'docs/governance/governance-model.md',
];

test('library governance uses publication state rather than file privacy', async () => {
  for (const path of governedFiles) {
    const content = await readFile(path, 'utf8');
    assert.doesNotMatch(
      content,
      /private-unpublished|private-during-foundations|private-library-status/i,
      path,
    );
  }
});

test('architecture separates sharing permissions from publication state', async () => {
  const architecture = JSON.parse(
    await readFile(
      'evidence/figma/interfaceos-design-system.architecture.json',
      'utf8',
    ),
  );
  assert.equal(
    architecture.approvedDecisions.publishingPolicy.state,
    'unpublished-during-foundations',
  );
  assert.match(architecture.figmaFile.accessPolicy.value, /sharing/i);
  assert.ok(
    architecture.approvedDecisions.collections.every(
      ({ publishingState }) => publishingState === 'unpublished',
    ),
  );
});

test('publication evidence requires unpublished state without governing sharing', async () => {
  const capture = JSON.parse(
    await readFile(
      'evidence/figma/ios-003-3-color-variables.capture.json',
      'utf8',
    ),
  );
  assert.equal(
    capture.library.publicationEvidenceRequirement,
    'unpublished-library-state',
  );
  assert.equal(
    capture.library.fileSharingPermissionsGovernance,
    'separate-from-library-publication',
  );
});
