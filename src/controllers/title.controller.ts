import { Request, Response, NextFunction } from "express";
import { generateConversationTitle } from "../services/title.service";

export async function titleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const prompt = req.body.prompt || req.body.firstMessage;
    const result = await generateConversationTitle(prompt);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
