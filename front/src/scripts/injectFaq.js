import { template } from "../../libs/template"

export function injectFaq() {
  const container = document.createElement("div")

  const questions = ["money_support", "tax_deduction", "donation_receipt", "transaction_security"]

  questions.forEach((question) => {
    const el = template("accordion")
    const title = el.querySelector("[data-type='title']")
    const content = el.querySelector("[data-type='content']")
    title.setAttribute("data-trans", `faq_${question}_title`)
    content.setAttribute("data-trans", `faq_${question}_content`)
    container.appendChild(el)
  })

  return container.innerHTML
}
