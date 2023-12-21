module.exports = {
  method: "GET",
  path: "/assets/{param*}",
  handler: {
    directory: {
      path: "dist/assets",
      index: false,
    },
  },
}
