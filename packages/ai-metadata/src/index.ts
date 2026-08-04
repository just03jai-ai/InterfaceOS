export type InterfaceOSArtifactKind =
  | 'foundation'
  | 'token'
  | 'icon'
  | 'component'
  | 'pattern'
  | 'template'
  | 'page'
  | 'flow'
  | 'decision'
  | 'release';

export type ArtifactRelationship = {
  type: string;
  targetId: string;
};

export type ArtifactReference = {
  id: string;
  versionRange?: string;
};

export type EvidenceManifest = {
  schemaVersion: '1.0.0';
  id: string;
  name: string;
  type: InterfaceOSArtifactKind;
  status: string;
  version: string;
  owner: string;
  figmaUrl: string | null;
  figmaNodeId: string | null;
  documentationPath: string | null;
  codePath: string | null;
  storybookPath: string | null;
  aiMetadataPath: string | null;
  accessibilityStatus: string;
  reviewStatus: string;
  lastReviewedDate: string | null;
  dependencies: ArtifactReference[];
  relatedItems: ArtifactRelationship[];
  evidenceLinks: string[];
};
