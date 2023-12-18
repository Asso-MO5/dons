import { BASE_URL } from "../utils/constants"

export async function getBano(search) {
  const res = await fetch(`${BASE_URL}/bano/${search}`)
  return await res.json()
}
