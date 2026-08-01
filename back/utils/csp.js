/**
 * Builds the Content-Security-Policy header value.
 *
 * Production policy is intentionally strict: only the same origin and the
 * domains required by PayPal (SDK + iframe) are allowed. Styles rely on
 * `'unsafe-inline'` because Tailwind v4 and some animation utilities emit
 * inline styles; tightening this is a future ticket.
 *
 * Development policy relaxes `script-src` and `connect-src` so that Vite
 * HMR can run (eval-based transforms + WebSocket).
 *
 * @param {Object} options
 * @param {string} options.env - "production" | "development" | anything else
 * @returns {{ name: string, value: string }}
 */
function buildCsp({ env = "production" } = {}) {
  const isDev = env !== "production"

  const directives = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "https://www.paypal.com",
      "https://www.paypalobjects.com",
      ...(isDev ? ["'unsafe-eval'"] : []),
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "https://www.paypal.com"],
    "font-src": ["'self'", "data:"],
    "connect-src": [
      "'self'",
      "https://www.paypal.com",
      ...(isDev ? ["ws://localhost:*", "http://localhost:*"] : []),
    ],
    "frame-src": ["https://www.paypal.com"],
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
