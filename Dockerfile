# Stage 1: Build
FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npx nuxt prepare && npm run build

# Debug: show where the build output landed
RUN echo "=== Build output locations ===" \
    && ls -la .output 2>/dev/null || echo "No .output dir" \
    && ls -la web/server/perkakas-web 2>/dev/null || echo "No web/server/perkakas-web dir" \
    && find . -maxdepth 4 -name "index.mjs" -path "*/server/*" 2>/dev/null || true

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
