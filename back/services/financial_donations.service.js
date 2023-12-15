const { knex } = require("./db.service.js")
const { v4: uuidv4 } = require("uuid")

const tableName = "financial_donations"

async function getLastFinancialDonation() {
  try {
    const lastDonation = await knex(tableName)
      .where({ donation_type: "financial" }) // Assurez-vous de filtrer par le bon type de don, si nécessaire
      .orderBy("created_at", "desc")
      .first()

    return lastDonation
  } catch (err) {
    console.error("Erreur lors de la récupération de la dernière donation financière:", err)
    throw err
  }
}

async function getFinancialDonationsByUser(userId) {
  try {
    const donations = await knex(tableName)
      .where({ user_id: userId, donation_type: "financial" }) // Assurez-vous de filtrer par le bon type de don
      .orderBy("created_at", "desc")

    return donations
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des donations financières pour l'utilisateur:",
      err
    )
    throw err
  }
}

async function saveFinancialDonation(donation) {
  const datePart = new Date().toISOString().split("T")[0] // Format YYYY-MM-DD

  const result = await knex(tableName)
    .whereRaw("DATE(created_at) = ?", [datePart])
    .count({ count: "id" })
  const [{ count: donationsTodayCount }] = result

  const id = uuidv4()
  const sequenceNumber = donationsTodayCount + 1
  const formattedSequence = String(sequenceNumber).padStart(5, "0") // Format avec les zéros non significatifs
  const invoice_id = `${datePart}-${formattedSequence}`

  try {
    await knex(tableName).insert({
      id,
      donation_id: donation.donation_id,
      invoice_id,
      currency_code: donation.currency_code,
      amount: donation.amount,
      source: donation.source,
      transaction_date: donation.transaction_date,
      become_member: donation?.become_member || false,
      created_at: new Date(),
      updated_at: new Date(),
    })

    return {
      id,
      invoice_id,
    }
  } catch (err) {
    console.error("Erreur lors de l’enregistrement de la donation financière:", err)
    throw err
  }
}
module.exports = {
  saveFinancialDonation,
  getLastFinancialDonation,
  getFinancialDonationsByUser,
}
