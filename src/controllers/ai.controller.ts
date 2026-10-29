import { Request, Response, NextFunction } from "express";
import { generateChatResponse } from "../services/ai.service";
import { parseDocumentPayload } from "../services/document-parser.service";
import { generateTeacherResource } from "../services/teacher.service";
import { generateStudentResource } from "../services/student.service";
import { executeResearchSynthesis } from "../services/research.service";
import { generateExamPreparation } from "../services/exam-prep.service";
import { generateConversationTitle } from "../services/title.service";
import { isGeminiConfigured } from "../services/gemini.service";

export async function chatController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await generateChatResponse(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function parseDocumentController(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, type, base64 } = req.body;
    if (!base64) {
      res.status(400).json({ error: "base64 document payload required" });
      return;
    }
    const result = await parseDocumentPayload(name, type, base64);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}

export function healthController(_req: Request, res: Response) {
  const isConfigured = isGeminiConfigured();
  res.json({
    status: "ok",
    service: "FAI AVENIQ Engine",
    provider: "gemini",
    model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
    isConfigured,
  });
}

// Route handlers for modular or unified routing
export const chat = chatController;
export const parseDocument = parseDocumentController;
export const health = healthController;

export async function teacher(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await generateTeacherResource(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function student(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await generateStudentResource(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function research(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await executeResearchSynthesis(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function examPrep(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await generateExamPreparation(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function generateTitle(req: Request, res: Response, next: NextFunction) {
  try {
    const prompt = req.body.prompt || req.body.firstMessage;
    const result = await generateConversationTitle(prompt);
    res.json(result);
  } catch (error) {
    next(error);
  }
}