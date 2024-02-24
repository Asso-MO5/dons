const { DONATION_TYPE } = require("../utils/constants")
const { getUserByEmail } = require("../services/user.service")
const { generateCerfa } = require("../utils/generateCerfa")
const { v4: uuidv4 } = require("uuid")

module.exports = async (req, h) => {
  if (!req.payload) return h.response("no payload").code(400)

  const { name, email, token, amount } = req.payload

  if (!token) return h.response("no token").code(400)
  if (token !== process.env.TOKEN_ADMIN) return h.response("wrong token").code(400)

  const date = new Date(req.payload.date) || new Date()

  const existUser = await getUserByEmail(email)

  if (!name && !existUser) return h.response("no name").code(400)

  const user = existUser?.id ? existUser : req.payload

  const invoice_id = `${uuidv4()}-gen`
  const fileName = `${invoice_id}` + ".pdf"

  await generateCerfa({
    amount: parseFloat(amount) || 0,
    invoice_id: `g-${date.getMonth() + 1}-${date.getFullYear()}-${invoice_id.slice(0, 5)}`,
    date,
    fileName,
    name: user.name,
    lastname: user.lastname,
    address: user.address,
    postal_code: user.postal_code,
    city: user.city,
  })

  return h
    .response({
      message: "ok",
      donation_type: DONATION_TYPE.financial,

      email,
      link: `/api/cerfa/admin/${invoice_id}/${token}`,
    })
    .code(200)
}
