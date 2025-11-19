DEVELOPER GUIDE — create-website-starterkit

Purpose
- This document is for developers of the create-website-starterkit package. It explains how to run tests, update templates, and publish releases (locally and via CI).

Suggested filename
- Common names: `CONTRIBUTING.md`, `DEVELOPER.md`, `README.DEV.md`.
- I chose `DEVELOPER.md` for a concise developer-focused README.

Prerequisites
- Node.js: use Node 22 or Node 24 (this repo requires `node >=22 <25`).
- pnpm (recommended) or npm available on PATH.
- An npm account (for publishing) and npm auth token if you want to publish non-interactively.

Install dependencies
- From repo root:

```bash
pnpm install
# or with npm: npm install
```

Quick commands (local)
- Run smoke builds for all templates:

```bash
npm run test:templates
```

- Run Playwright E2E checks (served locally):

```bash
npm run test:e2e
```

- Run both (used by CI):

```bash
npm run test:all
```

- Preview template dependency updates (per-template):

```bash
npm run update:templates:preview
```

- Apply dependency updates to templates:

```bash
npm run update:templates
```

Notes about the tests
- `test:templates` builds each template and now requires the build to produce an `index.html` (under `dist/`).
- `test:e2e` serves each template `dist/` directory over a tiny HTTP server and uses Playwright to assert that `demo.js` writes the expected console output.
- Success/failure lines are highlighted (green/red) for easier scanning in terminal.

Release and publishing (developer workflow)

1) Prepare tokens and secrets
- Locally you can publish with `npm` after logging in interactively:
  - `npm login` (enter your credentials)
  - `npm publish --access public`
- For CI automation you need an `NPM_TOKEN` that you set into the repo secrets (GitHub repository Settings → Secrets → Actions).
- Additionally, `GITHUB_TOKEN` is provided automatically to Actions; `release-it` will use it to create GitHub releases if configured.

2) Release locally with `release-it` (already configured in this repo)
- Make sure `devDependencies` are installed (release-it is present).
- Run:

```bash
# Interactive release flow (prompts version bump, creates tag/release, pushes)
npm run release
# or
npx release-it
```

- `release-it` can be configured to also publish to npm (set `npm.publish` config in `.release-it.json` or `package.json`). If you want a fully automated publish, you must provide `NPM_TOKEN`.

3) Example manual publish (minimal)
- Build the package:

```bash
npm run build
```

- Publish to npm (after `npm login`):

```bash
npm publish --access public
```

CI/CD and automation suggestions

- Recommended: Use GitHub Actions to run the same checks automatically and to perform a release workflow that creates a tag + GitHub Release and — optionally — publishes to npm.

- Minimal CI responsibilities:
  - Run `pnpm install` (or `npm ci`) and the two checks: `npm run test:templates` and `npm run test:e2e`.
  - Fail fast on test failures.

- Release automation (two common options):
  1) automated release on tag/release creation:
     - Trigger: `on: release` (types: [created]) or `on: push` filtered to tags.
     - Job: run tests, then run `npx release-it --ci` or `npx release-it` with proper env vars (`NPM_TOKEN`, `GITHUB_TOKEN`).
     - If `release-it` is configured to publish to npm, it will do so.
     - Pros: hands-off; Cons: publishing requires well-protected tokens and good tests.

  2) manual gated release (recommended for higher safety):
     - Trigger the CI on pushes / PRs to `main` to run tests.
     - Create a GitHub Release manually (or via `release-it` locally) only after verifying CI output.
     - Optionally use a manual `workflow_dispatch` step or GitHub Environments with required reviewers to give human approval before publishing to npm.
     - Pros: Safer; Cons: one more manual step.

- Security notes:
  - Never store `NPM_TOKEN` in repo files — use GitHub Secrets.
  - Prefer manual approval for publishing to npm if you want strict control.

Sample GitHub Actions outline (example)

```yaml
name: CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install
      - name: Run smoke builds
        run: npm run test:templates
      - name: Run E2E
        run: npm run test:e2e

# publish job (trigger manually or on release tag)
# requires secrets: NPM_TOKEN
# - name: Publish
#   run: |
#     echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
#     npm run build
#     npm publish --access public
```

How to update the `create-website-starterkit` package (summary)

- Locally (manual):
  1. Update code, tests pass locally.
  2. Run `npm run release` (interactive `release-it`) or `npx release-it --ci` (non-interactive) after setting `NPM_TOKEN` locally as env var.
  3. This creates tags/releases (if configured) and (optionally) publishes to npm.

- Via CI (automatic):
  - Configure GitHub Actions to run release pipeline on new tag/release. The Action must be allowed to use `NPM_TOKEN` from Secrets. Use `environments` or manual approvals if you want gating.

Which strategy should you pick?
- If you want safety and human review: prefer manual release creation + protected branches + CI that only publishes when you (or an appointed person) create the release.
- If you want fully automated releases: configure `release-it` in CI with `NPM_TOKEN` and verify your tests and branch protections carefully.

Notes for students vs developers
- This `DEVELOPER.md` is aimed at maintainers and covers the developer workflow. The public `README.md` (for students) should remain concise and user-facing.

---

If you want, I can:
- Create a working GitHub Actions workflow file that runs the tests and optionally publishes when a GitHub Release is created.
- Add a `.release-it.json` config to control how `release-it` behaves in CI.
- Create a small script to show how to publish a new version with `release-it --ci` using environment variables.

Which next step shall I take? (1) add CI workflow, (2) add `release-it` config, (3) leave automation to you (and only add docs). Choose one or say what else you want.
