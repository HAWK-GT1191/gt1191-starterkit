import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.join(__dirname, '../templates');

const pckjsoPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(pckjsoPath, 'utf8'));
const version = packageJson.version;

function updateVersion(dir: string): void {
  const pckjsoPath = path.join(dir, 'package.json');

  if (fs.existsSync(pckjsoPath)) {
    const packageJson = JSON.parse(fs.readFileSync(pckjsoPath, 'utf8'));
    packageJson.version = version;
    fs.writeFileSync(pckjsoPath, JSON.stringify(packageJson, null, 2));
  }
}

fs.readdirSync(templatesDir).forEach((template) => {
  const templateDir = path.join(templatesDir, template);
  if (fs.statSync(templateDir).isDirectory()) {
    updateVersion(templateDir);
  }
});
