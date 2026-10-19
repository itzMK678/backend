import { Router } from "express";
import { examPrepController } from "../controllers/examPrep.controller";

const router = Router();

router.post("/", examPrepController);

export default router;