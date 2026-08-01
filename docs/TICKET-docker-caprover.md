# Ticket — Déploiement Docker sur CapRover (front + back)

## Contexte

L'application `dons` (Hapi + Vite + MySQL) est aujourd'hui lancée en `npm run dev`
sur le poste des contributeurs. Pour pouvoir la mettre en ligne derrière le
domaine de l'association MO5.COM, il faut une image Docker unique, prête à être
déployée sur **CapRover** (Docker Swarm-based, single-container par app).

Contraintes identifiées en lisant le code :

- Le serveur Hapi (`index.js`) écoute sur `host: "localhost"` et `port: 3000`
  en dur → **inaccessible** depuis CapRover, qui attend `0.0.0.0:3000`.
- Les variables d'environnement du front (`VITE_PAYPAL_API_KEY`,
  `VITE_PAYPAL_MERCHANT_ID`) sont lues via `import.meta.env` donc **baked-in à
  la compilation** : impossible de les passer au runtime, il faut les
  injecter au build.
- `BASE_URL` est importée depuis `back/utils/constants.js` mais **n'y est pas
  exportée** : utilisée dans le mail donateur de `money-submit.ctrl.js` pour
  construire le lien du CERFA, elle vaut `undefined` → le mail contient
  `undefined/cerfa/...`. Bug à corriger en même temps.
- Migrations Knex non versionnées : à appliquer au démarrage du conteneur
  (idempotent, single replica).
- Données applicatives persistantes : `back/files/` (PDF des CERFA) et
  `back/uploads/` (photos des dons matériel) → doivent vivre sur un volume
  CapRover (`/data`).
- Sécurité : variables d'auth (`TOKEN_ADMIN`, `MAIL_PASS`, …) en ENV, pas en
  bundle ; CSP déjà en place (cf. `back/utils/csp.js`) ; image durcie
  (non-root, healthcheck, signaux).

## Périmètre

- Créer une image Docker **multi-stage** :
  1. **builder** : `node:22-bookworm-slim` → installe deps root + front, lance
     `vite build` vers `dist/`.
  2. **runtime** : `node:22-bookworm-slim`, utilisateur non-root, ne contient
     que l'artifact Hapi + le bundle front + `node_modules` de prod.
- Ajouter `captain-definition` (schema v2) pour que CapRover pointe sur le
  Dockerfile.
- Ajouter un script entrypoint qui :
  1. attend que la DB MySQL soit joignable ;
  2. exécute `knex migrate:latest --env production` (idempotent) ;
  3. lance `node index.js` avec `tini` comme PID 1.
- Rendre `index.js` paramétrable par `PORT` / `HOST` (défauts `3000` /
  `0.0.0.0`).
- Corriger le bug `BASE_URL` dans `back/utils/constants.js` (l'export
  manquait) et lire sa valeur depuis `process.env.BASE_URL`.
- Documenter les variables d'environnement, la procédure de déploiement
  CapRover, et la procédure de mise à jour d'image.

## Hors périmètre

- CI/CD : pas de pipeline CI dans ce ticket, build & push restent manuels
  (ou assistés par CapRover). À traiter dans un ticket ultérieur.
- Persistence MySQL : on suppose qu'une base MySQL existe déjà
  (CapRover one-click app `mysql` ou serveur externe). Les variables
  `DB_HOST` / `DB_USER` / `DB_PASS` / `DB_NAME_PROD` sont requises.
- Reverse-proxy / HTTPS : CapRover + nginx le gèrent par capr-over ; pas
  touché ici.
- Tests automatisés Docker (genre `testcontainers`). La validation reste
  `docker build` + `docker run` + smoke test HTTP.
- Build & push automatisé de l'image vers un registry : documenté, pas
  automatisé.

## Critères d'acceptation

1. `docker build -t dons:local .` depuis la racine du repo :
   - produit bien **2 stages** (`builder` → `runtime`) listés par
     `docker history dons:local` ;
   - la taille de l'image finale est significativement plus petite que
     l'image builder (pas de `node_modules` de dev, pas de source maps).
2. `docker run --rm -p 3000:3000 dons:local` démarre l'application et le
   healthcheck répond `200` sur `GET /` endéans 10 s.
3. L'image exécute l'application en **non-root** :
   `docker exec dons-container whoami` → `node`.
4. `docker run --rm dons:local` qui démarre **sans** MySQL accessible
   attend, puis **échoue proprement** avec un message explicite (pas de
   crash silencieux).
5. Endpoint `GET /` renvoie l'HTML `dist/index.html` ; endpoint
   `GET /assets/<file>` renvoie un asset du bundle Vite ;
   endpoint `GET /public/logo.svg` renvoie un asset statique de
   `back/public` ; endpoint `GET /favicon.ico` répond `200`.
