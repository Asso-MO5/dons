module.exports = {
  method: "GET",
  path: "/api/cerfa/{id}/{email}",
  handler: require("../ctrl/cerfa.ctrl"),
}
