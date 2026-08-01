#!/bin/sh
# Entrypoint de l'image Docker.
# 1. Attendre la DB (safe-migrate attend elle-même, avec retry).
# 2. Lancer Hapi.
set -e

cd /app

echo "[entrypoint] lancement des migrations..."
node ./back/utils/safe-migrate.js

echo "[entrypoint] démarrage de l'application..."
exec node index.js
