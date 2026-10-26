import { Router } from "express";
import {
  getChatsController,
  getSingleChatController,
  saveChatController,
  deleteChatController,
} from "../controllers/chat.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// All chat routes are protected - chats are saved separately per user
router.get("/", requireAuth, getChatsController);
router.post("/", requireAuth, saveChatController);
router.get("/:id", requireAuth, getSingleChatController);
router.delete("/:id", requireAuth, deleteChatController);

export default router;
