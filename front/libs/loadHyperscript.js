/**
 *
 * @description Charge le script Hyperscript si ce n'est pas déjà fait. et garanti que _hyperscript est disponible avant d'exécuter la fonction callback.
 * @returns {Promise<void>}
 */
export function loadHyperscript(callback) {
  const scriptSrc = "https://unpkg.com/hyperscript.org@0.9.12"
  const oldBal = document.querySelector("script[src*='hyperscript.org']")
  if (oldBal) oldBal.remove() // Supprime le script Hyperscript précédent s'il existe.
  const scriptEl = document.createElement("script")
  scriptEl.setAttribute("src", scriptSrc)
  document.head.insertBefore(scriptEl, document.head.firstChild)
  scriptEl.onload = callback // Appel de la fonction callback une fois le script chargé.
}
