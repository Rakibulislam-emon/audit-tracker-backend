
// @desc    Create a Group Company
// @route   POST /api/group-companies
// @access  Private (Admin/SysAdmin only)

import GroupCompany from "../models/GroupCompany.js";


const createGroupCompany = async (req, res) => {
    try {
        const {name,description} = req.body;
    //    Validate input
        if(!name || !description){
            return res.status(400).json({message:"Name and description are required"});
        }
        // Check for existing group company
        const existingGroupCompany = await GroupCompany.findOne({name});
        if(existingGroupCompany){
            return res.status(400).json({message:"Group Company with this name already exists"});
        }
        const company = await GroupCompany.create({name,description});
        res.status(201).json(company);
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({message:"Group Company with this name already exists"});
        }
        console.error("Error creating group company:", error.message);
        res.status(500).json({message:"Server error"});
    }
};

// @desc    Get all Group Companies
// @route   GET /api/group-companies
// @access  Private


const getGroupCompanies = async (req, res) => {
    try {
 
        const companies = await GroupCompany.find().sort({name:1})
        res.json(companies)
      
        
    } catch (error) {
        console.error("Error fetching group companies:", error.message);
        res.status(500).json({message:"Server error"});
    }
}


export {createGroupCompany,getGroupCompanies};