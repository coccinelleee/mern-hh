import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkWebhooks } from "./controller/clerkWebhooks.js";
import bodyParser from "body-parser";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();
const app = express();

const allowedOrigins = ["http://localhost:5173", "https://mern-hh.vercel.app"];

// ✅ CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error("CORS policy does not allow this origin"), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
}));
app.options("*", cors());

// ✅ Webhook route ДО JSON и Clerk
app.post("/api/users/webhooks/clerk", bodyParser.json({ type: "*/*" }), clerkWebhooks);

// ✅ JSON и Clerk Middleware
app.use(express.json());
app.use(clerkMiddleware());

await connectDB();
await connectCloudinary();

app.get("/", (req, res) => res.send("API is working ✅"));

// ✅ Обычные маршруты
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
