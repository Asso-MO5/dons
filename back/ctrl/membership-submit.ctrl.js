const { transporter } = require("../services/mail.service")
const { FROM, DONATION_TYPE, BASE_URL, FINANCIAL_DONATION_SOURCE } = require("../utils/constants")
const { saveUser, getUserByEmail, updateUser } = require("../services/user.service")
const { generateCerfa } = require("../utils/generateCerfa")
const { saveFinancialDonation } = require("../services/financial_donations.service")
const { saveDonation } = require("../services/donation.service")
const { saveMembership } = require("../services/membership.service")
const { membershipMail } = require("../utils/membership-mail")
const { adminMembershipMail } = require("../utils/admin-membership-mail")
const path = require("path")

module.exports = async (req, h) => {
  if (!req.payload) return h.response("no payload").code(400)
  const payload = JSON.parse(req.payload)

  const { user, donation } = payload
  const { email, name, lastname, address, postal_code, city, discord_pseudo } = user
  const { create_time, amount, transactionId, currency_code } = donation
  const membershipType = donation?.type === "RENEWAL" ? "RENEWAL" : "NEW"

  const date = new Date(create_time)
  const transactionDate = date.toISOString().slice(0, 10) // YYYY-MM-DD pour la colonne DATE

  // find-or-create user
  const existUser = await getUserByEmail(email)
  const userInfo = {
    email,
    name,
    lastname,
    address,
    postal_code,
    city,
    discord_pseudo: discord_pseudo || null,
  }

  let userId
  if (existUser?.id) {
    userId = existUser.id
    // met à jour le pseudo Discord si fourni
    if (discord_pseudo) {
      await updateUser(userId, { discord_pseudo })
    }
  } else {
    userId = await saveUser(userInfo)
  }

  const donation_id = await saveDonation({
    user_id: userId,
    type: DONATION_TYPE.membership,
    message: "",
  })

  const donationInfo = {
    donation_id,
    currency_code,
    amount: Number(amount),
    source: FINANCIAL_DONATION_SOURCE.paypal,
    transaction_date: transactionDate,
    transaction_id: transactionId,
    payer_email: payload?.donation?.payer_email || null,
    become_member: false,
  }

  const { id: fileId, invoice_id } = await saveFinancialDonation(donationInfo)

  const fileName = fileId + ".pdf"

  await generateCerfa({
    amount,
    invoice_id,
    date,
    fileName,
    name,
    lastname,
    address,
    postal_code,
    city,
  })

  const membership_id = await saveMembership({
    user_id: userId,
    donation_id,
    financial_donation_id: fileId,
    type: membershipType,
    status: "PAID",
  })

  const fileNameForMail = `mo5_recu_fiscal_${invoice_id}.pdf`
  const discordLink = process.env.DISCORD_LINK || ""

  // mail membre
  try {
    await transporter.sendMail({
      from: FROM,
      to: email,
      attachments: [
        {
          filename: fileNameForMail,
          path: path.join(__dirname + "/../files", fileName),
        },
      ],
      subject: `Votre adhésion MO5 est confirmée`,
      ...membershipMail({
        user: userInfo,
        membership: { id: membership_id, type: membershipType },
        discordLink,
      }),
    })
  } catch (err) {
    console.log(err)
    return h.response(err.message).code(500)
  }

  // mail admin
  try {
    await transporter.sendMail({
      from: FROM,
      to: process.env.MAIL_DEST,
      cc: process.env.MAILS_COPY,
      attachments: [
        {
          filename: fileNameForMail,
          path: path.join(__dirname + "/../files", fileName),
        },
      ],
      subject: `ADHESION - ${name} ${lastname}`,
      ...adminMembershipMail({
        user: userInfo,
        membership: { id: membership_id, type: membershipType },
        donation: { ...donationInfo, id: fileId },
      }),
    })
  } catch (err) {
    console.log(err)
    return h.response(err.message).code(500)
  }

  return h
    .response({
      message: "ok",
      payload,
      donation_type: DONATION_TYPE.membership,
      fileId,
      email,
      link: `/api/cerfa/${fileId}/${email}`,
    })
    .code(200)
}
