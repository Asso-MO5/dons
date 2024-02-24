module.exports = [
  {
    method: "GET",
    path: "/api/cerfa/admin/{id}/{token}",
    handler: require("../ctrl/cerfa-admin.ctrl"),
  },
  {
    method: "GET",
    path: "/api/cerfa/{id}/{email}",
    handler: require("../ctrl/cerfa.ctrl"),
  },
]
