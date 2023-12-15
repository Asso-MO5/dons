import { template } from "../../libs/template"
import { translate } from "./translate"

export function toast(msg, type) {
  const toast = template(`toast${type.charAt(0).toUpperCase()}${type.slice(1)}`)
  const content = toast.querySelector("[data-type='content']")
  const close = toast.querySelector("[data-type='close']")
  close.addEventListener("click", () => {
    toast.remove()
  })
  content.setAttribute("data-trans", msg)
  const container = document.querySelector("#toast-container")
  container.appendChild(toast)
  translate()
  setTimeout(() => {
    toast.remove()
  }, 6000)
}
