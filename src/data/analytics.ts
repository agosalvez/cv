/**
 * Analítica de visitas con Umami.
 *
 * Umami no usa cookies ni guarda datos personales, así que no obliga a mostrar
 * un banner de consentimiento. Mientras `src` o `websiteId` sean `null`, el
 * script no se carga en ninguna página: el sitio funciona igual sin analítica.
 *
 * Para activarla: crear el sitio en Umami (instancia propia o Umami Cloud) y
 * copiar aquí la URL del script y el identificador del sitio.
 *
 * Los botones que interesa medir llevan `data-umami-event`: Umami los registra
 * como eventos sin necesidad de JavaScript propio.
 */
export const umami = {
  /** URL de `script.js` de la instancia, por ejemplo `https://cloud.umami.is/script.js`. */
  src: null as string | null,
  websiteId: null as string | null,
  /** Solo cuenta visitas en producción: en local no ensucia las estadísticas. */
  domains: 'gosalvez.es',
};
