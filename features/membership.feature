# language: fr
@membership @prod
Fonctionnalité: Adhésion en ligne « Devenir membre »

  Contexte:
    Étant donné une association MO5 qui propose une adhésion à 15 € via PayPal
    Et que la table `donations` accepte les types MATERIAL, FINANCIAL, MEMBERSHIP
    Et que la table `memberships` stocke les fiches d'adhésion (type NEW/RENEWAL, statut PENDING/PAID/CANCELLED)

  Scénario: Inscription d'une nouvelle adhésion
    Quand un visiteur soumet le formulaire « Devenir membre » avec un email inconnu
    Et valide le paiement PayPal de 15 €
    Alors une fiche `memberships` est créée avec `type = NEW` et `status = PAID`
    Et une ligne `donations` est créée avec `donation_type = MEMBERSHIP`
    Et un reçu fiscal CERFA est généré et joint au mail admin
    Et l'utilisateur reçoit un mail de confirmation contenant le lien Discord

  Scénario: Renouvellement d'une adhésion existante
    Quand un visiteur coche la case « Renouvellement » avant de soumettre le formulaire
    Et valide le paiement PayPal de 15 €
    Alors la fiche `memberships` créée a `type = RENEWAL`
    Et le mail admin affiche le libellé « Renouvellement »

  Scénario: Adhésion d'un utilisateur déjà connu (par un don antérieur)
    Quand un visiteur soumet le formulaire « Devenir membre » avec un email déjà présent en base
    Alors aucun doublon d'utilisateur n'est créé
    Et le champ `discord_pseudo` est mis à jour s'il a été saisi
    Et la fiche d'adhésion est rattachée à l'utilisateur existant

  Scénario: L'ENUM donations.donation_type accepte MEMBERSHIP
    Quand on tente d'insérer une donation avec `donation_type = 'MEMBERSHIP'`
    Alors MySQL n'échoue plus avec `Data truncated for column 'donation_type'`
    Et la ligne est bien persistée

  Scénario: Le schéma interdit les valeurs hors enum
    Quand on tente d'insérer une donation avec `donation_type = 'UNKNOWN'`
    Alors MySQL rejette l'insertion avec une erreur de troncature
