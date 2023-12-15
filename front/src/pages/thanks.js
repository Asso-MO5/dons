import content from "../partials/thanks.html?raw"

import { createPage } from "../../libs/createPage"
import { getLang, saveLang } from "../scripts/get-lang"
import { translate } from "../scripts/translate"
import { injectTemplate } from "../../libs/injectTemplate"
import { getDownloadLink } from "../scripts/getDownloadLink"

export default () =>
  createPage(content, getLang, saveLang, translate, injectTemplate, getDownloadLink)
