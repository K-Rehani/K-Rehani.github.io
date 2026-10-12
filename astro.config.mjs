import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

const repository = process.env.GITHUB_REPOSITORY || 'K-Rehani/K-Rehani.github.io';
const [owner, name] = repository.split('/');
const base = process.env.SITE_BASE || (name.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '/' : `/${name}/`);
const site = process.env.SITE_URL || `https://${owner.toLowerCase()}.github.io`;
const movedReadingPages = ['relativity-and-fields', 'field-theory', 'light-cone-gravity', 'amplitudes-and-symmetries'];

function externalLinks() {
  return (tree) => {
    const visit = (node) => {
      const href = node.properties?.href;
      if (node.tagName === 'a' && typeof href === 'string' && /^(https?:)?\/\//.test(href)) {
        if (new URL(href, site).origin !== new URL(site).origin) {
          const existingRel = node.properties.rel || [];
          const rel = Array.isArray(existingRel) ? existingRel : String(existingRel).split(/\s+/);
          node.properties.target = '_blank';
          node.properties.rel = [...new Set([...rel, 'noopener', 'noreferrer'])];
        }
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/notes/': `${base.replace(/\/$/, '')}/readings-and-notes/`,
    ...Object.fromEntries(movedReadingPages.map(id => [`/notes/${id}/`, `${base.replace(/\/$/, '')}/research/light-cone-field-theory/`])),
  },
  integrations: [sitemap({ filter: (page) => !/\/404(?:\/|\.html)$/.test(page) && !page.endsWith('/courses/') && !page.endsWith('/notes/') && !movedReadingPages.some(id => page.endsWith(`/notes/${id}/`)) })],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: 'error', throwOnError: true }], externalLinks],
    }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false, wrap: true },
  },
});
