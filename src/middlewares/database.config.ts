import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express-serve-static-core";

export async function connectDatabase(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Check if DB_URI is defined
  const dbUri = process.env.DB_URI;
  if (!dbUri) {
    res.status(500).json({
      message: "Database URI is not defined in environment variables",
    });
  }

  // Check if Mongoose is already connected
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(<string>dbUri);
      console.log(
        `====================\nConnected to database\nHost: ${mongoose.connection.host}`
      );
      next();
    } catch (error) {
      console.error("Database connection error:", error); // Log the error details
      res.status(500).json({
        message: "Failed to connect to the database",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else {
    next(); // If already connected, proceed to the next middleware
  }
}

// Handle graceful shutdown on SIGINT (e.g., Ctrl + C)
process.on("SIGINT", async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to application termination");
  }
  process.exit(0);
});
