# language: fr
Fonctionnalité: Servir une Content-Security-Policy

  Scénario: La réponse HTTP expose un en-tête CSP en production
    Étant donné un serveur démarré avec NODE_ENV=production
    Quand une requête GET est envoyée sur n'importe quelle route
    Alors la réponse contient l'en-tête "Content-Security-Policy"
    Et la directive "default-src" vaut "'self'"
    Et la directive "object-src" vaut "'none'"
    Et la directive "frame-ancestors" vaut "'none'"
    Et la directive "base-uri" vaut "'self'"
    Et la directive "form-action" vaut "'self'"

  Scénario: La CSP de production autorise le SDK PayPal
    Étant donné un serveur démarré avec NODE_ENV=production
    Quand une requête GET est envoyée sur la page d'accueil
    Alors la directive "script-src" contient "https://www.paypal.com"
    Et la directive "script-src" contient "https://www.paypalobjects.com"
    Et la directive "frame-src" contient "https://www.paypal.com"
    Et la directive "connect-src" contient "https://www.paypal.com"
    Et la directive "img-src" contient "https://www.paypal.com"

  Scénario: La CSP de production autorise le script d'analytics mo5.fr
    Étant donné un serveur démarré avec NODE_ENV=production
    Quand une requête GET est envoyée sur la page d'accueil
    Alors la directive "script-src" contient "https://analytics.mo5.fr"
    Et la directive "connect-src" contient "https://analytics.mo5.fr"
    Et la directive "img-src" contient "https://analytics.mo5.fr"

  Scénario: La CSP de production n'autorise pas unsafe-inline côté script
    Étant donné un serveur démarré avec NODE_ENV=production
    Quand une requête GET est envoyée sur la page d'accueil
    Alors la directive "script-src" ne contient pas "'unsafe-inline'"
    Et la directive "script-src" ne contient pas "'unsafe-eval'"

  Scénario: La CSP de développement autorise le HMR Vite
    Étant donné un serveur démarré avec NODE_ENV=development
    Quand une requête GET est envoyée sur la page d'accueil
    Alors la directive "script-src" contient "'unsafe-eval'"
    Et la directive "connect-src" contient "ws://localhost:*"
    Et la directive "connect-src" contient "http://localhost:*"

  Scénario: Les en-têtes de sécurité complémentaires sont présents
    Étant donné un serveur démarré
    Quand une requête GET est envoyée sur la page d'accueil
    Alors la réponse contient l'en-tête "X-Content-Type-Options" valant "nosniff"
    Et la réponse contient l'en-tête "Referrer-Policy" valant "strict-origin-when-cross-origin"
    Et la réponse contient l'en-tête "X-Frame-Options" valant "DENY"
    Et la réponse contient l'en-tête "Permissions-Policy"

  Scénario: HSTS n'est envoyé qu'en production
    Étant donné un serveur démarré avec NODE_ENV=development
    Quand une requête GET est envoyée sur la page d'accueil
    Alors la réponse ne contient pas l'en-tête "Strict-Transport-Security"
    Étant donné un serveur démarré avec NODE_ENV=production
    Quand une requête GET est envoyée sur la page d'accueil
    Alors la réponse contient l'en-tête "Strict-Transport-Security"
