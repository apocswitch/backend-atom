import {Router} from "express";
import * as service from "./task.service";
import {validateBody} from "../../utils/validate";
import {TaskSchema} from "./task.schema";
import {authenticate} from "../../middleware/auth";

const router = Router();

/**
 * @swagger
 * /tasks/id/{id}:
 *   get:
 *     summary: Obtener una tarea por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Detalle de la tarea
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 */
router.get("/id/:id", authenticate, async (req, res, next) => {
  try {
    const task = await service.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({message: "Tarea no encontrada"});
    }
    return res.json(task);
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     responses:
 *       200:
 *         description: Lista completa de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/", authenticate, async (req, res, next) => {
  try {
    const tasks = await service.listAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /tasks/{userId}:
 *   get:
 *     summary: Obtener todas las tareas de un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/:userId", authenticate, async (req, res, next) => {
  try {
    const tasks = await service.listTasks(req.params.userId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 */
router.post("/", validateBody(TaskSchema),
  authenticate, async (req, res, next) => {
    try {
      const result = await service.addTask(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       204:
 *         description: Tarea actualizada correctamente
 */
router.put("/:id", authenticate, async (req, res, next) => {
  try {
    await service.modifyTask(req.params.id, req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tarea eliminada correctamente
 */
router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    await service.removeTask(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
