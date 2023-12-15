/**
 * @description Crée une structure de page avec un template et des helpers.
 * @param {string} content - Le contenu HTML du template de la page.
 * @param {...Function} helpers - Les fonctions d'assistance.
 * @returns {object} Un objet contenant le contenu et les helpers de la page.
 */
export function createPage(content, ...helpers) {
  // Crée un objet helpers avec les noms de fonction comme clés
  const helpersObj = Object.assign({}, ...helpers.map((fn) => ({ [fn.name]: fn })))
  return { content, helpers: helpersObj }
}
