const { knex } = require("./db.service.js")
const { v4: uuidv4 } = require("uuid")

const tableName = "users"

async function saveUser(user) {
  const id = uuidv4()
  try {
    await knex(tableName).insert(
      {
        id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        address: user.address,
        postal_code: user.postal_code,
        city: user.city,
        phone: user.phone,
      },
      "id"
    )
    return id
  } catch (err) {
    console.error("Erreur lors de l’enregistrement de l’utilisateur:", err)
    throw err
  }
}

async function getUserById(id) {
  try {
    return await knex(tableName).where({ id }).first()
  } catch (err) {
    console.error("Erreur lors de la récupération de l’utilisateur:", err)
    throw err
  }
}

async function getUserByEmail(email) {
  try {
    return await knex(tableName).where({ email }).first()
  } catch (err) {
    console.error("Erreur lors de la récupération de l’utilisateur:", err)
    return null
  }
}

module.exports = {
  saveUser,
  getUserById,
  getUserByEmail,
}
