import express from "express";

import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/task-controller";

export const taskRouter = express.Router();

taskRouter.get("/", getAllTasks);
taskRouter.get("/:type", getTaskById);
taskRouter.post("/", createTask);
taskRouter.put("/edit", updateTask);
taskRouter.delete("/delete", deleteTask);
