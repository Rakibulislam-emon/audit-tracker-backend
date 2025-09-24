// src/routes/auditInstanceRoutes.js
import express from 'express';
import { createAuditInstance, getAuditInstances } from '../controllers/auditInstanceController.js';
import auth from '../middleware/auth.js';
import authorizeRoles from '../middleware/authorizeRoles.js';

const router = express.Router();

router.route('/')
  .post(auth, authorizeRoles('admin', 'audit_manager'), createAuditInstance)
  .get(auth, authorizeRoles('admin', 'audit_manager'), getAuditInstances);

export default router;