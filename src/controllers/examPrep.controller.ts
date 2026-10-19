import { Request, Response, NextFunction } from "express";
import { generateExamPreparation } from "../services/exam-prep.service";

export async function examPrepController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await generateExamPreparation(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}