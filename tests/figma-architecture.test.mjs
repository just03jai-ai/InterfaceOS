import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { flattenDocument } from '../packages/tokens/lib/token-core.mjs';

const schema = JSON.parse(
  await readFile('schemas/figma-architecture-manifest.schema.json', 'utf8'),
);
const manifest = JSON.parse(
  await readFile(
    'evidence/figma/interfaceos-design-system.architecture.json',
    'utf8',
  ),
);
const architectureEvidence = JSON.parse(
  await readFile(
    'evidence/foundations/IOS-FND-FIGMA-ARCHITECTURE.json',
    'utf8',
  ),
);
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('Figma architecture manifest satisfies its schema', () => {
  assert.equal(validate(manifest), true, ajv.errorsText(validate.errors));
});

test('Figma architecture preserves the supplied 15-page order', () => {
  const expected = [
    '00 Cover',
    '01 Getting Started',
    '02 Design Principles',
    '03 Foundations',
    '04 Variables',
    '05 Icons',
    '06 Illustrations',
    '07 Components',
    '08 Patterns',
    '09 Templates',
    '10 Playground',
    '11 Documentation',
    '12 Changelog',
    '13 Experiments',
    '14 Archive',
  ];
  assert.deepEqual(
    manifest.pages.map((page) => page.name),
    expected,
  );
  assert.deepEqual(
    manifest.pages.map((page) => page.order),
    expected.map((_, index) => index),
  );
});

test('Figma variable architecture exposes the approved five execution sections', () => {
  const variablePage = manifest.pages.find(
    (page) => page.name === '04 Variables',
  );
  assert.deepEqual(
    variablePage.items.map((item) => item.name),
    ['Primitive', 'Semantic', 'Theme', 'Responsive', 'Motion'],
  );
});

test('Stage 2 decisions encode collections, modes, representations, and unpublished governance', () => {
  const decisions = manifest.approvedDecisions;
  assert.equal(decisions.status, 'accepted');
  assert.equal(decisions.approvedDate, '2026-08-05');
  assert.equal(decisions.owner, 'Jai Singh');
  assert.equal(decisions.canonicalTokenDecision, 'ADR-0003');
  assert.equal(decisions.figmaRepresentationDecision, 'ADR-0004');
  assert.equal(decisions.evidenceDecision, 'ADR-0005');
  assert.equal(decisions.evidenceSchemaVersion, '2.0.0');
  assert.deepEqual(
    decisions.collections.map(({ name, authoredModes }) => ({
      name,
      authoredModes,
    })),
    [
      { name: 'Primitive', authoredModes: [] },
      { name: 'Semantic', authoredModes: [] },
      { name: 'Theme', authoredModes: ['Light', 'Dark'] },
      { name: 'Responsive', authoredModes: [] },
      { name: 'Motion', authoredModes: [] },
    ],
  );
  assert.equal(decisions.representationPolicies.shadows, 'effect-styles');
  assert.equal(
    decisions.representationPolicies.cubicBezier,
    'technical-metadata',
  );
  assert.equal(decisions.representationPolicies.zIndex, 'technical-metadata');
  assert.equal(
    decisions.representationPolicies.grid,
    'layout-grid-styles-with-open-token-decision',
  );
  assert.equal(
    decisions.publishingPolicy.state,
    'unpublished-during-foundations',
  );
  assert.deepEqual(decisions.pendingSpecialistReviews, [
    'engineering',
    'accessibility',
  ]);
  assert.equal(
    decisions.specialistReviewPolicy,
    'accessibility-audit-non-blocking-for-foundation-v1-required-before-public-release',
  );
  assert.deepEqual(
    decisions.collections.map(({ name, implementationStatus }) => [
      name,
      implementationStatus,
    ]),
    [
      ['Primitive', 'reconciled-ready-for-approval'],
      ['Semantic', 'reconciled-ready-for-approval'],
      ['Theme', 'reconciled-ready-for-approval'],
      ['Responsive', 'approved-color-foundation-v1'],
      ['Motion', 'approved-color-foundation-v1'],
    ],
  );
  assert.deepEqual(
    decisions.collections.map(({ name, colorVariableCount }) => [
      name,
      colorVariableCount,
    ]),
    [
      ['Primitive', 100],
      ['Semantic', 35],
      ['Theme', 35],
      ['Responsive', 0],
      ['Motion', 0],
    ],
  );
  assert.ok(
    decisions.collections.every(
      ({ collectionId }) => collectionId.status === 'captured',
    ),
  );
});

