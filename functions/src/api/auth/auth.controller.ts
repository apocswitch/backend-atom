// src/api/auth/auth.controller.ts
import {Router} from "express";
import {verifyRefreshToken, generateAccessToken} from "../../utils/jwt";

const router = Router();

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Renovar access token usando un refresh token válido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nuevo token generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.post("/refresh-token", (req, res) => {
  const {refreshToken} = req.body;
  if (!refreshToken) {
    return res.status(400).json({message: "Refresh token requerido"});
  }

  try {
    const decoded = verifyRefreshToken(refreshToken) as { sub: string };
    const newAccessToken = generateAccessToken(decoded.sub);
    return res.json({token: newAccessToken});
  } catch (err) {
    return res.status(401).json({message: "Refresh token inválido"});
  }
});

export default router;
