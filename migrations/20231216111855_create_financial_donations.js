/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("financial_donations", (table) => {
    table.uuid("id").primary()
    table.uuid("donation_id").references("id").inTable("donations").unique()
    table.string("invoice_id").unique()
    table.enu("source", ["PAYPAL", "TIPEEE", "BANK_TRANSFER", "OTHER"])
    table.string("transaction_id").unique()
    table.string("currency_code")
    table.decimal("amount", 10, 2)
    table.date("transaction_date")
    table.boolean("become_member").defaultTo(false)
    table.timestamps(true, true)
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("financial_donations")
}
