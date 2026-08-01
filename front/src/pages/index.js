import adminForm from "./admin-form"
import home from "./home"
import membership from "./membership"
import thanks from "./thanks"
import thanksGear from "./thanks-gear"
import thanksMembership from "./thanks-membership"

const pages = {
  home,
  membership,
  "thanks-gear": thanksGear,
  "thanks/:id/:email": thanks,
  "thanks-membership/:id/:email": thanksMembership,
  admin_form: adminForm,
}

export default pages
