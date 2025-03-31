import {Request, Response, NextFunction} from "express";
import {ZodError} from "zod";

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
  _next: NextFunction) {
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

  // Error con statusCode personalizado
  if (err instanceof Error && "statusCode" in err) {
    const status = (err as any).statusCode || 500;
    return res.status(status).json({message: err.message});
  }

  return res.status(500).json({message: "Error interno del servidor"});
}
