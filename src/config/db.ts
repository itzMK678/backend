import mongoose from "mongoose";
import { env } from "./env";

interface ConnectionState {
  isConnected?: number;
}

const connection: ConnectionState = {};

export async function connectDB(): Promise<typeof mongoose | null> {
  if (connection.isConnected === 1) {
    return mongoose;
  }

  const mongoUri = env.MONGO_URI;

  if (!mongoUri) {
    console.warn("⚠️  [MongoDB] MONGO_URI is not defined in environment variables. Database not connected.");
    return null;
  }

  try {
    const db = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    connection.isConnected = db.connections[0].readyState;

    const host = db.connection.host || "cluster";
    const name = db.connection.name || "";
    console.log(`✅ [MongoDB] Connected successfully to host: ${host} (Database: ${name})`);

    mongoose.connection.on("error", (err) => {
      console.error("❌ [MongoDB] Connection error:", err.message || err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  [MongoDB] Connection disconnected.");
      connection.isConnected = 0;
    });

    return mongoose;
  } catch (error: any) {
    console.error("❌ [MongoDB] Error connecting to MongoDB:", error.message || error);
    connection.isConnected = 0;
    return null;
  }
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export function getDbStatus(): { status: string; readyState: number; host?: string; name?: string } {
  const stateMap: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  const state = mongoose.connection.readyState;
  return {
    status: stateMap[state] || "unknown",
    readyState: state,
    host: mongoose.connection.host,
    name: mongoose.connection.name,
  };
}

export async function disconnectDB(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    connection.isConnected = 0;
    console.log("ℹ️  [MongoDB] Disconnected.");
  }
}
