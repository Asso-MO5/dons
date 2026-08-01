import { createPage } from "../../libs/createPage"
import { injectTemplate } from "../../libs/injectTemplate"
import content from "../partials/admin-form.html?raw"
import { getLang, saveLang } from "../scripts/get-lang"
import { getBano } from "../scripts/getBano"
import { getDownloadLink } from "../scripts/getDownloadLink"
import { submitAdminGen } from "../scripts/submit-admin-gen"
import { translate } from "../scripts/translate"

export default () =>
  createPage(content, {
    getLang,
    saveLang,
    translate,
    injectTemplate,
    getBano,
    submitAdminGen,
    getDownloadLink,
  })
