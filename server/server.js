import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import 'dotenv/config';

import connectDB from "./config/db.js";
import connectCloudinary from './config/cloudinary.js';
import * as Sentry from "@sentry/node";

import companyRoutes from './routes/companyRoutes.js';
import JobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { clerkMiddleware } from '@clerk/express';
import { clerkWebhooks } from './controller/webhooks.js';

const app = express();

await connectDB();
await connectCloudinary();

app.use(cors({
  origin: ["http://localhost:5173", "https://mern-hh.vercel.app"],
  credentials: true
}));
app.use(express.json());

app.post('/api/webhooks', clerkWebhooks);
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API работает"));
Sentry.setupExpressErrorHandler(app);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("Sentry test error");
});

app.use('/api/company', companyRoutes);
app.use('/api/jobs', JobRoutes);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Сервер работает: http://localhost:${port}`));
