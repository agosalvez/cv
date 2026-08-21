import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://gosalvez.es',
  integrations: [tailwind()],
  // El enrutado i18n con `prefixDefaultLocale` no emite rutas sin prefijo de
  // idioma en la salida estática: las redirecciones cortas se declaran aquí.
  redirects: {
    '/setup': '/es/setup',
    '/formacion': '/es/formacion',
    '/training': '/en/training',
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    server: {
      // En producción, un mismo Express sirve el sitio y `/api`. En desarrollo
      // son dos procesos: el proxy evita que el formulario tenga que conocer
      // dos orígenes distintos.
      proxy: {
        '/api': process.env.ADMIN_ORIGIN || 'http://localhost:4322',
      },
    },
    plugins: [
      {
        // Cuando el admin guarda cv.json, fuerza full-reload en el navegador
        name: 'cv-json-hmr',
        handleHotUpdate({ file, server }) {
          if (file.endsWith('cv.json')) {
            server.ws.send({ type: 'full-reload' });
            return [];
          }
        },
      },
    ],
  },
});
