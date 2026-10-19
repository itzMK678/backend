import http from "http";
import app from "./app";
import { env } from "./config/env";

const server = http.createServer(app);

server.listen(env.PORT, "0.0.0.0", () => {
  console.log(`=======================================================`);
  console.log(`  FAI AVENIQ Educational AI Backend Service`);
  console.log(`  Running on: http://localhost:${env.PORT}`);
  console.log(`  Environment: ${env.NODE_ENV}`);
  console.log(`  Health Check: http://localhost:${env.PORT}/health`);
  console.log(`  AI Health: http://localhost:${env.PORT}/api/ai/health`);
  console.log(`=======================================================`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("FAI AVENIQ backend service stopped.");
    process.exit(0);
  });
});