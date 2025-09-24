import AuditProgram from "../models/AuditProgram.js";
import AuditType from "../models/AuditType.js";

const createAuditProgram = async (req, res) => {
  try {
    const { name, description, auditType } = req.body;

    // Validate AuditType exists
    const type = await AuditType.findById(auditType);
    if (!type) {
      return res.status(400).json({ message: 'Invalid Audit Type ID' });
    }

    const program = await AuditProgram.create({
      name,
      description,
      auditType
    });

    res.status(201).json(program);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Audit Program name already exists' });
    }
    res.status(500).json({ message: 'Server error creating audit program' });
  }
};

const getAuditPrograms = async (req, res) => {
  try {
    const { auditType } = req.query;
    let filter = {};
    if (auditType) {
      filter.auditType = auditType;
    }

    const programs = await AuditProgram.find(filter)
      .populate('auditType', 'name')
      .sort({ name: 1 });

    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching audit programs' });
  }
};

export { createAuditProgram, getAuditPrograms };