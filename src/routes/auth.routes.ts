import { Router } from "express";
import { registerController, loginController, getMeController } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// Public auth endpoints
router.post("/register", registerController);
router.post("/signup", registerController);
router.post("/login", loginController);
router.post("/signin", loginController);

// Protected auth endpoints
router.get("/me", requireAuth, getMeController);

export default router;
