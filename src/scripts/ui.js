export function initUI(doc = document, win = window) {
  const root = doc.documentElement;
  const theme = doc.getElementById('theme-toggle');
  const label = doc.getElementById('theme-label');
  const sync = () => {
    const dark = root.dataset.theme !== 'light';
    theme?.setAttribute('aria-pressed', String(!dark));
    theme?.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
    if (label) label.textContent = dark ? 'Light mode' : 'Dark mode';
  };
  sync();
  theme?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { win.localStorage.setItem('theme', root.dataset.theme); } catch {}
    sync();
  });
  const menu = doc.getElementById('mobile-menu');
  doc.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.open = false; }));
}
