module.exports = async (req, h) => {
  const { search } = req.params

  const resBano = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${search}&limit=5`)
  const jsonBano = await resBano.json()

  const addresses = [...jsonBano?.features].map((address) => {
    const { properties } = address

    return {
      city: properties.city,
      postal_code: properties.postcode,
      street: `${properties.housenumber ? properties.housenumber + " " : ""}${properties.street}`,
    }
  })

  return h.response(addresses).code(200)
}
