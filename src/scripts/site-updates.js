const versionParameter = '_site';
const validVersion = version => typeof version === 'string' && /^(?:[a-f0-9]{40}|development)$/.test(version);

export function initSiteUpdates(doc = document, win = window) {
  const embeddedVersion = doc.documentElement.dataset.siteVersion;
  const endpoint = doc.documentElement.dataset.versionUrl;
  if (!validVersion(embeddedVersion) || !endpoint) return Promise.resolve();
  const storageKey = 'site-deployment-version:' + endpoint;
  const current = () => new URL(win.location.href);
  const versionLinks = version => {
    const page = current();
    doc.querySelectorAll('a[href]').forEach(link => {
      const raw = link.getAttribute('href');
      if (!raw || raw.startsWith('#') || link.hasAttribute('download')) return;
      const destination = new URL(raw, page);
      if (destination.origin !== page.origin || !destination.pathname.endsWith('/') || destination.pathname === page.pathname) return;
      destination.searchParams.set(versionParameter, version);
      link.setAttribute('href', destination.pathname + destination.search + destination.hash);
    });
  };
  const loadVersion = version => {
    versionLinks(version);
    const destination = current();
    if (embeddedVersion === version || destination.searchParams.get(versionParameter) === version) return;
    destination.searchParams.set(versionParameter, version);
    win.location.replace(destination.href);
  };
  // Keep the address bar clean after loading a versioned page.
  const page = current();
  if (page.searchParams.get(versionParameter) === embeddedVersion) {
    page.searchParams.delete(versionParameter);
    win.history.replaceState(win.history.state, '', page.pathname + page.search + page.hash);
  }
  versionLinks(embeddedVersion);
  let pending;
  const checkVersion = () => {
    if (pending) return pending;
    pending = Promise.resolve().then(async () => {
      try {
        const manifest = new URL(endpoint, win.location.href);
        manifest.searchParams.set('_check', String(Date.now()));
        const response = await win.fetch(manifest.href, { cache: 'no-store' });
        if (!response.ok) return;
        const { version } = await response.json();
        if (!validVersion(version)) return;
        loadVersion(version);
        try { win.localStorage.setItem(storageKey, version); } catch {}
      } catch {
        // Navigation still works if offline or the version check is unavailable.
      }
    }).finally(() => { pending = undefined; });
    return pending;
  };
  win.addEventListener('pageshow', event => { if (event.persisted) void checkVersion(); });
  win.addEventListener('storage', event => {
    if (event.key === storageKey && validVersion(event.newValue)) loadVersion(event.newValue);
  });
  return checkVersion();
}
