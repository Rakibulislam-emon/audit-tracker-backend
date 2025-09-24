import express from "express";
// user.js
import User from "../models/User.js";
const router = express.Router();

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    // create new user
    const user = new User({
      name,
      email,
      password,
      role: role || "auditor",
    });
    await user.save();
    // send success response without password

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(" Registration error:", error.message);
    res.status(500).json({ message: "Server error during Registration" });
  }
});

export default router;
