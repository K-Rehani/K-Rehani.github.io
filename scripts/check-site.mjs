import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('dist');
const files = await readdir(root, { recursive: true });
const html = files.filter(f => f.endsWith('.html'));
let checked = 0;
const external = new Set();
const home = await readFile(path.join(root, 'index.html'), 'utf8');
const origin = new URL(home.match(/rel="canonical" href="([^"]+)"/)[1]);
const base = origin.pathname.replace(/\/$/, '');
for (const file of html) {
  const body = await readFile(path.join(root, file), 'utf8');
  const refresh = body.match(/<meta\b[^>]*http-equiv="refresh"[^>]*>/i);
  if (refresh) {
    const raw = refresh[0].match(/content="[^"]*?url=([^\"]+)"/i)?.[1];
    assert(raw, `${file}: redirect target missing`);
    const target = new URL(raw.replaceAll('&amp;', '&'), origin);
    assert.equal(target.origin, origin.origin, `${file}: redirect must stay on the website`);
    assert(target.pathname.startsWith(base + '/'), `${file}: redirect loses base path`);
    let relative = decodeURIComponent(target.pathname.slice(base.length)).replace(/^\//, '');
    if (!relative || relative.endsWith('/')) relative += 'index.html';
    assert(await stat(path.join(root, relative)).catch(() => false), `${file}: redirect target missing`);
    checked++;
    continue;
  }
  assert.equal((body.match(/<h1(?:\s|>)/g) || []).length, 1, `${file}: one h1`);
  assert.match(body, /<html[^>]*lang="en"/);
  assert.match(body, /data-theme="dark"/);
  assert.match(body, /name="description" content="[^\"]+"/);
  assert.match(body, /id="main"/);
  assert.match(body, /href="#main"/);
  assert(!/href="(?:#|undefined|null)"/.test(body), `${file}: placeholder link`);
  assert(!body.includes('katex-error'), `${file}: invalid mathematics`);
  const current = new URL(base + '/' + file.replace(/index\.html$/, ''), origin.origin);
  for (const match of body.matchAll(/\b(?:href|src)="([^\"]+)"/g)) {
    const raw = match[1].replaceAll('&amp;', '&');
    if (/^(mailto:|data:)/.test(raw)) continue;
    const target = new URL(raw, current);
    if (target.origin !== origin.origin) { external.add(target.href); continue; }
    assert(target.pathname.startsWith(base + '/') || target.pathname === base, `${file}: link loses base path: ${raw}`);
    let relative = decodeURIComponent(target.pathname.slice(base.length)).replace(/^\//, '');
    if (!relative || relative.endsWith('/')) relative += 'index.html';
    const dest = path.join(root, relative);
    assert(await stat(dest).catch(() => false), `${file}: broken link ${raw}`);
    if (target.hash && dest.endsWith('.html')) {
      const text = await readFile(dest, 'utf8');
      assert(text.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${file}: broken anchor ${raw}`);
    }
    checked++;
  }
  for (const img of body.matchAll(/<img\b[^>]*>/g)) assert(/\balt="/.test(img[0]), `${file}: image without alt`);
}
for (const page of ['index.html', 'research/index.html', 'notes/index.html', 'courses/index.html', 'cv/index.html', 'contact/index.html', '404.html']) assert(html.includes(page), `Missing ${page}`);
assert.match(await readFile(path.join(root, 'robots.txt'), 'utf8'), /Sitemap: https:/);
assert(await stat(path.join(root, 'sitemap-index.xml')));
assert(!(await readdir(root, { recursive: true })).some(f => f.endsWith('.pdf')), 'No uploaded PDFs should be redistributed');
console.log(`Checked ${html.length} pages and ${checked} internal links/assets; ${external.size} distinct external URLs. Base path: ${base || '/'}`);
console.log('External URL syntax and local targets checked. Network availability is not asserted.');
