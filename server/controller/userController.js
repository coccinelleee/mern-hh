import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import { v2 } from "cloudinary";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const getUserData = async (req, res) => {
  const clerkId = req.userId;

  if (!clerkId) {
    return res.status(401).json({ success: false, message: "Clerk ID табылмады" });
  }

  try {
    let user = await User.findOne({ clerkId });

    if (!user) {
      const clerkUser = await clerk.users.getUser(clerkId);

      user = await User.create({
        clerkId,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        name: [
          clerkUser.firstName,
          clerkUser.lastName
        ]
          .filter(Boolean)
          .map(v => v.trim())
          .join(' '),
      });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error("⛔ Clerk ID бойынша қатесі:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// 🔹 Отклик на вакансию
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const clerkId = req.userId;

  try {
    const user = await User.findOne({ clerkId });
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

// 🔹 Получение откликов пользователя
export const getUserJobApplications = async (req, res) => {
  const clerkId = req.userId;

  try {
    const user = await User.findOne({ clerkId });
    if (!user) return res.json({ success: false, message: "Пайдаланушы табылмады" });

    const applications = await JobApplication.find({ userId: user._id })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location level salary")
      .exec();

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🔹 Обновление резюме
export const updateUserResume = async (req, res) => {
  const clerkId = req.userId;

  try {
    const resumeFile = req.file;
    console.log("📄 Resume file:", resumeFile);

    const user = await User.findOne({ clerkId });
    if (!user) return res.json({ success: false, message: "Пайдаланушы табылмады" });

    if (resumeFile?.path) {
      const resumeUpload = await v2.uploader.upload(resumeFile.path, {
        folder: "resumes",
        resource_type: "auto"
      });
      user.resume = resumeUpload.secure_url;
      await user.save();

      return res.json({ success: true, message: "Резюме сәтті жаңартылды" });
    } else {
      return res.status(400).json({ success: false, message: "Файл табылмады" });
    }
  } catch (error) {
    console.error("📄 Резюме қатесі:", error.message);
    res.json({ success: false, message: error.message });
  }
};
