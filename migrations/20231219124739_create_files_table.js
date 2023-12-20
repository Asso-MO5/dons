/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("files", (table) => {
    table.uuid("id").primary()
    table.string("original_name").notNullable()
    table.uuid("owner_id").references("id").inTable("users") // Assurez-vous que la table users existe
    // Ajoutez d'autres colonnes si nécessaire
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("files")
}
