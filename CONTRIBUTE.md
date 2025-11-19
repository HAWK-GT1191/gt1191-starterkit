# Contribute to create-website-starterkit

This document is for maintainers of the `create-website-starterkit` package.
It explains how to run tests, update templates, and perform releases (locally and in CI).

## Quick start

- Node: Use Node 22 or Node 24 (this repo requires `node >=22 <25`).
- pnpm recommended; npm is also supported.

### Install dependencies

```bash
pnpm install
# or
npm install
```

### Commands

| Check                      | Command                                 |
| -------------------------- | --------------------------------------- |
|                            | **LOCAL CHECKS**                        |
| Smoke builds for templates | `pnpm run test:templates`               |
| Playwright E2E checks      | `pnpm run test:e2e`                     |
| Both checks (CI-like)      | `pnpm run test:all`                     |
|                            | **Updating template dependencies**      |
| Preview updates (all)      | `pnpm run update:templates:preview:all` |
| Apply updates (all)        | `pnpm run update:templates:all`         |

## Release workflow

The workflow is defined in GitHub`.github/workflows/release.yml`.

- The Release job runs when a tag `v*.*.*` is pushed or when manually dispatched (`workflow_dispatch`).
- The Release job uses `pnpm` and runs `test:templates` and `test:e2e` before publishing.
- The Release job is assigned to the `release` environment; this requires a manual approval step in GitHub (configure an environment in repo Settings → Environments and set required reviewers).

### Important GitHub settings you must configure

- Add `NPM_TOKEN` as a repository secret: Repository → Settings → Secrets and variables → Actions → New repository secret. Name it `NPM_TOKEN` and paste the npm automation token.
- Create a GitHub Environment named `release` (Repository → Settings → Environments → New environment `release`). In the environment settings add at least one required reviewer or team so that the release job requires manual approval before the publish step.
- In Repository → Settings → Actions → General ensure Workflow permissions are set to "Read and write permissions" (needed so the workflow can create tags/releases and push updates). Also enable "Allow GitHub Actions to create and approve deployments" if you plan to use environment deployments.
- Confirm that Actions has access to repository secrets for workflows (default), so `NPM_TOKEN` will be available to the release workflow.

Why these settings?

- `NPM_TOKEN` is required by the release job to publish the package to npm from CI.
- The `release` environment with required reviewers enforces a human gate: tests run automatically, but publishing only proceeds after an authorized reviewer approves the environment deployment.
- Read/write workflow permissions are necessary for the job to push tags/commits or create releases via the `GITHUB_TOKEN`.

## Release

A commit to the main branch will not automatically create a release.
You must create a new tag (e.g., `v1.2.3`) to trigger the release workflow. You can do it either manually or via automation.

### Local release steps

1. Testing before creating a tag:

```bash
git status --porcelain   # must be empty
pnpm install
pnpm run test:all
```

2. Set token:

```bash
export NPM_TOKEN "PASTE_YOUR_TOKEN_HERE"
```

3. Dry-Run:

```bash
pnpm release -- --ci --dry-run --increment patch
```

4. Release:

```bash
pnpm release -- --ci --increment patch
```

### Automatic Release

```bash
pnpm release
```
