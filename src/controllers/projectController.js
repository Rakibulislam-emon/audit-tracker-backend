
// @desc    Create a Project
// @route   POST /api/projects
// @access  Private (Admin/Audit Manager only)
import Project from "../models/Project.js";
import SisterConcern from "../models/SisterConcern.js";

// @access  Private (Admin/Audit Manager only — SRS 4)
const createProject = async (req, res) => {
  try {
    const { name, sisterConcern, description, startDate, endDate } = req.body;

    // Validate SisterConcern exists
    const concern = await SisterConcern.findById(sisterConcern);
    if (!concern) {
      return res.status(400).json({ message: 'Invalid Sister Concern ID' });
    }

    const project = await Project.create({
      name,
      sisterConcern,
      description,
      startDate,
      endDate
    });

    res.status(201).json(project);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Project name already exists' });
    }
    res.status(500).json({ message: 'Server error creating project' });
  }
};

// @desc    Get all Projects (optionally filtered by SisterConcern)
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    const { sisterConcern } = req.query;
    let filter = {};
    if (sisterConcern) {
      filter.sisterConcern = sisterConcern;
    }

    const projects = await Project.find(filter)
      .populate('sisterConcern', 'name') // include sister concern name
      .sort({ name: 1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching projects' });
  }
};

export { createProject, getProjects };