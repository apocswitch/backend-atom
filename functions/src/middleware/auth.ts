import {Request, Response, NextFunction} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import * as functions from "firebase-functions";

const JWT_SECRET = functions.config().jwt?.secret || "4t0mch4113ng3";

/**
 * Middleware para verificar token JWT en las peticiones.
 *
 * @param {Request} req - Objeto de solicitud HTTP
 * @param {Response} res - Objeto de respuesta HTTP
 * @param {NextFunction} next - Función para pasar al siguiente middleware
 */
export function authenticate(req: Request,
  res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({message: "Token requerido"});
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Extendemos `req` de forma segura para incluir user
    (req as Request & { user: JwtPayload }).user = decoded;

    next();
  } catch (err) {
    res.status(401).json({message: "Token inválido"});
  }
}
