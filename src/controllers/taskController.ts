import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Dummy in-memory tasks list
let tasks = [
  { id: "1", title: "Brainstorming", status: "To Do", priority: "Low", deadline: "12/5/24" },
  { id: "2", title: "Onboarding Illustrations", status: "In Progress", priority: "Low", deadline: "12/5/24" },
];

// Get all tasks
export const getTasks = (req: Request, res: Response): void => {
  res.json(tasks);
};

// Get task by ID
export const getTaskById = (req: Request, res: Response): void => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.json(task);
};

// Create a new task
export const createTask = (req: Request, res: Response): void => {
  const newTask = { id: (tasks.length + 1).toString(), ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Update a task
export const updateTask = (req: Request, res: Response): void => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
};

// Delete a task
export const deleteTask = (req: Request, res: Response): void => {
  tasks = tasks.filter((t) => t.id !== req.params.id);
  res.json({ message: "Task deleted" });
};

// Fetch Twitch Streaming Data
export const getStreamingData = async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://api.twitch.tv/helix/streams", {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID!,
        Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN!}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch streaming data", error: error });
  }
};
