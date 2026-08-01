##################
# STAGE 1: BUILD  #
##################
FROM node:22-bookworm-slim AS builder

# libs système nécessaires à la compilation de canvas (CERFA),
# et restantes tant qu'on est à l'étape de build.
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# --- Variables de build côté front (optionnelles, mais bake-in
# dans le bundle Vite). À passer au moment du `docker build --build-arg`.
ARG VITE_PAYPAL_API_KEY
ARG VITE_PAYPAL_MERCHANT_ID
ENV VITE_PAYPAL_API_KEY=$VITE_PAYPAL_API_KEY \
    VITE_PAYPAL_MERCHANT_ID=$VITE_PAYPAL_MERCHANT_ID

# --- Dépendances back (production-only) ---
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# --- Dépendances front (postcss + tailwind + vite + paypal) ---
COPY front/package.json front/package-lock.json ./front/
RUN cd front && npm ci && cd ..

# --- Code source ---
COPY . .

# Build du front (produit ./dist/ avec index.html, assets/, fonts/, ...)
ENV NODE_ENV=production
RUN cd front && npm run build && cd ..

###################
# STAGE 2: RUNTIME #
###################
FROM node:22-bookworm-slim AS runtime

# tini: PID 1 pour propager SIGTERM/SIGINT et nettoyer les zombies.
# (canvas charge des binaires C++ au runtime, donc on garde libstdc++,
# libgcc1, libcairo2 etc. — déjà fournis par bookworm-slim.)
RUN apt-get update \
  && apt-get install -y --no-install-recommends tini curl \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

# Utilisateur non-root
RUN groupadd --system --gid 1001 node-app \
  && useradd  --system --uid 1001 --gid node-app --no-create-home --shell /bin/false node-app

WORKDIR /app

# --- Code & assets ---
# Node modules prod (back)
COPY --from=builder --chown=node-app:node-app /app/node_modules ./node_modules
# Bundle front (dist)
COPY --from=builder --chown=node-app:node-app /app/dist ./dist
# Code back (services, routes, ctrl, data, public, files, uploads)
COPY --from=builder --chown=node-app:node-app /app/back ./back
# Migrations Knex
COPY --from=builder --chown=node-app:node-app /app/migrations ./migrations
# Entry points Node
COPY --from=builder --chown=node-app:node-app /app/index.js ./index.js
COPY --from=builder --chown=node-app:node-app /app/knexfile.js ./knexfile.js
COPY --from=builder --chown=node-app:node-app /app/entrypoint.sh ./entrypoint.sh
COPY --from=builder --chown=node-app:node-app /app/package.json ./package.json

# Dossiers persistants (volumes CapRover).
RUN mkdir -p /app/back/files /app/back/uploads \
  && chown -R node-app:node-app /app

# Le script doit être exécutable pour le runtime.
RUN chmod +x /app/entrypoint.sh

USER node-app

EXPOSE 3000

# Healthcheck: simple GET sur /favicon.ico (réponse 200 rapide, sert à la
# fois de témoin de boot et de persistance Hapi).
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/favicon.ico || exit 1

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["/app/entrypoint.sh"]
