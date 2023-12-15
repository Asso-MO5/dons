const { knex } = require("../services/db.service")

const path = require("path")

module.exports = async (req, h) => {
  const { id, email } = req.params
  //TODO faire des verifs de date pour savoir si on peut générer le PDF

  /**
   * on récupère les infos de l'utilisateura via le mail
   * on récupère les infos de la donation via l'id et on chekc que le mail correspond
   * on vérifie la date de gération du PDF
   * si moins de 10min on accepte,
   * sinon on refuse, et on renvoi un mail avec un lien pour regénérer le PDF
   * le mail met à jour la date de génération du PDF, si le mail aussi à moins de X min
   *
   */

  const fileName = id + ".pdf"

  const pdfPath = path.join(__dirname + "/../files", fileName)
  return h.file(pdfPath)
}
