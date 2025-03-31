import {Router} from "express";
import * as service from "./user.service";
import {validateBody} from "../../utils/validate";
import {UserSchema} from "./user.schema";
import {generateAccessToken, generateRefreshToken} from "../../utils/jwt";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Correo del usuario
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
router.get("/:email", async (req, res, next) => {
  try {
    const user = await service.findUserByEmail(req.params.email);
    if (!user) return res.status(404).json({message: "Usuario no encontrado"});
    const refreshToken = generateRefreshToken(user.id);
    const token = generateAccessToken(user.id);
    return res.json({...user, token, refreshToken});
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/", validateBody(UserSchema), async (req, res, next) => {
  try {
    const user = await service.createUser(req.body);
    const refreshToken = generateRefreshToken(user.id);
    const token = generateAccessToken(user.id);
    return res.status(201).json({...user, token, refreshToken});
  } catch (err) {
    return next(err);
  }
});
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       204:
 *         description: Usuario actualizado correctamente
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
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       204:
 *         description: Usuario eliminado correctamente
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
 *     tags:
 *       - Users
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
