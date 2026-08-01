# Spécification du déploiement Docker / CapRover.
# Hors-ligne : ces scénarios servent de spécification. La validation
# effective passe par `docker build` + `docker run` + smoke test HTTP
# (cf. section "Tests / vérifications" du ticket).
# language: fr
Fonctionnalité: Déploiement Docker sur CapRover

  Contexte:
    Étant donné que l'application est packagée dans une image Docker multi-stage
    Et que cette image est déployée derrière CapRover

  Scénario: L'image démarre et le healthcheck répond en HTTP
    Quand on lance le conteneur
    Et on attend 15 secondes
    Alors le healthcheck répond 200 sur http://localhost:3000/favicon.ico
    Et l'application Hapi est exposée sur le port 3000

  Scénario: L'image s'exécute en non-root
    Quand on lance le conteneur
    Alors la commande `whoami` dans le conteneur renvoie "node"

  Scénario: Les en-têtes de sécurité sont présents
    Quand on interroge http://localhost:3000/
    Alors la réponse contient l'en-tête "Content-Security-Policy"
    Et la réponse contient l'en-tête "X-Content-Type-Options: nosniff"
    Et la réponse contient l'en-tête "X-Frame-Options: DENY"
    Et la réponse contient l'en-tête "Referrer-Policy: strict-origin-when-cross-origin"
    Et la réponse contient l'en-tête "Strict-Transport-Security"

  Scénario: L'application sert le bundle front
    Quand on interroge http://localhost:3000/
    Alors la réponse contient "MO5 | DONS"
    Et un asset /assets/<file> du bundle Vite est servi avec un code 200

  Scénario: L'application sert les assets du dossier back/public
    Quand on interroge http://localhost:3000/public/logo.svg
    Alors la réponse est 200 et le contenu est un SVG

  Scénario: Les fichiers CERFA persistent au-delà d'un redémarrage
    Quand un CERFA est généré dans /app/back/files
    Et le conteneur est ré-démarré
    Alors le fichier CERFA est toujours présent

  Scénario: Migrations idempotentes au démarrage
    Quand le conteneur démarre une première fois
    Et on attend que la DB soit prête
    Alors les migrations Knex sont appliquées
    Et le démarrage suivant n'applique aucune migration supplémentaire

  Scénario: Échec explicite sans DB
    Quand le conteneur démarre sans DB joignable
    Alors le démarrage échoue avec un message "DB non joignable"
    Et le code de sortie est non nul

  Scénario: Les variables VITE_* sont baked-in au build
    Quand on build l'image avec --build-arg VITE_PAYPAL_API_KEY=test
    Alors le bundle front contient la chaîne "test"
    Et la variable n'est pas lue au runtime

  Scénario: BASE_URL en prod construit les liens CERFA des mails
    Étant donné que BASE_URL=https://dons.mo5.com est défini
    Quand un don financier est soumis
    Alors le mail donateur contient "https://dons.mo5.com/cerfa/..." et pas "undefined"

  Scénario: captain-definition valide pour CapRover
    Étant donné le fichier captain-definition à la racine
    Alors il référence "./Dockerfile" avec schemaVersion 2
    Et CapRover accepte le déploiement
