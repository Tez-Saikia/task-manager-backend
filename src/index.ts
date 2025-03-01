import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import fs from "fs";
import { Task } from "./type"; // Ensure this is the correct path

const app = express();

app.use(
  cors({
    origin: [
      "https://todo-task-management-frontend.netlify.app",
      "http://localhost:5177",
    ],
  })
);
app.use(express.json());
app.use("/api", taskRoutes);

const FILE_PATH = "tasks.json";

// Function to read tasks from JSON file
const readTasks = (): Task[] => {
  try {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading tasks:", error);
    return [];
  }
};

// Function to write tasks to JSON file
const writeTasks = (tasks: Task[]) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf8");
};

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
