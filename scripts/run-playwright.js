import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import http from 'http';
import pc from 'picocolors';
const { green, red } = pc;

function serveDirectory(dir) {
  const server = http.createServer((req, res) => {
    try {
      // Use WHATWG URL API to parse paths (avoids deprecated url.parse)
      const base = `http://${req.headers.host || '127.0.0.1'}`;
      const parsed = new URL(req.url || '/', base);
      let pathname = parsed.pathname || '/';
      if (pathname === '/') pathname = '/index.html';
      const filePath = path.join(dir, pathname);
      if (!filePath.startsWith(dir)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
      }
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const stream = fs.createReadStream(filePath);
        const ext = path.extname(filePath).toLowerCase();
        const mime =
          {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.svg': 'image/svg+xml',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.webp': 'image/webp',
            '.woff2': 'font/woff2',
          }[ext] || 'application/octet-stream';
        res.setHeader('Content-Type', mime);
        stream.pipe(res);
      } else {
        res.statusCode = 404;
        res.end('Not found');
      }
    } catch (err) {
      res.statusCode = 500;
      res.end('Server error');
    }
  });
  return new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      if (!addr || typeof addr === 'string') return reject(new Error('Invalid address'));
      const base = `http://127.0.0.1:${addr.port}`;
      resolve({ server, base });
    });
  });
}

const ROOT = path.join(new URL(import.meta.url).pathname, '..', '..');

function getTemplates() {
  const templatesDir = path.join(ROOT, 'templates');
  return fs
    .readdirSync(templatesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(templatesDir, d.name));
}

async function testTemplateConsole(dir) {
  console.log('\n== E2E Template:', dir, '==');
  const distDir = path.join(dir, 'dist');

  // Find an `index.html` under `dist` recursively (e.g. dist/index.html or dist/fotos/index.html).
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

  const distIndex = findIndexHtml(distDir);
  if (!distIndex) {
    throw new Error(`No index.html found under dist for ${dir}. Ensure the template build produces an index.html.`);
  }

  const serveFrom = distDir;
  const rel = path.relative(distDir, distIndex).split(path.sep).join('/');
  const openPath = '/' + rel;

  const { server, base } = await serveDirectory(serveFrom);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const messages = [];
  page.on('console', (msg) => {
    messages.push(msg.text());
  });

  const openUrl = base + openPath;
  console.log('  - Opening', openUrl);
  await page.goto(openUrl, { waitUntil: 'load', timeout: 15000 });
  // wait a short while for demo.js to run and log
  await page.waitForTimeout(500);

  await browser.close();
  server.close();

  const joined = messages.join('\n');
  if (joined.includes('Website-Starterkit')) {
    console.log('  ✔ Found demo console output.');
    return true;
  }
  console.log('  - Console output:\n', joined);
  throw new Error(`Expected demo console message not found for ${dir}`);
}

async function main() {
  const templates = getTemplates();
  try {
    for (const t of templates) {
      // eslint-disable-next-line no-await-in-loop
      await testTemplateConsole(t);
    }
    console.log('\n' + green('✅ All Playwright E2E checks passed.'));
  } catch (err) {
    console.error('\n' + red('🔴 Playwright E2E checks failed:'), err.message);
    process.exit(1);
  }
}

main();
