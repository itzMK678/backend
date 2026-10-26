import fs from "fs";
import path from "path";
import crypto from "crypto";
import { env } from "../config/env";
import { UserRecord, UserProfile, AuthTokenPayload, UserRole } from "../types/auth.types";

const DATA_DIR = process.env.VERCEL ? "/tmp" : path.resolve(__dirname, "..", "..", "data");
const USERS_FILE = path.resolve(DATA_DIR, "users.json");

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function loadUsersFromDisk(): UserRecord[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([]), "utf-8");
      return [];
    }
    const raw = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(raw) || [];
  } catch (err) {
    console.error("Error reading users from disk:", err);
    return [];
  }
}

export function saveUsersToDisk(users: UserRecord[]): boolean {
  try {
    ensureDataDir();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing users to disk:", err);
    return false;
  }
}

/**
 * Hashes password with random salt using scrypt.
 * Output format: "salt:hash"
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verifies a password against the stored salt:hash.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;
    const derivedKey = crypto.scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, "hex");
    return crypto.timingSafeEqual(derivedKey, keyBuffer);
  } catch {
    return false;
  }
}

/**
 * Base64URL encoding helper
 */
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str: string): string {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) {
    b64 += "=";
  }
  return Buffer.from(b64, "base64").toString("utf-8");
}

/**
 * Generates an HMAC-SHA256 JWT-compatible token valid for 30 days.
 */
export function generateToken(payload: Omit<AuthTokenPayload, "exp">): string {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days
  const fullPayload: AuthTokenPayload = { ...payload, exp };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));

  const signature = crypto
    .createHmac("sha256", env.JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verifies an HMAC-SHA256 JWT-compatible token.
 */
export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", env.JWT_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    if (signature !== expectedSignature) return null;

    const payload: AuthTokenPayload = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Strips sensitive fields like passwordHash from user record.
 */
export function toUserProfile(user: UserRecord): UserProfile {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export function registerUser(params: {
  name: string;
  email: string;
  password: string;
  role?: string;
}): { user: UserProfile; token: string } {
  const name = (params.name || "").trim();
  const email = (params.email || "").trim().toLowerCase();
  const password = params.password || "";
  const role: UserRole = (params.role === "teacher" || params.role === "researcher") ? params.role : "student";

  if (!name) {
    throw new Error("Full name is required.");
  }
  if (!email || !email.includes("@")) {
    throw new Error("A valid email address is required.");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const users = loadUsersFromDisk();
  const existing = users.find((u) => u.email === email);
  if (existing) {
    throw new Error("An account with this email already exists. Please sign in instead.");
  }

  const newUser: UserRecord = {
    id: `usr_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
    name,
    email,
    passwordHash: hashPassword(password),
    role,
    createdAt: Date.now(),
    lastLoginAt: Date.now(),
  };

  users.push(newUser);
  saveUsersToDisk(users);

  const profile = toUserProfile(newUser);
  const token = generateToken({
    userId: profile.id,
    email: profile.email,
    name: profile.name,
    role: profile.role,
  });

  return { user: profile, token };
}

export function loginUser(params: {
  email: string;
  password: string;
}): { user: UserProfile; token: string } {
  const email = (params.email || "").trim().toLowerCase();
  const password = params.password || "";

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const users = loadUsersFromDisk();
  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new Error("Invalid email or password. Please check your credentials.");
  }

  const isMatch = verifyPassword(password, user.passwordHash);
  if (!isMatch) {
    throw new Error("Invalid email or password. Please check your credentials.");
  }

  user.lastLoginAt = Date.now();
  saveUsersToDisk(users);

  const profile = toUserProfile(user);
  const token = generateToken({
    userId: profile.id,
    email: profile.email,
    name: profile.name,
    role: profile.role,
  });

  return { user: profile, token };
}

export function getUserById(userId: string): UserProfile | null {
  const users = loadUsersFromDisk();
  const user = users.find((u) => u.id === userId);
  return user ? toUserProfile(user) : null;
}
