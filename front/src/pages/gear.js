import { createPage } from "../../libs/createPage"
import { injectTemplate } from "../../libs/injectTemplate"
import content from "../partials/gear.html?raw"
import { getLang, saveLang } from "../scripts/get-lang"
import { getBano } from "../scripts/getBano"
import { submitGear } from "../scripts/submit-gear"
import { translate } from "../scripts/translate"

export default () =>
  createPage(content, {
    getLang,
    saveLang,
    translate,
    injectTemplate,
    submitGear,
    getBano,
  })
