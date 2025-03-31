import {Request, Response, NextFunction} from "express";
import {ZodError} from "zod";

/**
 * Interfaz para errores con statusCode
 */
interface HttpError extends Error {
  statusCode?: number;
}

/**
 * Middleware de manejo de errores.
 * @param {Error} err - El error capturado
 * @param {Request} req - Objeto de solicitud HTTP
 * @param {Response} res - Objeto de respuesta HTTP
 * @param {NextFunction} _next - Función next (no usada)
 * @return {void}
 */
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error atrapado:", err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Error de validación",
      errors: err.errors.map((e) => ({
        path: e.path,
        message: e.message,
      })),
    });
  }

  if (err instanceof Error && "statusCode" in err) {
    const httpError = err as HttpError;
    return res.status(httpError.statusCode || 500)
      .json({message: httpError.message});
  }

  return res.status(500).json({message: "Error interno del servidor"});
}
