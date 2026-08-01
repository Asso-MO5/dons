import { createPage } from "../../libs/createPage"
import { injectTemplate } from "../../libs/injectTemplate"
import content from "../partials/thanks.html?raw"
import { getLang, saveLang } from "../scripts/get-lang"
import { getDownloadLink } from "../scripts/getDownloadLink"
import { translate } from "../scripts/translate"

export default () =>
  createPage(content, {
    getLang,
    saveLang,
    translate,
    injectTemplate,
    getDownloadLink,
  })
