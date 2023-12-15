import content from "../partials/home.html?raw"

import { createPage } from "../../libs/createPage"
import { getLang, saveLang } from "../scripts/get-lang"
import { translate } from "../scripts/translate"
import { injectTemplate } from "../../libs/injectTemplate"
import { submitGear } from "../scripts/submit-gear"
import { injectFaq } from "../scripts/injectFaq"
import { submitMoney } from "../scripts/submit-money"
import { loadMoneyModal } from "../scripts/load-money-modal"

export default () =>
  createPage(
    content,
    getLang,
    saveLang,
    translate,
    injectTemplate,
    submitGear,
    injectFaq,
    submitMoney,
    loadMoneyModal
  )
