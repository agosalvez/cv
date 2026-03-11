# ── Stage 1: Build Astro ─────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 2: Runtime (Express sirve CV + Admin) ───────────────
FROM node:20-alpine
WORKDIR /app
ENV APP_ROOT=/app

# Dependencias del servidor admin
COPY admin/package*.json ./
RUN npm ci --omit=dev

# Servidor + UI del admin
COPY admin/ ./

# CV compilado
COPY --from=builder /build/dist ./dist

# Assets públicos (logos, foto de perfil)
COPY --from=builder /build/public ./public

# Datos iniciales
COPY --from=builder /build/src/data/cv.json ./src/data/cv.json

# Directorios que se montarán como volúmenes
RUN mkdir -p src/data public/logos

EXPOSE 80
CMD ["node", "server.js"]
