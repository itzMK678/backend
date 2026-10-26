import fs from "fs";
import path from "path";

const DATA_DIR = process.env.VERCEL ? "/tmp" : path.resolve(__dirname, "..", "..", "data");
const CHATS_DIR = path.resolve(DATA_DIR, "chats");

function ensureChatsDir(): void {
  if (!fs.existsSync(CHATS_DIR)) {
    fs.mkdirSync(CHATS_DIR, { recursive: true });
  }
}

/**
 * Sanitizes userId to ensure safe file path operations.
 */
function getUserChatFilePath(userId: string): string {
  ensureChatsDir();
  const safeId = userId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.resolve(CHATS_DIR, `${safeId}.json`);
}

export interface StoredChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  attachment?: any;
  metadata?: any;
}

export interface StoredConversation {
  id: string;
  userId?: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  role: string;
  subject: string;
  language: string;
  difficulty: string;
  messages: StoredChatMessage[];
  studyMemory?: any;
}

/**
 * Loads all conversations belonging strictly to the specified user.
 */
export function getUserConversations(userId: string): StoredConversation[] {
  try {
    if (!userId || !userId.trim()) return [];
    const filePath = getUserChatFilePath(userId.trim());
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.sort((a, b) => b.updatedAt - a.updatedAt);
    }
    return [];
  } catch (err) {
    console.error(`Error loading chats for user ${userId}:`, err);
    return [];
  }
}

/**
 * Saves or updates a conversation for a specific user.
 */
export function saveUserConversation(
  userId: string,
  convo: StoredConversation
): StoredConversation {
  if (!userId || !userId.trim()) {
    throw new Error("Cannot save chat: Missing user identifier.");
  }
  const cleanUserId = userId.trim();
  const list = getUserConversations(cleanUserId);

  const existingIndex = list.findIndex((c) => c.id === convo.id);
  const updatedConvo: StoredConversation = {
    ...convo,
    userId: cleanUserId,
    updatedAt: convo.updatedAt || Date.now(),
    createdAt: convo.createdAt || Date.now(),
  };

  if (existingIndex >= 0) {
    list[existingIndex] = updatedConvo;
  } else {
    list.unshift(updatedConvo);
  }

  const filePath = getUserChatFilePath(cleanUserId);
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf-8");
  return updatedConvo;
}

/**
 * Deletes a specific conversation for a user.
 */
export function deleteUserConversation(userId: string, convoId: string): boolean {
  if (!userId || !userId.trim()) return false;
  const cleanUserId = userId.trim();
  const list = getUserConversations(cleanUserId);
  const filtered = list.filter((c) => c.id !== convoId);

  if (filtered.length !== list.length) {
    const filePath = getUserChatFilePath(cleanUserId);
    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  }
  return false;
}

/**
 * Retrieves a single conversation by ID for a user.
 */
export function getUserConversationById(
  userId: string,
  convoId: string
): StoredConversation | null {
  const list = getUserConversations(userId);
  return list.find((c) => c.id === convoId) || null;
}
