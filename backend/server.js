import express from "express";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.route.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
dotenv.config();

// Root route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

// Todo routes
app.use("/api/todos", todoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
