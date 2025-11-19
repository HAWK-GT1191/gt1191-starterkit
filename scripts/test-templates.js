import { execSync } from 'node:child_process';
import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
const { green, red } = pc;

const ROOT = path.join(new URL(import.meta.url).pathname, '..', '..');
function getTemplates() {
  const templatesDir = path.join(ROOT, 'templates');
  return fs
    .readdirSync(templatesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(templatesDir, d.name));
}

function run(cmd, opts = {}) {
  console.log('   $', cmd);
  execSync(cmd, { stdio: 'inherit', ...opts });
}

async function runTemplateBuild(dir) {
  console.log('\n== Template:', dir, '==');
  // use npm to install (the goal is npm-compatibility)
  try {
    // Use plain npm install to avoid lockfile sync issues across package managers
    run('npm install --no-audit --no-fund', { cwd: dir });
  } catch (err) {
    throw new Error(`Install failed in ${dir}: ${err.message}`);
  }

  // Run build
  try {
    run('npm run build', { cwd: dir });
  } catch (err) {
    throw new Error(`Build failed in ${dir}: ${err.message}`);
  }

  // check dist
  const dist = path.join(dir, 'dist');
  // We only validate presence of `index.html` as the primary page under test.
  // Find any index.html under dist (allow nested index.html like dist/fotos/index.html).
  function findIndexHtml(d) {
    if (!fs.existsSync(d)) return null;
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) {
        const found = findIndexHtml(p);
        if (found) return found;
      } else if (e.isFile() && e.name === 'index.html') {
        return p;
      }
    }
    return null;
  }

  const foundIndex = findIndexHtml(dist);
  if (!foundIndex) {
    throw new Error(`No index.html found under dist for ${dir}. The smoke test requires a built index.html.`);
  }
  console.log('  ✔ found built index:', foundIndex);
}

async function main() {
  const templates = getTemplates();
  if (!templates.length) {
    console.log('No templates found');
    process.exit(1);
  }
  try {
    for (const t of templates) {
      // skip templates that are private but still test
      // run build
      // eslint-disable-next-line no-await-in-loop
      await runTemplateBuild(t);
    }
    console.log('\n' + green('✅ All template builds succeeded.'));
  } catch (err) {
    console.error('\n' + red('🔴 Template builds failed:'), err.message);
    process.exit(1);
  }
}

main();
