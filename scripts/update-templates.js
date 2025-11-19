#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const preview = args.includes('--preview');

function getTemplates() {
  const templatesDir = path.join(__dirname, '..', 'templates');
  return fs.readdirSync(templatesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => path.join(templatesDir, d.name, 'package.json'))
    .filter(p => fs.existsSync(p));
}

function runNCU(pkgPath) {
  const cmd = `npx npm-check-updates ${preview ? '' : '-u'} --packageFile "${pkgPath}"`;
  console.log('\n---');
  console.log('Template:', pkgPath);
  console.log('  - Running:', cmd);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    // npm-check-updates returns non-zero when updates available in preview; ignore in preview
    if (!preview) {
      console.error('  - npm-check-updates failed for', pkgPath);
    }
  }
  // If not in preview mode, run the appropriate install in the template folder
  if (!preview) {
    const dir = path.dirname(pkgPath);
    let installCmd = null;
    if (fs.existsSync(path.join(dir, 'pnpm-lock.yaml')) || fs.existsSync(path.join(dir, 'pnpm-lock.yml'))) {
      installCmd = 'pnpm install';
    } else if (fs.existsSync(path.join(dir, 'package-lock.json'))) {
      installCmd = 'npm install';
    } else if (fs.existsSync(path.join(dir, 'yarn.lock'))) {
      installCmd = 'yarn install';
    } else {
      // Default to npm install when no lockfile is present — works for most users
      installCmd = 'npm install';
    }

    console.log(`  - Running install in ${dir}: ${installCmd}`);
    try {
      execSync(installCmd, { stdio: 'inherit', cwd: dir });
    } catch (err) {
      console.error(`  - Install failed in ${dir}. Please run '${installCmd}' manually.`);
    }
  }
}

function main() {
  const files = getTemplates();
  if (!files.length) {
    console.log('No template package.json files found.');
    return;
  }
  console.log('Found templates:', files.join(', '));
  files.forEach(runNCU);

  if (!preview) {
    console.log('\nFinished updates and per-template installs.');
  } else {
    console.log('\nPreview mode: no changes written, no installs executed.');
  }
}

main();
