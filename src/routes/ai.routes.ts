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

const router = Router();

router.post("/chat", chat);
router.post("/parse-document", parseDocument);
router.get("/health", health);
router.post("/teacher", teacher);
router.post("/student", student);
router.post("/research", research);
router.post("/exam-prep", examPrep);
router.post("/title", generateTitle);

export default router;