import e from "express";
import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import { v2 } from "cloudinary";

export const getUserData = async (req, res) => {
  const userId = req.userId; // 🔥 Вот так
  console.log("Сұраудағы пайдаланушы идентификаторы:", userId);

  try {
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      user = await User.create({
        clerkId: userId,
        name: "Жаңа қолданушы",
        email: "",
        resume: "",
      });
      console.log("Жаңа пайдаланушы құрылды:", user);
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log("Пайдаланушыны алу қатесі:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.json({ success: false, message: "Пайдаланушы табылмады" });

    const isAlreadyApplied = await JobApplication.findOne({ userId: user._id, jobId });

    if (isAlreadyApplied) {
      return res.json({
        success: false,
        message: "Сіз бұл жұмысқа өтініш беріп қойғансыз",
      });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.json({ success: false, message: "Жұмыс табылмады" });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId: user._id,
      jobId,
      date: Date.now(),
    });

    res.json({ success: true, message: "Сәтті қолданылды" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUserJobApplications = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });
    if (!user) return res.json({ success: false, message: "Пайдаланушы табылмады" });

    const applications = await JobApplication.find({ userId: user._id })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location level salary")
      .exec();

    if (!applications) {
      return res.json({
        success: false,
        message: "Бұл пайдаланушы үшін қолданбалар табылмады",
      });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateUserResume = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const resumeFile = req.file;
    console.log("Resume file:", resumeFile);

    const user = await User.findOne({ clerkId });
    if (!user) return res.json({ success: false, message: "Пайдаланушы табылмады" });

    if (resumeFile) {
      const resumeUpload = await v2.uploader.upload(resumeFile.path);
      user.resume = resumeUpload.secure_url;
    }
    await user.save();

    return res.json({ success: true, message: "Жалғастыру сәтті жаңартылды" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};