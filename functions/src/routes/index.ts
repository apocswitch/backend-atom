import {Router} from "express";
import taskController from "../api/tasks/task.controller";
import userController from "../api/users/user.controller";

const router = Router();

// Agrupar rutas de tareas
router.use("/tasks", taskController);

// Agrupar rutas de usuarios
router.use("/users", userController);

export default router;
