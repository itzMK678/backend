import { Router } from "express";
import {
  chat,
  parseDocument,
  health,
  teacher,
  student,
  research,
  examPrep,
  generateTitle,
} from "../controllers/ai.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// Public health check endpoint
router.get("/health", health);

// Protected AI feature endpoints: user must have an account and be logged in
router.post("/chat", requireAuth, chat);
router.post("/parse-document", requireAuth, parseDocument);
router.post("/teacher", requireAuth, teacher);
router.post("/student", requireAuth, student);
router.post("/research", requireAuth, research);
router.post("/exam-prep", requireAuth, examPrep);
router.post("/title", requireAuth, generateTitle);

export default router;
