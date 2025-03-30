import {Request, Response, NextFunction} from "express";

/**
 * Middleware global de manejo de errores para Express.
 *
 * @param {Error} err - Objeto del error lanzado.
 * @param {Request} req - Objeto de la solicitud HTTP.
 * @param {Response} res - Objeto de la respuesta HTTP.
 * @param {NextFunction} _next - Middleware siguiente (no usado).
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);
  res.status(500).json({message: "Error interno del servidor"});
}
