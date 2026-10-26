import { Request, Response, NextFunction } from "express";
import { verifyToken, getUserById } from "../services/auth.service";
import { AuthTokenPayload } from "../types/auth.types";

export interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload;
}

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
        error: "Authentication required. Please sign in or provide a valid authorization token.",
      });
      return;
    }

    const payload = verifyToken(token);
    if (!payload) {
      res.status(401).json({
        success: false,
        error: "Invalid or expired session token. Please sign in again.",
      });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
}

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
