import {User} from "./user.entity";
import * as repo from "./user.repository";

export const getAllUsers = async () => {
  return await repo.getAllUsers();
};

export const findUserByEmail = async (email: string) => {
  return await repo.getUserByEmail(email);
};

export const createUser = async (user: Omit<User, "id" | "createdAt">) => {
  const {email, name, role} = user;
  return await repo.addUser(email, name, role);
};

export const updateUser = async (id: string, email: string) => {
  return await repo.updateUser(id, email);
};

export const deleteUser = async (id: string) => {
  return await repo.deleteUser(id);
};

export const getUserById = async (id: string) => {
  return await repo.findUserById(id);
};
