import { template } from "./template"

/**
 * @description Crée une modale
 * @param {String} id - id de la modale
 * @param { HTMLElement | String } content - contenu de la modale
 * @param { HTMLElement | String  } button - bouton de la modale
 */
export function createModal(id, content, button) {
  const modal = template("modal")
  const el = modal.querySelector("[data-type='content']")
  modal.id = `modal-${id}`

  if (button) {
    const buttonEl = modal.querySelector("[data-type='control']")
    if (typeof button === "string") {
      buttonEl.innerHTML = button
    } else {
      buttonEl.innerHTML = ""
      buttonEl.appendChild(button)
    }
  }

  if (typeof content === "string") {
    el.innerHTML = content
  } else {
    el.appendChild(content)
  }

  return modal
}
