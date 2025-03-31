import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as functions from "firebase-functions";

const JWT_SECRET = functions.config().jwt?.secret || "4t0mch4113ng3";

/**
 * Middleware para verificar token JWT en las peticiones.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token requerido" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token inválido" });
    }
}
