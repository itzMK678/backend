import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("[Error Handler]", error?.message || error);

  let statusCode = error?.statusCode || 500;
  if (statusCode >= 502 && statusCode <= 504) statusCode = 500;

  res.status(statusCode).json({
    error: error?.message || "Internal server error",
    isConfigError: Boolean(error?.isConfigError),
  });
}

export const errorHandler = errorMiddleware;