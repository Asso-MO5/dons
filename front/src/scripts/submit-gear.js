import { toast } from "./toast"

/**
 *
 * @description Submits a gear to the API
 * @param {HTMLFormElement} form - Form element
 * @returns {Promise<Object>} - Promise with the result of the request
 */
export async function submitGear(form) {
  const data = new FormData(form)
  const modal = document.querySelector("#modal_gear")

  try {
    const res = await fetch("/api/gear_submit", {
      method: "POST",
      body: data,
    })
    modal.close()
    if (!res.ok) {
      return toast("gear_submit_error", "error")
    }

    window.location.replace("/thanks-gear")
  } catch (err) {
    modal.close()
    return toast("gear_submit_error", "error")
  }
}
