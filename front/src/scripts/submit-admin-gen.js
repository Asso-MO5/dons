import { toast } from "./toast"

export async function submitAdminGen(data) {
  const body = new FormData(data)
  try {
    const res = await fetch("/api/admin_gen", {
      method: "POST",
      body,
    })

    const { link } = await res.json()
    const linkEl = document.createElement("a")
    linkEl.href = link
    linkEl.target = "_blank"
    linkEl.rel = "noopener noreferrer"
    document.body.appendChild(linkEl)
    linkEl.click()
    document.body.removeChild(linkEl)
  } catch (err) {
    return toast("admin_form_error", "error")
  }
}
