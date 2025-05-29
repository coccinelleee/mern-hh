import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkWebhooks } from "./controller/clerkWebhooks.js";
import reviewRoutes from './routes/reviewRoutes.js';
import bodyParser from "body-parser";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();
const app = express();

// ✅ Разрешённые фронтенды
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-hh.vercel.app",
];

// ✅ Настройка CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Webhook до JSON-парсера
app.post(
  "/api/users/webhooks/clerk",
  bodyParser.raw({ type: "*/*" }),
  clerkWebhooks
);

// ✅ JSON и Clerk middleware
app.use(express.json());
app.use(clerkMiddleware());

// ✅ Логгирование запросов
app.use((req, res, next) => {
  const id = (Math.random() * 1_000_000).toString(36);
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.info(
      `[app#finish]: ${id} ${req.method} ${req.path} → ${res.statusCode} (${duration}ms)`
    );
  });

  next();
});

// ✅ Проверка доступности
app.get("/", (req, res) => res.send("API is working ✅"));

// ✅ Подключение роутов
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use('/api/reviews', reviewRoutes);


// ✅ Подключение баз
await connectDB();
await connectCloudinary();

// ✅ Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
