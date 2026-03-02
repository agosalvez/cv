FROM node:20-alpine
WORKDIR /app/admin
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 4322
CMD ["node", "server.js"]
