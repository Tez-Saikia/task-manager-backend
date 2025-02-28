import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import fs from "fs";
import { Task } from "./type"; // Ensure this is the correct path

const app = express();

app.use(cors({
    origin: ["https://todo-task-management-frontend.netlify.app", "http://localhost:5177"]
}));
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

// Function to check and update task timeouts
const checkTaskTimeouts = () => {
    const now = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    let tasks = readTasks();

    tasks = tasks.map(task => {
        if (task.status !== "Timeout" && task.deadline < now) {
            return { ...task, status: "Timeout" };
        }
        return task;
    });

    writeTasks(tasks);
    console.log("Checked and updated task timeouts");
};

// Run timeout check every minute
setInterval(checkTaskTimeouts, 60000);

// Start the server
app.listen(5000, () => {
    console.log("Server running on port 5000");
    checkTaskTimeouts(); // Run once at startup
});
