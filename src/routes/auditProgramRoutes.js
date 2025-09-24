import express from "express";
import auth from "../middleware/auth.js";
import authorizeRoles from "../middleware/authorizeRoles.js";
import { createAuditProgram, getAuditPrograms } from "../controllers/auditProgramController.js";

const router = express.Router();

router
  .route("/")
  .post(
    auth,
    authorizeRoles("admin", "audit_manager", "sysadmin", "audit_officer"),
    createAuditProgram
  )
  .get(
    auth,
    authorizeRoles("admin", "audit_manager", "sysadmin", "audit_officer"),
    getAuditPrograms
  );

export default router;
