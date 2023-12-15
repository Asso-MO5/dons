import { ROUTE_PREFIX } from "./constants"

/**
 * @description Creates a link element.
 * @param {string} href - The link's href attribute.
 * @param {string} textContent - The link's text content.
 * @param {string[]} classes - An array of classes to add to the link.
 * @returns {HTMLAnchorElement} - A link element.
 */
export function createLink(href, textContent, classes) {
  const link = document.createElement("a")
  link.href = `/${ROUTE_PREFIX}${href}`
  if (classes) link.classList.add(...classes)
  link.innerText = textContent.trim()
  return link
}
