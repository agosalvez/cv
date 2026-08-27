/**
 * Genera el PDF del CV a partir de la propia página.
 *
 * El CV ya tenía una hoja de estilos `@media print` cuidada: oculta la barra y
 * la barra lateral, y en su lugar inyecta la cabecera con foto y contacto y la
 * rejilla de competencias. Reaprovecharla es mejor que redactar el PDF aparte,
 * porque así el documento y la web no pueden divergir en contenido: son la
 * misma fuente.
 *
 * El PDF se imprime con el Chrome que ya está instalado, no con una librería.
 * Meter un motor de PDF en las dependencias del sitio para un fichero que se
 * regenera de higos a brevas no sale a cuenta, y ninguna librería respeta el
 * `@media print` tan bien como el navegador que lo va a interpretar de todas
 * formas.
 *
 * Uso: `npm run cv:pdf` (compila y genera). `npm run cv:pdf -- --skip-build`
 * reutiliza el `dist/` que ya haya.
 */
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { access, constants, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const dist = join(raiz, 'dist');

/** Idioma, ruta en el sitio y nombre del fichero que se publica. */
export const EDICIONES = [
  { lang: 'es', ruta: '/es/', destino: 'public/cv-adrian-gosalvez.pdf' },
  { lang: 'en', ruta: '/en/', destino: 'public/cv-adrian-gosalvez-en.pdf' },
];

/**
 * Ficheros de los que depende el contenido del PDF.
 *
 * El candado guarda su huella para que un cambio en el CV que no se haya
 * llevado al PDF salte en los tests, en vez de publicarse desactualizado.
 */
export const FUENTES = ['src/data/cv.json', 'src/pages/[lang]/index.astro'];
export const CANDADO = 'scripts/cv-pdf.lock.json';

/** Huella del contenido del CV, con los saltos de línea normalizados. */
export async function huella(base = raiz) {
  const hash = createHash('sha256');
  for (const fuente of FUENTES) {
    const texto = await readFile(join(base, fuente), 'utf8');
    hash.update(fuente).update('\0').update(texto.replace(/\r\n/g, '\n')).update('\0');
  }
  return hash.digest('hex');
}

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

/**
 * Servidor estático mínimo sobre `dist/`.
 *
 * Chrome podría abrir los ficheros con `file://`, pero la página enlaza los
 * recursos con rutas absolutas (`/profile.jpg`) y con ese protocolo apuntarían
 * a la raíz del disco: la foto no cargaría y el PDF saldría sin ella.
 */
function servir(directorio) {
  const servidor = createServer(async (peticion, respuesta) => {
    const pedido = decodeURIComponent((peticion.url ?? '/').split('?')[0]);
    let destino = resolve(directorio, '.' + normalize(pedido));

    // Nadie debería poder salirse de `dist/`, ni siquiera un servidor de usar y tirar.
    if (!destino.startsWith(resolve(directorio))) {
      respuesta.writeHead(403).end();
      return;
    }

    try {
      if ((await stat(destino)).isDirectory()) destino = join(destino, 'index.html');
      await access(destino, constants.R_OK);
    } catch {
      respuesta.writeHead(404).end('no encontrado');
      return;
    }

    respuesta.writeHead(200, {
      'content-type': TIPOS[extname(destino)] ?? 'application/octet-stream',
    });
    createReadStream(destino).pipe(respuesta);
  });

  return new Promise((cumplir) => {
    servidor.listen(0, '127.0.0.1', () => cumplir({ servidor, puerto: servidor.address().port }));
  });
}

/** Rutas habituales de Chrome, por orden de preferencia. */
const CANDIDATOS = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

async function buscarChrome() {
  for (const ruta of CANDIDATOS) {
    try {
      await access(ruta, constants.R_OK);
      return ruta;
    } catch {
      /* siguiente candidato */
    }
  }
  throw new Error('No se ha encontrado Chrome. Indica su ruta con la variable CHROME_PATH.');
}

function ejecutar(comando, argumentos, opciones = {}) {
  return new Promise((cumplir, fallar) => {
    const proceso = spawn(comando, argumentos, { stdio: 'inherit', shell: false, ...opciones });
    proceso.on('error', fallar);
    proceso.on('exit', (codigo) =>
      codigo === 0 ? cumplir() : fallar(new Error(comando + ' terminó con código ' + codigo)),
    );
  });
}

async function principal() {
  if (!process.argv.includes('--skip-build')) {
    // Se llama al binario de Astro con el propio Node en vez de a `npm run
    // build`: en Windows, arrancar un `.cmd` sin shell falla con EINVAL, y
    // abrir un shell solo para esto invita a problemas de comillas.
    await ejecutar(process.execPath, [join(raiz, 'node_modules', 'astro', 'astro.js'), 'build'], {
      cwd: raiz,
    });
  }

  try {
    await access(join(dist, 'es', 'index.html'), constants.R_OK);
  } catch {
    throw new Error('Falta `dist/`: compila primero con `npm run build`.');
  }

  const chrome = await buscarChrome();
  const { servidor, puerto } = await servir(dist);
  const perfil = await mkdtemp(join(tmpdir(), 'cv-pdf-'));

  try {
    for (const edicion of EDICIONES) {
      const salida = join(raiz, edicion.destino);
      await ejecutar(chrome, [
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        '--user-data-dir=' + perfil,
        // Deja que se resuelvan fuentes e imágenes antes de imprimir; si no, la
        // foto de la cabecera puede salir en blanco.
        '--virtual-time-budget=15000',
        '--run-all-compositor-stages-before-draw',
        // Sin cabecera ni pie del navegador: un CV no lleva la URL impresa.
        '--no-pdf-header-footer',
        '--print-to-pdf-no-header',
        '--print-to-pdf=' + salida,
        'http://127.0.0.1:' + puerto + edicion.ruta,
      ]);

      const { size } = await stat(salida);
      console.log(edicion.destino + ' · ' + Math.round(size / 1024) + ' KB');
    }
  } finally {
    servidor.close();
    await rm(perfil, { recursive: true, force: true });
  }

  const candado = {
    comentario:
      'Huella del contenido del CV cuando se generaron los PDF. Si no cuadra, ejecuta `npm run cv:pdf`.',
    sources: await huella(),
    generated: new Date().toISOString().slice(0, 10),
    files: EDICIONES.map((edicion) => edicion.destino),
  };

  await writeFile(join(raiz, CANDADO), JSON.stringify(candado, null, 2) + '\n', 'utf8');
  console.log('candado actualizado');
}

// Solo se ejecuta al invocarlo; los tests importan `huella` y las constantes.
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  principal().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
