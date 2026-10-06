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
