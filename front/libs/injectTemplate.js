import { templates } from "../src/templates"

/**
 * @description Inject a template in the DOM
 * @param {string} name Name of the template to inject, the name must be the same as the id of the template
 * @returns String of the template
 */
export function injectTemplate(name) {
  const el = document.createElement("div")

  if (!templates[name]) {
    throw new Error(`Template ${name} not found`)
  }

  el.innerHTML = templates[name]
  const template = el.querySelector(`#${name}`).content
  const componentInstance = document.importNode(template, true)

  // Créer un conteneur temporaire pour le contenu cloné
  const container = document.createElement("div")
  container.appendChild(componentInstance)

  // Retourner la chaîne HTML
  return container.innerHTML
}
