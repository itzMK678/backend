"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("../controllers/ai.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public health check endpoint
router.get("/health", ai_controller_1.health);
// Protected AI feature endpoints: user must have an account and be logged in
router.post("/chat", auth_middleware_1.requireAuth, ai_controller_1.chat);
router.post("/parse-document", auth_middleware_1.requireAuth, ai_controller_1.parseDocument);
router.post("/teacher", auth_middleware_1.requireAuth, ai_controller_1.teacher);
router.post("/student", auth_middleware_1.requireAuth, ai_controller_1.student);
router.post("/research", auth_middleware_1.requireAuth, ai_controller_1.research);
router.post("/exam-prep", auth_middleware_1.requireAuth, ai_controller_1.examPrep);
router.post("/title", auth_middleware_1.requireAuth, ai_controller_1.generateTitle);
exports.default = router;
