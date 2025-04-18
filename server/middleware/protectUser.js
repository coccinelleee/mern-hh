import { verifyToken } from "@clerk/backend";

export const protectUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const { userId, sessionId } = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    req.user = { id: userId, session: sessionId };
    next();
  } catch (error) {
    console.error("❌ Clerk token verification failed:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
