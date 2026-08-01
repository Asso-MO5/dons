import { createPage } from "../../libs/createPage"
import { injectTemplate } from "../../libs/injectTemplate"
import content from "../partials/thanks-gear.html?raw"
import { getLang } from "../scripts/get-lang"
import { translate } from "../scripts/translate"

export default () =>
  createPage(content, { translate, getLang, injectTemplate })
