"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const server = http_1.default.createServer(app_1.default);
server.listen(env_1.env.PORT, "0.0.0.0", () => {
    console.log(`=======================================================`);
    console.log(`  FAI AVENIQ Educational AI Backend Service`);
    console.log(`  Running on: http://localhost:${env_1.env.PORT}`);
    console.log(`  Environment: ${env_1.env.NODE_ENV}`);
    console.log(`  Health Check: http://localhost:${env_1.env.PORT}/health`);
    console.log(`  AI Health: http://localhost:${env_1.env.PORT}/api/ai/health`);
    console.log(`=======================================================`);
});
process.on("SIGINT", () => {
    server.close(() => {
        console.log("FAI AVENIQ backend service stopped.");
        process.exit(0);
    });
});
