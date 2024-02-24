const path = require("path")

module.exports = async (req, h) => {
  const { id, token } = req.params

  if (token !== process.env.TOKEN_ADMIN) return h.response("wrong token").code(400)

  const fileName = id + ".pdf"
  const pdfPath = path.join(__dirname + "/../files", fileName)
  return h.file(pdfPath)
}
