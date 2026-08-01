/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable("memberships", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id").references("id").inTable("users").notNullable();
    table.uuid("donation_id").references("id").inTable("donations").notNullable();
    table.uuid("financial_donation_id").references("id").inTable("financial_donations").nullable();
    table.enu("type", ["NEW", "RENEWAL"]).notNullable().defaultTo("NEW");
    table.enu("status", ["PENDING", "PAID", "CANCELLED"]).notNullable().defaultTo("PENDING");
    table.timestamps(true, true);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("memberships");
