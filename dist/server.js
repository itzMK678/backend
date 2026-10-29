"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const server = http_1.default.createServer(app_1.default);
async function startServer() {
    // Connect to MongoDB
    await (0, db_1.connectDB)();
    server.listen(env_1.env.PORT, "0.0.0.0", () => {
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
    await (0, db_1.disconnectDB)();
    server.close(() => {
        console.log("FAI AVENIQ backend service stopped.");
        process.exit(0);
    });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
