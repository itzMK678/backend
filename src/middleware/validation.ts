import { Request, Response, NextFunction } from "express";

export function validateRequiredFields(fields: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missing = fields.filter((f) => req.body?.[f] === undefined || req.body?.[f] === null || req.body?.[f] === "");
    if (missing.length > 0) {
      res.status(400).json({
        error: `Missing required field(s): ${missing.join(", ")}`,
      });
      return;
    }
    next();
  };
}
