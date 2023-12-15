module.exports = {
  method: "GET",
  path: "/{any*}",
  handler: require("../ctrl/home.ctrl"),
}
