import { translate } from "./translate"

const key = "mo5_don_lang"

/**
 * @description Get the browser language and save it in localStorage
 * @returns {Object} { lang: string, langShort: string, langLong: string }
 */
export function getLang() {
  const ls = localStorage.getItem(key)

  if (ls) return ls
  const lang = navigator.language || navigator.userLanguage
  const langShort = lang.split("-")[0]
  localStorage.setItem(key, langShort)
  return langShort
}

/**
 *
 * @description Get the saved language in localStorage
 * @param {String} lang  fr|en - The language to save
 * @returns {String} The saved language
 */
export function saveLang(lang) {
  localStorage.setItem(key, lang)
  translate()
  return lang
}
