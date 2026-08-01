/**
 * Ajoute la valeur `MEMBERSHIP` à l'ENUM `donations.donation_type`.
 *
 * Contexte : la feature "Devenir membre" (ticket TICKET-membership.md) introduit
 * un troisième type de don côté code (`DONATION_TYPE.membership = "MEMBERSHIP"`
 * dans `back/utils/constants.js`) que le contrôleur `membership-submit.ctrl.js`
 * persiste via `saveDonation({ type: ... })`. La migration d'origine
 * `20231216111849_create_donations.js` n'ayant déclaré que `MATERIAL` et
 * `FINANCIAL`, MySQL rejette l'insertion en prod avec :
 *   `Data truncated for column 'donation_type' at row 1` (errno 1265).
 *
 * MySQL ne supporte pas `ALTER TYPE ... ADD VALUE` (extension PostgreSQL) ni
 * `IF NOT EXISTS` sur `MODIFY COLUMN`, mais redéfinir l'ENUM par `MODIFY` est
 * idempotent côté définition et n'altère pas les lignes existantes.
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.raw(
    "ALTER TABLE `donations` MODIFY `donation_type` ENUM('MATERIAL', 'FINANCIAL', 'MEMBERSHIP') NOT NULL",
  );

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  // ATTENTION : le `down` échouera si des lignes `donation_type = 'MEMBERSHIP'`
  // existent encore, MySQL refusant de rétrécir l'ENUM. À n'utiliser qu'après
  // purge / migration de ces lignes.
  return knex.raw(
    "ALTER TABLE `donations` MODIFY `donation_type` ENUM('MATERIAL', 'FINANCIAL') NOT NULL",
  );
};
