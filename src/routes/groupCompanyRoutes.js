import express from "express"

import auth from "../middleware/auth.js"
import { createGroupCompany, getGroupCompanies } from "../controllers/groupCompanyController.js"
const router = express.Router()

router.route("/").post(auth,createGroupCompany).get(auth,getGroupCompanies)

export default router