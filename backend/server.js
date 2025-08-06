import express from "express";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.route.js";

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Hello World"});
})

app.use("/api/todos", todoRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("server is running at http://localhost:5000");
});