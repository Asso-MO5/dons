export function cleanEmail(email) {
  return email.split("").reduce((acc, char) => {
    if (char === "@") {
      return acc + "___at___"
    }
    if (char === ".") {
      return acc + "___dot___"
    }

    return acc + char
  }, "")
}

export function uncleanEmail(email) {
  return email.split("___at___").join("@").split("___dot___").join(".")
}
