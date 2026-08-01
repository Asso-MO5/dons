const { buildCsp } = require("../utils/csp")
const { buildSecurityHeaders } = require("../utils/security-headers")

/**
 * Hapi plugin that injects a Content-Security-Policy and related security
 * headers on every response. The policy is built once at registration
 * time (env is fixed per process) and added to each response in
 * `onPreResponse`.
 */
const securityHeadersPlugin = {
  name: "security-headers",
  version: "1.0.0",
  register: async (server, options = {}) => {
    const env = options.env || process.env.NODE_ENV || "production"
    const csp = buildCsp({ env })
    const headers = buildSecurityHeaders({ env })

    server.ext("onPreResponse", (request, h) => {
      const response = request.response

      // `response.header` exists for both normal responses and Boom error
      // responses; if it is missing we have nothing safe to mutate.
      if (response && typeof response.header === "function") {
        response.header(csp.name, csp.value)
        for (const header of headers) {
          response.header(header.name, header.value)
        }
      }

      return h.continue
    })
  },
}

module.exports = securityHeadersPlugin
