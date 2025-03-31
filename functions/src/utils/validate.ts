import {ZodSchema, ZodError} from "zod";
import {Request, Response, NextFunction} from "express";

/**
 * Middleware para validar req.body con un schema de Zod.
 */
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Error de validación",
          errors: err.errors.map((e) => ({
            path: e.path,
            message: e.message,
          })),
        });
      }
      // Para otros errores que no sean de Zod
      return next(err);
    }
  };
};
