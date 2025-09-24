// src/routes/auditFindingRoutes.js
import express from 'express';
import { createAuditFinding, getAuditFindings } from '../controllers/auditFindingController.js';
import auth from '../middleware/auth.js';
import authorizeRoles from '../middleware/authorizeRoles.js';

const router = express.Router();

router.route('/')
  .post(auth, authorizeRoles('admin', 'audit_manager'), createAuditFinding)
  .get(auth, authorizeRoles('admin', 'audit_manager'), getAuditFindings);

export default router;