export type UserRole = "student" | "teacher" | "researcher";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: number;
  lastLoginAt?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: number;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  exp: number;
}
