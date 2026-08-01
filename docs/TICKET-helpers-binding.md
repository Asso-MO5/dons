# Ticket — Bug prod « `app.helpers.injectTemplate` is null »

## Contexte

En production, sur la page d'accueil, `_hyperscript` lève
`'app.helpers.injectTemplate' is null` (et plus généralement tous les
`app.helpers.*` utilisés dans les blocs `_="..."`). Le rendu se fait,
mais les modales (don matériel, don financier, adhésion), le bandeau
d'en-tête (`header`) et la FAQ ne sont pas injectés dans le DOM, et la
traduction ne tourne pas.

Identifié en lisant le code et confirmé en re-buildant le bundle avec
`npm run build` :

- `dist/assets/index-*.js` minifié contient `Object.assign({},...t.map(e=>({[e.name]:e})))`
  au lieu d'un mapping explicite.
- Les fonctions exportées par `front/libs/injectTemplate.js`,
  `front/src/scripts/translate.js`, etc. sont minifiées en `l`, `n`, etc.
- Au runtime, `e.name === "e"` (ou `"l"`), donc l'objet
  `app.helpers` n'a pas les clés `injectTemplate`, `translate`,
  `getLang`, etc. que `_hyperscript` essaie d'appeler.
- `vite.config.js` positionne `esbuild: { keepNames: true,
  minifyIdentifiers: false }`. **Vite 8 utilise rolldown (Rust) qui
  n'honore pas ces options `esbuild.*`** : il minifie les identifiants
  via son propre pipeline, et la `keepNames` est sans effet.

En dev (`npm run dev`), rolldown-sourcemap sert les modules non
minifiés et le bug n'apparaît pas. D'où le classique « fonctionne chez
moi ».

## Périmètre

- Remplacer le mapping par nom de fonction (`fn.name`) par un mapping
  explicite, robuste à la minification.
- Garder une signature lisible côté page (`createPage(content, {
  injectTemplate, translate, ... })`).
- Ne pas casser le comportement dev (vérifié par `npm run dev`).
- Vérifier que le bundle prod (`npm run build`) contient bien un
  mapping statique vers `injectTemplate`, `translate`, etc.

## Hors périmètre

- Refactor du routeur ou de la couche hyperscript.
- Migration vers un autre bundler.
- Tests e2e (pas de harness en place ; la validation est une inspection
  du bundle + scénarios Gherkin rédigés en spec).

## Critères d'acceptation

1. En production, le bundle minifié expose `app.helpers.injectTemplate`,
   `app.helpers.translate`, `app.helpers.getLang`, `app.helpers.saveLang`,
   `app.helpers.injectFaq`, `app.helpers.submitGear`, `app.helpers.submitMoney`,
   `app.helpers.loadMoneyModal`, `app.helpers.loadMembershipModal`,
   `app.helpers.getBano`, `app.helpers.getDownloadLink`,
   `app.helpers.submitAdminGen` comme des fonctions définies.
2. Aucune référence à `[fn.name]` ou `[e.name]` dans le bundle
   (vérifiable : `grep -o 'fn.name\|e.name' dist/assets/index-*.js` →
   vide pour les helpers).
3. `_hyperscript` n'émet plus l'erreur `'app.helpers.injectTemplate' is
   null` au chargement de la home.
4. Les modales don matériel, don financier, adhésion s'ouvrent et
   leurs formulaires se soumettent comme en dev.

## Variables d'environnement

Aucune.

## Scénarios Gherkin

Voir `features/helpers-binding.feature`.

## Plan d'implémentation

1. **`front/libs/createPage.js`** : changer la signature pour accepter
   `(content, helpers)` où `helpers` est un objet `{ nomFonction: fn,
   ... }`. Le retour reste `{ content, helpers }` (l'objet est passé
   tel quel à `app.helpers = helpers`).
2. **Pages** `front/src/pages/{home,membership,thanks,thanks-gear,thanks-membership,admin-form}.js` :
   remplacer l'appel `createPage(content, fn1, fn2, ...)` par
   `createPage(content, { fn1, fn2, ... })`.
3. Scénario Gherkin `features/helpers-binding.feature` (spec).
4. Validation : `npm run build` + `grep` sur le bundle.

## Tests / vérifications

- `npm run build` produit un bundle sans `[fn.name]` côté helpers.
- Inspection du bundle minifié :
  `grep -o 'injectTemplate:[^a-zA-Z]' dist/assets/index-*.js` →
  plusieurs occurrences (déclaration + appel).
- Chargement de la page d'accueil en mode `preview` :
  `npm run build && npm run preview` puis ouverture navigateur, plus
  aucune erreur `app.helpers.injectTemplate is null` dans la console.

## Risques / rollback

- Risque 1 : un helper oublié dans l'objet passé à `createPage` →
  l'appel `_hyperscript` correspondant lèvera une erreur du même type.
  Atténuation : revue manuelle des 6 pages (l'objet contient
  exactement les helpers référencés dans les blocs `_="..."` des
  partials HTML).
- Rollback : `git revert` du commit, redéploiement. Aucun impact sur
  la base de données ni sur les routes serveur.

## Décisions

- **Objet nommé plutôt que wrapper `name(fn, "injectTemplate")`** :
  l'objet est explicite au site d'appel, pas de mutation de
  `Function.prototype.name` (qui peut être bloquée par les moteurs en
  strict mode) et on profite d'un warning TypeScript-friendly si on
  ajoutait un jour des types.
- **Pas de `keepNames: true` côté Vite 8** : l'option est
  ineffective avec rolldown et le `fn.name` reste fragile (dépend du
  parser du bundler). On bascule sur un mapping statique, simple et
  stable.
