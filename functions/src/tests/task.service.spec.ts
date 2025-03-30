import * as repo from "../api/tasks/task.repository";
import * as service from "../api/tasks/task.service";

jest.mock("../api/tasks/task.repository");

describe("Task Service", () => {
  const mockTask = {
    id: "1",
    title: "Test",
    description: "Desc",
    completed: false,
    userId: "123",
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe listar tareas de un usuario", async () => {
    (repo.getTasks as jest.Mock).mockResolvedValue([mockTask]);
    const tasks = await service.listTasks("123");
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Test");
  });

  it("debe crear una tarea", async () => {
    (repo.createTask as jest.Mock).mockResolvedValue({id: "1"});
    const result = await service.addTask({
      title: "Nueva",
      description: "",
      completed: false,
      userId: "123",
      createdAt: new Date().toISOString(),
    });
    expect(result.id).toBe("1");
  });

  it("debe obtener una tarea por ID", async () => {
    (repo.findTaskById as jest.Mock).mockResolvedValue(mockTask);
    const result = await service.getTaskById("1");
    expect(result?.id).toBe("1");
    expect(result?.title).toBe("Test");
  });

  it("debe editar una tarea", async () => {
    (repo.updateTask as jest.Mock).mockResolvedValue(undefined);
    await expect(service.modifyTask("1", {title: "Actualizado"}))
      .resolves.toBeUndefined();
    expect(repo.updateTask).toHaveBeenCalledWith("1", {title: "Actualizado"});
  });

  it("debe eliminar una tarea", async () => {
    (repo.deleteTask as jest.Mock).mockResolvedValue(undefined);
    await expect(service.removeTask("1")).resolves.toBeUndefined();
    expect(repo.deleteTask).toHaveBeenCalledWith("1");
  });

  it("debe listar todas las tareas", async () => {
    (repo.getAllTasks as jest.Mock).mockResolvedValue([mockTask]);
    const result = await service.listAllTasks();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });
});
