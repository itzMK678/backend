"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    PORT: Number(process.env.PORT || 5000),
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    NODE_ENV: process.env.NODE_ENV || "development",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    ENABLE_WEB_RESEARCH: process.env.ENABLE_WEB_RESEARCH === "true",
};
