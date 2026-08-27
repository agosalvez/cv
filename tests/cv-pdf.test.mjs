import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

import { CANDADO, EDICIONES, huella } from '../scripts/cv-pdf.mjs';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const read = (ruta) => readFile(new URL(ruta, new URL('../', import.meta.url)), 'utf8');

test('the CV offers a ready-made PDF instead of the print dialog', async () => {
  const cv = await read('src/pages/[lang]/index.astro');

  // `window.print()` deja el resultado en manos del visitante: márgenes,
  // escala y una cabecera con la URL impresa. El fichero se maqueta aquí.
  assert.doesNotMatch(cv, /onclick="window\.print\(\)"/);
  assert.match(cv, /href=\{pdfHref\}/);
  assert.match(cv, /download/);
  assert.match(cv, /'\/cv-adrian-gosalvez\.pdf' : '\/cv-adrian-gosalvez-en\.pdf'/);
});

test('both PDFs are published', async () => {
  for (const edicion of EDICIONES) {
    const { size } = await stat(new URL(edicion.destino, new URL('../', import.meta.url)));
    // Un PDF de estas tres páginas con la foto ronda el medio mega; muy por
    // debajo significaría que se ha generado en blanco.
    assert.ok(size > 50_000, `${edicion.destino} pesa ${size} bytes`);
  }
});

test('the published PDFs match the current CV', async () => {
  const candado = JSON.parse(await read(CANDADO));

  // Sin esta comprobación, un cambio en `cv.json` se publicaría en la web y el
  // PDF seguiría contando la versión anterior sin que nadie se enterase.
  assert.equal(
    candado.sources,
    await huella(raiz),
    'el CV ha cambiado desde que se generaron los PDF: ejecuta `npm run cv:pdf`',
  );
});

test('the printed CV leaves out the About section', async () => {
  const cv = await read('src/pages/[lang]/index.astro');

  // En papel quien lo lee ya tiene el puesto y los años delante; el párrafo de
  // presentación y los tres contadores le roban sitio a la experiencia.
  assert.match(cv, /#about \{ display: none !important; \}/);
});

test('the experience section may break across pages, a single role may not', async () => {
  const cv = await read('src/pages/[lang]/index.astro');

  // La experiencia es más alta que una hoja: prohibirle partirse la empujaba
  // entera a la página siguiente y dejaba la primera en blanco.
  assert.match(cv, /#experience \{ break-inside: auto; \}/);
  assert.match(cv, /\.cv-entry \{ break-inside: avoid; \}/);
  assert.match(cv, /cv-entry py-6/);
});

test('the PDF needs no runtime dependency', async () => {
  const manifest = JSON.parse(await read('package.json'));

  // El PDF lo imprime el Chrome que ya está instalado, fuera del despliegue.
  assert.equal(manifest.scripts['cv:pdf'], 'node scripts/cv-pdf.mjs');
  assert.equal(manifest.devDependencies, undefined);
  assert.ok(!Object.keys(manifest.dependencies).some((nombre) => /pdf|puppeteer|playwright/.test(nombre)));
});
