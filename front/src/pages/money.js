import { createPage } from "../../libs/createPage"
import { injectTemplate } from "../../libs/injectTemplate"
import content from "../partials/money.html?raw"
import { getLang, saveLang } from "../scripts/get-lang"
import { loadMoneyDonation } from "../scripts/load-money-modal"
import { translate } from "../scripts/translate"

export default () =>
  createPage(content, {
    getLang,
    saveLang,
    translate,
    injectTemplate,
    loadMoneyDonation,
  })
