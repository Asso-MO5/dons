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

const BASE_URL =
  process.env.NODE_ENV === "production" ? process.env.URL_APP : "http://localhost:3000"

module.exports = {
  FROM,
  DONATION_TYPE,
  BASE_URL,
  FINANCIAL_DONATION_SOURCE,
}
