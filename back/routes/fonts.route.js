module.exports = {
  method: "GET",
  path: "/fonts/{param*}",
  handler: {
    directory: {
      path: "dist/fonts",
      index: false,
    },
  },
}
