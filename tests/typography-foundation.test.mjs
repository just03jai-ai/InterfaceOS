import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { flattenDocument } from '../packages/tokens/lib/token-core.mjs';

const typographyDirectory = 'docs/design-system/foundations/typography';
const schemaFiles = [
  'schemas/type-style.schema.json',
  'schemas/typography-foundation-contract.schema.json',
  'schemas/font-decision.schema.json',
  'schemas/typography-figma-blueprint.schema.json',
];
const [schemas, contract, fontDecision, catalog, blueprint, sourceText] =
  await Promise.all([
    Promise.all(
      schemaFiles.map((file) => readFile(file, 'utf8').then(JSON.parse)),
    ),
    readFile(
      `${typographyDirectory}/typography-foundation.contract.json`,
      'utf8',
    ).then(JSON.parse),
    readFile(
      `${typographyDirectory}/font-decision.candidates.json`,
      'utf8',
    ).then(JSON.parse),
    readFile(`${typographyDirectory}/type-style.catalog.json`, 'utf8').then(
      JSON.parse,
    ),
    readFile(
      `${typographyDirectory}/typography-figma-blueprint.json`,
      'utf8',
    ).then(JSON.parse),
    readFile('packages/tokens/src/primitives/typography.tokens.json', 'utf8'),
  ]);
const [foundationEvidence, approvalEvidence] = await Promise.all([
  readFile('evidence/foundations/IOS-FND-TYPOGRAPHY.json', 'utf8').then(
    JSON.parse,
  ),
  readFile(
    'evidence/reviews/IOS-004-1-TYPOGRAPHY-ARCHITECTURE-APPROVAL.json',
    'utf8',
  ).then(JSON.parse),
]);

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
for (const schema of schemas) ajv.addSchema(schema);

const artifacts = [
  [
    'https://interfaceos.dev/schemas/typography-foundation-contract.schema.json',
    contract,
  ],
  ['https://interfaceos.dev/schemas/font-decision.schema.json', fontDecision],
  ['https://interfaceos.dev/schemas/type-style.schema.json', catalog],
  [
    'https://interfaceos.dev/schemas/typography-figma-blueprint.schema.json',
    blueprint,
  ],
];

test('IOS-004.1 machine contracts satisfy their schemas', () => {
  for (const [schemaId, artifact] of artifacts) {
    const validate = ajv.getSchema(schemaId);
    assert.equal(validate(artifact), true, ajv.errorsText(validate.errors));
  }
});

test('canonical typography inventory and checksum remain exact', () => {
  const source = JSON.parse(sourceText);
  const checksum = createHash('sha256').update(sourceText).digest('hex');
  assert.equal(checksum, contract.canonicalSource.sha256);
  assert.equal(flattenDocument(source).length, 21);
  assert.deepEqual(contract.canonicalSource.inventory, {
    fontFamily: 2,
    fontSize: 8,
    fontWeight: 4,
    lineHeight: 4,
    letterSpacing: 3,
    paragraphSpacing: 0,
    semanticStyles: 0,
    responsiveMappings: 0,
  });
  assert.equal(contract.canonicalSource.valuesModified, false);
});

test('semantic role catalog is complete but maps no unapproved values', () => {
  assert.equal(catalog.status, 'role-inventory-approved-no-values-mapped');
  assert.deepEqual(
    catalog.styles.map(({ role }) => role),
    contract.semanticRoles,
  );
  assert.equal(new Set(catalog.styles.map(({ name }) => name)).size, 13);
  assert.equal(
    catalog.styles.every(({ sizeMapping }) => sizeMapping === null),
    true,
  );
  assert.equal(
    catalog.styles.every(
      ({ status }) => status === 'role-approved-mapping-pending',
    ),
    true,
  );
});

test('typography Figma blueprint has the exact 18-board sequence', () => {
  const expectedNames = [
    '01 Typography / Philosophy',
    '02 Typography / Font family candidates',
    '03 Typography / Font delivery and licensing',
    '04 Typography / Type scale anatomy',
    '05 Typography / Display styles',
    '06 Typography / Heading styles',
    '07 Typography / Body styles',
    '08 Typography / Labels and captions',
    '09 Typography / Numeric and data typography',
    '10 Typography / Code typography',
    '11 Typography / Responsive typography',
    '12 Typography / Dense enterprise typography',
    '13 Typography / Internationalization',
    '14 Typography / Accessibility',
    '15 Typography / Light and Dark examples',
    '16 Typography / Decision log',
    '17 Typography / Review and approval',
    '18 Typography / Handoff and evidence',
  ];
  assert.deepEqual(
    blueprint.boards.map(({ order }) => order),
    Array.from({ length: 18 }, (_, index) => index + 1),
  );
  assert.deepEqual(
    blueprint.boards.map(({ name }) => name),
    expectedNames,
  );
  assert.equal(blueprint.mutationAuthorized, false);
  assert.equal(blueprint.status, 'approved-specification');
  assert.equal(blueprint.libraryPublicationState, 'unpublished');
});

test('IOS-004.1 architecture approval is recorded without implementation claims', () => {
  assert.equal(contract.status, 'architecture-approved');
  assert.deepEqual(contract.architectureApproval, {
    status: 'approved',
    date: '2026-08-06',
    owner: 'Jai Singh',
    decision: 'docs/decisions/0007-typography-foundation-architecture.md',
    specialistEngineeringReview: 'pending',
    specialistAccessibilityReview: 'pending',
  });
  assert.equal(foundationEvidence.status, 'specification');
  assert.equal(foundationEvidence.reviewStatus, 'approved');
  assert.equal(foundationEvidence.accessibilityStatus, 'in-progress');
  assert.equal(
    foundationEvidence.figmaEvidence.review.approvalStatus,
    'pending',
  );
  assert.equal(approvalEvidence.status, 'approval');
  assert.equal(approvalEvidence.reviewStatus, 'approved');
  assert.equal(approvalEvidence.figmaEvidence.captureStatus, 'not-applicable');
});

test('font, licensing, accessibility, and release decisions remain pending', () => {
  assert.equal(fontDecision.selectedCandidate, null);
  assert.equal(fontDecision.status, 'pending-human-decision');
  assert.equal(fontDecision.approvals.licensing, 'pending');
  assert.equal(
    fontDecision.approvals.accessibility,
    'pending-specialist-review',
  );
  assert.equal(fontDecision.approvals.engineering, 'pending-specialist-review');
  assert.equal(fontDecision.approvals.independentRelease, 'pending');
  assert.ok(contract.prohibitions.includes('font-download-or-bundling'));
  assert.ok(contract.prohibitions.includes('library-publication'));
});