6. Réponse contient bien les en-têtes `Content-Security-Policy`,
   `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
   `Permissions-Policy`, `Strict-Transport-Security` (cf. ticket CSP).
7. Avec `BASE_URL=https://dons.mo5.com` posé en ENV, un don financier
   envoyé en mode debug produit bien un mail donateur contenant
   `https://dons.mo5.com/cerfa/...` (test : on vérifie dans la stack
   mailcatcher / logs).
8. `captain-definition` à la racine : `{"schemaVersion": 2, "dockerfilePath": "./Dockerfile"}`.
   CapRover accepte le déploiement et expose l'app sur le port 3000.
9. Volume mapping `/app/back/files` → `/data/files` et
   `/app/back/uploads` → `/data/uploads` : un PDF de CERFA créé en runtime
   survit à un `docker restart` (test : générer, supprimer le conteneur,
   relancer, retrouver le fichier).
10. `docker run --rm dons:local` avec `VITE_PAYPAL_API_KEY=invalid` au
    **build** (`--build-arg`) produit bien un bundle où cette clé est
    présente (vérifiable : `grep -r VITE_PAYPAL_API_KEY dist/`).

## Variables d'environnement

### Build (`ARG` du Dockerfile, passées au moment du `docker build`)

| Nom | Obligatoire | Description |
| --- | --- | --- |
| `VITE_PAYPAL_API_KEY` | oui | Client ID PayPal (sandbox ou live) |
| `VITE_PAYPAL_MERCHANT_ID` | oui | Merchant ID PayPal |

### Runtime (ENV du conteneur, configurées via CapRover)

| Nom | Obligatoire | Défaut | Description |
| --- | --- | --- | --- |
| `NODE_ENV` | non | `production` | Active le mode strict (CORS, build Vite prod) |
| `HOST` | non | `0.0.0.0` | Bind Hapi (incompatible `localhost` derrière CapRover) |
| `PORT` | non | `3000` | Port Hapi (CapRover attend 3000) |
| `BASE_URL` | oui (prod) | — | URL publique pour les liens CERFA dans les mails |
| `DB_HOST` | oui | — | Host MySQL |
| `DB_USER` | oui | — | Utilisateur MySQL |
| `DB_PASS` | oui | — | Mot de passe MySQL |
| `DB_NAME` | oui | — | Base MySQL (utilisée par `db.service.js`) |
| `DB_NAME_PROD` | oui | — | Base MySQL (utilisée par `knexfile.js --env production`) |
| `DB_USER_PROD` | oui | — | Utilisateur MySQL (config Knex `production`) |
| `DB_PASS_PROD` | oui | — | Mot de passe MySQL (config Knex `production`) |
| `MAIL_HOST` | oui | — | Serveur SMTP |
| `MAIL_USERNAME` | oui | — | Utilisateur SMTP |
| `MAIL_PASS` | oui | — | Mot de passe SMTP |
| `MAIL_ADDRESS` | oui | — | Adresse `From` des mails |
| `MAIL_DEST` | oui | — | Adresse destinataire admin (mails de notif) |
| `MAILS_COPY` | non | — | Adresses en copie (CSV ou liste) |
| `TOKEN_ADMIN` | oui | — | Token d'auth des routes admin (`/api/cerfa/admin/...`, `/api/admin_gen`) |
| `DISCORD_LINK` | non si pas d'adhésion | — | URL d'invitation Discord MO5 |

> Note : `BASE_URL` est nouveau. Il sert à générer les liens CERFA absolus
> dans les mails sortants (don financier). Aujourd'hui l'export manque dans
> `constants.js` ; le ticket le corrige.

## Scénarios Gherkin

Voir `features/docker-deploy.feature`.

## Plan d'implémentation

1. **Fix `BASE_URL`** : ajouter dans `back/utils/constants.js`
   `const BASE_URL = process.env.BASE_URL || ""`, l'exporter.
2. **Rendre `index.js` paramétrable** :
   - `host: process.env.HOST || "0.0.0.0"`
   - `port: Number(process.env.PORT) || 3000`
   - (le reste ne change pas).
3. **`back/utils/safe-migrate.js`** : petit module qui attend la DB
   joignable (boucle `mysql2.getConnection` avec backoff), puis appelle
   `knex.migrate.latest` via `knexfile.js`. Échoue avec un message clair
   si la config manque.
4. **`entrypoint.sh`** :
   ```sh
   #!/bin/sh
   set -e
   node ./back/utils/safe-migrate.js
   exec node index.js
   ```
   `chmod +x` ; exécuté via `tini --` pour propager SIGTERM.
