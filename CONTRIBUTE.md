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

## Release

A commit to the main branch will not automatically create a release. But it will start the workflow `.github/workflows/main.yml`, which just runs tests.

The workflow `.github/workflows/release.yml` is triggered, when a new tag `v*.*.*` is pushed or it is manually dispatched via the GitHub UI. It will use `environment: release`, which requires a manual approval step in GitHub (configure an environment in repo Settings → Environments and set required reviewers).

Follow the following steps to perform a release.

1. Do your changes and commit them:

```bash
git status --porcelain   # must be empty
git add .
git commit -m "feat: Some changes"
git push origin main
```

2. Trigger the release action in GitHub

```bash
gh workflow run Release --ref main -f version=X.Y.Z

# or manually create and push a tag:
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z
```

Check, which version is in the registry with `npm view create-website-starterkit version`, or list all versions with `npm view create-website-starterkit versions --json`. To see the latest tag, you can run `git describe --tags --abbrev=0`.

3. Wait for the pipeline to finish and the release to be published.

4. Local sync

```bash
git fetch origin --tags
git pull
```

### Perform a dry run

1. Prepare your local environment:

```bash
git status --porcelain   # must be empty
pnpm install
pnpm run test:all        # run tests locally
```

2. Set your npm token:

```bash
export NPM_TOKEN "PASTE_YOUR_TOKEN_HERE"
```

3. Dry-Run

```bash
pnpm release -- --ci --dry-run --increment patch
```
