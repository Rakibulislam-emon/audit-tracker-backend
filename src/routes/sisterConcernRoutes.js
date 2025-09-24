import express from "express";
import {
  createSisterConcern,
  getSisterConcerns,
} from "../controllers/sisterConcernController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router
  .route("/")
  .post(auth, (req, res, next) => {
    // check role
    if (req.user.role !== "admin" && req.user.role !== "sysadmin") {
      return res
        .status(403)
        .json({ message: "access denied, only admins can register new users" });
    }
    // if authorized, proceed to controller
    createSisterConcern(req, res, next);
  })
  .get(auth, (req, res, next) => {
    // check role
    if (req.user.role !== "admin" && req.user.role !== "sysadmin") {
      return res
        .status(403)
        .json({ message: "access denied, only admins can register new users" });
    }
    // if authorized, proceed to controller
    getSisterConcerns(req, res, next);
  });
export default router;
