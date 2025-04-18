import express from "express";
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from "../controller/userController.js";
import upload from "../config/multer.js";
import requireUser from "../middleware/requireUser.js";
import { protectUser } from '../middleware/protectUser.js';

const router = express.Router();

// Get User Data
router.get("/user", requireUser, protectUser, getUserData); 

// Apply for a Job
router.post("/apply", requireUser, applyForJob); 

// Get applied jobs data
router.get("/applications", requireUser, protectUser, getUserJobApplications); 

// Update the resume
router.post("/update-resume", requireUser, upload.single("resume"), updateUserResume);

export default router;
