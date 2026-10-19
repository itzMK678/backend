import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT || 5000),

  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",

  NODE_ENV: process.env.NODE_ENV || "development",

  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",

  ENABLE_WEB_RESEARCH:
    process.env.ENABLE_WEB_RESEARCH === "true",
};