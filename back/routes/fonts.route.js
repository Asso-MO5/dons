module.exports = {
  method: "GET",
  path: "/fonts/{param*}",
  handler: {
    directory: {
      path: "back/public/fonts",
      index: false,
    },
  },
}
