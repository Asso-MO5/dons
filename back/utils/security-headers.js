/**
 * Builds the security headers attached to every Hapi response.
 *
 * - `X-Content-Type-Options: nosniff` — blocks MIME-type sniffing.
 * - `Referrer-Policy: strict-origin-when-cross-origin` — limits leak of
 *   the full URL to third parties.
 * - `X-Frame-Options: DENY` — anti-clickjacking (belt-and-braces with
 *   `frame-ancestors` in the CSP).
 * - `Permissions-Policy` — disables camera, microphone, geolocation and
 *   payment APIs that the app does not use.
 * - `Strict-Transport-Security` — only in production, instructs browsers
 *   to use HTTPS for the next year.
 *
 * @param {Object} options
 * @param {string} options.env - "production" | "development" | anything else
 * @returns {Array<{ name: string, value: string }>}
 */
function buildSecurityHeaders({ env = "production" } = {}) {
  const headers = [
    { name: "X-Content-Type-Options", value: "nosniff" },
    { name: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { name: "X-Frame-Options", value: "DENY" },
    {
      name: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=()",
    },
  ]

  if (env === "production") {
    headers.push({
      name: "Strict-Transport-Security",
      value: "max-age=31536000; includeSubDomains",
    })
  }

  return headers
}

module.exports = { buildSecurityHeaders }
