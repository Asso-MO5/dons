import { parseRoute } from "../../libs/parseRoute"
import { uncleanEmail } from "../utils/cleanEmail"
import { BASE_URL } from "../utils/constants"

export function getDownloadLink() {
  const { params } = parseRoute()
  const { email, id } = params

  return `${BASE_URL}/cerfa/${id}/${uncleanEmail(email)}`
}
