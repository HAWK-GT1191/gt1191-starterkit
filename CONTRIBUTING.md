CONTRIBUTING — Developer Guide for create-website-starterkit

This document is for maintainers of the `create-website-starterkit` package.
It explains how to run tests, update templates, and perform releases (locally and in CI).

Quick start

- Node: Use Node 22 or Node 24 (this repo requires `node >=22 <25`).
- pnpm recommended; npm is also supported.

Install dependencies

```bash
pnpm install
# or
npm install
```

Local checks

- Smoke builds for templates:

```bash
npm run test:templates
```

- Playwright E2E checks (served locally):

```bash
npm run test:e2e
```

- Run both checks (CI-like):

```bash
npm run test:all
```

Updating template dependencies

- Preview updates (per-template):

```bash
npm run update:templates:preview
```

- Apply updates to templates:

```bash
npm run update:templates
```

Release workflow (recommended)

I added a Release workflow: `.github/workflows/release.yml`.

Key points:

- The Release job runs when a tag `v*.*.*` is pushed or when manually dispatched (`workflow_dispatch`).
- The Release job now uses `pnpm` and runs `test:templates` and `test:e2e` before publishing.
- The Release job is assigned to the `release` environment; this requires a manual approval step in GitHub (configure an environment in repo Settings → Environments and set required reviewers).

Important GitHub settings you must configure

- Add `NPM_TOKEN` as a repository secret: Repository → Settings → Secrets and variables → Actions → New repository secret. Name it `NPM_TOKEN` and paste the npm automation token.
- Create a GitHub Environment named `release` (Repository → Settings → Environments → New environment `release`). In the environment settings add at least one required reviewer or team so that the release job requires manual approval before the publish step.
- In Repository → Settings → Actions → General ensure Workflow permissions are set to "Read and write permissions" (needed so the workflow can create tags/releases and push updates). Also enable "Allow GitHub Actions to create and approve deployments" if you plan to use environment deployments.
- Confirm that Actions has access to repository secrets for workflows (default), so `NPM_TOKEN` will be available to the release workflow.

Why these settings?

- `NPM_TOKEN` is required by the release job to publish the package to npm from CI.
- The `release` environment with required reviewers enforces a human gate: tests run automatically, but publishing only proceeds after an authorized reviewer approves the environment deployment.
- Read/write workflow permissions are necessary for the job to push tags/commits or create releases via the `GITHUB_TOKEN`.

Publishing to npm (developer options)

1. Manual (local):

```bash
npm run build
npm login                # interactive
npm publish --access public
```

2. CI-driven (recommended with safety):

- Add `NPM_TOKEN` to repository secrets (Settings → Secrets → Actions).
- The release workflow will use `NPM_TOKEN` and `GITHUB_TOKEN` to run `npx release-it --ci`, which will create a tag, GitHub Release and publish to npm.

Notes about automation vs manual publish

- Using CI automation is convenient and repeatable. Ensure tests are stable and protect the release workflow (use manual `workflow_dispatch` or `environments` with approval) if you want a human gate.
- If you prefer maximum control, create the tag/release manually and let CI run the publish step only after manual approval.

.release-it configuration

- A `.release-it.json` file is added and configures `release-it` to publish to npm and create GitHub releases.

Security

- Never store `NPM_TOKEN` in the repository; use GitHub Secrets.
- Use branch protection (required checks) and PR reviews for `main` to avoid accidental releases.

If you want, I can:

- Tweak the workflows to require additional approvals or run on different triggers.
- Add a short helper script for creating a release locally with `release-it --ci`.

---

Questions answered:

- Do we need a shell script for `release-it`? No — `release-it` can be executed directly in CI (`npx release-it --ci`). A shell wrapper is optional for local convenience but not required.
- Should npm publish be automatic in CI? It can be. For safety, I recommend gating publishing behind either a manual workflow_dispatch or requiring repository environment approval. If you want fully automatic publish on tag, CI can do that using `NPM_TOKEN`.

---

If you want me to commit these workflow files and the `.release-it.json` config now, say yes and I'll add them.
