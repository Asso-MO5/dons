import { parseRoute } from "../../libs/parseRoute"
import { uncleanEmail } from "../utils/cleanEmail"

export function getDownloadLink() {
  const { params } = parseRoute()
  const { email, id } = params

  return `/api/cerfa/${id}/${uncleanEmail(email)}`
}