5. **Dockerfile** multi-stage (cf. référence SolidStart du projet) :
   - **Stage 1 `builder`** : `node:22-bookworm-slim`, `ARG` `VITE_*`,
     `WORKDIR /app`, `COPY package*.json` + `COPY front/package*.json front/`,
     `RUN npm ci --omit=dev` puis `RUN cd front && npm ci`,
     `COPY . .`, `RUN cd front && npm run build`.
   - **Stage 2 `runtime`** : `node:22-bookworm-slim`,
     `User node`, `WORKDIR /app`,
     `COPY --from=builder --chown=node:node /app/node_modules ./node_modules`,
     `COPY --from=builder --chown=node:node /app/dist ./dist`,
     `COPY --from=builder --chown=node:node /app/back ./back`,
     `COPY --from=builder --chown=node:node /app/migrations ./migrations`,
     `COPY --from=builder --chown=node:node /app/index.js ./index.js`,
     `COPY --from=builder --chown=node:node /app/knexfile.js ./knexfile.js`,
     `COPY --from=builder --chown=node:node /app/entrypoint.sh ./entrypoint.sh`,
     `COPY --from=builder --chown=node:node /app/package.json ./package.json`,
     `COPY --from=builder --chown=node:node /usr/local/bin/tini /usr/local/bin/tini`,
     `HEALTHCHECK` curl sur `/favicon.ico`,
     `EXPOSE 3000`, `ENTRYPOINT ["/usr/local/bin/tini", "--"]`,
     `CMD ["/app/entrypoint.sh"]`.
6. **`.dockerignore`** : ignorer `node_modules`, `front/node_modules`,
   `dist`, `.git`, `*.log`, `back/files/*`, `back/uploads/*`, `back/files/!*/`,
   `back/uploads/!*/`, `.env*`, `.vscode`, `features` (pas nécessaire au
   runtime), `docs`.
7. **`captain-definition`** à la racine pointing sur le Dockerfile.
8. **Documentation** : section dans `README.md` : variables d'env,
   procédure de déploiement (build arg → push registry → deploy CapRover),
   procédure de mise à jour, et procédure de rollback.
9. **Scénarios Gherkin** : `features/docker-deploy.feature` couvrant les
   critères d'acceptation principaux (les Gherkin sont des spécifications,
   pas un harness Docker automatique).

## Tests / vérifications

- `docker build -t dons:local .` : succès, image finale < 300 MB.
- `docker run --rm -p 3000:3000 --env-file .env.local dons:local` →
  `curl http://localhost:3000/favicon.ico` → 200.
- `docker exec dons-container whoami` → `node`.
- `docker run --rm dons:local` avec DB injoignable → message d'erreur
  explicite, exit code non-zéro après quelques tentatives.
- `docker run --rm -v /tmp/dons-files:/app/back/files dons:local` :
  écrire dans `/app/back/files` depuis l'app, redémarrer, fichier
  toujours présent.
- `docker run --rm dons:local ls -la /app` : `node` est owner des fichiers.
- `docker scout quickview dons:local` (si dispo) : aucune CVE critique
  connue.
- `npm run dev` local : vérifier qu'on n'a pas régressé le flux
  (home, don financier, adhésion, CERFA).

## Risques / rollback

- **Risque 1** : `BASE_URL` mal configuré en prod → mails donateur avec
  lien cassé. Atténuation : constante lue dans `process.env` mais
  `console.warn` si vide au démarrage.
- **Risque 2** : `canvas` (utilisé pour le CERFA) a une chaîne native
  embarquée via `node-pre-gyp`. Sur architecture exotique (ARM32, etc.)
  l'image de base `node:22-bookworm-slim` (x86_64/arm64 glibc) couvre
  nos cibles CapRover. À surveiller.
- **Risque 3** : `migrate:latest` sur image restart peut re-créer des
  fichiers si une migration a un `down` partiel. Les migrations
  existantes (`migrations/`) sont toutes additives, pas de risque
  d'écrasement.
- **Rollback** : redéployer l'image précédente depuis le registry.
  CapRover garde un historique d'images déployées.
- **Rollback DB** : pas concerné (les migrations sont additives, pas de
  perte de données).

## Décisions

- **Image de base `node:22-bookworm-slim`** : alignée avec la stack
  moderne du front (Vite 8, `@paypal/paypal-js` 10) et l'exemple
  SolidStart fourni. Évite `alpine` qui complique `canvas` (musl).
- **Multi-stage + `--omit=dev`** : vise < 300 MB, pas de `node_modules`
  de dev dans l'image finale.
- **Build args `VITE_*`** plutôt que fichier `.env.production` versionné :
  les secrets PayPal sortent du repo.
- **`HOST` et `PORT` en ENV** plutôt qu'en dur : permet à CapRover de
  piloter le bind sans rebuild.
- **Migrations au démarrage** et pas dans un job dédié : CapRover single-
  container, éviter un service séparé. Single replica → pas de race
  condition. Avec plusieurs replicas, à passer en Job Kubernetes /
  init-container (ticket ultérieur).
- **Pas de `docker-compose.yml`** : CapRover gère la BD via one-click-app
  séparée, on configure l'ENV dans le dashboard CapRover.
- **Pas de `.dockerignore` pour `back/files` et `back/uploads`** : on
  crée ces dossiers à l'intérieur avec `chown` ; le contenu au runtime
  persiste via le volume CapRover (le directory vide est créé).
