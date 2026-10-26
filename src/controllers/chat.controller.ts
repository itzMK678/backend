import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import {
  getUserConversations,
  saveUserConversation,
  deleteUserConversation,
  getUserConversationById,
  StoredConversation,
} from "../services/chat-storage.service";

function resolveUserId(req: AuthenticatedRequest): string {
  if (req.user && req.user.userId) {
    return req.user.userId;
  }
  const headerUserId = req.headers["x-user-id"];
  if (typeof headerUserId === "string" && headerUserId.trim()) {
    return headerUserId.trim();
  }
  const queryUserId = req.query.userId;
  if (typeof queryUserId === "string" && queryUserId.trim()) {
    return queryUserId.trim();
  }
  return "";
}

export function getChatsController(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    const userId = resolveUserId(req);
    if (!userId) {
      res.status(401).json({
        success: false,
        error: "Authentication required to fetch personal chats.",
      });
      return;
    }

    const conversations = getUserConversations(userId);
    res.json({
      success: true,
      userId,
      count: conversations.length,
      conversations,
    });
  } catch (error) {
    next(error);
  }
}

export function getSingleChatController(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    const userId = resolveUserId(req);
    const chatId = String(req.params.id || "");

    if (!userId) {
      res.status(401).json({ success: false, error: "Authentication required." });
      return;
    }

    const conversation = getUserConversationById(userId, chatId);
    if (!conversation) {
      res.status(404).json({ success: false, error: "Chat conversation not found." });
      return;
    }

    res.json({ success: true, conversation });
  } catch (error) {
    next(error);
  }
}

export function saveChatController(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    const userId = resolveUserId(req);
    if (!userId) {
      res.status(401).json({
        success: false,
        error: "Authentication required to save chat history.",
      });
      return;
    }

    const conversationData: StoredConversation = req.body;
    if (!conversationData || !conversationData.id) {
      res.status(400).json({
        success: false,
        error: "Invalid chat payload. Conversation 'id' is required.",
      });
      return;
    }

    const saved = saveUserConversation(userId, conversationData);
    res.json({
      success: true,
      message: "Chat conversation saved successfully.",
      conversation: saved,
    });
  } catch (error) {
    next(error);
  }
}

export function deleteChatController(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    const userId = resolveUserId(req);
    const chatId = String(req.params.id || "");

    if (!userId) {
      res.status(401).json({ success: false, error: "Authentication required." });
      return;
    }

    const deleted = deleteUserConversation(userId, chatId);
    res.json({
      success: true,
      deleted,
      message: deleted ? "Conversation deleted." : "Conversation not found or already deleted.",
    });
  } catch (error) {
    next(error);
  }
}
