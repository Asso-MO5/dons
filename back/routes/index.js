module.exports = [
  //BACK
  require("./gear-submit.route"),
  require("./money-submit.route"),
  require("./cerfa.route"),
  require("./bano.route"),

  //FRONT
  require("./favicon.route"),
  require("./fonts.route"),
  require("./public.route"),
  require("./assets.route"),
  require("./manifest.route"),
  {
    method: "GET",
    path: "/_hyperscript.min.js",
    handler: (_req, h) => h.file("dist/_hyperscript.min.js"),
  },

  require("./home.route"),
]
