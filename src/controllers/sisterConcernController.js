// src/controllers/sisterConcernController.js

import GroupCompany from "../models/GroupCompany.js";
import SisterConcern from "../models/SisterConcern.js";

// @desc    Create a Sister Concern
// @route   POST /api/sister-concerns
// @access  Private (Admin/SysAdmin only)
const createSisterConcern = async (req, res) => {
  try {
    const { name, groupCompany, description } = req.body;

    // Validate GroupCompany exists
    const company = await GroupCompany.findById(groupCompany);
    if (!company) {
      return res.status(400).json({ message: "Invalid Group Company ID" });
    }

    const sisterConcern = await SisterConcern.create({
      name,
      groupCompany,
      description,
    });

    res.status(201).json(sisterConcern);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Sister Concern name already exists" });
    }
    res.status(500).json({ message: "Server error creating sister concern" });
  }
};

// @desc    Get all Sister Concerns (optionally filtered by GroupCompany)
// @route   GET /api/sister-concerns
// @access  Private
const getSisterConcerns = async (req, res) => {
  try {
    const { groupCompany } = req.query;
    let filter = {};
    if (groupCompany) {
      filter.groupCompany = groupCompany;
    }

    const concerns = await SisterConcern.find(filter)
      .populate("groupCompany", "name") // include group company name
      .sort({ name: 1 });

    res.json(concerns);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching sister concerns" });
  }
};

export { createSisterConcern, getSisterConcerns };
