module.exports = {
  method: "POST",
  path: "/api/gear_submit",
  options: {
    payload: {
      parse: true,
      output: "stream",
      multipart: true,
      maxBytes: 300 * 1024 * 1024, //300 mb
    },
  },
  handler: require("../ctrl/gear-submit.ctrl"),
}
