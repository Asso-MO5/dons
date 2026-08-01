/**
 * @description Attend que la base MySQL soit joignable, exécute les migrations
 * Knex en mode `production`, puis quitte. Utilisé par l'entrypoint de
 * l'image Docker pour garantir que le schéma est à jour avant de lancer
 * Hapi.
 *
 * - Si la DB n'est pas accessible après `MAX_TRIES` (défaut 30), on sort
 *   avec un message clair et un code non-zéro.
 * - Si une variable d'environnement manque, on sort avec un message
 *   explicite (pas de crash silencieux).
 * - Le pool MySQL est fermé avant la sortie pour ne pas laisser de
 *   connexion pendante.
 */
const path = require("path")
const mysql = require("mysql2/promise")

const MAX_TRIES = 30
const RETRY_DELAY_MS = 2000

const required = ["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME_PROD"]
const missing = required.filter((k) => !process.env[k])
if (missing.length) {
  console.error(
    `[migrate] variables d'environnement manquantes: ${missing.join(", ")}. Abandon.`
  )
  process.exit(1)
}

async function waitForDb() {
  for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
    try {
      const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_PROD,
        connectTimeout: 5000,
      })
      await conn.end()
      console.log(`[migrate] base MySQL joignable (tentative ${attempt}).`)
      return
    } catch (err) {
      const msg = (err && err.code) || (err && err.message) || String(err)
      console.log(`[migrate] DB non joignable (tentative ${attempt}/${MAX_TRIES}): ${msg}`)
      if (attempt === MAX_TRIES) {
        throw new Error(`impossible de joindre la DB après ${MAX_TRIES} tentatives`)
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
    }
  }
}

async function runMigrations() {
  process.env.NODE_ENV = "production"
  const knex = require("knex")(
    require(path.join(__dirname, "..", "..", "knexfile.js")).production
  )
  try {
    const [batch, migrations] = await knex.migrate.latest()
    if (migrations.length === 0) {
      console.log("[migrate] déjà à jour, rien à exécuter.")
    } else {
      console.log(
        `[migrate] batch ${batch} appliqué (${migrations.length} migration(s)): ${migrations.join(", ")}`
      )
    }
  } finally {
    await knex.destroy()
  }
}

; (async () => {
  try {
    await waitForDb()
    await runMigrations()
    process.exit(0)
  } catch (err) {
    console.error(`[migrate] échec: ${err && err.message ? err.message : err}`)
    process.exit(1)
  }
})()
