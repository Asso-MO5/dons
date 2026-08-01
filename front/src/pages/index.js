import adminForm from "./admin-form"
import gear from "./gear"
import home from "./home"
import membership from "./membership"
import money from "./money"
import thanks from "./thanks"
import thanksGear from "./thanks-gear"
import thanksMembership from "./thanks-membership"

const pages = {
  home,
  gear,
  membership,
  money,
  "thanks-gear": thanksGear,
  "thanks/:id/:email": thanks,
  "thanks-membership/:id/:email": thanksMembership,
  admin_form: adminForm,
}

export default pages
