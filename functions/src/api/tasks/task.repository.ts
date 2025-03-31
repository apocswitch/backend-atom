import {db} from "../../config/firebase";
import {Task} from "./task.entity";

const collection = db.collection("tasks");

export const getTasks = async (userId: string) => {
  const snapshot = await collection
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc") // 👈 orden descendente
    .get();

  return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})) as Task[];
};

export const createTask = async (task: Task) => {
  const ref = await collection.add({
    ...task, createdAt: new Date().toISOString(),
  });
  return {id: ref.id};
};

export const updateTask = async (id: string, data: Partial<Task>) => {
  await collection.doc(id).update(data);
};

export const deleteTask = async (id: string) => {
  await collection.doc(id).delete();
};

export const getAllTasks = async () => {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})) as Task[];
};

export const findTaskById = async (id: string) => {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return {id: doc.id, ...doc.data()} as Task;
};
