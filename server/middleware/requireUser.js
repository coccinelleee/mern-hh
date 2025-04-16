import { getAuth } from "@clerk/express";

const requireUser = (req, res, next) => {
  const { userId } = getAuth(req); // 🔑 Clerk достаёт userId из JWT

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Пайдаланушы авторизациядан өтпеген",
    });
  }

  req.userId = userId; // 👉 передаём в контроллер
  next();
};

export default requireUser;
