import { ROUTE_PREFIX } from "../src/utils/constants"

/**
 *
 * @param {String} path - path to navigate
 * @returns void - navigate to path
 */
export function navigate(path) {
  const link = document.createElement("a")
  const origin = window.location.origin
  link.href = `${origin.endsWith("/") ? origin : origin + "/"}${ROUTE_PREFIX}${path}`
  link.click()
}
