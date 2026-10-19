import { Request, Response, NextFunction } from "express";
import { generateTeacherResource } from "../services/teacher.service";

export async function teacherController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await generateTeacherResource(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}