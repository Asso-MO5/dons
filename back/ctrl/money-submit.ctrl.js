const { transporter } = require("../services/mail.service")
const { FROM, DONATION_TYPE, BASE_URL, FINANCIAL_DONATION_SOURCE } = require("../utils/constants")
const { saveUser, getUserByEmail } = require("../services/user.service")
const { generateCerfa } = require("../utils/generateCerfa")
const { saveFinancialDonation } = require("../services/financial_donations.service")
const { saveDonation } = require("../services/donation.service")
const { donationFinancialMail } = require("../utils/donation-financial-mail")
const { adminDonationFinancialMail } = require("../utils/admin-donation-financial-mail")

module.exports = async (req, h) => {
  if (!req.payload) return h.response("no payload").code(400)
  const payload = JSON.parse(req.payload)

  const { user, donation } = payload
  const { email, name, lastname, address, postal_code, city } = user
  const { create_time, amount, transactionId, currency_code } = donation

  const date = new Date(create_time)

  //TODO search user by email

  const userInfo = {
    email,
    name,
    lastname,
    address,
    postal_code,
    city,
  }
  const existUser = await getUserByEmail(email)
  const user_id = existUser?.id ? existUser.id : await saveUser(userInfo)

  const donation_id = await saveDonation({
    user_id,
    type: DONATION_TYPE.financial,
    message: "",
  })

  const donationInfo = {
    donation_id,
    currency_code: currency_code,
    amount: Number(amount),
    source: FINANCIAL_DONATION_SOURCE.paypal,
    transaction_date: create_time,
    transaction_id: transactionId,
    currency_code: currency_code,
    become_member: donation?.become_member || false,
  }

  const { id: fileId, invoice_id } = await saveFinancialDonation(donationInfo)

  const fileName = fileId + ".pdf"

  await generateCerfa({
    amount,
    invoice_id,
    date,
    fileName: fileName,
    name,
    lastname,
    address,
    postal_code,
    city,
  })

  try {
    await transporter.sendMail({
      from: FROM,
      to: process.env.MAIL_DEST,
      bbc: `${process.env.MAILS_COPY}}`,
      subject: `DONS - ${name} ${lastname}`,
      ...adminDonationFinancialMail({
        donation: { ...donationInfo, id: fileId },
        user: userInfo,
      }),
    })
  } catch (err) {
    console.log(err)
    return h.response(err.message).code(500)
  }

  try {
    await transporter.sendMail({
      from: FROM,
      to: email,
      cc: `${process.env.MAIL_DEST}}`,
      subject: `VOTRE DONS POUR MO5.COM`,
      ...donationFinancialMail({
        donation: { ...donationInfo, id: fileId, link: `${BASE_URL}/cerfa/${fileId}/${email}` },
        user: userInfo,
      }),
    })
  } catch (err) {
    console.log(err)
    return h.response(err.message).code(500)
  }

  // Le mail pour le donateur

  return h
    .response({
      message: "ok",
      payload,
      donation_type: DONATION_TYPE.financial,
      fileId,
      email,
      link: `${BASE_URL}/cerfa/${fileId}/${email}`,
    })
    .code(200)
}
