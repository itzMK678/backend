import { Request, Response, NextFunction } from "express";
import {
  loadLibraryFromDisk,
  saveLibraryToDisk,
  findRelevantLibraryPassages,
} from "../services/knowledge-library.service";
import { StoredLibraryDoc } from "../types/ai.types";

export function getLibraryController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req.query.userId as string) || (req.headers["x-user-id"] as string) || "";
    if (!userId) {
      res.status(400).json({ error: "User identifier is required to access private library." });
      return;
    }
    const all = loadLibraryFromDisk();
    const userDocs = all
      .filter((d) => d.userId === userId)
      .sort((a, b) => b.updatedAt - a.updatedAt);
    res.json({ success: true, documents: userDocs });
  } catch (error) {
    next(error);
  }
}

export function saveLibraryController(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      id,
      userId,
      title,
      bookName,
      subject,
      classLevel,
      chapter,
      fileType,
      fileName,
      extractedText,
      wordCount,
      fileSizeBytes,
      summary,
    } = req.body;

    if (!userId || !userId.trim()) {
      res.status(400).json({ error: "User identifier is required to save document." });
      return;
    }
    if (!extractedText || !extractedText.trim()) {
      res.status(400).json({ error: "Document must contain extracted text to be saved." });
      return;
    }

    const docId = id || `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = Date.now();

    const newDoc: StoredLibraryDoc = {
      id: docId,
      userId: userId.trim(),
      title: (title || bookName || fileName || "Study Document").trim(),
      bookName: (bookName || title || fileName || "Standard Textbook").trim(),
      subject: (subject || "general").trim(),
      classLevel: (classLevel || "General Academic").trim(),
      chapter: (chapter || "General Chapter").trim(),
      fileType: fileType || "pdf",
      fileName: fileName || "document.pdf",
      extractedText: extractedText.trim(),
      wordCount: wordCount || extractedText.trim().split(/\s+/).length,
      fileSizeBytes: fileSizeBytes || Buffer.byteLength(extractedText, "utf-8"),
      summary: summary?.trim(),
      createdAt: now,
      updatedAt: now,
    };

    const all = loadLibraryFromDisk();
    const existingIndex = all.findIndex((d) => d.id === docId && d.userId === userId);

    if (existingIndex >= 0) {
      newDoc.createdAt = all[existingIndex].createdAt;
      all[existingIndex] = newDoc;
    } else {
      all.unshift(newDoc);
    }

    const saved = saveLibraryToDisk(all);
    if (!saved) {
      res.status(500).json({
        error: "Persistent storage write failed. Document could not be saved to disk.",
        success: false,
      });
      return;
    }

    res.json({
      success: true,
      document: newDoc,
      message: "Document saved permanently to Knowledge Library.",
    });
  } catch (error) {
    next(error);
  }
}

export function deleteLibraryController(req: Request, res: Response, next: NextFunction) {
  try {
    const docId = req.params.id;
    const userId = (req.query.userId as string) || (req.headers["x-user-id"] as string) || "";

    if (!docId || !userId) {
      res.status(400).json({ error: "Document ID and User ID are required." });
      return;
    }

    const all = loadLibraryFromDisk();
    const filtered = all.filter((d) => !(d.id === docId && d.userId === userId));

    const saved = saveLibraryToDisk(filtered);
    if (!saved) {
      res.status(500).json({ error: "Failed to update persistent storage." });
      return;
    }

    res.json({ success: true, message: "Document deleted from Knowledge Library." });
  } catch (error) {
    next(error);
  }
}

export function searchLibraryController(req: Request, res: Response, next: NextFunction) {
  try {
    const { query, userId, subject, docId } = req.body;
    if (!query) {
      res.status(400).json({ error: "Query is required for search." });
      return;
    }
    const matches = findRelevantLibraryPassages(query, userId, docId, subject);
    res.json({ success: true, results: matches });
  } catch (error) {
    next(error);
  }
}
