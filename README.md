# 🔥 gosalvez.es — Mi CV en producción, con CI/CD y todo

> Porque un PDF de Word en 2025 es de otra época. Aquí tienes mi CV completo hecho con **Astro + TailwindCSS**, con panel de admin, bilingüe, self-hosted y desplegado automáticamente cada vez que hago push. Sí, para un CV. Sí, merece la pena.

<div align="center">

**[🌐 Ver el resultado →  gosalvez.es](https://gosalvez.es)**

![Astro](https://img.shields.io/badge/Astro-4.x-FF5D01?style=flat-square&logo=astro&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

</div>

---

## ¿Por qué esto existe?

Porque me cansé de actualizar un PDF cada vez que cambiaba de proyecto. Ahora edito mi CV desde un panel web, guardo, y en 2 minutos está desplegado en producción. Automáticamente. Sin tocar servidores.

Si eres dev y no tienes tu CV así, ¿a qué esperas?

---

## ✨ Lo que tiene

- **Bilingüe de verdad** — Español e inglés, rutas `/es` y `/en`, hreflang, todo
- **Panel de admin** — Edita todo el contenido desde una web, sin tocar código
- **Un solo `cv.json`** — Toda la info en un archivo. El admin lo edita, la web lo lee
- **SEO completo** — Open Graph, Twitter Card, JSON-LD, sitemap, robots.txt
- **Exportar a PDF** — Layout especial para imprimir/exportar, con foto, nombre y contactos
- **CI/CD automático** — Push a `main` → GitHub Actions → Docker Hub → Portainer → online
- **0 JS en el cliente** — HTML estático puro. Carga instantánea, 100 en Lighthouse
- **Self-hosted** — En tu propio servidor, con Traefik y HTTPS automático

---

## 🏗 Cómo está montado

```
Astro (build estático)
  └─> dist/          HTML, CSS, assets listos

Express (admin + servidor)
  ├─> /              Sirve el CV estático (dist/)
  ├─> /admin         Panel de administración (protegido con auth básica)
  └─> /api/*         API para leer/escribir cv.json
```

Todo en **una sola imagen Docker**. Multi-stage build:
1. Node construye el sitio con Astro → genera `dist/`
2. Node arranca Express que sirve `dist/` + el panel admin

Traefik se encarga del HTTPS, del enrutado y de los certificados.

---

## 🗂 Estructura del proyecto

```
cv-adriangosalvez/
├── src/
│   ├── data/
│   │   └── cv.json              # ← toda la info del CV aquí
│   ├── i18n/
│   │   └── translations.ts      # textos ES/EN de la UI
│   ├── layouts/
│   │   └── Layout.astro         # head, SEO, meta tags
│   └── pages/
│       └── [lang]/index.astro   # la página del CV
├── admin/
│   ├── server.js                # Express: sirve el CV y el admin
│   └── ui/index.html            # panel de admin (vanilla JS)
├── public/
│   ├── profile.jpg              # foto de perfil
│   ├── logos/                   # logos de empresas
│   ├── sitemap.xml
│   └── robots.txt
├── .github/workflows/deploy.yml # CI/CD completo
├── Dockerfile                   # multi-stage: build → runtime
└── docker-stack.yml             # stack para Portainer + Traefik
```

---

## 🚀 Arrancar en local

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

# arrancar Astro (CV en http://localhost:4321/es)
npm run dev

# arrancar el admin en otra terminal (http://localhost:4323)
cd admin && npm start
```

---

## 🐳 Docker

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

## ⚙️ CI/CD — GitHub Actions

Cada push a `main` dispara este flujo automáticamente:

```
push a main
  → GitHub Actions
    → docker build
    → docker push → Docker Hub (magicadry/cv:latest)
    → webhook → Portainer redespliega el stack
```

**Secrets que necesitas en GitHub:**

| Secret | Para qué |
|--------|----------|
| `DOCKERHUB_USERNAME` | Tu usuario de Docker Hub |
| `DOCKERHUB_TOKEN` | Token de acceso de Docker Hub |
| `PORTAINER_WEBHOOK_URL` | Webhook de tu stack en Portainer |

---

## 🔐 Panel de Admin

Accede en `/admin` con las credenciales que definas en las variables de entorno.

Puedes editar desde ahí:
- **Perfil** — nombre, título, foto, redes, contacto
- **Experiencia** — empresas, fechas, logos, descripciones
- **Educación** — titulaciones, centros, logos
- **Skills** — tecnologías y herramientas como tags
- **Publicaciones** — artículos, charlas, lo que sea
- **Idiomas** — nivel y certificaciones

Cada cambio se guarda en `cv.json`. En dev, Astro recarga automáticamente. En prod, haces push y en 2 minutos está live.

---

## 📄 Variables de entorno

```env
ADMIN_USER=tu_usuario
ADMIN_PASS=tu_contraseña_segura
PORT=80          # opcional, por defecto 80
APP_ROOT=/app    # opcional, solo en Docker
```

---

## 📄 Licencia

MIT © [Adrián Gosálvez](https://gosalvez.es)
