# Ticket — Sécurité « Content-Security-Policy »

## Contexte

L'application `dons` de l'association MO5.COM sert une page HTML unique,
hébergée derrière Hapi, qui charge :

- ses propres assets (JS, CSS, fonts, images, manifest, service worker) ;
- le SDK PayPal (`@paypal/paypal-js`) pour les dons financiers et les
  adhésions, qui injecte un `<script>` externe et un bouton dans une iframe ;
- aucune autre dépendance externe (les services tiers type BAN sont appelés
  côté serveur).

Aujourd'hui, aucune `Content-Security-Policy` n'est servie. Le navigateur
peut exécuter n'importe quel script, charger n'importe quelle ressource ou
être embarqué dans n'importe quel iframe. C'est un risque XSS / clickjacking
évident pour une page qui gère des paiements et fournit des reçus fiscaux.

## Périmètre

- Définir une politique CSP stricte pour l'environnement de production.
- Définir une politique CSP assouplie pour le développement local (Vite/HMR),
  afin de ne pas casser le `npm run dev`.
- Servir la CSP sur **toutes** les réponses Hapi (HTML, JSON, PDF, assets,
  routes API).
- En profiter pour ajouter les en-têtes de sécurité « classiques » qui vont
  avec :
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-Frame-Options: DENY` (anti-clickjacking, renforcé par `frame-ancestors`)
  - `Permissions-Policy: ...` (couper les API sensibles non utilisées)
  - `Strict-Transport-Security` uniquement en production
- Documenter la politique dans le ticket pour qu'elle soit revue.

## Hors périmètre

- Modification du flux PayPal ou du code applicatif.
- Mise en place d'un pipeline CI / scans automatisés.
- Signature SRI des scripts (à étudier dans un ticket séparé si besoin).
- Nonce CSP par requête (l'application actuelle n'a pas de scripts inline
  applicatifs ; un nonce compliquerait l'hébergement pour un gain limité).

## Critères d'acceptation

1. Chaque réponse HTTP renvoyée par Hapi contient l'en-tête
   `Content-Security-Policy` avec une politique explicite et lisible.
2. En production, la CSP autorise :
   - `default-src 'self'` ;
   - `script-src` : `'self'`, `https://www.paypal.com`, `https://www.paypalobjects.com` ;
   - `style-src` : `'self'`, `'unsafe-inline'` (Tailwind v4 + animations) ;
   - `img-src` : `'self'`, `data:`, `https://www.paypal.com` ;
   - `font-src` : `'self'`, `data:` ;
   - `connect-src` : `'self'`, `https://www.paypal.com` ;
   - `frame-src` : `https://www.paypal.com` ;
   - `frame-ancestors 'none'` ;
   - `object-src 'none'` ;
   - `base-uri 'self'` ;
   - `form-action 'self'` ;
   - `manifest-src 'self'`.
3. En développement, la CSP autorise en plus `unsafe-eval` et
   `ws://localhost:* http://localhost:*` pour le HMR Vite, et active les
   rapports via `report-uri` (console).
4. Les autres en-têtes de sécurité sont présents :
   `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`,
   `X-Frame-Options: DENY`, `Permissions-Policy` (camera, microphone, geolocation,
   payment désactivés). `Strict-Transport-Security` en production uniquement.
5. Le bouton PayPal reste fonctionnel : la CSP couvre les domaines
   `paypal.com` et `paypalobjects.com` nécessaires au SDK et aux iframes.
6. La page se charge toujours, le `_hyperscript` continue de fonctionner,
   `localStorage` (préférence de langue) continue de fonctionner — donc
   `script-src` ne doit pas casser l'exécution côté client.

## Variables d'environnement

Aucune nouvelle variable. Le mode dev est détecté via `NODE_ENV`.

## Scénarios Gherkin

Voir `features/csp.feature`.

## Plan d'implémentation

1. Module `back/utils/csp.js` exposant `buildCsp({ env })` qui retourne un
   objet `{ name, value }` prêt à être injecté comme en-tête.
2. Module `back/utils/security-headers.js` exposant `buildSecurityHeaders({ env })`.
3. Plugin Hapi dans `index.js` (`onPreResponse`) qui ajoute la CSP et les
   en-têtes de sécurité à toutes les réponses.
4. Scénarios Gherkin.
5. Script Node de validation `back/utils/csp.test.js` (test pur, sans
   framework) exécuté via `node --test`.

## Tests / vérifications

- `node --test back/utils/csp.test.js` couvre :
  - la politique prod contient toutes les directives attendues ;
  - la politique dev autorise `unsafe-eval` et les WebSocket localhost ;
  - les directives `paypal.com` et `paypalobjects.com` sont présentes.
- Démarrage `npm run dev` + ouverture de la page : pas d'erreur CSP visible
  dans la console pour le flux principal (home, ouverture modale don,
  ouverture modale adhésion).
- Le bouton PayPal reste fonctionnel sur l'environnement de sandbox du
  PO (vérification manuelle).

## Risques / rollback

- Rollback : retirer le plugin Hapi dans `index.js` et supprimer les
  modules `back/utils/csp.js` / `security-headers.js`.
- Risque principal : un script tiers ajouté plus tard ne sera pas autorisé
  par défaut. La CSP est volontairement stricte : tout ajout de dépendance
  externe devra être documenté dans le ticket lié.
- Risque secondaire : `_hyperscript` injecte des écouteurs via un attribut
  `_="..."` (et non un `onclick="..."`), ce qui n'est pas concerné par
  `script-src`. À confirmer au premier déploiement.

## Décisions

- Pas de nonce CSP : l'application n'utilise pas de `<script>` inline
  applicatif, donc un nonce serait du surcoût sans bénéfice immédiat.
- `style-src 'unsafe-inline'` accepté : Tailwind v4, animations et
 一些小变动 peuvent injecter des styles inline. À durcir dans un ticket
  ultérieur si possible.
- `connect-src` : on limite à `self` + PayPal ; le front ne parle qu'à
  notre API et au SDK PayPal.
- `frame-src` est strictement limité à PayPal : aucun autre iframe tiers
  n'est utilisé.
