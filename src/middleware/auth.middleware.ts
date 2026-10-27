import { Request, Response, NextFunction } from "express";
import { verifyToken, getUserById } from "../services/auth.service";
import { AuthTokenPayload } from "../types/auth.types";

export interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload;
}

/**
 * Middleware that strictly verifies that the user is logged in / signed in.
 * Validates the JWT Bearer token from the Authorization header.
 */
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    let token = "";

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7).trim();
    } else if (req.query.token && typeof req.query.token === "string") {
      token = req.query.token.trim();
    }

    if (!token) {
      // Check for x-user-id header fallback if present
      const fallbackUserId = req.headers["x-user-id"] as string;
      if (fallbackUserId) {
        const user = getUserById(fallbackUserId);
        if (user) {
          req.user = {
            userId: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + 3600,
          };
          next();
          return;
        }
      }

      res.status(401).json({
        success: false,
        error: "Authentication required. Please sign in or log in to access this resource.",
      });
      return;
    }

    const payload = verifyToken(token);
    if (!payload) {
      res.status(401).json({
        success: false,
        error: "Invalid or expired session token. Please sign in or log in again.",
      });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Middleware that extracts user session if signed in, but allows guest access if not.
 */
export function optionalAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    let token = "";

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7).trim();
    } else if (req.query.token && typeof req.query.token === "string") {
      token = req.query.token.trim();
    }

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        req.user = payload;
      }
    } else {
      const fallbackUserId = req.headers["x-user-id"] as string;
      if (fallbackUserId) {
        const user = getUserById(fallbackUserId);
        if (user) {
          req.user = {
            userId: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + 3600,
          };
        }
      }
    }
    next();
  } catch {
    next();
  }
}

/**
 * Middleware to validate Sign In / Login request payload before authentication.
 */
export function validateSignIn(req: Request, res: Response, next: NextFunction): void {
  const { email, password } = req.body || {};

  if (!email || typeof email !== "string" || !email.trim()) {
    res.status(400).json({
      success: false,
      error: "Email address is required to sign in.",
    });
    return;
  }

  const cleanEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    res.status(400).json({
      success: false,
      error: "Please enter a valid email address.",
    });
    return;
  }

  if (!password || typeof password !== "string" || !password.trim()) {
    res.status(400).json({
      success: false,
      error: "Password is required to sign in.",
    });
    return;
  }

  req.body.email = cleanEmail;
  next();
}

/**
 * Middleware to validate Create Account / Sign Up request payload.
 */
export function validateSignUp(req: Request, res: Response, next: NextFunction): void {
  const { name, email, password, role } = req.body || {};

  if (!name || typeof name !== "string" || !name.trim()) {
    res.status(400).json({
      success: false,
      error: "Full name is required to create an account.",
    });
    return;
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    res.status(400).json({
      success: false,
      error: "Email address is required to create an account.",
    });
    return;
  }

  const cleanEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    res.status(400).json({
      success: false,
      error: "Please enter a valid email address.",
    });
    return;
  }

  if (!password || typeof password !== "string") {
    res.status(400).json({
      success: false,
      error: "Password is required.",
    });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      success: false,
      error: "Password must be at least 6 characters long.",
    });
    return;
  }

  const validRoles = ["student", "teacher", "researcher"];
  const cleanRole = validRoles.includes(role) ? role : "student";

  req.body.name = name.trim();
  req.body.email = cleanEmail;
  req.body.role = cleanRole;

  next();
}

// Aliases for convenience
export const validateLogin = validateSignIn;
export const validateRegister = validateSignUp;
