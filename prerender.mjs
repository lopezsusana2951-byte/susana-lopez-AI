/* ============================================================
   Homepage prerenderer (runs LOCALLY, output is committed).

   The site is served statically from the repo root on Netlify —
   no build step, no headless browser in CI (that proved flaky).
   Instead, run this locally whenever the homepage content
   (app.jsx / sections.jsx / translations.js) changes:

       npm run prerender

   It renders "/" in headless Chromium, freezes the rendered
   <div id="root"> … </div>, and writes it into index.html from the
   clean template index.template.html.

   WHY IT'S SAFE
   The app mounts with ReactDOM.createRoot().render() (NOT hydrate),
   so on a real visit React clears #root and re-renders normally —
   design and interactivity are untouched. The inlined HTML exists
   purely so crawlers / non-JS fetches see real content, prices and
   headings before any JavaScript runs.

   Blog pages are already static HTML and are unaffected.
   ============================================================ */
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const PORT = 8790;
const TEMPLATE = join(ROOT, 'index.template.html');
const OUT = join(ROOT, 'index.html');

if (!existsSync(TEMPLATE)) {
  throw new Error('index.template.html not found — it is the clean (empty #root) source for the homepage.');
}
const template = readFileSync(TEMPLATE, 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('index.template.html must contain an empty <div id="root"></div>.');
}

/* ---- static server over repo root; "/" always serves the clean template ---- */
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.xml': 'application/xml', '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon'
};
const server = createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p === '/' || p === '/index.html') {
    res.writeHead(200, { 'Content-Type': MIME['.html'] });
    res.end(template);                 // render against the clean template
    return;
  }
  if (p.endsWith('/')) p += 'index.html';
  const fp = join(ROOT, p);
  if (!existsSync(fp) || statSync(fp).isDirectory()) { res.writeHead(404); res.end('nf'); return; }
  res.writeHead(200, { 'Content-Type': MIME[extname(fp)] || 'application/octet-stream' });
  res.end(readFileSync(fp));
});
await new Promise(r => server.listen(PORT, r));

/* ---- render and freeze ---- */
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForSelector('#root section#contact, #root #contact', { timeout: 60000 });
  await page.waitForTimeout(1500);

  // Reveal scroll-animated sections in the static snapshot (React re-applies on real load).
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
    throw new Error(`Prerender produced too little HTML (${rootHTML.length} chars) — aborting.`);
  }

  const html = template.replace('<div id="root"></div>', `<div id="root">${rootHTML}</div>`);
  writeFileSync(OUT, html);
  console.log(`Prerendered homepage: wrote index.html with ${rootHTML.length} chars of real content.`);
} finally {
  await browser.close();
  server.close();
}
