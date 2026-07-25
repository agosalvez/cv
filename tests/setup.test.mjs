import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('setup exposes bilingual routes and a Spanish redirect', async () => {
  const redirectPage = await read('src/pages/setup.astro');
  const setupPage = await read('src/pages/[lang]/setup.astro');
  const astroConfig = await read('astro.config.mjs');

  assert.match(redirectPage, /Astro\.redirect\(['"]\/es\/setup['"]/);
  // La salida estática solo emite `/setup` a través de esta redirección.
  assert.match(astroConfig, /'\/setup':\s*'\/es\/setup'/);
  assert.match(setupPage, /params:\s*\{\s*lang:\s*['"]es['"]\s*\}/);
  assert.match(setupPage, /params:\s*\{\s*lang:\s*['"]en['"]\s*\}/);
});

test('layout accepts explicit alternates and Open Graph type', async () => {
  const layout = await read('src/layouts/Layout.astro');

  assert.match(layout, /alternateUrls/);
  assert.match(layout, /ogType/);
  assert.match(layout, /og:locale:alternate/);
});

test('setup content centralizes temporary local images and their sources', async () => {
  const data = await read('src/data/setup.ts');

  assert.match(data, /\/images\/setup\/workspace-overview\.jpg/);
  assert.match(data, /\/images\/setup\/workspace-peripherals\.jpg/);
  assert.match(data, /\/images\/setup\/workspace-audio\.jpg/);
  assert.match(data, /temporary:\s*true/);
  assert.match(data, /pexels\.com/);
});

test('no public directory shadows the /setup route', async () => {
  const publicDirectories = await readdir(new URL('../public/', import.meta.url), {
    withFileTypes: true,
  });

  const shadowing = publicDirectories.filter((entry) => entry.isDirectory() && entry.name === 'setup');
  assert.deepEqual(shadowing, [], 'public/setup/ would overwrite the /setup redirect on build');
});

test('every declared image exists under public/', async () => {
  const data = await read('src/data/setup.ts');
  const sources = [...data.matchAll(/src: '(\/[^']+)'/g)].map((match) => match[1]);

  assert.ok(sources.length > 0, 'expected image sources in src/data/setup.ts');

  for (const source of sources) {
    const file = await readFile(new URL(`../public${source}`, import.meta.url));
    assert.ok(file.length > 0, source);
  }
});

test('setup components never hardcode image paths', async () => {
  const directory = new URL('../src/components/setup/', import.meta.url);
  const files = await readdir(directory);

  assert.ok(files.length > 0, 'expected components in src/components/setup/');

  for (const file of files) {
    const source = await readFile(new URL(file, directory), 'utf8');
    assert.doesNotMatch(source, /\/[\w-/]+\.(jpg|jpeg|png|webp|avif)/, file);
  }
});

test('setup page links only to official destinations, never to affiliates', async () => {
  const data = await read('src/data/setup.ts');

  assert.doesNotMatch(data, /amazon\./i);
  assert.doesNotMatch(data, /\btag=|aff(iliate)?_?id/i);
});

test('the temporary image notice is internal and never rendered to visitors', async () => {
  const setupPage = await read('src/pages/[lang]/setup.astro');
  const data = await read('src/data/setup.ts');

  assert.doesNotMatch(setupPage, /provisional|temporary image|imagen temporal/i);
  assert.doesNotMatch(data, /imagen provisional|temporary image/i);
});

test('sitemap includes both localized setup pages and their alternates', async () => {
  const sitemap = await read('public/sitemap.xml');

  assert.match(sitemap, /https:\/\/gosalvez\.es\/es\/setup/);
  assert.match(sitemap, /https:\/\/gosalvez\.es\/en\/setup/);
});
