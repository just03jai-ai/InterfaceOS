# Git Strategy

## Branch model

- `main` is protected, releasable, and accepts changes through reviewed pull requests.
- Work uses short-lived branches named `type/ios-id-short-description`, such as `docs/ios-001-token-architecture`.
- Long-lived environment, development, or release branches are not used initially.

## Commits and pull requests

- Commits are focused, imperative, and traceable to an issue or milestone ID when applicable.
- Pull requests state intent, scope, evidence, risks, validation, migrations, and rollback.
- Required owners review cross-domain or governed changes.
- Force-pushing shared branches and committing directly to `main` are prohibited by policy.

## Merge and protection

Use squash merge by default. Require passing quality checks, resolved conversations, current approval, and no unresolved conflicts. GitHub branch protection is an external configuration blocker until enabled and verified.

## Repository hygiene

Never commit secrets, local environment files, generated caches, build output, or unrelated binaries. Signed commits/tags and CODEOWNERS remain pending identity and governance decisions rather than being fabricated.
