const FROM = `💾🖱️🎮 ASSOCIATION MO5 | DONS <${process.env.MAIL_ADDRESS}>`

const DONATION_TYPE = {
  material: "MATERIAL",
  financial: "FINANCIAL",
}

const FINANCIAL_DONATION_SOURCE = {
  paypal: "PAYPAL",
  tipeee: "TIPEEE",
  bank_transfer: "BANK_TRANSFER",
}

module.exports = {
  FROM,
  DONATION_TYPE,
  FINANCIAL_DONATION_SOURCE,
}
