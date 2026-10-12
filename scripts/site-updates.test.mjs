import test from 'node:test';
import assert from 'node:assert/strict';
import { initSiteUpdates } from '../src/scripts/site-updates.js';

const oldVersion = 'a'.repeat(40), newVersion = 'b'.repeat(40);
function fixture({ embedded = oldVersion, latest = newVersion, address = 'https://example.test/research/', blockedStorage = false, fail = false } = {}) {
  const links = ['/contact/#juniors', '/readings-and-notes/#notes', '/research/#main', '#main', '/cv/file.pdf?v=123', 'https://external.test/', 'mailto:student@example.test'].map(href => ({
    href,
    getAttribute() { return this.href; },
    setAttribute(key, value) { this.href = value; },
    hasAttribute() { return false; },
  }));
  const events = {}, requests = [], replacements = [], historyChanges = [], stored = [];
  const doc = {
    documentElement: { dataset: { siteVersion: embedded, versionUrl: '/site-version.json' } },
    querySelectorAll() { return links; },
  };
  const win = {
    location: { href: address, replace(value) { replacements.push(value); } },
    history: { state: { retained: true }, replaceState(state, title, value) { historyChanges.push({ state, value }); win.location.href = new URL(value, win.location.href).href; } },
    localStorage: { setItem(key, value) { if (blockedStorage) throw Error('Blocked'); stored.push({ key, value }); } },
    addEventListener(key, handler) { events[key] = handler; },
    async fetch(url, options) { requests.push({ url, options }); if (fail) throw Error('Offline'); return { ok: true, async json() { return { version: latest }; } }; },
  };
  return { doc, win, links, events, requests, replacements, historyChanges, stored };
}
test('a stale page checks the shared version without caching and refreshes with that version', async () => {
  const f = fixture(); await initSiteUpdates(f.doc, f.win);
  assert.equal(f.requests[0].options.cache, 'no-store');
  assert.ok(new URL(f.requests[0].url).searchParams.has('_check'));
  assert.equal(new URL(f.replacements[0]).searchParams.get('_site'), newVersion);
  assert.equal(f.stored[0].value, newVersion);
});
test('navigation uses one deployment version and preserves anchors, files and external links', async () => {
  const f = fixture({ embedded: newVersion }); await initSiteUpdates(f.doc, f.win);
  assert.equal(f.replacements.length, 0);
  assert.equal(f.links[0].href, '/contact/?_site=' + newVersion + '#juniors');
  assert.equal(f.links[1].href, '/readings-and-notes/?_site=' + newVersion + '#notes');
  assert.deepEqual(f.links.slice(2).map(l => l.href), ['/research/#main', '#main', '/cv/file.pdf?v=123', 'https://external.test/', 'mailto:student@example.test']);
});
test('a fresh versioned page restores its clean URL and retains other query parameters and hash', async () => {
  const f = fixture({ embedded: newVersion, address: 'https://example.test/contact/?other=1&_site=' + newVersion + '#junior' });
  await initSiteUpdates(f.doc, f.win);
  assert.deepEqual(f.historyChanges, [{ state: { retained: true }, value: '/contact/?other=1#junior' }]);
  assert.equal(f.replacements.length, 0);
});
test('an outdated response to a versioned URL cannot cause a reload loop', async () => {
  const f = fixture({ address: 'https://example.test/research/?_site=' + newVersion });
  await initSiteUpdates(f.doc, f.win);
  assert.equal(f.replacements.length, 0);
});
test('blocked storage does not prevent refreshing or updating navigation', async () => {
  const f = fixture({ blockedStorage: true }); await initSiteUpdates(f.doc, f.win);
  assert.equal(f.replacements.length, 1);
  assert.ok(f.links[0].href.includes(newVersion));
});
test('a failed version check leaves navigation usable and does not redirect', async () => {
  const f = fixture({ fail: true }); await initSiteUpdates(f.doc, f.win);
  assert.equal(f.replacements.length, 0);
  assert.ok(f.links[0].href.includes(oldVersion));
});
test('browser back/forward restoration checks for updates again', async () => {
  const f = fixture({ embedded: newVersion }); await initSiteUpdates(f.doc, f.win);
  f.events.pageshow({ persisted: true });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(f.requests.length, 2);
});
test('a version detected in another tab refreshes stale pages and ignores unrelated storage', async () => {
  const f = fixture({ latest: oldVersion }); await initSiteUpdates(f.doc, f.win);
  f.events.storage({ key: 'unrelated', newValue: newVersion });
  assert.equal(f.replacements.length, 0);
  f.events.storage({ key: 'site-deployment-version:/site-version.json', newValue: newVersion });
  assert.equal(f.replacements.length, 1);
});
test('invalid manifest versions are ignored', async () => {
  const f = fixture({ latest: 'not-a-version' }); await initSiteUpdates(f.doc, f.win);
  assert.equal(f.replacements.length, 0);
  assert.equal(f.stored.length, 0);
});
test('a synchronous fetch failure can be retried on browser history restoration', async () => {
  const f = fixture();
  const fetch = f.win.fetch;
  f.win.fetch = () => { throw Error('Fetch unavailable'); };
  await initSiteUpdates(f.doc, f.win);
  f.win.fetch = fetch;
  f.events.pageshow({ persisted: true });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(f.replacements.length, 1);
});
