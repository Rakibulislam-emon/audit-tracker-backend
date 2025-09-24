import express from "express";
import {
  createAuditPlan,
  getAuditPlans,
} from "../controllers/auditPlanController.js";
import auth from "../middleware/auth.js";
import authorizeRoles from "../middleware/authorizeRoles.js";
const router = express.Router();

router
  .route("/")
  .post(auth, authorizeRoles("admin", "audit_manager"), createAuditPlan)
  .get(auth, authorizeRoles("admin", "audit_manager"), getAuditPlans);

export default router;
