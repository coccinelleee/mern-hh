import { getAuth } from "@clerk/express";
import User from "../models/User.js";

const requireUser = async (req, res, next) => {
  const auth = getAuth(req);

  if (!auth || !auth.userId) {
    return res.status(401).json({ success: false, message: "Қолданушы жүйеге кірмеген" });
  }

  try {
    const user = await User.findById(auth.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "Қолданушы табылмады" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("requireUser error:", err.message);
    return res.status(500).json({ success: false, message: "Қате орын алды" });
  }
};

export default requireUser;
