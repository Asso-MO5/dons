import { toast } from "./toast"

export async function submitMoney(user, donation) {
  try {
    const res = await fetch("/api/money_submit", {
      method: "POST",
      body: JSON.stringify({ user, donation }),
    })

    return await res.json()
  } catch (err) {
    return toast("money_submit_error", "error")
  }
}
