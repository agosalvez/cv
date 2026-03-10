FROM node:20-alpine
WORKDIR /app/admin
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
# Directorios que se montarán como volúmenes
RUN mkdir -p /app/src/data /app/public/logos
EXPOSE 4322
CMD ["node", "server.js"]
