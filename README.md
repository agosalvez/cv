# gosalvez.es — Personal CV Website

> Engineered personal CV & portfolio built with Astro + TailwindCSS, featuring a custom admin backoffice, bilingual (ES/EN), self-hosted and fully automated via GitHub Actions → Docker → Portainer.

🌐 **Live:** [https://gosalvez.es](https://gosalvez.es)

![Astro](https://img.shields.io/badge/Astro-4.x-FF5D01?style=flat-square&logo=astro&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ Features

- **Bilingual** — Full Spanish & English support (`/es`, `/en`)
- **Admin backoffice** — Web UI to edit all CV content without touching code
- **Dynamic data** — Single `cv.json` as source of truth for both the site and admin
- **Company logos** — Auto-fetched via Clearbit API with color fallback
- **CI/CD** — GitHub Actions builds & pushes Docker image to `ghcr.io`, deploys to Portainer via webhook
- **100/100 Lighthouse** — Performance, Accessibility, Best Practices & SEO — static HTML output, zero client-side JS on the CV page
- **Self-hosted** — nginx-based Docker image, ~15MB final size

---

## 🏗 Architecture Overview

- **Astro** generates fully static HTML at build time — no JS framework overhead on the client
- **Admin (Express on :4322)** reads and writes `src/data/cv.json`; the Astro dev server hot-reloads automatically via a Vite HMR plugin
- **Docker** uses a multi-stage build: Node build stage produces the static `dist/` output, then nginx serves it from a minimal production image
- **nginx** serves the static output — no Node.js runtime in production
- **GitHub Actions** builds the Docker image, pushes to `ghcr.io/agosalvez/cv-adriangosalvez:latest`, and fires a Portainer webhook to redeploy the stack

> 📸 _Screenshot coming soon_

---

## 🗂 Project Structure

```
cv-adriangosalvez/
├── src/
│   ├── data/
│   │   └── cv.json              # ← single source of truth
│   ├── i18n/
│   │   └── translations.ts      # UI strings ES/EN
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro           # redirect → /es
│       └── [lang]/index.astro   # CV page (ES & EN)
├── admin/
│   ├── server.js                # Express API (read/write cv.json)
│   └── public/index.html        # Admin UI
├── public/
│   └── profile.jpg
├── .github/workflows/deploy.yml # GitHub Actions CI/CD
├── Dockerfile                   # Multi-stage: Node build → nginx
├── docker-compose.yml           # Production (Portainer)
└── docker-compose.local.yml     # Local dev (CV + Admin)
```

---

## 🚀 Getting Started

### Local development

```bash
git clone https://github.com/agosalvez/cv-adriangosalvez.git
cd cv-adriangosalvez
npm install
npm run dev
```

| Service | URL |
|---------|-----|
| CV site | http://localhost:4321/es |
| Admin   | http://localhost:4322 |

### Individual services

```bash
npm run cv      # Astro dev server only
npm run admin   # Admin backoffice only
```

---

## 🐳 Docker

### Build & run locally

```bash
docker build -t cv-adriangosalvez .
docker run -p 8082:80 cv-adriangosalvez
```

### Production (Portainer stack)

Update `docker-compose.yml` with your domain and run it as a stack in Portainer.

---

## ⚙️ CI/CD — GitHub Actions

On every push to `main`:

1. Builds the Docker image
2. Pushes to `ghcr.io/agosalvez/cv-adriangosalvez:latest`
3. Triggers a Portainer webhook to redeploy the stack

**Required GitHub secrets:**

| Secret | Description |
|--------|-------------|
| `PORTAINER_WEBHOOK_URL` | Webhook URL from your Portainer stack |

> `GITHUB_TOKEN` is provided automatically by GitHub Actions.

---

## 🛠 Admin Backoffice

The admin runs on port `4322` and lets you manage all CV content through a web interface — no code changes needed.

Sections: **Personal · Experience · Skills · Education · Publications · Certifications · Languages**

All changes are written to `src/data/cv.json`. The Astro dev server hot-reloads automatically.

---

## 📄 License

MIT © [Adrián Gosálvez](https://github.com/agosalvez)
