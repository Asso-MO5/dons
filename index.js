require("dotenv").config()
const Hapi = require("@hapi/hapi")
const Inert = require("@hapi/inert")
const routes = require("./back/routes")
const securityHeadersPlugin = require("./back/plugins/security-headers.plugin")

const init = async () => {
  const corsDev = {
    origin: ["*"],
    credentials: true,
    additionalHeaders: ["cache-control", "x-requested-with"],
  }
  const corsProd = {
    credentials: true,
    additionalHeaders: ["cache-control", "x-requested-with"],
  }

  const server = Hapi.server({
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || "0.0.0.0",
    routes: {
      cors: process.env.NODE_ENV === "production" ? corsProd : corsDev,
    },
  })

  // Plugins
  await server.register(Inert)
  await server.register(securityHeadersPlugin)

  server.route(routes)

  await server.start()

  console.log("Server running on %s", server.info.uri)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

init()
