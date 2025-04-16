import { getAuth } from "@clerk/express";
import User from "../models/User.js";

const requireUser = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    console.log("🔐 Clerk userId:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Жүйеге кіру қажет" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Қолданушы табылмады" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ requireUser қатесі:", error.message);
    return res.status(401).json({ success: false, message: "Аутентификация сәтсіз" });
  }
};

export default requireUser;
