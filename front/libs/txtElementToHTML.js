/**
 * @description Convertit une chaîne de caractères en élément HTML.
 * @param {string} txtElement - Le contenu HTML à convertir en élément HTML.
 * @returns {HTMLElement} - Un élément HTML.
 */
export function txtElementToHTML(txtElement) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(txtElement, "text/html");
  return doc.body.firstChild;
}
