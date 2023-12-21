const { knex } = require("../services/db.service")

const path = require("path")
const { getUserByEmail } = require("../services/user.service")
const { getFinancialDonationsById } = require("../services/financial_donations.service")
const { getdonationByUserIdAndId } = require("../services/donation.service")
const { generateCerfa } = require("../utils/generateCerfa")

module.exports = async (req, h) => {
  const { id, email } = req.params

  const user = await getUserByEmail(email)
  const donation = await getFinancialDonationsById(id)
  console.log("donation", user.id, donation.donation_id)
  const isGoodUser = await getdonationByUserIdAndId(user.id, donation.donation_id)

  if (isGoodUser === undefined) {
    return h.response("Vous n'avez pas accès à ce document").code(403)
  }
  const fileName = id + ".pdf"

  await generateCerfa({
    ...user,
    ...donation,
    fileName,
    date: donation.created_at,
  })

  const pdfPath = path.join(__dirname + "/../files", fileName)
  return h.file(pdfPath)
}
