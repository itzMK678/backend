import { Router } from "express";
import { studentController } from "../controllers/student.controller";

const router = Router();

router.post("/", studentController);

export default router;