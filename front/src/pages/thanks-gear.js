import content from "../partials/thanks-gear.html?raw"
import { createPage } from "../../libs/createPage"
import { translate } from "../scripts/translate"
import { getLang } from "../scripts/get-lang"
import { injectTemplate } from "../../libs/injectTemplate"

export default () => createPage(content, translate, getLang, injectTemplate)
