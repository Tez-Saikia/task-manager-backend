import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes"; 

const app = express();

app.use(cors({
     origin: "https://todo-task-management-frontend.netlify.app/, 'http://localhost:5177'"
}));
app.use(express.json());

app.use("/api", taskRoutes);
app.listen(5000, () => console.log("Server running on port 5000"));
