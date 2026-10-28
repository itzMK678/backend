import http from "http";
import app from "./app";
import { env } from "./config/env";
import { connectDB, disconnectDB } from "./config/db";

const server = http.createServer(app);

async function startServer() {
  // Connect to MongoDB
  await connectDB();

  server.listen(env.PORT, "0.0.0.0", () => {
    console.log(`=======================================================`);
    console.log(`  FAI AVENIQ Educational AI Backend Service`);
  
    console.log(`=======================================================`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

async function shutdown() {
  console.log("Shutting down FAI AVENIQ backend service...");
  await disconnectDB();
  server.close(() => {
    console.log("FAI AVENIQ backend service stopped.");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
