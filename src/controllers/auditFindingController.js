// src/controllers/auditFindingController.js
import AuditFinding from '../models/AuditFinding.js';
import AuditInstance from '../models/AuditInstance.js';


export const createAuditFinding = async (req, res) => {
  try {
    const { auditInstance, title, description, riskRating, recommendation } = req.body;

    // Validate AuditInstance exists
    const instance = await AuditInstance.findById(auditInstance);
    if (!instance) {
      return res.status(400).json({ message: 'Invalid Audit Instance ID' });
    }

    const finding = await AuditFinding.create({
      auditInstance,
      title,
      description,
      riskRating,
      recommendation,
      reportedBy: req.user._id // auto-set from auth middleware
    });

    res.status(201).json(finding);
  } catch (error) {
    console.error('Create AuditFinding error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error creating audit finding' });
  }
};

export const getAuditFindings = async (req, res) => {
  try {
    const { auditInstance, status, riskRating } = req.query;
    let filter = {};
    if (auditInstance) filter.auditInstance = auditInstance;
    if (status) filter.status = status;
    if (riskRating) filter.riskRating = riskRating;

    const findings = await AuditFinding.find(filter)
      .populate('auditInstance', 'status')
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(findings);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching audit findings' });
  }
};