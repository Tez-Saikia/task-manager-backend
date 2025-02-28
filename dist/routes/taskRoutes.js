"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
const FILE_PATH = "tasks.json";
// Default tasks (old tasks)
const defaultTasks = [
    {
        id: 1,
        importance: "Low",
        title: "Brainstorming",
        description: "Brainstorming brings team members' diverse experience into play.",
        deadline: "2025-05-12",
        status: "To Do",
    },
    {
        id: 2,
        importance: "High",
        title: "Research",
        description: "User research helps create an optimal product.",
        deadline: "2025-05-19",
        status: "To Do",
    },
    {
        id: 3,
        importance: "High",
        title: "Wireframes",
        description: "Low-fidelity wireframes include basic content and visuals.",
        deadline: "2025-05-24",
        status: "To Do",
    },
];
const readTasks = () => {
    try {
        if (!fs_1.default.existsSync(FILE_PATH)) {
            writeTasks(defaultTasks);
            return defaultTasks;
        }
        const data = fs_1.default.readFileSync(FILE_PATH, "utf8");
        const tasks = data ? JSON.parse(data) : [];
        return tasks;
    }
    catch (error) {
        console.error("Error reading tasks:", error);
        return [];
    }
};
// Function for JSON file
const writeTasks = (tasks) => {
    fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf8");
};
router.get("/tasks", (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});
router.post("/tasks", (req, res) => {
    const tasks = readTasks();
    const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const task = Object.assign({ id: newId }, req.body);
    tasks.push(task);
    writeTasks(tasks);
    res.status(201).json(task);
});
// PUT Update a Task
router.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    let tasks = readTasks();
    tasks = tasks.map((task) => task.id === Number(id) ? Object.assign(Object.assign({}, task), req.body) : task);
    writeTasks(tasks);
    res.json({ message: `Task ${id} updated`, tasks });
});
// DELETE a Task
router.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    let tasks = readTasks();
    const filteredTasks = tasks.filter((task) => task.id !== Number(id));
    writeTasks(filteredTasks);
    res.json({ message: `Task ${id} deleted`, tasks: filteredTasks });
});
exports.default = router;
