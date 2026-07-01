/* ============================================================
   Build-time prerender for the Susana Lopez site.

   WHAT IT DOES
   1. Copies every git-tracked file into ./dist  (mirrors what
      Netlify already deploys today — blog pages are static HTML
      and are copied as-is).
   2. Serves ./dist locally, opens "/" in headless Chromium so the
      CDN React + Babel app actually renders.
   3. Freezes the rendered homepage: extracts <div id="root"> …
      and inlines it into dist/index.html.

   WHY IT'S SAFE
   The app mounts with ReactDOM.createRoot().render() (NOT hydrate),
   so on a real visit React clears #root and re-renders normally —
   design and interactivity are untouched. The inlined HTML exists
   purely so crawlers / non-JS fetches see the real content.
   ============================================================ */
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import {
  readFileSync, writeFileSync, mkdirSync, cpSync,
  existsSync, statSync
} from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const PORT = 8790;

// Build-only files that should NOT be copied into the published site.
const SKIP = new Set([
  'prerender.mjs', 'package.json', 'package-lock.json',
  'netlify.toml', '.gitignore'
]);

/* ---------- 1. Fresh dist + copy tracked files ---------- */
execSync(`rm -rf ${JSON.stringify(DIST)}`);
mkdirSync(DIST, { recursive: true });

const tracked = execSync('git ls-files', { encoding: 'utf8' })
  .split('\n').map(s => s.trim()).filter(Boolean);

let copied = 0;
for (const rel of tracked) {
  if (SKIP.has(rel)) continue;
  const src = join(ROOT, rel);
  if (!existsSync(src) || statSync(src).isDirectory()) continue;
  const dest = join(DIST, rel);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest);
  copied++;
}
console.log(`Copied ${copied} files into dist/`);

/* ---------- 2. Tiny static server over dist ---------- */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.xml': 'application/xml', '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon'
};
const server = createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let fp = join(DIST, p);
  if (existsSync(fp) && statSync(fp).isDirectory()) fp = join(fp, 'index.html');
  if (!existsSync(fp)) { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'Content-Type': MIME[extname(fp)] || 'application/octet-stream' });
  res.end(readFileSync(fp));
});
await new Promise(r => server.listen(PORT, r));
console.log(`Serving dist/ on http://localhost:${PORT}`);

/* ---------- 3. Render "/" and freeze #root ---------- */
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle', timeout: 60000 });

  // Wait until React has rendered the full page (contact is the last section).
  await page.waitForSelector('#root section#contact, #root #contact', { timeout: 60000 });
  await page.waitForTimeout(1500); // let remaining sections settle

  // Neutralize scroll-animation hiding so the static snapshot is fully visible.
  // (Harmless: React re-renders from scratch on real visits and re-applies animations.)
  await page.evaluate(() => {
    document.querySelectorAll('#root *').forEach(el => {
      if (el.style) {
        el.style.removeProperty('opacity');
        el.style.removeProperty('transform');
        el.style.removeProperty('visibility');
      }
      if (el.classList) el.classList.remove('reveal', 'fade');
    });
  });

  const rootHTML = await page.evaluate(() => {
    const r = document.getElementById('root');
    return r ? r.innerHTML : '';
  });

  if (!rootHTML || rootHTML.length < 2000) {
    throw new Error(`Prerender produced too little HTML (${rootHTML.length} chars) — aborting so a broken build is not published.`);
  }

  const indexPath = join(DIST, 'index.html');
  let html = readFileSync(indexPath, 'utf8');
  if (!html.includes('<div id="root"></div>')) {
    throw new Error('Could not find empty <div id="root"></div> in index.html to inject into.');
  }
  html = html.replace('<div id="root"></div>', `<div id="root">${rootHTML}</div>`);
  writeFileSync(indexPath, html);
  console.log(`Prerendered homepage: injected ${rootHTML.length} chars into dist/index.html`);
} finally {
  await browser.close();
  server.close();
}
