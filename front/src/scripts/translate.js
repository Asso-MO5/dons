import { translation } from "../../data/translation"
import { getLang } from "./get-lang"

/**
 * @description Translate the page
 * @returns {void}
 */
export function translate() {
  const lang = getLang()
  const elToTranslate = document.querySelectorAll("[data-trans]")
  const placeholderToTranslate = document.querySelectorAll("[placeholder]")

  elToTranslate.forEach((el) => {
    const key = el.getAttribute("data-trans")
    const trans = translation?.[key]?.[lang] || key
    el.innerHTML = trans
  })

  placeholderToTranslate.forEach((el) => {
    const key = el.getAttribute("placeholder")
    const trans = translation?.[key]?.[lang] || key
    el.setAttribute("placeholder", trans)
  })
}
