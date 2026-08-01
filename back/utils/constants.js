const FROM = `💾🖱️🎮 ASSOCIATION MO5 | DONS <${process.env.MAIL_ADDRESS}>`

// URL publique utilisée pour générer les liens absolus dans les mails
// (reçus fiscaux). Lue depuis l'env au démarrage (CapRover / Docker).
// À vide, les liens seront relatifs et donc inutilisables depuis le
// client mail du destinataire.
const BASE_URL = process.env.BASE_URL || ""

if (process.env.NODE_ENV === "production" && !BASE_URL) {
  console.warn(
    "[warn] BASE_URL n'est pas défini en production: les liens CERFA dans les mails seront relativisés."
  )
}

const DONATION_TYPE = {
  material: "MATERIAL",
  financial: "FINANCIAL",
  membership: "MEMBERSHIP",
}

const FINANCIAL_DONATION_SOURCE = {
  paypal: "PAYPAL",
  tipeee: "TIPEEE",
  bank_transfer: "BANK_TRANSFER",
}

const MEMBERSHIP_TYPE = {
  new: "NEW",
  renewal: "RENEWAL",
}

const MEMBERSHIP_AMOUNT_EUR = 15

module.exports = {
  FROM,
  DONATION_TYPE,
  FINANCIAL_DONATION_SOURCE,
  MEMBERSHIP_TYPE,
  MEMBERSHIP_AMOUNT_EUR,
}
