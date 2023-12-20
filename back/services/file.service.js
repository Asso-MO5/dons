const { knex } = require("./db.service.js")
const { v4: uuidv4 } = require("uuid")

const tableName = "files"

async function saveFile(file) {
  const id = uuidv4()
  try {
    await knex(tableName).insert({
      id,
      user_id: file.user_id,
      original_name: file.name,
      owner_id: file.owner_id,
      created_at: new Date(),
      updated_at: new Date(),
    })
    return id
  } catch (err) {
    console.error("Erreur lors de l’enregistrement du fichier:", err)
    throw err
  }
}

async function saveFiles(files) {
  try {
    await knex(tableName).insert(files)
    return files.map((file) => file.id)
  } catch (err) {
    console.error("Erreur lors de l’enregistrement des fichiers:", err)
    throw err
  }
}

module.exports = {
  saveFile,
  saveFiles,
}
