import { cp, mkdir } from 'node:fs/promises';
await mkdir('public/math', { recursive: true });
await cp('node_modules/katex/dist/katex.min.css', 'public/math/katex.min.css');
await cp('node_modules/katex/dist/fonts', 'public/math/fonts', { recursive: true });
