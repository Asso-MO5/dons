import content from "../partials/admin-form.html?raw"

import { createPage } from "../../libs/createPage"
import { getLang, saveLang } from "../scripts/get-lang"
import { translate } from "../scripts/translate"
import { injectTemplate } from "../../libs/injectTemplate"
import { getDownloadLink } from "../scripts/getDownloadLink"
import { getBano } from "../scripts/getBano"
import { submitAdminGen } from "../scripts/submit-admin-gen"

export default () =>
  createPage(
    content,
    getLang,
    saveLang,
    translate,
    injectTemplate,
    getBano,
    submitAdminGen,
    getDownloadLink
  )
