"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
function connectDatabase(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if DB_URI is defined
        const dbUri = process.env.DB_URI;
        if (!dbUri) {
            res.status(500).json({
                message: "Database URI is not defined in environment variables",
            });
        }
        // Check if Mongoose is already connected
        if (mongoose_1.default.connection.readyState === 0) {
            try {
                yield mongoose_1.default.connect(dbUri);
                console.log(`====================\nConnected to database\nHost: ${mongoose_1.default.connection.host}`);
                next();
            }
            catch (error) {
                console.error("Database connection error:", error); // Log the error details
                res.status(500).json({
                    message: "Failed to connect to the database",
                    error: error instanceof Error ? error.message : "Unknown error",
                });
            }
        }
        else {
            next(); // If already connected, proceed to the next middleware
        }
    });
}
// Handle graceful shutdown on SIGINT (e.g., Ctrl + C)
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.default.connection.readyState !== 0) {
        yield mongoose_1.default.connection.close();
        console.log("MongoDB connection closed due to application termination");
    }
    process.exit(0);
}));
