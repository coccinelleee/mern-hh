// Инструменттерді (лог, қателер және т.б.) қосу
import './config/instrument.js'

// Қажетті кітапханаларды қосу
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import 'dotenv/config'

// Дерекқор мен Cloudinary конфигурациясын қосу
import connectDB from "./config/db.js";
import connectCloudinary from './config/cloudinary.js';

// Қателерді бақылауға арналған Sentry модулі
import * as Sentry from "@sentry/node";

// Clerk-пен жұмыс істеуге арналған webhooks
import { clerkWebhooks } from './controller/webhooks.js';

// Маршруттарды қосу (рекруитер, жұмыс, қолданушы)
import companyRoutes from './routes/companyRoutes.js'
import JobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Clerk аутентификация middleware-ін қосу
import { clerkMiddleware } from '@clerk/express';

// Express қосымшасын инициализациялау
const app = express();

// MongoDB-ге қосылу
await connectDB();

// Cloudinary сервисіне қосылу
await connectCloudinary();

// Ортақ middleware-тер
app.use(cors({
    origin: ["https://mern-hh.vercel.app"],
    credentials: true
  }));
app.use(express.json());

// 👉 Clerk Webhooks — БҰЛ middleware-ден БҰРЫН!
app.post('/api/webhooks', clerkWebhooks);

// Clerk аутентификация middleware
app.use(clerkMiddleware());

// Негізгі маршрут
app.get("/", (req, res) => res.send("API жұмыс істеп тұр"));

// Sentry қате өңдеу
Sentry.setupExpressErrorHandler(app);

// Debug
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("Менің алғашқы Sentry қатем!");
});

// Маршруттар
app.use('/api/company', companyRoutes);
app.use('/api/jobs', JobRoutes);
app.use('/api/users', userRoutes);

// Серверді іске қосу
const port = process.env.PORT || 5000;
console.log("🔑 Clerk publishable key:", process.env.CLERK_PUBLISHABLE_KEY);

app.listen(port, () => console.log(`🚀 Сервер іске қосылды: http://localhost:${port}`));
