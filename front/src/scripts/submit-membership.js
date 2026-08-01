import { toast } from "./toast"

export async function submitMembership(user, donation) {
  try {
    const res = await fetch("/api/membership_submit", {
      method: "POST",
      body: JSON.stringify({ user, donation }),
    })

    return await res.json()
  } catch (err) {
    return toast("membership_submit_error", "error")
  }
}
