const test = require("node:test")
const assert = require("node:assert/strict")
const { buildCsp } = require("./csp")

const findDirective = (csp, name) => csp.value.split("; ").find((d) => d.startsWith(name + " "))

const hasSource = (csp, directive, source) => {
  const value = findDirective(csp, directive)
  assert.ok(value, `directive ${directive} not found in CSP: ${csp.value}`)
  return value.split(/\s+/).includes(source)
}

test("CSP prod: header name is Content-Security-Policy", () => {
  const csp = buildCsp({ env: "production" })
  assert.equal(csp.name, "Content-Security-Policy")
  assert.ok(csp.value.length > 0)
})

test("CSP prod: default-src, frame-ancestors, object-src, base-uri", () => {
  const csp = buildCsp({ env: "production" })
  assert.ok(hasSource(csp, "default-src", "'self'"))
  assert.ok(hasSource(csp, "frame-ancestors", "'none'"))
  assert.ok(hasSource(csp, "object-src", "'none'"))
  assert.ok(hasSource(csp, "base-uri", "'self'"))
  assert.ok(hasSource(csp, "form-action", "'self'"))
  assert.ok(hasSource(csp, "manifest-src", "'self'"))
})

test("CSP prod: PayPal is allowed in script-src, frame-src, connect-src, img-src", () => {
  const csp = buildCsp({ env: "production" })
  assert.ok(hasSource(csp, "script-src", "https://*.paypal.com"))
  assert.ok(hasSource(csp, "script-src", "https://*.paypalobjects.com"))
  assert.ok(hasSource(csp, "frame-src", "https://*.paypal.com"))
  assert.ok(hasSource(csp, "frame-src", "https://*.paypalobjects.com"))
  assert.ok(hasSource(csp, "connect-src", "https://*.paypal.com"))
  assert.ok(hasSource(csp, "connect-src", "https://*.paypalobjects.com"))
  assert.ok(hasSource(csp, "img-src", "https://www.paypal.com"))
  assert.ok(hasSource(csp, "img-src", "https://www.paypalobjects.com"))
})

test("CSP prod: script-src allows unsafe-eval and unsafe-inline for hyperscript and PayPal SDK", () => {
  const csp = buildCsp({ env: "production" })
  assert.ok(hasSource(csp, "script-src", "'unsafe-eval'"))
  assert.ok(hasSource(csp, "script-src", "'unsafe-inline'"))
})

test("CSP dev: still allows PayPal domains and localhost", () => {
  const csp = buildCsp({ env: "development" })
  assert.ok(hasSource(csp, "script-src", "https://*.paypal.com"))
  assert.ok(hasSource(csp, "frame-src", "https://*.paypal.com"))
  assert.ok(hasSource(csp, "connect-src", "ws://localhost:*"))
  assert.ok(hasSource(csp, "connect-src", "http://localhost:*"))
})
