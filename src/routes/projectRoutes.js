import express from "express";
import {
  createProject,
  getProjects,
} from "../controllers/projectController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router
  .route("/")
  .post(auth, (req, res, next) => {
    // check role
    if (req.user.role !== "admin" && req.user.role !== "audit_manager") {
      return res
        .status(403)
        .json({ message: "access denied, only admins can register new users" });
    }
    // if authorized, proceed to controller
    createProject(req, res, next);
  })
  .get(auth, (req, res, next) => {
    // check role
    if (req.user.role !== "admin" && req.user.role !== "audit_manager") {
      return res
        .status(403)
        .json({ message: "access denied, only admins can register new users" });
    }
    // if authorized, proceed to controller
    getProjects(req, res, next);
  });
export default router;
