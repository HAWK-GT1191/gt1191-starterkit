import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.join(__dirname, '../templates');
const lockFiles = ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock'];

console.log('Cleaning lock files from templates...');

if (fs.existsSync(templatesDir)) {
  const templates = fs.readdirSync(templatesDir);
  for (const template of templates) {
    const templateDir = path.join(templatesDir, template);
    if (fs.statSync(templateDir).isDirectory()) {
      for (const lockFile of lockFiles) {
        const filePath = path.join(templateDir, lockFile);
        if (fs.existsSync(filePath)) {
          console.log(`Removing ${filePath}`);
          fs.unlinkSync(filePath);
        }
      }
    }
  }
}

console.log('Done cleaning templates.');
