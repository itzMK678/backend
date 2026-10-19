import { Router } from "express";
import { teacherController } from "../controllers/teacher.controller";

const router = Router();

router.post("/", teacherController);

export default router;