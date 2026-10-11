import test from 'node:test';
import assert from 'node:assert/strict';
import { initUI } from '../src/scripts/ui.js';
function fixture(blocked = false) {
  const listeners = {};
  const attrs = {};
  let stored, focused = false;
  const root = { dataset: { theme: 'dark' } };
  const theme = { setAttribute(k,v) { attrs[k]=v; }, addEventListener(k,f) { listeners['theme:'+k]=f; } };
  const label = { textContent: '' };
  const anchor = { addEventListener(k,f) { listeners['link:'+k]=f; } };
  const menu = { open: false, querySelector() { return { focus() { focused=true; } }; }, querySelectorAll() { return [anchor]; } };
  const doc = { documentElement: root, getElementById(id) { return {'theme-toggle':theme,'theme-label':label,'mobile-menu':menu}[id]; }, addEventListener(k,f) { listeners[k]=f; } };
  const win = { localStorage: { setItem(k,v) { if(blocked) throw new Error('Storage blocked'); stored=v; } } };
  initUI(doc,win);
  return { root, attrs, label, menu, listeners, get stored(){return stored}, get focused(){return focused} };
}
test('theme toggle changes both directions, labels and stored preference', () => {
  const f=fixture(); assert.equal(f.label.textContent,'Light mode');
  f.listeners['theme:click'](); assert.equal(f.root.dataset.theme,'light'); assert.equal(f.attrs['aria-pressed'],'true'); assert.equal(f.stored,'light'); assert.equal(f.label.textContent,'Dark mode');
  f.listeners['theme:click'](); assert.equal(f.root.dataset.theme,'dark'); assert.equal(f.stored,'dark');
});
test('toggle still works when browser storage is unavailable', () => {
  const f=fixture(true); f.listeners['theme:click'](); assert.equal(f.root.dataset.theme,'light');
});
test('mobile menu closes on Escape with focus returned and on navigation', () => {
  const f=fixture(); f.menu.open=true; f.listeners.keydown({key:'Escape'}); assert.equal(f.menu.open,false); assert.equal(f.focused,true);
  f.menu.open=true; f.listeners['link:click'](); assert.equal(f.menu.open,false);
});

function copyFixture(clipboard) {
  const attrs = {}, listeners = {}, timers = [];
  const button = {
    dataset: { email: 'kautik.rehani@students.iiserpune.ac.in' }, disabled: false,
    setAttribute(k,v) { attrs[k]=v; }, removeAttribute(k) { delete attrs[k]; },
    addEventListener(k,f) { listeners[k]=f; },
  };
  const status = { textContent: '' };
  const doc = {
    documentElement: { dataset: { theme: 'dark' } },
    getElementById(id) { return {'copy-email':button,'copy-email-status':status}[id]; },
    addEventListener() {},
  };
  initUI(doc, { navigator: { clipboard }, setTimeout(f) { timers.push(f); } });
  return { button, attrs, status, listeners, timers };
}
test('copy email writes the exact address and confirms only after success', async () => {
  let copied;
  const f=copyFixture({ async writeText(value) { copied=value; } });
  await f.listeners.click();
  assert.equal(copied, 'kautik.rehani@students.iiserpune.ac.in');
  assert.equal(f.status.textContent, 'Email address copied.');
  assert.equal(f.attrs['data-copied'], '');
  assert.equal(f.attrs['aria-label'], 'Email address copied');
  assert.equal(f.button.disabled, false);
  f.timers[0]();
  assert.equal(f.attrs['data-copied'], undefined);
  assert.equal(f.attrs['aria-label'], 'Copy email address');
});
test('copy email failure leaves the button usable without a false success message', async () => {
  for (const clipboard of [undefined, { async writeText() { throw new Error('Permission denied'); } }]) {
    const f=copyFixture(clipboard);
    await f.listeners.click();
    assert.match(f.status.textContent, /Could not copy/);
    assert.equal(f.attrs['data-copied'], undefined);
    assert.equal(f.button.disabled, false);
    assert.equal(f.timers.length, 0);
  }
});
