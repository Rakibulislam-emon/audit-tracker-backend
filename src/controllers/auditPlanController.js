// src/controllers/auditPlanController.js
import AuditPlan from '../models/AuditPlan.js';
import Project from '../models/Project.js';
import AuditType from '../models/AuditType.js';
import AuditProgram from '../models/AuditProgram.js';
const createAuditPlan = async (req, res) => {
  try {
    const { project, auditType, auditProgram, plannedDate, frequency, notes } = req.body;

    // Validate references exist
    const [proj, type, program] = await Promise.all([
      Project.findById(project),
      AuditType.findById(auditType),
      AuditProgram.findById(auditProgram)
    ]);

    if (!proj) return res.status(400).json({ message: 'Invalid Project ID' });
    if (!type) return res.status(400).json({ message: 'Invalid Audit Type ID' });
    if (!program) return res.status(400).json({ message: 'Invalid Audit Program ID' });

    const plan = await AuditPlan.create({
      project,
      auditType,
      auditProgram,
      plannedDate,
      frequency,
      notes
    });

    res.status(201).json(plan);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Audit Plan already exists for this project, type, and date' });
    }
    res.status(500).json({ message: 'Server error creating audit plan' });
  }
};

const getAuditPlans = async (req, res) => {
  try {
    const { project, auditType } = req.query;
    let filter = {};
    if (project) filter.project = project;
    if (auditType) filter.auditType = auditType;

    const plans = await AuditPlan.find(filter)
      .populate('project', 'name')
      .populate('auditType', 'name')
      .populate('auditProgram', 'name')
      .sort({ plannedDate: -1 });

    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching audit plans' });
  }
};

export  { createAuditPlan, getAuditPlans };