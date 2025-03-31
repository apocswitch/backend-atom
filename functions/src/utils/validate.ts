import {ZodSchema, ZodError} from "zod";
import {Request, Response, NextFunction} from "express";

/*
 * Middleware para validar req.body con un esquema de Zod.
 *
 * @param {ZodSchema} schema - El esquema Zod que se usará para validar.
 * @returns {(req: Request,
 * res: Response,
 * next: NextFunction) => void} Middleware de validación.
 */
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          message: "Error de validación",
          errors: err.errors.map((e) => ({
            path: e.path,
            message: e.message,
          })),
        });
        return;
      }

      // Para otros errores que no sean de Zod
      next(err);
    }
  };
};
