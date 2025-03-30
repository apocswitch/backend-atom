import * as repo from "../api/users/user.repository";
import * as service from "../api/users/user.service";
import { User } from "../api/users/user.entity";

jest.mock("../api/users/user.repository");

describe("User Service", () => {
  const mockUser: User = {
    id: "u1",
    email: "test@mail.com",
    name: "Test User",
    role: "user",
    createdAt: new Date().toISOString()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe listar todos los usuarios", async () => {
    (repo.getAllUsers as jest.Mock).mockResolvedValue([mockUser]);
    const users = await service.getAllUsers();
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe("test@mail.com");
  });

  it("debe obtener un usuario por email", async () => {
    (repo.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    const result = await service.findUserByEmail("test@mail.com");
    expect(result?.id).toBe("u1");
  });

  it("debe obtener un usuario por ID", async () => {
    (repo.findUserById as jest.Mock).mockResolvedValue(mockUser);
    const result = await service.getUserById("u1");
    expect(result?.email).toBe("test@mail.com");
  });

  it("debe crear un usuario", async () => {
    (repo.addUser as jest.Mock).mockResolvedValue(mockUser);
    const result = await service.createUser({
      email: "test@mail.com",
      name: "Test User",
      role: "user"
    });
    expect(result.name).toBe("Test User");
    expect(repo.addUser).toHaveBeenCalledWith("test@mail.com", "Test User", "user");
  });

  it("debe actualizar un usuario", async () => {
    (repo.updateUser as jest.Mock).mockResolvedValue(undefined);
    await expect(service.updateUser("u1", "new@mail.com")).resolves.toBeUndefined();
    expect(repo.updateUser).toHaveBeenCalledWith("u1", "new@mail.com");
  });

  it("debe eliminar un usuario", async () => {
    (repo.deleteUser as jest.Mock).mockResolvedValue(undefined);
    await expect(service.deleteUser("u1")).resolves.toBeUndefined();
    expect(repo.deleteUser).toHaveBeenCalledWith("u1");
  });
});
