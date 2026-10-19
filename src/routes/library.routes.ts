import { Router } from "express";
import {
  getLibraryController,
  saveLibraryController,
  deleteLibraryController,
  searchLibraryController,
} from "../controllers/library.controller";

const router = Router();

router.get("/", getLibraryController);
router.post("/", saveLibraryController);
router.delete("/:id", deleteLibraryController);
router.post("/search", searchLibraryController);

export default router;
