const { createCanvas, loadImage } = require("canvas")
const imgToPDF = require("image-to-pdf")
const fs = require("fs")
const path = require("path")
const { mountToLetter } = require("../utils/mount-to-letter")

async function generateCerfa({
  amount,
  name,
  lastname,
  address,
  postal_code,
  city,
  date,
  invoice_id,
  fileName,
}) {
  // === Canvas ====
  const DPI = 100 // Résolution en DPI
  const widthMM = 210 // Largeur en mm pour A4
  const heightMM = 297 // Hauteur en mm pour A4
  const widthPixels = Math.round((widthMM / 25.4) * DPI)
  const heightPixels = Math.round((heightMM / 25.4) * DPI)
  const canvas = createCanvas(widthPixels, heightPixels)
  const ctx = canvas.getContext("2d")

  //=== date =======
  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1
  const year = date.getUTCFullYear(4)

  //=== images =======
  const cerfa1 = await loadImage("back/data/cerfa_11580_1.png")
  const cerfa2 = await loadImage("back/data/cerfa_11580_2.png")

  // ==== PAGE 1 ====
  ctx.drawImage(cerfa1, 0, 0)

  // === Case donateur ===
  ctx.font = "15px Sans"
  ctx.fillText(invoice_id, 650, 77)

  // === INFO ASSO ===
  ctx.font = "18px Sans"
  ctx.fillText("Association MO5.com", 215, 163)

  ctx.font = "15px Sans"
  ctx.fillText("8", 75, 213)
  ctx.fillText("Boulevard Serrurier", 150, 213)
  ctx.fillText("75019", 135, 234)
  ctx.fillText("Paris", 270, 234)

  ctx.fillText(
    "Association MO5.com pour la sauvegarde de l'informatique et des jeux vidéo",
    60,
    276
  )
  ctx.font = "18px Sans"
  // orga d'interet general
  ctx.fillText("X", 55, 537)

  const bufferPage1 = Buffer.from(
    canvas.toDataURL().replace("data:image/png;base64,", ""),
    "base64"
  )

  // ==== PAGE 2 ====

  ctx.drawImage(cerfa2, 0, 0)

  // === ID ====
  ctx.font = "14px Sans"
  ctx.fillText(lastname, 53, 103)
  ctx.fillText(name, 414, 103)
  ctx.fillText(address, 53, 157)
  ctx.fillText(postal_code, 135, 180)
  ctx.fillText(city, 295, 180)

  // === Amount ===
  ctx.font = "16px Sans"
  ctx.fillText(Number(amount), 320, 283)
  ctx.fillText(`${mountToLetter(Number(amount))} euro${Number(amount) > 1 ? "s" : ""}`, 215, 320)

  // === donation date ===
  ctx.font = "13px Sans"
  ctx.fillText(day, 261, 358)
  ctx.fillText(month, 302, 358)
  ctx.fillText(year, 371, 358)

  // === Checkboxes ===
  ctx.font = "18px Sans"
  // 200 du CGI
  ctx.fillText("X", 202, 418)
  // 238 du CGI
  ctx.fillText("X", 403, 418)
  // don manuel
  ctx.fillText("X", 454, 490)
  // numeraire
  ctx.fillText("X", 50, 580)
  //Case mode versement
  ctx.fillText("X", 454, 670)

  // Date signature
  ctx.font = "13px Sans"
  ctx.fillText(day, 552, 989)
  ctx.fillText(month, 588, 989)
  ctx.fillText(year, 615, 989)

  // TODO travailler ensuite sur celle là
  const bufferPage2 = Buffer.from(
    canvas.toDataURL().replace("data:image/png;base64,", ""),
    "base64"
  )

  const pages = [bufferPage1, bufferPage2]
  const pdfPath = path.join(__dirname + "/../files", fileName)

  await new Promise((resolve, reject) => {
    imgToPDF(pages, imgToPDF.sizes.A4)
      .pipe(fs.createWriteStream(pdfPath))
      .on("finish", resolve)
      .on("error", reject)
  })

  return pdfPath
}

module.exports = {
  generateCerfa,
}
