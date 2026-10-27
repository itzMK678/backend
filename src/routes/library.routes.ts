import { Router } from "express";
import {
  getLibraryController,
  saveLibraryController,
  deleteLibraryController,
  searchLibraryController,
} from "../controllers/library.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// Protected Knowledge Library routes: user must be logged in
router.get("/", requireAuth, getLibraryController);
router.post("/", requireAuth, saveLibraryController);
router.delete("/:id", requireAuth, deleteLibraryController);
router.post("/search", requireAuth, searchLibraryController);

export default router;
