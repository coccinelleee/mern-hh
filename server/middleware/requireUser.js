// middleware/requireUser.js
import { getAuth } from "@clerk/express";

const requireUser = (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    console.log("🔐 Clerk userId:", userId); // <-- Проверь в логах

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Clerk user ID missing" });
    }

    req.userId = userId;
    next();
  } catch (err) {
    console.error("❌ requireUser error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default requireUser;
