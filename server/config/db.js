import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Определяем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ЯВНО УКАЖИ путь к .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log("📦 MongoDB URI:", uri);

    if (!uri) throw new Error("MONGODB_URI is undefined!");

    await mongoose.connect(uri);
    console.log("✅ MongoDB включен!");
  } catch (error) {
    console.error("❌ Initial DB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
