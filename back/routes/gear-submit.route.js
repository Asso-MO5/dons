module.exports = {
  method: "POST",
  path: "/gear_submit",
  options: {
    payload: {
      parse: true,
      output: "data",
      multipart: true,
    },
  },
  handler: require("../ctrl/gear-submit.ctrl"),
}
