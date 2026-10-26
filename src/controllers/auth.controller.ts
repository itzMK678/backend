import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser, getUserById } from "../services/auth.service";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export function registerController(req: Request, res: Response, next: NextFunction): void {
  try {
    const { name, email, password, role } = req.body;
    const result = registerUser({ name, email, password, role });

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: result.user,
      token: result.token,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || "Failed to create account.",
    });
  }
}

export function loginController(req: Request, res: Response, next: NextFunction): void {
  try {
    const { email, password } = req.body;
    const result = loginUser({ email, password });

    res.json({
      success: true,
      message: "Signed in successfully.",
      user: result.user,
      token: result.token,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: error.message || "Authentication failed.",
    });
  }
}

export function getMeController(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Not authenticated" });
      return;
    }

    const user = getUserById(req.user.userId);
    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
}
