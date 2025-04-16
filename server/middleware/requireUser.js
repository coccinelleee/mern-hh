import { clerkClient } from "@clerk/clerk-sdk-node";

const requireUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Токен жоқ, жүйеге кіріңіз" });
    }

    const token = authHeader.split(" ")[1];

    const session = await clerkClient.sessions.verifySession(token);

    if (!session) {
      return res.status(401).json({ success: false, message: "Сессия жарамсыз" });
    }

    const user = await clerkClient.users.getUser(session.userId);
    req.user = user;
    next();
  } catch (error) {
    console.error("🔒 Clerk requireUser error:", error.message);
    return res.status(401).json({ success: false, message: "Қолданушы тексеруі сәтсіз" });
  }
};

export default requireUser;
