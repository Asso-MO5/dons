import "./_hyperscript.min.js"
/**
 *
 * @description Charge le script Hyperscript si ce n'est pas déjà fait. et garanti que _hyperscript est disponible avant d'exécuter la fonction callback.
 * @returns {Promise<void>}
 */
export function loadHyperscript(callback) {
  callback()
  _hyperscript.processNode(document.querySelector("#app"))
}
