import { PrismaClient, Status, Priority } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface CreateTaskInput {
  title: string;
  description?: string;
  status: Status;
  priority?: Priority;
  deadline?: string;
}

interface UpdateTaskInput extends CreateTaskInput {}

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, status, priority, deadline }: CreateTaskInput =
      req.body;

    if (!title || !status) {
      res.status(400).json({ error: "Title and status are required" });
      return;
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        deadline: deadline ? new Date(deadline) : null,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
    throw new Error("Error creating task");
  }
};

export const getAllTasks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, deadline }: UpdateTaskInput =
      await req.body;

    if (!title || !status) {
      res.status(400).json({ error: "Title and status are required" });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        status,
        priority,
        deadline: deadline ? new Date(deadline) : null,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
