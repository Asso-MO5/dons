const { knex } = require("./db.service.js")
const { v4: uuidv4 } = require("uuid")

const tableName = "donations"

async function saveDonation(donation) {
  const id = uuidv4()
  try {
    await knex(tableName).insert(
      {
        id,
        user_id: donation.user_id,
        donation_type: donation.type,
        message: donation.message,
        created_at: new Date(),
        updated_at: new Date(),
      },
      "id"
    )
    return id
  } catch (err) {
    console.error("Erreur lors de l’enregistrement de l’utilisateur:", err)
    throw err
  }
}

module.exports = {
  saveDonation,
}
