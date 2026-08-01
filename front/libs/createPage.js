/**
 * @description Crée une structure de page avec un template et des helpers.
 * Le mapping des helpers est explicite (objet `{ nomFonction: fn }`) afin
 * d'être robuste à la minification : `fn.name` n'est pas fiable car le
 * bundler (Vite 8 / rolldown) minifie les identifiants et ignore
 * `esbuild.keepNames`.
 * @param {string} content - Le contenu HTML du template de la page.
 * @param {Record<string, Function>} helpers - Les fonctions d'assistance,
 *   indexées par le nom utilisé dans les attributs `_="..."` de _hyperscript.
 * @returns {object} Un objet contenant le contenu et les helpers de la page.
 */
export function createPage(content, helpers = {}) {
  return { content, helpers }
}
