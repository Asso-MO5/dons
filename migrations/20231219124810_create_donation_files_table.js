/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("donation_files", (table) => {
    table.uuid("donation_id").references("id").inTable("donations")
    table.uuid("file_id").references("id").inTable("files")
    // Ajoutez une clé primaire composite si nécessaire
    // table.primary(['donation_id', 'file_id']);
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("donation_files")
}