test('IOS-003.3 architecture is ready for approval after human evidence closure', () => {
  assert.equal(
    manifest.figmaFile.status,
    'IOS-003.3 color variables reconciled; ready for approval',
  );
  assert.equal(
    manifest.pages.find(({ name }) => name === '03 Foundations').status,
    'foundation-reconciliation-ready-for-approval',
  );
});

test('Stage 2 evidence records temporary review without claiming specialist approval', () => {
  assert.equal(architectureEvidence.status, 'review');
  assert.equal(architectureEvidence.reviewStatus, 'in-review');
  assert.equal(architectureEvidence.accessibilityStatus, 'not-reviewed');
  assert.equal(
    architectureEvidence.figmaEvidence.review.approvalStatus,
    'in-review',
  );
  assert.match(
    architectureEvidence.figmaEvidence.review.reviewer,
    /Jai Singh.*temporary/,
  );
  assert.ok(
    architectureEvidence.evidenceLinks.includes(
      'docs/decisions/0004-figma-foundation-representation.md',
    ),
  );
  assert.ok(
    architectureEvidence.evidenceLinks.includes(
      'docs/decisions/0005-evidence-manifest-v2.md',
    ),
  );
});

test('verified Figma state is captured and unavailable identifiers remain null', () => {
  assert.deepEqual(manifest.figmaFile.fileKey, {
    status: 'captured',
    value: 'OJqxFKoGjRh4rrSZCKdkzi',
  });
  const foundationsPage = manifest.pages.find(
    (page) => page.name === '03 Foundations',
  );
  const color = foundationsPage.items.find((item) => item.name === 'Color');
  assert.deepEqual(foundationsPage.nodeId, {
    status: 'captured',
    value: '2:4',
  });
  assert.deepEqual(color.nodeId, { status: 'captured', value: '26:14' });
  assert.deepEqual(manifest.figmaFile.accessPolicy, {
    status: 'captured',
    value:
      'Owner Jai Singh; InterfaceOS Design System project; file sharing and edit permissions recorded separately from library publication governance; publishing permission confirmed; branching enabled',
  });

  const pendingLocators = [
    manifest.figmaFile.libraryKey,
    ...manifest.pages
      .filter((page) => page.name !== '03 Foundations')
      .flatMap((page) => [
        page.nodeId,
        ...page.items.map((item) => item.nodeId),
      ]),
    ...foundationsPage.items
      .filter((item) => item.name !== 'Color')
      .map((item) => item.nodeId),
  ];
  for (const locator of pendingLocators) {
    assert.equal(locator.status, 'pending-human-capture');
    assert.equal(locator.value, null);
  }
});

test('execution plan accounts for 169 logical token mappings', async () => {
  const files = [
    'packages/tokens/src/primitives/border.tokens.json',
    'packages/tokens/src/primitives/breakpoint.tokens.json',
    'evidence/snapshots/ios-003-1-canonical-color.tokens.json',
    'packages/tokens/src/primitives/opacity.tokens.json',
    'packages/tokens/src/primitives/radius.tokens.json',
    'packages/tokens/src/primitives/shadow.tokens.json',
    'packages/tokens/src/primitives/sizing.tokens.json',
    'packages/tokens/src/primitives/spacing.tokens.json',
    'packages/tokens/src/primitives/typography.tokens.json',
    'packages/tokens/src/primitives/z-index.tokens.json',
    'packages/tokens/src/semantic/color.tokens.json',
    'packages/tokens/src/themes/light.tokens.json',
    'packages/tokens/src/semantic/responsive.tokens.json',
    'packages/tokens/src/primitives/motion.tokens.json',
  ];
  let count = 0;
  for (const file of files) {
    const document = JSON.parse(await readFile(file, 'utf8'));
    const entries = flattenDocument(document, file).filter(
      ({ name }) => !name.includes('.data.categorical.'),
    );
    count += entries.length;
  }
  assert.equal(count, 169);
});

test('generated distributions stay ignored and are published as CI artifacts', async () => {
  const [gitignore, workflow] = await Promise.all([
    readFile('.gitignore', 'utf8'),
    readFile('.github/workflows/quality.yml', 'utf8'),
  ]);
  assert.match(gitignore, /^dist\/$/m);
  assert.match(workflow, /pnpm build/);
  assert.match(workflow, /actions\/upload-artifact@v7/);
  assert.match(workflow, /packages\/tokens\/dist\//);
});
