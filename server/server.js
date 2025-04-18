import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectCloudinary from './config/cloudinary.js';

import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { clerkMiddleware } from '@clerk/express';

dotenv.config();
const app = express();

// ✅ Разрешенные домены (локальный и продакшен)
const allowedOrigins = [
  'http://localhost:5173',
  'https://mern-hh.vercel.app'
];

// ✅ Настройка CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error('CORS policy does not allow this origin'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
}));

// ✅ Обработка предзапросов
app.options('*', cors()); 

// Основное
app.use(express.json());
app.use(clerkMiddleware());

await connectDB();
await connectCloudinary();

app.get("/", (req, res) => res.send("API is working ✅"));

app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
