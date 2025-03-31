import {db} from "../../config/firebase";
import {User} from "./user.entity";

const collection = db.collection("users");

export const getAllUsers = async (): Promise<User[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})) as User[];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const snapshot = await collection.where("email", "==", email).get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return {id: doc.id, ...doc.data()} as User;
};

export const addUser = async (email: string): Promise<User> => {
  const createdAt = new Date().toISOString();
  const ref = await collection.add({email, createdAt});
  return {id: ref.id, email, createdAt};
};


export const updateUser = async (id: string, email: string) => {
  await collection.doc(id).update({email});
};

export const deleteUser = async (id: string) => {
  await collection.doc(id).delete();
};

export const findUserById = async (id: string): Promise<User | null> => {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return {id: doc.id, ...doc.data()} as User;
};
