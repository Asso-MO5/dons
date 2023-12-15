import home from "./home"
import thanks from "./thanks"
import thanksGear from "./thanks-gear"

const pages = {
  home,
  "thanks-gear": thanksGear,
  "thanks/:id/:email": thanks,
}

export default pages
