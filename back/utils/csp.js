/**
 * Builds the Content-Security-Policy header value.
 *
 * Production policy is intentionally permissive on `script-src` because:
 * - `_hyperscript` evaluates event handler expressions via `new Function`,
 *   which requires `'unsafe-eval'`;
 * - the PayPal JS SDK injects a bootstrap script inline on the page, which
 *   requires `'unsafe-inline'` (its hash changes between SDK versions, so
 *   a per-version hash list is not maintainable).
 *
 * Tightening this further would require either:
 *   - switching `_hyperscript` off in favour of a framework that does not
 *     rely on runtime evaluation, or
 *   - adopting per-request nonces and rebuilding the PayPal integration
 *     around them.
 * Both are tracked as separate tickets.
 *
 * Development policy additionally relaxes `script-src` and `connect-src`
 * so that Vite HMR can run (eval-based transforms + WebSocket).
 *
 * @param {Object} options
 * @param {string} options.env - "production" | "development" | anything else
 * @returns {{ name: string, value: string }}
 */
function buildCsp({ env = "production" } = {}) {
  const isDev = env !== "production"

  const paypalOrigins = ["https://*.paypal.com", "https://*.paypalobjects.com"]
  const analyticsOrigins = ["https://analytics.mo5.fr"]

  const directives = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      ...paypalOrigins,
      ...analyticsOrigins,
      ...(isDev ? ["ws://localhost:*", "http://localhost:*"] : []),
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": [
      "'self'",
      "data:",
      "https://www.paypal.com",
      "https://www.paypalobjects.com",
      ...analyticsOrigins,
    ],
    "font-src": ["'self'", "data:"],
    "connect-src": [
      "'self'",
      ...paypalOrigins,
      ...analyticsOrigins,
      ...(isDev ? ["ws://localhost:*", "http://localhost:*"] : []),
    ],
    "frame-src": paypalOrigins,
    "frame-ancestors": ["'none'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "manifest-src": ["'self'"],
  }

  const value = Object.entries(directives)
    .map(([name, sources]) => `${name} ${sources.join(" ")}`)
    .join("; ")

  return { name: "Content-Security-Policy", value }
}

module.exports = { buildCsp }
