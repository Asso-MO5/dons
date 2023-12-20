export async function getBano(search) {
  const res = await fetch(`/api/bano/${search}`)
  return await res.json()
}
