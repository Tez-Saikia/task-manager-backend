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
exports.getStreamingData = exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getTasks = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Dummy in-memory tasks list
let tasks = [
    { id: "1", title: "Brainstorming", status: "To Do", priority: "Low", deadline: "12/5/24" },
    { id: "2", title: "Onboarding Illustrations", status: "In Progress", priority: "Low", deadline: "12/5/24" },
];
// Get all tasks
const getTasks = (req, res) => {
    res.json(tasks);
};
exports.getTasks = getTasks;
// Get task by ID
const getTaskById = (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    res.json(task);
};
exports.getTaskById = getTaskById;
// Create a new task
const createTask = (req, res) => {
    const newTask = Object.assign({ id: (tasks.length + 1).toString() }, req.body);
    tasks.push(newTask);
    res.status(201).json(newTask);
};
exports.createTask = createTask;
// Update a task
const updateTask = (req, res) => {
    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    tasks[index] = Object.assign(Object.assign({}, tasks[index]), req.body);
    res.json(tasks[index]);
};
exports.updateTask = updateTask;
// Delete a task
const deleteTask = (req, res) => {
    tasks = tasks.filter((t) => t.id !== req.params.id);
    res.json({ message: "Task deleted" });
};
exports.deleteTask = deleteTask;
// Fetch Twitch Streaming Data
const getStreamingData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.twitch.tv/helix/streams", {
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID,
                Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
            },
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch streaming data", error: error });
    }
});
exports.getStreamingData = getStreamingData;
