import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gosalvez.es',
  integrations: [tailwind(), sitemap()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
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
