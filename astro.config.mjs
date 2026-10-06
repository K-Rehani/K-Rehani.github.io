import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

const repository = process.env.GITHUB_REPOSITORY || 'K-Rehani/K-Rehani.github.io';
const [owner, name] = repository.split('/');
const base = process.env.SITE_BASE || (name.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '/' : `/${name}/`);

export default defineConfig({
  site: process.env.SITE_URL || `https://${owner.toLowerCase()}.github.io`,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !/\/404(?:\/|\.html)$/.test(page) })],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: 'error', throwOnError: true }]],
    }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false, wrap: true },
  },
});
