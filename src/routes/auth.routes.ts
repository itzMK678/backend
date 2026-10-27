import { Router } from "express";
import { registerController, loginController, getMeController } from "../controllers/auth.controller";
import { requireAuth, validateSignIn, validateSignUp } from "../middleware/auth.middleware";

const router = Router();

// Sign up / Create Account with validation middleware
router.post("/register", validateSignUp, registerController);
router.post("/signup", validateSignUp, registerController);

// Sign in / Login with validation middleware
router.post("/login", validateSignIn, loginController);
router.post("/signin", validateSignIn, loginController);

// Current user profile protected with requireAuth middleware
router.get("/me", requireAuth, getMeController);

export default router;
