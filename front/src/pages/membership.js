import { createPage } from "../../libs/createPage"
import { injectTemplate } from "../../libs/injectTemplate"
import content from "../partials/membership.html?raw"
import { getLang, saveLang } from "../scripts/get-lang"
import { getBano } from "../scripts/getBano"
import { loadMembershipModal } from "../scripts/load-membership-modal"
import { translate } from "../scripts/translate"

export default () =>
  createPage(content, {
    getLang,
    saveLang,
    translate,
    injectTemplate,
    loadMembershipModal,
    getBano,
  })
