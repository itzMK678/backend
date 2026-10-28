import app from "../src/app";
import { connectDB } from "../src/config/db";

// Connect to MongoDB in serverless environments
connectDB().catch((err) => {
  console.error("Serverless MongoDB connection warning:", err);
});

export default app;
