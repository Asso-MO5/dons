# language: fr
@money-donation @prod
Fonctionnalité: Don financier sur une page dédiée

  Scénario: Accéder au don financier depuis l'accueil
    Étant donné qu'un visiteur consulte la page d'accueil
    Quand il sélectionne « Je fais un don » dans la section don financier
    Alors il arrive sur la page de don financier
    Et le formulaire PayPal est affiché sans modale

  Scénario: Retourner à l'accueil depuis le don financier
    Étant donné qu'un visiteur consulte la page de don financier
    Quand il sélectionne « Retour à la page de don »
    Alors il arrive sur la page d'accueil

  Scénario: Accéder au don matériel depuis l'accueil
    Étant donné qu'un visiteur consulte la page d'accueil
    Quand il sélectionne « Je fais un don » dans la section don matériel
    Alors il arrive sur la page de don matériel
    Et le formulaire de don matériel est affiché sans modale

  Scénario: Accéder à l'adhésion depuis l'accueil
    Étant donné qu'un visiteur consulte la page d'accueil
    Quand il sélectionne « J'adhère »
    Alors il arrive sur la page d'adhésion existante
    Et un bouton permet de retourner à la page d'accueil
