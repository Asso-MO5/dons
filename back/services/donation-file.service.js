const { knex } = require("./db.service.js")

const tableName = "donation_files"

async function saveFilesInDonations(files) {
  try {
    await knex(tableName).insert(files)
    return files.map((file) => file.id)
  } catch (err) {
    console.error("Erreur lors de l’enregistrement du don/donation:", err)
    throw err
  }
}

module.exports = {
  saveFilesInDonations,
}
