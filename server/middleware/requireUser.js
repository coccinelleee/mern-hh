import { getAuth } from "@clerk/express";

const requireUser = (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ success: false, message: "Пайдаланушы авторизациядан өтпеген" });
  req.userId = userId;
  next();
};

export default requireUser;
