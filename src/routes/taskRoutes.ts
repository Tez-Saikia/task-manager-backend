import express, { Request, Response, Router } from "express";
import { Task } from "../type";
import fs from "fs";

const router = Router();
const FILE_PATH = "tasks.json";

// Default tasks (old tasks)
const defaultTasks: Task[] = [
  {
    id: 1,
    importance: "Low",
    title: "Brainstorming",
    description:
      "Brainstorming brings team members' diverse experience into play.",
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

const readTasks = (): Task[] => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      writeTasks(defaultTasks);
      return defaultTasks;
    }

    const data = fs.readFileSync(FILE_PATH, "utf8");
    const tasks = data ? JSON.parse(data) : [];

    return tasks;
  } catch (error) {
    console.error("Error reading tasks:", error);
    return [];
  }
};

// Function for JSON file
const writeTasks = (tasks: Task[]) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf8");
};

router.get("/tasks", (req: Request, res: Response) => {
  const tasks = readTasks();
  res.json(tasks);
});

router.post("/tasks", (req: Request, res: Response) => {
  const tasks = readTasks();

  const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

  const task: Task = { id: newId, ...req.body };

  tasks.push(task);
  writeTasks(tasks);

  res.status(201).json(task);
});

// PUT Update a Task
router.put("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  let tasks = readTasks();
  tasks = tasks.map((task) =>
    task.id === Number(id) ? { ...task, ...req.body } : task
  );
  writeTasks(tasks);
  res.json({ message: `Task ${id} updated`, tasks });
});

// DELETE a Task
router.delete("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  let tasks = readTasks();

  const filteredTasks = tasks.filter((task) => task.id !== Number(id)); 

  writeTasks(filteredTasks); 

  res.json({ message: `Task ${id} deleted`, tasks: filteredTasks });
});

export default router;
