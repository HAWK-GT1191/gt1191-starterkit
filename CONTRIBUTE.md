# Contribute to create-website-starterkit

This document is for maintainers of the `create-website-starterkit` package.
It explains how to run tests, update templates, and perform releases.

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

| Check                      | Command                             |
| -------------------------- | ----------------------------------- |
|                            | **LOCAL CHECKS**                    |
| Smoke builds for templates | `pnpm run test:templates`           |
| Playwright E2E checks      | `pnpm run test:e2e`                 |
| Both checks (CI-like)      | `pnpm run test:all`                 |
|                            | **Updating template dependencies**  |
| Preview updates (all)      | `pnpm run update:templates:preview` |
| Apply updates (all)        | `pnpm run update:templates`         |

## Release Process

Releases are fully automated via GitHub Actions. You do not need to run `release-it` locally.

### 1. Make your changes

Make your code changes, commit them, and push them to the `main` branch.

```bash
git add .
git commit -m "feat: add amazing new feature"
git push origin main
```

### 2. Trigger the Release

We have a helper script to open the release page:

```bash
npm run release
```

Or manually:

1. Go to the [GitHub Actions Release Workflow](https://github.com/HAWK-GT1191/gt1191-starterkit/actions/workflows/release.yml).
2. Click on **Run workflow**.
3. Select the version increment:
   - **patch**: for bug fixes (e.g., 1.0.0 -> 1.0.1)
   - **minor**: for new features (e.g., 1.0.0 -> 1.1.0)
   - **major**: for breaking changes (e.g., 1.0.0 -> 2.0.0)
4. Click the green **Run workflow** button.

The pipeline will automatically:

- Run all tests
- Build the project
- Bump the version in `package.json` and `templates/*/package.json`
- Create a git tag
- Publish the package to npm
- Push the version bump back to the `main` branch

### 3. Sync local repository

After the release is finished successfully, pull the changes (the version bump) back to your local machine. Using `--tags` ensures you also get the new release tag locally.

```bash
git pull --tags
```
