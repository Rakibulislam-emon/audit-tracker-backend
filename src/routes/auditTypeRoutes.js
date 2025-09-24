import express from "express";
import auth from "../middleware/auth.js";
import authorizeRoles from "../middleware/authorizeRoles.js";
import { createAuditType, getAuditTypes } from "../controllers/auditTypeController.js";

const router = express.Router();

router
  .route("/")
  .post(
    auth,
    authorizeRoles("admin", "audit_manager", "sysadmin", "audit_officer"),
    createAuditType
  )
  .get(
    auth,
    authorizeRoles("admin", "audit_manager", "sysadmin", "audit_officer"),
    getAuditTypes
  );

export default router;
