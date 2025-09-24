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

export const updateAuditFinding = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, riskRating, status, recommendation } = req.body;

    const finding = await AuditFinding.findById(id);
    if (!finding) {
      return res.status(404).json({ message: 'Audit Finding not found' });
    }

    // Only allow status update to 'resolved' or 'closed' if user is authorized
    if (status && !['open', 'in_progress', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Update fields
    if (title !== undefined) finding.title = title;
    if (description !== undefined) finding.description = description;
    if (riskRating !== undefined) finding.riskRating = riskRating;
    if (recommendation !== undefined) finding.recommendation = recommendation;
    if (status !== undefined) finding.status = status;

    await finding.save();
    res.json(finding);
  } catch (error) {
    console.error('Update AuditFinding error:', error);
    res.status(500).json({ message: 'Server error updating audit finding' });
  }
};

export const closeAuditFinding = async (req, res) => {
  try {
    const { id } = req.params;
    const finding = await AuditFinding.findById(id);
    if (!finding) {
      return res.status(404).json({ message: 'Audit Finding not found' });
    }

    finding.status = 'closed';
    await finding.save();
    res.json({ ...finding.toObject(), message: 'Finding closed successfully' });
  } catch (error) {
    console.error('Close AuditFinding error:', error);
    res.status(500).json({ message: 'Server error closing audit finding' });
  }
};