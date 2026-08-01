import { createPage } from "../../libs/createPage"
import { injectTemplate } from "../../libs/injectTemplate"
import content from "../partials/home.html?raw"
import { getLang, saveLang } from "../scripts/get-lang"
import { getBano } from "../scripts/getBano"
import { injectFaq } from "../scripts/injectFaq"
import { loadMembershipModal } from "../scripts/load-membership-modal"
import { loadMoneyModal } from "../scripts/load-money-modal"
import { submitGear } from "../scripts/submit-gear"
import { submitMoney } from "../scripts/submit-money"
import { translate } from "../scripts/translate"

export default () =>
  createPage(content, {
    getLang,
    saveLang,
    translate,
    injectTemplate,
    submitGear,
    injectFaq,
    submitMoney,
    loadMoneyModal,
    loadMembershipModal,
    getBano,
  })
