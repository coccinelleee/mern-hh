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

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-hh.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error("CORS policy does not allow this origin"), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.options("*", cors());

// Webhook — ДО JSON/Clerk
app.post(
  "/api/users/webhooks/clerk",
  bodyParser.raw({ type: "*/*" }),
  clerkWebhooks
);

// JSON/Clerk
app.use(express.json());
app.use(clerkMiddleware());

// БД
await connectDB();
await connectCloudinary();

app.use((req, res, next) => {
  const id = (Math.random() * 1_000_000).toString(36);
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.info(
      `[app#finish]: ${id} ${req.ip} ${res.statusCode} ${req.path} ${duration}ms`
    );
  });

  res.on("error", () => {
    const duration = Date.now() - start;

    console.info(
      `[app#error]: ${id} ${req.ip} ${res.statusCode} ${req.path} ${error?.message ?? error} ${duration}ms`
    );
  });

  next();
});

app.get("/", (req, res) => res.send("API is working ✅"));

app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
