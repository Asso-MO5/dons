import { loadScript } from "@paypal/paypal-js"
import { toast } from "./toast"
import { submitMoney } from "./submit-money"
import { cleanEmail } from "../utils/cleanEmail"

export async function loadMoneyModal() {
  const modal = document.querySelector("#modal_money")
  // Listen to the submit event of the form
  document.querySelectorAll(`input[name='amount']`).forEach((input) => {
    input.addEventListener(
      "click",
      (e) => (document.querySelector(`input[name='custom_amount']`).value = ``)
    )
  })

  // Paypal
  const paypal = await loadScript({
    "client-id": import.meta.env.VITE_PAYPAL_API_KEY,
    intent: "capture",
    commit: "false",
    vault: "true",
    locale: "fr_FR",
    currency: "EUR",
    "merchant-id": [import.meta.env.VITE_PAYPAL_MERCHANT_ID],
  })

  paypal
    .Buttons({
      style: {
        color: "blue",
        shape: "rect",
      },
      createOrder(_data, actions) {
        const form = document.querySelector("#money_donation_form")
        const formData = new FormData(form)
        const amountRange = formData.get("amount")
        const customAmount = formData.get("custom_amount")
        const amountStr = customAmount || amountRange
        const amount = Number(amountStr)
        if (!amount || amount === 0) {
          modal.close()
          return toast("Veuillez choisir un montant", "error")
        }
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount,
              },
            },
          ],
        })
      },
      async onApprove(_data, actions) {
        const details = await actions.order.capture()
        const { payer, id: transactionId, create_time, purchase_units } = details
        const {
          email_address: email,
          name: { given_name: name, surname: lastname },
        } = payer
        const {
          amount: { value, currency_code },
          shipping: { address: addr },
        } = purchase_units[0]

        const { postal_code, address_line_1: address, country_code, admin_area_2: city } = addr

        const user = {
          name,
          lastname,
          email,
          address,
          postal_code,
          city,
          country_code,
        }

        const donation = {
          amount: value,
          currency_code,
          transactionId,
          create_time,
        }

        try {
          const { link, fileId } = await submitMoney(user, donation)
          const linkEl = document.createElement("a")

          // creation du lien
          linkEl.href = link
          linkEl.target = "_blank"
          linkEl.rel = "noopener noreferrer"
          document.body.appendChild(linkEl)
          modal.close()

          // ouverture du lien
          linkEl.click()
          document.body.removeChild(linkEl)

          // redirection vers la page de remerciement
          window.location.replace("/thanks/" + `${fileId}/${cleanEmail(email)}`)
        } catch (err) {
          console.log(err)
        }
      },
      onError: (err) => {
        modal.close()
        return toast(err, "error")
      },
    })
    .render("#paypal-buttons")
}
