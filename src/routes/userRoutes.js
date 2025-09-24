import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/users/register
// @access  only admins
router.post("/register", registerUser);
// @desc    Login user and get token
// @route   POST /api/users/login
// @access  Public
router.post("/login", loginUser);

// @desc    Get current user
// @route   GET /api/users/me
// @access  Private
// 🔒 Protected route: Get current user (requires valid JWT)
router.get("/me", auth, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

export default router;
