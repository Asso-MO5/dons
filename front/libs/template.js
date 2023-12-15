import { injectTemplate } from "./injectTemplate";
import { txtElementToHTML } from "./txtElementToHTML";

/**
 *
 * @param { string } templateId - ID of the template
 * @returns { HTMLElement } - HTML element
 */
export function template(templateId) {
  const htmlString = injectTemplate(templateId);
  return txtElementToHTML(htmlString);
}
