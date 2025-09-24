import AuditInstance from "../models/AuditInstance.js";
import AuditPlan from "../models/AuditPlan.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

export const createAuditInstance = async (req, res) => {
  try {
    const { auditPlan, project, assignedAuditors, notes } = req.body;

    const [plan, proj] = await Promise.all([
      AuditPlan.findById(auditPlan),
      Project.findById(project),
    ]);

    if (!plan)
      return res.status(400).json({ message: "Invalid Audit Plan ID" });
    if (!proj) return res.status(400).json({ message: "Invalid Project ID" });

    const auditors = await User.find({
      _id: { $in: assignedAuditors },
      role: { $in: ["auditor", "audit_manager", "admin", "sysadmin"] },
    });

    if (auditors.length !== assignedAuditors.length) {
      return res.status(400).json({
        message: "One or more assigned users are invalid or not auditors",
      });
    }

    const instance = await AuditInstance.create({
      auditPlan,
      project,
      assignedAuditors,
      notes,
    });

    // ✅ CORRECT WAY: Re-fetch with populate
    const populatedInstance = await AuditInstance.findById(instance._id)
      .populate("auditPlan", "plannedDate")
      .populate("project", "name")
      .populate("assignedAuditors", "name email role");

    res.status(201).json(populatedInstance);
  } catch (error) {
    console.error("Create AuditInstance error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error creating audit instance" });
  }
};

export const getAuditInstances = async (req, res) => {
  try {
    const { project, auditPlan, status } = req.query;
    let filter = {};
    if (project) filter.project = project;
    if (auditPlan) filter.auditPlan = auditPlan;
    if (status) filter.status = status;

    const instances = await AuditInstance.find(filter)
      .populate("auditPlan", "plannedDate")
      .populate("project", "name")
      .populate("assignedAuditors", "name email role")
      .sort({ createdAt: -1 });

    res.json(instances);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching audit instances" });
  }
};
