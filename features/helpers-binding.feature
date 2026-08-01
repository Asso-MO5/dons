# language: fr
@helpers @prod
Fonctionnalité: Mapping des helpers front exposé à _hyperscript

  Contexte:
    Étant donné que les partials HTML utilisent `app.helpers.<nom>` pour appeler
    Et que ces fonctions sont injectées dans `app.helpers` par le routeur
    Quand le bundle front est minifié pour la production

  Scénario: Les helpers déclarés par createPage sont exposés sous leur nom
    Quand on charge la page d'accueil en mode production
    Alors `app.helpers.injectTemplate` est une fonction
    Et `app.helpers.translate` est une fonction
    Et `app.helpers.getLang` est une fonction
    Et `app.helpers.saveLang` est une fonction
    Et `app.helpers.injectFaq` est une fonction

  Scénario: Le bundle prod ne s'appuie pas sur fn.name pour le mapping
    Quand on construit le bundle avec `npm run build`
    Alors le bundle ne contient plus le motif `fn.name` appliqué aux helpers
    Et le bundle contient un mapping statique vers `injectTemplate`

  Scénario: Aucune erreur _hyperscript au chargement de la home
    Quand on charge la page d'accueil en mode production
    Alors aucune erreur `app.helpers.injectTemplate is null` n'apparaît
    Et la modale don matériel s'ouvre depuis le bouton « Je fais un don »
    Et la modale don financier s'ouvre depuis le bouton « Je fais un don »
    Et la modale adhésion s'ouvre depuis le bouton « J'adhère »
    Et le bandeau d'en-tête est inséré en haut de `#page`
