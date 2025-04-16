import jwt from "jsonwebtoken";
import User from "../models/User.js";

const requireUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Токен жоқ, жүйеге кіріңіз" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Clerk ID → sub
    const user = await User.findOne({ clerkId: decoded.sub });

    if (!user) {
      return res.status(404).json({ success: false, message: "Қолданушы табылмады" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("🔒 requireUser error:", error.message);
    return res.status(401).json({ success: false, message: "Қолданушы тексеруі сәтсіз аяқталды" });
  }
};

export default requireUser;
