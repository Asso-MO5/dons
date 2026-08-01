# Ticket — Bug prod « Erreurs CSP dans la console navigateur »

## Contexte

Sur l'environnement de staging (`https://dons-staging.mo5.fr/`), la console
du navigateur remonte plusieurs violations de la
`Content-Security-Policy` servie par Hapi via
`back/utils/csp.js` (PR #6). La CSP a été conçue pour ne couvrir que les
domaines exacts `paypal.com` et `paypalobjects.com` ; en pratique, le SDK
PayPal et `_hyperscript` ont besoin d'origines plus larges et de mots-clés
supplémentaires que la politique actuelle n'autorise pas.

Erreurs observées (extrait console staging) :

```
_hyperscript.min.js:1316 hyperscript errors were found ...
EvalError: Evaluating a string as JavaScript violates the following
Content Security Policy directive because 'unsafe-eval' is not an allowed
source of script: script-src 'self' https://www.paypal.com
https://www.paypalobjects.com.
    at new Function (<anonymous>)
    at E (https://dons-staging.mo5.fr/_hyperscript.min.js:1788:12)
    ...

VM313 js:3 Executing inline script violates the following Content Security
Policy directive 'script-src 'self' https://www.paypal.com
https://www.paypalobjects.com'. Either the 'unsafe-inline' keyword, a hash
('sha256-...'), or a nonce ('nonce-...') is required to enable inline
execution. The action has been blocked.

about:blank:1 Loading the image
'https://www.paypalobjects.com/js-sdk-logos/2.3.7/paypal-white.svg'
violates the following Content Security Policy directive: "img-src 'self'
data: https://www.paypal.com". The action has been blocked.

js?client-id=...:3 Connecting to
'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true'
violates the following Content Security Policy directive: "connect-src
'self' https://www.paypal.com". The action has been blocked.

www.paypal.com/:1 Framing 'https://www.sandbox.paypal.com/' violates the
following Content Security Policy directive: "frame-src
https://www.paypal.com". The request has been blocked.

paypal_js_sdk_v5_unhandled_exception
{err: 'Error: zoid destroyed all components', ...}
```

Conséquence fonctionnelle : la modale PayPal est détruite par `zoid` avant
même de pouvoir s'afficher (`zoid destroyed all components`), le bouton
de don ne s'initialise pas et les images de marque ne se chargent pas.

## Cause

| Erreur console | Directive | Pourquoi la prod bloque |
|---|---|---|
| `_hyperscript` `EvalError` (`new Function`) | `script-src` | Manque `'unsafe-eval'`. `_hyperscript` évalue ses expressions d'attributs `_*` via `new Function(...)`. |
| Script inline du SDK PayPal | `script-src` | Manque `'unsafe-inline'`. Le SDK injecte un bootstrap inline dont le hash change à chaque version. |
| Logos `paypalobjects.com/js-sdk-logos/*.svg` | `img-src` | Manque `https://www.paypalobjects.com`. |
| Logger `sandbox.paypal.com/...` | `connect-src` | La politique ne couvre que `https://www.paypal.com`, pas les sous-domaines `*.sandbox.paypal.com`. |
| Iframe `sandbox.paypal.com` | `frame-src` | Idem, sous-domaine non couvert. |

## Périmètre

- Élargir la CSP servie par `back/utils/csp.js` :
  - `script-src` : ajouter `'unsafe-eval'` (requis par `_hyperscript`) et
    `'unsafe-inline'` (requis par le bootstrap inline du SDK PayPal ;
    une politique basée sur le hash serait à recalculer à chaque release
    SDK, ce qui n'est pas viable).
  - `img-src` : ajouter `https://www.paypalobjects.com` (logos SVG
    chargés depuis le CDN PayPal).
  - `connect-src` : remplacer `https://www.paypal.com` par
    `https://*.paypal.com` (couvre `www.paypal.com`, `sandbox.paypal.com`,
    etc.).
  - `frame-src` : idem, `https://*.paypal.com`. Idem `https://*.paypalobjects.com`
    par cohérence.
- Refactor : extraire la liste `paypalOrigins` pour garder les trois
  directives cohérentes (`script-src`, `connect-src`, `frame-src`).
- Mettre à jour `back/utils/csp.test.js` pour refléter le nouveau contenu
  de la CSP (les wildcards `*.paypal.com` et la présence de
  `'unsafe-inline'` / `'unsafe-eval'`).
- Documenter le compromis de sécurité (XSS) dans le JSDoc du module
  `csp.js`.

## Hors périmètre

- Abaisser `unsafe-inline` / `unsafe-eval` via l'adoption de nonces par
  requête : cela impose de modifier l'intégration PayPal et de
  supprimer (ou réécrire) les attributs `_hyperscript`. C'est un
  refactor à traiter dans un ticket dédié.
- Le `sw.js` non servi (MIME `text/html`) et le
  `maskable_icon_x192.png` invalide du manifest ne sont **pas** des
  violations CSP ; ce sont des problèmes de statique / d'asset à
  traiter dans des tickets séparés.
- Modification du flux PayPal ou du code applicatif front.

## Critères d'acceptation

1. La CSP servie par Hapi en production autorise explicitement :
   - `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.paypal.com https://*.paypalobjects.com` ;
   - `img-src 'self' data: https://www.paypal.com https://www.paypalobjects.com` ;
   - `connect-src 'self' https://*.paypal.com https://*.paypalobjects.com` ;
   - `frame-src https://*.paypal.com https://*.paypalobjects.com`.
2. `node --test back/utils/csp.test.js` passe à 5/5 (ou plus), avec des
   tests couvrant explicitement les wildcards PayPal et la présence de
   `'unsafe-eval'` / `'unsafe-inline'` en production.
3. Le JSDoc de `back/utils/csp.js` explique pourquoi la politique
   accepte `'unsafe-inline'` et `'unsafe-eval'` en production et liste
   les pistes de durcissement (nonces, abandon de `_hyperscript`).
4. Aucune régression sur les critères d'acceptation du ticket CSP
   initial (`docs/TICKET-csp.md`) : `default-src 'self'`,
   `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`,
   `form-action 'self'`, `manifest-src 'self'` restent en place.

## Variables d'environnement

Aucune.

## Scénarios Gherkin

Aucun ajout nécessaire : le ticket ne modifie pas de comportement
utilisateur observable côté front, uniquement la CSP. La validation
repose sur `node --test back/utils/csp.test.js` et sur les tests
manuels suivants (à cocher avant merge) :

- Charger `https://dons-staging.mo5.fr/` dans un navigateur :
  - plus aucune erreur CSP dans la console ;
  - la modale PayPal s'initialise, le bouton de don est cliquable ;
  - les logos `paypalobjects.com/js-sdk-logos/2.3.7/*.svg` se
    chargent.
- Lancer `npm run dev` côté front, recharger la home, vérifier qu'il
  n'y a pas de régression HMR.

## Plan d'implémentation

1. Modifier `back/utils/csp.js` :
   - ajouter `'unsafe-inline'` et `'unsafe-eval'` à `script-src` ;
   - ajouter `https://www.paypalobjects.com` à `img-src` ;
   - introduire `paypalOrigins = ['https://*.paypal.com', 'https://*.paypalobjects.com']`
     et l'utiliser dans `script-src`, `connect-src`, `frame-src` ;
   - mettre à jour le JSDoc.
2. Mettre à jour `back/utils/csp.test.js` :
   - adapter les assertions aux wildcards ;
   - remplacer l'ancien test « ne contient pas unsafe-inline /
     unsafe-eval » par son inverse (ils sont désormais attendus en
     prod) ;
   - regrouper les tests dev (PayPal + localhost) en un seul test pour
     éviter la duplication.
3. Lancer `node --test back/utils/csp.test.js` (5/5 attendu).
4. (Manuel) Déployer en staging et recharger la page : plus d'erreurs
   CSP, modale PayPal fonctionnelle.

## Tests / vérifications

- `node --test back/utils/csp.test.js` → 5/5 pass.
- Inspection manuelle de la réponse `curl -I https://dons-staging.mo5.fr/`
  (après déploiement) : l'en-tête `Content-Security-Policy` contient
  bien les wildcards PayPal, `'unsafe-inline'` et `'unsafe-eval'`.
- Vérification manuelle navigateur (console DevTools) sur staging :
  aucune violation CSP pour le chargement initial, l'ouverture de la
  modale don et l'initialisation du SDK PayPal.

## Risques / rollback

- **Risque principal (accepté)** : autoriser `'unsafe-inline'` et
  `'unsafe-eval'` dans `script-src` réduit fortement la protection XSS
  de la CSP. C'est un compromis inévitable avec la stack actuelle
  (`_hyperscript` + SDK PayPal). L'atténuation à plus long terme est
  documentée dans le JSDoc et fera l'objet d'un ticket séparé.
- **Rollback** : `git revert` du commit + redéploiement. Aucun impact
  base de données / routes serveur.

## Décisions

- **Wildcards `https://*.paypal.com` / `https://*.paypalobjects.com`**
  plutôt qu'une liste explicite de sous-domaines : le SDK PayPal charge
  dynamiquement des ressources depuis `www.paypal.com`,
  `sandbox.paypal.com`, `*.paypalobjects.com`, etc. Une liste serait
  fragile et source de régressions silencieuses à chaque changement
  côté PayPal.
- **`'unsafe-inline'` accepté pour le bootstrap SDK** plutôt qu'un
  hash SHA-256 : le hash change à chaque release du SDK PayPal
  (cf. erreur console : `sha256-xiaD0XEAtT7Da8WrcQjkQbhOx0ZR6pjMSRZNsqZuFdA=`),
  ce qui obligerait à redéployer l'app à chaque mise à jour du SDK.
  Une stratégie nonce-based est la bonne piste à terme mais sort du
  périmètre.
- **Pas de ticket de durcissement inclus** : pour ne pas mélanger les
  sujets. Le prochain ticket naturel serait « durcir la CSP via
  nonces par requête + suppression de `_hyperscript` ».
