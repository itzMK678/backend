import { Router } from "express";
import { titleController } from "../controllers/title.controller";

const router = Router();

router.post("/", titleController);

export default router;