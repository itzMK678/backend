import { Router } from "express";
import { researchController } from "../controllers/research.controller";

const router = Router();

router.post("/", researchController);

export default router;