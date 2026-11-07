import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

await build();
await build({
  build: {
    ssr: 'src/app/render.tsx',
    outDir: 'node_modules/.cache/prerender',
    emptyOutDir: true,
    copyPublicDir: false,
  },
});

const { render } = await import(pathToFileURL(resolve('node_modules/.cache/prerender/render.js')));
const htmlPath = resolve('dist/index.html');
const html = await readFile(htmlPath, 'utf8');

await writeFile(
  htmlPath,
  html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`),
);
