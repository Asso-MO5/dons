module.exports = [
  {
    method: "POST",
    path: "/api/admin_gen",
    options: {
      payload: {
        parse: true,
        output: "stream",
        multipart: true,
        maxBytes: 300 * 1024 * 1024, //300 mb
      },
    },
    handler: require("../ctrl/admin-gen.ctrl"),
  },
]
