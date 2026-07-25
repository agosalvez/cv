# gosalvez.es

CV personal bilingüe y página de setup, construidos con **Astro + TailwindCSS**, con panel de administración propio, self-hosted y desplegados automáticamente en cada push.

<div align="center">

**[gosalvez.es](https://gosalvez.es)**

![Astro](https://img.shields.io/badge/Astro-4.x-FF5D01?style=flat-square&logo=astro&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

</div>

---

## Por qué existe

Mantener el CV en un PDF significa reeditarlo y volver a exportarlo cada vez que cambia algo. Aquí el contenido vive en un JSON, se edita desde un panel web y el despliegue es automático: guardar, hacer push y en un par de minutos está en producción.

---

## Qué incluye

- **Bilingüe** — Español e inglés, rutas `/es` y `/en`, con hreflang y x-default.
- **Página de setup** — `/es/setup` y `/en/setup`, con el espacio de trabajo documentado desde datos.
- **Panel de administración** — Edición del contenido del CV desde el navegador.
- **Un solo `cv.json`** — El admin lo escribe, la web lo lee.
- **SEO** — Open Graph, Twitter Card, JSON-LD, sitemap y robots.txt.
- **Exportación a PDF** — Hoja de estilos de impresión con cabecera propia.
- **CI/CD** — Push a `main` → GitHub Actions → Docker Hub → Portainer.
- **Sin JavaScript de cliente en el CV** — HTML estático.
- **Self-hosted** — Servidor propio con Traefik y HTTPS.

---

## Cómo está montado

```
Astro (build estático)
  └─> dist/          HTML, CSS, assets listos

Express (admin + servidor)
  ├─> /              Sirve el CV estático (dist/)
  ├─> /admin         Panel de administración (protegido con auth básica)
  └─> /api/*         API para leer/escribir cv.json
```

Todo en una sola imagen Docker, con build multi-stage:

1. Node construye el sitio con Astro y genera `dist/`.
2. Node arranca Express, que sirve `dist/` y el panel de administración.

Traefik se encarga del HTTPS, del enrutado y de los certificados.

---

## Estructura del proyecto

```
cv-adriangosalvez/
├── src/
│   ├── components/
│   │   └── setup/               # componentes de la página de setup
│   ├── data/
│   │   ├── cv.json              # ← toda la info del CV aquí
│   │   └── setup.ts             # contenido, imágenes y enlaces de /setup
│   ├── i18n/
│   │   └── translations.ts      # textos ES/EN de la UI
│   ├── layouts/
│   │   └── Layout.astro         # head, SEO, meta tags
│   └── pages/
│       ├── index.astro          # redirección a /es
│       ├── setup.astro          # redirección a /es/setup
│       └── [lang]/
│           ├── index.astro      # la página del CV
│           └── setup.astro      # la página de setup
├── admin/
│   ├── server.js                # Express: sirve el CV y el admin
│   └── ui/index.html            # panel de admin (vanilla JS)
├── docs/
│   └── setup-photo-guide.md     # guía para fotografiar el setup real
├── tests/                       # tests con el runner nativo de Node
├── public/
│   ├── profile.jpg              # foto de perfil
│   ├── logos/                   # logos de empresas
│   ├── images/setup/            # imágenes de la página de setup
│   ├── sitemap.xml
│   └── robots.txt
├── .github/workflows/deploy.yml # CI/CD completo
├── Dockerfile                   # multi-stage: build → runtime
└── docker-stack.yml             # stack para Portainer + Traefik
```

### Rutas

| Ruta | Qué hace |
|------|----------|
| `/` | Redirige a `/es` |
| `/es`, `/en` | CV en español e inglés |
| `/setup` | Redirige a `/es/setup` |
| `/es/setup`, `/en/setup` | Página de setup en español e inglés |

La redirección de `/setup` se declara en `astro.config.mjs`: con `i18n.routing.prefixDefaultLocale`, la salida estática no emite rutas sin prefijo de idioma.

---

## Arrancar en local

```bash
git clone https://github.com/agosalvez/cv-adriangosalvez.git
cd cv-adriangosalvez

# instalar deps del frontend
npm install

# instalar deps del admin
cd admin && npm install && cd ..

# copiar las variables de entorno
cp admin/.env.example admin/.env
# edita admin/.env con tu usuario y contraseña

# arrancar el CV y el admin a la vez
npm run dev

# o por separado
npm run cv       # Astro en http://localhost:4321/es
npm run admin    # admin en http://localhost:4323

# tests (runner nativo de Node, sin dependencias extra)
npm test
```

---

## Docker

```bash
# build
docker build -t cv .

# run local
docker run -p 8080:80 \
  -e ADMIN_USER=tu_usuario \
  -e ADMIN_PASS=tu_contraseña \
  cv
```

El CV estará en `http://localhost:8080/es` y el admin en `http://localhost:8080/admin`.

---

## CI/CD — GitHub Actions

Cada push a `main` dispara este flujo:

```
push a main
  → GitHub Actions
    → docker build
    → docker push → Docker Hub (magicadry/cv:latest)
    → webhook → Portainer redespliega el stack
```

**Secrets necesarios en GitHub:**

| Secret | Para qué |
|--------|----------|
| `DOCKERHUB_USERNAME` | Usuario de Docker Hub |
| `DOCKERHUB_TOKEN` | Token de acceso de Docker Hub |
| `PORTAINER_WEBHOOK_URL` | Webhook del stack en Portainer |

---

## Panel de administración

Accesible en `/admin` con las credenciales definidas en las variables de entorno.

Permite editar:

- **Perfil** — nombre, título, foto, redes, contacto.
- **Experiencia** — empresas, fechas, logos, descripciones.
- **Educación** — titulaciones, centros, logos.
- **Skills** — tecnologías y herramientas como tags.
- **Publicaciones** — artículos y charlas.
- **Idiomas** — nivel y certificaciones.

Cada cambio se guarda en `cv.json`. En desarrollo, Astro recarga la página automáticamente; en producción, el cambio entra con el siguiente push.

---

## Página de setup

`/es/setup` y `/en/setup` documentan el espacio de trabajo: equipos, pantallas, periféricos, audio, mobiliario, conexiones, software y la zona de simracing, además de qué funciona bien y qué cambiaría.

**Cómo está montada:**

- Todo el contenido bilingüe vive en `src/data/setup.ts`. Los componentes de `src/components/setup/` solo reciben datos: cambiar un texto, una imagen o un enlace no requiere tocar marcado.
- Los enlaces apuntan únicamente a páginas oficiales del fabricante (o de IKEA). Cuando no existe un destino oficial inequívoco, el elemento se queda sin enlace. No hay enlaces de afiliación ni de tiendas.
- Los elementos cuyo modelo exacto no está verificado se marcan como pendientes en lugar de publicar especificaciones sin comprobar.
- `Layout.astro` acepta `canonical`, `alternateUrls` y `ogType` para que las páginas internas declaren sus propios hreflang, x-default y Open Graph.

### Imágenes temporales

Las cinco imágenes de `public/images/setup/` son fotografías de archivo de Pexels y **no muestran el setup real**: sirven como referencia del encuadre que debe tener cada fotografía definitiva. Están marcadas con `temporary: true` en `src/data/setup.ts`, junto con su autoría y su URL de origen. La marca es interna y no se muestra al visitante.

| Archivo | Sección | Proporción de recorte |
|---------|---------|-----------------------|
| `workspace-overview.jpg` | Hero | 3:2 |
| `workspace-peripherals.jpg` | Periféricos | 3:4 |
| `workspace-audio.jpg` | Audio, vídeo e iluminación | 3:2 |
| `workspace-furniture.jpg` | Mobiliario y comodidad | 3:4 |
| `workspace-simracing.jpg` | Gaming y simracing | 3:2 |

Para sustituirlas por fotografías propias:

1. Sigue [`docs/setup-photo-guide.md`](docs/setup-photo-guide.md), que detalla qué debe aparecer en cada toma, el encuadre, la proporción y la resolución mínima.
2. Reemplaza el archivo en `public/images/setup/`.
3. Actualiza en `src/data/setup.ts` las dimensiones, el texto alternativo, la fuente y `temporary: false`.

Las imágenes viven bajo `public/images/` y no bajo `public/setup/` porque ese directorio se serviría en la misma URL que la página `/setup` y sobrescribiría su redirección al construir el sitio.

La sección de conexiones y alimentación no lleva fotografía, y la distribución de pantallas usa un esquema dibujado en HTML en lugar de una imagen de relleno.

---

## Variables de entorno

```env
ADMIN_USER=tu_usuario
ADMIN_PASS=tu_contraseña_segura
PORT=80          # opcional, por defecto 80
APP_ROOT=/app    # opcional, solo en Docker
```

---

## Licencia

MIT © [Adrián Gosálvez](https://gosalvez.es)
