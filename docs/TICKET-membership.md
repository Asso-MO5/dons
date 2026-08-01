# Ticket — Feature « Devenir membre »

## Contexte

L'association MO5.COM souhaite proposer une adhésion en ligne à 15 €, distincte
des dons financiers ponctuels, afin de pouvoir quantifier et suivre les
adhérents. Le flux de paiement s'inspire du don financier (PayPal + génération
d'un reçu fiscal CERFA), avec des informations supplémentaires (pseudo Discord
facultatif, type d'adhésion).

## Périmètre

- Ajouter une nouvelle table `memberships` stockant les adhésions.
- Ajouter une colonne `discord_pseudo` à la table `users`.
- Ajouter un flux front + back dédié à l'adhésion, calqué sur le don financier
  mais isolé (route, service, contrôleur, mails, page de remerciement).
- Afficher une nouvelle carte « Devenir membre » sur la page d'accueil.
- Permettre une adhésion « nouvelle » ou un « renouvellement » via une case à
  cocher (default : nouvelle).
- Envoyer un mail de confirmation au membre (avec lien Discord en variable
  d'environnement `DISCORD_LINK`).
- Envoyer un mail récapitulatif aux admins (`MAIL_DEST` + `MAILS_COPY`) avec
  toutes les infos saisies.
- Générer un reçu fiscal CERFA (réutilisation de `generateCerfa`) et le lier à
  la fiche d'adhésion.

## Hors périmètre

- Gestion des rôles / authentification sur le site.
- Annulation / remboursement d'adhésion depuis le back-office.
- Relances automatiques d'échéance.

## Critères d'acceptation

1. Un visiteur peut, depuis la page d'accueil, ouvrir un formulaire « Devenir
   membre » via une nouvelle carte dédiée.
2. Le formulaire demande : nom, prénom, adresse, code postal, ville, email,
   pseudo Discord (facultatif) et une case « renouvellement ».
3. Le formulaire redirige vers un paiement PayPal de 15 € (montant fixe).
4. Après paiement, l'utilisateur est créé (s'il n'existe pas déjà) ou mis à
   jour (pseudo Discord) ; une fiche d'adhésion est créée en base.
5. L'utilisateur reçoit un mail de confirmation contenant le lien Discord.
6. Les admins reçoivent un mail récapitulatif avec toutes les informations
   saisies + reçu fiscal en pièce jointe.
7. La page de remerciement affiche un message spécifique aux membres.

## Variables d'environnement

- `DISCORD_LINK` (nouvelle) : URL d'invitation au serveur Discord MO5.

## Scénarios Gherkin

Voir `features/membership.feature`.

## Plan d'implémentation

1. Migrations : `add_discord_pseudo_to_users`, `create_memberships`.
2. Service `membership.service.js` + constantes (`MEMBERSHIP_TYPE`, source
   PayPal).
3. Contrôleur `membership-submit.ctrl.js` + route `POST /api/membership_submit`.
4. Templates mail `membership-mail.js` (membre) et `admin-membership-mail.js`
   (admin).
5. Front : partial `membership.html`, page `thanks-membership.html`, template
   `membership-modal.html`, script `load-membership-modal.js`,
   `submit-membership.js`. Carte ajoutée dans `home.html`.
6. i18n : ajout des clés dans `front/data/translation.js`.
7. Scénarios Gherkin.

## Tests / vérifications

- Pas de suite de tests automatisés en place → vérification par lint manuel,
  démarrage `npm run dev`, scénarios Gherkin rédigés comme spécification.
- Vérifier qu'un utilisateur déjà existant en base (par un don antérieur) est
  réutilisé via `getUserByEmail` (find-or-create).
- Vérifier le renouvellement : la case cochée doit apparaître dans le mail
  admin et la colonne `type` doit valoir `RENEWAL`.

## Risques / rollback

- Migration additive uniquement (nouvelle table, nouvelle colonne nullable) :
  rollback simple via `down`.
- Pas de modification du flux don financier existant : risque faible.
