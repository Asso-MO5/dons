import { loadScript } from "@paypal/paypal-js"
import { cleanEmail } from "../utils/cleanEmail"
import { submitMembership } from "./submit-membership"
import { toast } from "./toast"

export async function loadMembershipDonation() {

  const paypal = await loadScript({
    "client-id": import.meta.env.VITE_PAYPAL_API_KEY,
    intent: "capture",
    commit: "false",
    vault: "true",
    locale: "fr_FR",
    currency: "EUR",
    "merchant-id": [import.meta.env.VITE_PAYPAL_MERCHANT_ID],
  })
  const amount = 15

  paypal
    .Buttons({
      style: {
        color: "blue",
        shape: "rect",
      },
      createOrder(_data, actions) {
        const form = document.querySelector("#membership_form")
        const formData = new FormData(form)
        const required = ["name", "lastname", "email", "address", "postal_code", "city"]
        for (const field of required) {
          if (!formData.get(field)) {
            return toast("Veuillez remplir tous les champs obligatoires", "error")
          }
        }
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount.toString(),
              },
            },
          ],
        })
      },
      async onApprove(_data, actions) {
        const details = await actions.order.capture()
        const { payer, id: transactionId, create_time, purchase_units } = details
        const {
          email_address: paypalEmail,
          name: { given_name: name, surname: lastname },
        } = payer
        const {
          amount: { value, currency_code },
        } = purchase_units[0]

        const form = document.querySelector("#membership_form")
        const formData = new FormData(form)
        const renewal = formData.get("renewal") === "1"

        const user = {
          name,
          lastname,
          email: formData.get("email"),
          address: formData.get("address"),
          postal_code: formData.get("postal_code"),
          city: formData.get("city"),
          discord_pseudo: formData.get("discord_pseudo") || "",
        }

        const donation = {
          amount: value,
          currency_code,
          transactionId,
          create_time,
          payer_email: paypalEmail,
          type: renewal ? "RENEWAL" : "NEW",
        }

        try {
          const { link, fileId } = await submitMembership(user, donation)
          const linkEl = document.createElement("a")
          linkEl.href = link
          linkEl.target = "_blank"
          linkEl.rel = "noopener noreferrer"
          document.body.appendChild(linkEl)
          linkEl.click()
          document.body.removeChild(linkEl)
          window.location.replace("/thanks-membership/" + `${fileId}/${cleanEmail(user.email)}`)
        } catch (err) {
          console.log(err)
        }
      },
      onError: (err) => {
        return toast(err, "error")
      },
    })
    .render("#membership_paypal-buttons")
}
