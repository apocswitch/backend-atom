import * as repo from "./task.repository";
import {Task} from "./task.entity";

export const listTasks = async (userId: string): Promise<Task[]> => {
  return await repo.getTasks(userId);
};

export const addTask = async (task: Task) => {
  return await repo.createTask(task);
};

export const modifyTask = async (id: string, updates: Partial<Task>) => {
  return await repo.updateTask(id, updates);
};

export const removeTask = async (id: string) => {
  return await repo.deleteTask(id);
};

export const listAllTasks = async () => {
  return await repo.getAllTasks();
};

export const getTaskById = async (id: string) => {
  return await repo.findTaskById(id);
};
