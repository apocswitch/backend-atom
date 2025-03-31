import {Router} from "express";
import taskController from "../api/tasks/task.controller";
import userController from "../api/users/user.controller";
import authController from "../api/auth/auth.controller";

const router = Router();

// Agrupar rutas de tareas
router.use("/tasks", taskController);

// Agrupar rutas de usuarios
router.use("/users", userController);

// Agrupar rutas de autenticación
router.use("/auth", authController);

export default router;
