import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume
} from "../controller/userController.js";
import upload from "../config/multer.js";
import requireUser from "../middleware/requireUser.js";
import { protectUser } from "../middleware/protectUser.js";

const router = express.Router();

router.get("/user", requireUser, protectUser, getUserData);
router.post("/apply", requireUser, applyForJob);
router.get("/applications", requireUser, getUserJobApplications);
router.post("/update-resume", requireUser, upload.single("resume"), updateUserResume);

export default router;
