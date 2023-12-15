/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary()
    table.string("email").unique().notNullable()
    table.string("name").notNullable()
    table.string("lastname").notNullable()
    table.string("address")
    table.string("postal_code")
    table.string("city")
    table.string("phone")
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users")
}
