const Joi = require("joi")
const path = require("path")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")
const { transporter } = require("../services/mail.service")
const { FROM, DONATION_TYPE } = require("../utils/constants")
const { saveUser, getUserByEmail } = require("../services/user.service")
const { saveDonation } = require("../services/donation.service")
const { gearSubmitMail } = require("../utils/gear-submit-mail")

module.exports = async (req, h) => {
  const data = req.payload
  if (data?.files && Array.isArray(data.files) && data) {
    const dir = path.join(__dirname, "../uploads")
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    for (const file of data.files) {
      const extension = path.extname(file.hapi.filename)
      const uuidName = uuidv4() + extension
      const destination = path.join(dir, uuidName)
      const fileStream = fs.createWriteStream(destination)

      await new Promise((resolve, reject) => {
        file.pipe(fileStream)
        file.on("end", resolve)
        file.on("error", reject)
      })
    }
  }

  delete req.payload.files
  const gearFormSchema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": `"name" cannot be empty`,
      "any.required": `"name" is a required field`,
    }),
    lastname: Joi.string().required().messages({
      "string.empty": `"lastname" cannot be empty`,
      "any.required": `"lastname" is a required field`,
    }),
    email: Joi.string().email().required().messages({
      "string.email": `"email" must be a valid email address`,
      "string.empty": `"email" cannot be empty`,
      "any.required": `"email" is a required field`,
    }),
    tel: Joi.string().pattern(new RegExp("^[0-9]+$")).allow("", null).messages({
      "string.pattern.base": `"tel" must only contain numbers`,
    }),
    address: Joi.string().allow("", null),
    postal_code: Joi.string().allow("", null),
    city: Joi.string().allow("", null),
    message: Joi.string().allow("", null),
  })
  let form
  try {
    form = await gearFormSchema.validateAsync(req.payload)
  } catch (err) {
    console.log(err)
    return h.response(err.message).code(400)
  }

  //save in db
  const existUser = await getUserByEmail(form.email)
  const userId = existUser?.id ? existUser.id : await saveUser(form)

  const donationId = await saveDonation({
    user_id: userId,
    type: DONATION_TYPE.material,
    message: form.message,
  })

  try {
    await transporter.sendMail({
      from: FROM,
      to: process.env.MAIL_DEST,
      bbc: `${process.env.MAILS_COPY}}`,
      subject: `DONS - ${form.name} ${form.lastname}`,
      ...gearSubmitMail({
        donation: {
          id: donationId,
          message: form.message,
        },
        user: {
          name: form.name,
          lastname: form.lastname,
          email: form.email,
          phone: form.tel,
          address: form.address,
          postal_code: form.postal_code,
          city: form.city,
        },
      }),
    })
  } catch (err) {
    console.log(err)
    return h.response(err.message).code(500)
  }

  return h.response("ok").code(200)
}
