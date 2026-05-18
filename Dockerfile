# Stage 1: Build
FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN mkdir -p web/server && npm run build

# Normalize output to .output (handles both default and custom nitro.output.dir)
RUN if [ -d "web/server/perkakas-web" ]; then \
      rm -rf .output 2>/dev/null; \
      mv web/server/perkakas-web .output; \
    fi

# Stage 2: Production
FROM node:22-slim AS production

WORKDIR /app

COPY --from=build /app/.output ./.output

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

USER node

CMD ["node", ".output/server/index.mjs"]
