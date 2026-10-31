import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('the root URL is the home page, not a redirect to the CV', async () => {
  const home = await read('src/pages/index.astro');
  const astroConfig = await read('astro.config.mjs');
  const server = await read('admin/server.js');

  assert.doesNotMatch(home, /Astro\.redirect/);
  assert.match(home, /import Layout from '\.\.\/layouts\/Layout\.astro'/);
  // Sin esta opción, el i18n de Astro sobrescribe `/` con una redirección a `/es/`.
  assert.match(astroConfig, /redirectToDefaultLocale:\s*false/);
  // Y en producción Express tampoco debe redirigir antes de servir el estático.
  assert.doesNotMatch(server, /app\.get\('\/',/);
});

test('the home page declares a single h1', async () => {
  const home = await read('src/pages/index.astro');

  assert.equal(home.match(/<h1/g)?.length, 1, 'expected exactly one h1');
});

test('the home page links to the CV, LinkedIn and every service', async () => {
  const home = await read('src/pages/index.astro');
  const data = await read('src/data/home.ts');

  assert.match(home, /href="\/es"/);
  assert.match(home, /href=\{personal\.linkedin\}/);
  assert.match(home, /href="\/en"/);
  // La formación enlaza a su página; el resto abre WhatsApp con su mensaje.
  assert.match(data, /href: trainingRoutes\.es/);
  for (const id of ['formacion', 'proyectos', 'mentoria']) {
    assert.match(data, new RegExp(`id: '${id}'`), id);
  }
});

test('the training price on the home page comes from the published programs', async () => {
  const data = await read('src/data/home.ts');

  // Un precio escrito a mano se quedaría desfasado al cambiar la formación.
  assert.match(data, /trainingPrograms\.map\(\(program\) => program\.priceFrom\)/);
  assert.doesNotMatch(data, /\d{3} €/);
});

test('every contact button is tracked as an analytics event', async () => {
  const home = await read('src/pages/index.astro');
  const contact = await read('src/components/training/ContactButtons.astro');
  const form = await read('src/components/training/TrainingForm.astro');

  for (const event of ['home-whatsapp', 'home-cv', 'home-linkedin']) {
    assert.match(home, new RegExp(`data-umami-event="${event}"`), event);
  }
  assert.match(home, /data-umami-event=\{`home-\$\{service\.id\}`\}/);
  assert.match(contact, /data-umami-event="training-whatsapp"/);
  assert.match(contact, /data-umami-event="training-form"/);
  assert.match(form, /data-umami-event="training-form-submit"/);
});

test('analytics only loads when it is configured', async () => {
  const layout = await read('src/layouts/Layout.astro');
  const config = await read('src/data/analytics.ts');

  assert.match(layout, /umami\.src && umami\.websiteId &&/);
  // Solo cuenta visitas del dominio publicado, no las de desarrollo.
  assert.match(layout, /data-domains=\{umami\.domains\}/);
  assert.match(config, /domains: 'gosalvez\.es'/);
});

test('sitemap lists the home page', async () => {
  const sitemap = await read('public/sitemap.xml');

  assert.match(sitemap, /<loc>https:\/\/gosalvez\.es\/<\/loc>/);
});
