import { loadHyperscript } from "./loadHyperscript"
import { parseRoute } from "./parseRoute"

import pages from "../src/pages"

/**
 * @description Handles routing logic.
 * @param {Event} e - The event object.
 */
export function router(e, href) {
  if (e) e.preventDefault() // Empêche le comportement par défaut du lien.

  // _hyperscript dois être disponible avant l'exécution des templates.
  loadHyperscript(() => {
    const { template } = parseRoute(href)
    const page = pages[template]

    const app = document.querySelector("#app")
    const pageObj = page()

    if (!pageObj) return (app.innerHTML = "404")

    const { content, helpers } = pageObj

    // Ajoute les fonctions d'assistance à l'objet _hyperscript.
    app.helpers = helpers
    app.innerHTML = content
  })
}
