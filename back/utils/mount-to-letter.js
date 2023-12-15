/**
 * @description Converts a number to a string in french
 * @param {Number} n - Number to convert
 * @returns
 */
function mountToLetter(n) {
  if (n === 0) {
    return ""
  }

  const unite = [
    "",
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "onze",
    "douze",
    "treize",
    "quatorze",
    "quinze",
    "seize",
  ]
  const dizaines = [
    "",
    "dix",
    "vingt",
    "trente",
    "quarante",
    "cinquante",
    "soixante",
    "soixante",
    "quatre-vingt",
    "quatre-vingt",
  ]

  if (n < 17) {
    return unite[n]
  } else if (n < 20) {
    return "dix-" + unite[n - 10]
  } else if (n < 100) {
    if (n % 10 === 0) {
      return dizaines[n / 10]
    } else if (n < 70 || (n > 80 && n < 91)) {
      return dizaines[Math.floor(n / 10)] + "-" + unite[n % 10]
    } else {
      return dizaines[Math.floor(n / 10)] + (n % 10 === 1 ? " et " : "-") + unite[n % 10]
    }
  } else if (n < 1000) {
    if (n === 100) {
      return "cent"
    } else {
      return (n < 200 ? "cent " : unite[Math.floor(n / 100)] + " cent ") + mountToLetter(n % 100)
    }
  } else if (n < 2000) {
    return "mille " + mountToLetter(n % 1000)
  } else if (n < 1000000) {
    return (
      mountToLetter(Math.floor(n / 1000)) +
      " mille " +
      (n % 1000 !== 0 ? mountToLetter(n % 1000) : "")
    )
  } else {
    return "Nombre trop grand"
  }
}

module.exports = { mountToLetter }
