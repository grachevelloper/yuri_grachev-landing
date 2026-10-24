import { mkdir, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import sharp from 'sharp';

const source = process.argv[2];

if (!source) {
  throw new Error('Pass the directory of original Figma exports');
}

const destination = resolve('src/assets/images');

await mkdir(destination, { recursive: true });

const images = [
  ['portrait.png', 'portrait', [360, 720, 960]],
  ['office.png', 'office', [720, 1200, 1448]],
  ['books.png', 'books', [720, 1159]],
];

for (const [original, name, widths] of images) {
  const metadata = await sharp(resolve(source, original)).metadata();

  if (!metadata.width || metadata.width < Math.max(...widths)) {
    throw new Error(`Export ${original} at a width of at least ${Math.max(...widths)} pixels`);
  }

  console.log(name, 'source', metadata.width, metadata.height);

  for (const width of widths) {
    const info = await sharp(resolve(source, original))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(resolve(destination, `${name}-${width}.webp`));

    console.log(`${name}-${width}.webp`, info.width, info.height, info.size);
  }
}

for (const [sourceName, targetName] of [
  ['chevron-up.svg', 'chevron-up.svg'],
  ['chevron-down.svg', 'chevron-down.svg'],
]) {
  await copyFile(resolve(source, sourceName), resolve(destination, targetName));
}
