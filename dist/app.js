"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Ensure DOM / Canvas polyfills for headless serverless environments (Vercel)
if (typeof globalThis.DOMMatrix === "undefined") {
    globalThis.DOMMatrix = class DOMMatrix {
    };
}
if (typeof globalThis.ImageData === "undefined") {
    globalThis.ImageData = class ImageData {
    };
}
if (typeof globalThis.Path2D === "undefined") {
    globalThis.Path2D = class Path2D {
    };
}
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const teacher_routes_1 = __importDefault(require("./routes/teacher.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const research_routes_1 = __importDefault(require("./routes/research.routes"));
const exam_prep_routes_1 = __importDefault(require("./routes/exam-prep.routes"));
const title_routes_1 = __importDefault(require("./routes/title.routes"));
const library_routes_1 = __importDefault(require("./routes/library.routes"));
const error_handler_1 = require("./middleware/error-handler");
const request_logger_1 = require("./middleware/request-logger");
const gemini_service_1 = require("./services/gemini.service");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "20mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "20mb" }));
app.use(request_logger_1.requestLogger);
// Health check endpoints
app.get("/", (_req, res) => {
    res.json({
        status: "ok",
        service: "FAI AVENIQ Educational AI Backend Service",
        version: "1.0.0",
        health: "/health",
        aiHealth: "/api/ai/health",
    });
});
app.get("/health", (_req, res) => {
    res.json({
        status: "ok",
        service: "FAI AVENIQ Backend",
        isConfigured: (0, gemini_service_1.isGeminiConfigured)(),
    });
});
app.get("/api/ai/health", (_req, res) => {
    res.json({
        status: "ok",
        service: "FAI AVENIQ Engine",
        provider: "gemini",
        model: "gemini-3.8-flash",
        isConfigured: (0, gemini_service_1.isGeminiConfigured)(),
    });
});
// Authentication routes (login, signin, register, signup, me)
app.use("/api/auth", auth_routes_1.default);
// User-specific chat storage routes (isolated chats per user)
app.use("/api/chats", chat_routes_1.default);
// AI and educational API routes
app.use("/api/ai", ai_routes_1.default);
app.use("/api/ai/teacher", teacher_routes_1.default);
app.use("/api/ai/student", student_routes_1.default);
app.use("/api/ai/research", research_routes_1.default);
app.use("/api/ai/exam-prep", exam_prep_routes_1.default);
app.use("/api/ai/title", title_routes_1.default);
app.use("/api/library", library_routes_1.default);
// Global error handling middleware
app.use(error_handler_1.errorHandler);
exports.default = app;
