const FROM = `💾🖱️🎮 ASSOCIATION MO5 | DONS <${process.env.MAIL_ADDRESS}>`

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
