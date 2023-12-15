import pages from "../src/pages"
import { ROUTE_PREFIX } from "../src/utils/constants"

export function parseRoute(href) {
  const route = href || window.location.hash.replace(ROUTE_PREFIX, "") || window.location.pathname
  const routeParts = route.split("/").splice(1)
  const routeKeys = Object.keys(pages)
  const params = {}

  const template = routeKeys.reduce((acc, route) => {
    const parts = route.split("/")

    if (parts.length !== routeParts.length) return acc

    parts.forEach((part, i) => {
      if (part.startsWith(":")) {
        params[part.substring(1)] = routeParts[i]
      } else if (part === routeParts[i]) {
        acc = route
      }
    })
    return acc
  }, "home")

  return { params, template, route }
}
