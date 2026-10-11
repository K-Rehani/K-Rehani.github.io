export function initUI(doc = document, win = window) {
  const root = doc.documentElement;
  const theme = doc.getElementById('theme-toggle');
  const label = doc.getElementById('theme-label');
  const sync = () => {
    const dark = root.dataset.theme !== 'light';
    theme?.setAttribute('aria-pressed', String(!dark));
    theme?.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
    theme?.setAttribute('title', `Switch to ${dark ? 'light' : 'dark'} mode`);
    if (label) label.textContent = dark ? 'Light mode' : 'Dark mode';
  };
  sync();
  theme?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { win.localStorage.setItem('theme', root.dataset.theme); } catch {}
    sync();
  });
  const copyEmail = doc.getElementById('copy-email');
  const copyStatus = doc.getElementById('copy-email-status');
  copyEmail?.addEventListener('click', async () => {
    copyEmail.disabled = true;
    try {
      if (!win.navigator?.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await win.navigator.clipboard.writeText(copyEmail.dataset.email);
      copyEmail.setAttribute('data-copied', '');
      copyEmail.setAttribute('aria-label', 'Email address copied');
      copyEmail.setAttribute('title', 'Email address copied');
      if (copyStatus) copyStatus.textContent = 'Email address copied.';
      win.setTimeout(() => {
        copyEmail.removeAttribute('data-copied');
        copyEmail.setAttribute('aria-label', 'Copy email address');
        copyEmail.setAttribute('title', 'Copy email address');
      }, 2000);
    } catch {
      if (copyStatus) copyStatus.textContent = 'Could not copy. Please select and copy the email address.';
    } finally {
      copyEmail.disabled = false;
    }
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
