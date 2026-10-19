import { Request, Response, NextFunction } from "express";
import { executeResearchSynthesis } from "../services/research.service";

export async function researchController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await executeResearchSynthesis(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
