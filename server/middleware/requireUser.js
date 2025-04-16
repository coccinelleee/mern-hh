import { getAuth } from "@clerk/express";
import User from "../models/User.js";

const requireUser = async (req, res, next) => {
  try {
    const { userId } = getAuth(req); // Clerk аутентификация

    if (!userId) {
      return res.status(401).json({ success: false, message: "Токен жарамсыз немесе қолданушы табылмады" });
    }

    const user = await User.findById(userId); // user._id == clerkId

    if (!user) {
      return res.status(404).json({ success: false, message: "Қолданушы табылмады" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ requireUser қатесі:", error.message);
    return res.status(401).json({ success: false, message: "Қолданушыны тексеру қатесі" });
  }
};

export default requireUser;
