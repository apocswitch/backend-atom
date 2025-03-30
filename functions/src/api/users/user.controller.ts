import {Router} from "express";
import * as service from "./user.service";
import {validateBody} from "../../utils/validate";
import {UserSchema} from "./user.schema";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", async (req, res, next) => {
  try {
    const users = await service.getAllUsers();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Obtener usuario por email
 */
router.get("/:email", async (req, res, next) => {
  try {
    const user = await service.findUserByEmail(req.params.email);
    if (!user) return res.status(404).json({message: "Usuario no encontrado"});
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 */
router.post("/", validateBody(UserSchema), async (req, res, next) => {
  try {
    const result = await service.createUser(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar usuario por ID
 */
router.put("/:id", validateBody(UserSchema), async (req, res, next) => {
  try {
    await service.updateUser(req.params.id, req.body.email);
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 */
router.delete("/:id", async (req, res, next) => {
  try {
    await service.deleteUser(req.params.id);
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /users/id/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/id/:id", async (req, res, next) => {
  try {
    const user = await service.getUserById(req.params.id);
    if (!user) return res.status(404).json({message: "Usuario no encontrado"});
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

export default router;
