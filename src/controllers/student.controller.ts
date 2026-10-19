import { Request, Response, NextFunction } from "express";
import { generateStudentResource } from "../services/student.service";

export async function studentController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await generateStudentResource(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
