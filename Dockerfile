# Stage 1: Build
FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npx nuxt prepare && npm run build

# Stage 2: Production
FROM node:22-slim AS production

WORKDIR /app

COPY --from=build /app/app/web/server/perkakas-web ./app/web/server/perkakas-web

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

USER node

CMD ["node", "app/web/server/perkakas-web/server/index.mjs"]
