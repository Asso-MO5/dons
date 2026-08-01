const { knex } = require("./db.service.js")
const { randomUUID: uuidv4 } = require("node:crypto")

const tableName = "memberships"

async function saveMembership(membership) {
  const id = uuidv4()
  try {
    await knex(tableName).insert({
      id,
      user_id: membership.user_id,
      donation_id: membership.donation_id,
      financial_donation_id: membership.financial_donation_id || null,
      type: membership.type,
      status: membership.status || "PAID",
      created_at: new Date(),
      updated_at: new Date(),
    })
    return id
  } catch (err) {
    console.error("Erreur lors de l’enregistrement de l’adhésion:", err)
    throw err
  }
}

async function getMembershipById(id) {
  try {
    return await knex(tableName).where({ id }).first()
  } catch (err) {
    console.error("Erreur lors de la récupération de l’adhésion:", err)
    throw err
  }
}

module.exports = {
  saveMembership,
  getMembershipById,
}
