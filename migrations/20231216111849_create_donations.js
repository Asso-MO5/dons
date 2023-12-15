/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("donations", (table) => {
    table.uuid("id").primary()
    table.uuid("user_id").references("id").inTable("users")
    table.text("message")
    table.enu("donation_type", ["MATERIAL", "FINANCIAL"])
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("donations")
}
