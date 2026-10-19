"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = exports.parseDocument = exports.chat = void 0;
exports.chatController = chatController;
exports.parseDocumentController = parseDocumentController;
exports.healthController = healthController;
exports.teacher = teacher;
exports.student = student;
exports.research = research;
exports.examPrep = examPrep;
exports.generateTitle = generateTitle;
const ai_service_1 = require("../services/ai.service");
const document_parser_service_1 = require("../services/document-parser.service");
const teacher_service_1 = require("../services/teacher.service");
const student_service_1 = require("../services/student.service");
const research_service_1 = require("../services/research.service");
const exam_prep_service_1 = require("../services/exam-prep.service");
const title_service_1 = require("../services/title.service");
const gemini_service_1 = require("../services/gemini.service");
async function chatController(req, res, next) {
    try {
        const result = await (0, ai_service_1.generateChatResponse)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
async function parseDocumentController(req, res, next) {
    try {
        const { name, type, base64 } = req.body;
        if (!base64) {
            res.status(400).json({ error: "base64 document payload required" });
            return;
        }
        const result = await (0, document_parser_service_1.parseDocumentPayload)(name, type, base64);
        res.json({ success: true, ...result });
    }
    catch (error) {
        next(error);
    }
}
function healthController(_req, res) {
    const isConfigured = (0, gemini_service_1.isGeminiConfigured)();
    res.json({
        status: "ok",
        service: "FAI AVENIQ Engine",
        provider: "gemini",
        model: "gemini-3.8-flash",
        isConfigured,
    });
}
// Route handlers for modular or unified routing
exports.chat = chatController;
exports.parseDocument = parseDocumentController;
exports.health = healthController;
async function teacher(req, res, next) {
    try {
        const result = await (0, teacher_service_1.generateTeacherResource)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
async function student(req, res, next) {
    try {
        const result = await (0, student_service_1.generateStudentResource)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
async function research(req, res, next) {
    try {
        const result = await (0, research_service_1.executeResearchSynthesis)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
async function examPrep(req, res, next) {
    try {
        const result = await (0, exam_prep_service_1.generateExamPreparation)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
async function generateTitle(req, res, next) {
    try {
        const prompt = req.body.prompt || req.body.firstMessage;
        const result = await (0, title_service_1.generateConversationTitle)(prompt);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
