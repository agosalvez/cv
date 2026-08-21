import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('training publishes a translated slug in each language', async () => {
  const spanish = await read('src/pages/es/formacion.astro');
  const english = await read('src/pages/en/training.astro');
  const data = await read('src/data/training.ts');

  // Las dos rutas renderizan la misma página: el slug cambia, el contenido no.
  assert.match(spanish, /<TrainingPage lang="es" \/>/);
  assert.match(english, /<TrainingPage lang="en" \/>/);
  assert.match(data, /es: '\/es\/formacion'/);
  assert.match(data, /en: '\/en\/training'/);
});

test('the short URLs redirect to their localized page', async () => {
  const spanishRedirect = await read('src/pages/formacion.astro');
  const englishRedirect = await read('src/pages/training.astro');
  const astroConfig = await read('astro.config.mjs');

  assert.match(spanishRedirect, /Astro\.redirect\(['"]\/es\/formacion['"]/);
  assert.match(englishRedirect, /Astro\.redirect\(['"]\/en\/training['"]/);
  // La salida estática solo emite `/formacion` y `/training` a través de estas entradas.
  assert.match(astroConfig, /'\/formacion':\s*'\/es\/formacion'/);
  assert.match(astroConfig, /'\/training':\s*'\/en\/training'/);
  // La redirección de setup sigue declarada.
  assert.match(astroConfig, /'\/setup':\s*'\/es\/setup'/);
});

test('both languages cross-reference each other as alternates', async () => {
  const page = await read('src/components/training/TrainingPage.astro');

  // Con slugs traducidos, el hreflang no se puede derivar del idioma:
  // sale de `trainingUrls`, que declara las dos URL una sola vez.
  assert.match(page, /alternateUrls=\{trainingUrls\}/);
  assert.match(page, /canonical=\{trainingUrls\[lang\]\}/);
  // El conmutador navega dentro del sitio: ruta relativa, no URL absoluta,
  // para que en desarrollo no salte a producción.
  assert.match(page, /altHref=\{trainingRoutes\[otherLang\]\}/);
});

test('the SEO title matches the one agreed for the page', async () => {
  const data = await read('src/data/training.ts');

  assert.match(
    data,
    /es: 'Formación en Inteligencia Artificial para Empresas \| Adrián Gosálvez'/,
  );
  assert.match(data, /en: 'Artificial Intelligence Training for Companies \| Adrián Gosálvez'/);
});

test('the page declares a single h1 and semantic sections', async () => {
  const page = await read('src/components/training/TrainingPage.astro');

  assert.equal(page.match(/<h1/g)?.length, 1, 'expected exactly one h1');
  // Cada sección se anuncia con su propio encabezado.
  for (const id of ['modalidades', 'aplicaciones', 'proceso', 'quien', 'solicitar']) {
    assert.match(page, new RegExp(`id="${id}"`), id);
    assert.match(page, new RegExp(`aria-labelledby="${id}-title"`), `${id} heading`);
  }
});

test('sitemap lists both training pages with crossed alternates', async () => {
  const sitemap = await read('public/sitemap.xml');

  assert.match(sitemap, /<loc>https:\/\/gosalvez\.es\/es\/formacion<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/gosalvez\.es\/en\/training<\/loc>/);
  assert.match(sitemap, /hreflang="en" href="https:\/\/gosalvez\.es\/en\/training"/);
  assert.match(sitemap, /hreflang="x-default" href="https:\/\/gosalvez\.es\/es\/formacion"/);
});

test('the request form posts to the internal endpoint', async () => {
  const form = await read('src/components/training/TrainingForm.astro');
  const data = await read('src/data/training.ts');

  // El correo lo envía el servidor: el navegador solo conoce la ruta.
  assert.match(data, /export const contactEndpoint = '\/api\/contacto'/);
  assert.match(form, /data-endpoint=\{contactEndpoint\}/);
  assert.match(form, /method: 'POST'/);
  assert.match(form, /event\.preventDefault\(\)/);
  // Nada de abrir el cliente de correo: eso revelaba la dirección.
  assert.doesNotMatch(form, /mailto:/);

  for (const field of ['name', 'company', 'email', 'format', 'message']) {
    assert.match(form, new RegExp(`name="${field}"`), field);
  }
  assert.match(form, /name="attendees"/);
  // El señuelo antispam viaja oculto y fuera del orden de tabulación.
  assert.match(form, /name="website"[^>]*tabindex="-1"|tabindex="-1"[^>]*name="website"/s);
  // Cada control tiene su etiqueta asociada.
  assert.equal(form.match(/<label/g)?.length, form.match(/ for="tf-/g)?.length);
});

test('the destination address never reaches the browser', async () => {
  // Cualquier dirección escrita en `src/` acabaría en el HTML publicado.
  const files = [
    'src/data/training.ts',
    'src/components/training/TrainingPage.astro',
    'src/components/training/TrainingForm.astro',
    'src/components/training/ProgramCard.astro',
    'src/components/site/SiteNav.astro',
  ];

  for (const file of files) {
    const source = await read(file);
    // Se descartan los ejemplos de los `placeholder`, que son texto de ayuda.
    const withoutPlaceholders = source.replace(/placeholder: \{[^}]*\}/gs, '');
    assert.doesNotMatch(withoutPlaceholders, /[\w.+-]+@[\w-]+\.[\w.]{2,}/, file);
  }

  // El servidor lo lee del entorno, no de un valor escrito en el código.
  const contact = await read('admin/contact.js');
  assert.match(contact, /env\.CONTACT_TO/);
  assert.doesNotMatch(contact, /to: '[\w.+-]+@/);
});

test('the copy avoids infomercial devices', async () => {
  const data = await read('src/data/training.ts');
  const page = await read('src/components/training/TrainingPage.astro');
  const content = `${data}\n${page}`;

  // Nada de urgencia falsa, testimonios inventados, logos prestados ni precios.
  const banned = [
    /plazas limitadas/i,
    /últimas plazas/i,
    /oferta/i,
    /descuento/i,
    /garantizad[oa]/i,
    /revoluciona/i,
    /testimoni/i,
    /€|EUR\b|\$\d/,
    /cuenta atrás|countdown/i,
  ];

  for (const pattern of banned) {
    assert.doesNotMatch(content, pattern, String(pattern));
  }
});

test('the training page reuses the shared site chrome', async () => {
  const page = await read('src/components/training/TrainingPage.astro');
  const setupNav = await read('src/components/setup/SetupNav.astro');

  // Una sola barra de navegación para las páginas internas.
  assert.match(page, /import SiteNav from '\.\.\/site\/SiteNav\.astro'/);
  assert.match(setupNav, /import SiteNav from '\.\.\/site\/SiteNav\.astro'/);
  assert.match(page, /import Layout from '\.\.\/\.\.\/layouts\/Layout\.astro'/);
});

test('the CV links to the training page in both languages', async () => {
  const cv = await read('src/pages/[lang]/index.astro');

  assert.match(cv, /'\/es\/formacion' : '\/en\/training'/);
  assert.match(cv, /'Formación' : 'Training'/);
  // El enlace a setup sigue en la navegación.
  assert.match(cv, /\/\$\{lang\}\/setup/);
});

test('training adds no dependencies', async () => {
  const before = ['@astrojs/sitemap', '@astrojs/tailwind', 'astro', 'concurrently', 'tailwindcss'];
  const manifest = JSON.parse(await read('package.json'));

  assert.deepEqual(Object.keys(manifest.dependencies).sort(), before.sort());
  assert.equal(manifest.devDependencies, undefined);
});
