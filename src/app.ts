import express, { Request, Response } from "express";
import cors from "cors";

// Ensure DOM / Canvas polyfills for headless serverless environments (Vercel)
if (typeof (globalThis as any).DOMMatrix === "undefined") {
  (globalThis as any).DOMMatrix = class DOMMatrix {};
}
if (typeof (globalThis as any).ImageData === "undefined") {
  (globalThis as any).ImageData = class ImageData {};
}
if (typeof (globalThis as any).Path2D === "undefined") {
  (globalThis as any).Path2D = class Path2D {};
}

import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import aiRoutes from "./routes/ai.routes";
import teacherRoutes from "./routes/teacher.routes";
import studentRoutes from "./routes/student.routes";
import researchRoutes from "./routes/research.routes";
import examPrepRoutes from "./routes/exam-prep.routes";
import titleRoutes from "./routes/title.routes";
import libraryRoutes from "./routes/library.routes";

import { errorHandler } from "./middleware/error-handler";
import { requestLogger } from "./middleware/request-logger";
import { isGeminiConfigured } from "./services/gemini.service";

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use(requestLogger);

// Health check endpoints
app.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "FAI AVENIQ Educational AI Backend Service",
    version: "1.0.0",
    health: "/health",
    aiHealth: "/api/ai/health",
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "FAI AVENIQ Backend",
    isConfigured: isGeminiConfigured(),
  });
});

app.get("/api/ai/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "FAI AVENIQ Engine",
    provider: "gemini",
    model: "gemini-3.8-flash",
    isConfigured: isGeminiConfigured(),
  });
});

// Authentication routes (login, signin, register, signup, me)
app.use("/api/auth", authRoutes);

// User-specific chat storage routes (isolated chats per user)
app.use("/api/chats", chatRoutes);

// AI and educational API routes
app.use("/api/ai", aiRoutes);
app.use("/api/ai/teacher", teacherRoutes);
app.use("/api/ai/student", studentRoutes);
app.use("/api/ai/research", researchRoutes);
app.use("/api/ai/exam-prep", examPrepRoutes);
app.use("/api/ai/title", titleRoutes);
app.use("/api/library", libraryRoutes);

// Global error handling middleware
app.use(errorHandler);

export default app;
