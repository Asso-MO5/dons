export const BUTTON_TYPES = {
  BLUE: "blue",
  VALID: "valid",
  DANGER: "danger",
}

/**
 *
 * @param { String } txt
 * @param { String } type - use BUTTON_TYPES
 * @param { String } onClick - function _hyperscript
 * @param { String } id - id, optional
 * @returns { HTMLButtonElement } - button element
 */
export function createButton(txt, type, id, onClick) {
  const button = document.createElement("button")
  button.innerText = txt

  if (type === BUTTON_TYPES.BLUE) {
    button.classList.add("bg-sl-secondary")
  } else if (type === BUTTON_TYPES.VALID) {
    button.classList.add("bg-sl-valid")
  } else if (type === BUTTON_TYPES.DANGER) {
    button.classList.add("bg-sl-status-error")
  } else {
    button.classList.add("bg-sl-primary")
  }

  button.classList.add("text-white", "py-1", "px-3", "rounded-md")
  if (id) button.id
  if (onClick) button.setAttribute("_", onClick)
  return button
}
