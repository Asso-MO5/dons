const { knex } = require("./db.service.js")
const { v4: uuidv4 } = require("uuid")

const tableName = "donations"

async function saveDonation(donation) {
  const id = uuidv4()
  try {
    await knex(tableName).insert({
      id,
      user_id: donation.user_id,
      donation_type: donation.type,
      message: donation.message,
      created_at: new Date(),
      updated_at: new Date(),
    })
    return id
  } catch (err) {
    console.error("Erreur lors de l’enregistrement du don:", err)
    throw err
  }
}

async function getdonationByUserIdAndId(user_id, id) {
  try {
    const donations = await knex(tableName).where({ id, user_id }).first()

    return donations
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des donations financières pour l'utilisateur:",
      err
    )
    throw err
  }
}

module.exports = {
  saveDonation,
  getdonationByUserIdAndId,
}
