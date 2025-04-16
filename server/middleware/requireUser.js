import { getAuth } from "@clerk/express";
import User from "../models/User.js";

const requireUser = async (req, res, next) => {
  try {
    const { userId } = getAuth(req); // Clerk user ID
    console.log("🔐 Clerk userId:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Жарамсыз токен немесе жүйеге кірмегенсіз" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "Қолданушы табылмады" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ requireUser қатесі:", error.message);
    return res.status(401).json({ success: false, message: "Тексеру кезінде қате шықты" });
  }
};

export default requireUser;
