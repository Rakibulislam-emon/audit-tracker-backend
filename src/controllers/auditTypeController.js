import AuditType from "../models/AuditType.js";


const createAuditType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const type = await AuditType.create({ name, description });
    res.status(201).json(type);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Audit Type name already exists' });
    }
    res.status(500).json({ message: 'Server error creating audit type' });
  }
};

const getAuditTypes = async (req, res) => {
  try {
    const types = await AuditType.find().sort({ name: 1 });
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching audit types' });
  }
};

export { createAuditType, getAuditTypes };