import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

// Middleware para validar el esquema de datos usando Zod
export const validateSchema = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  };
};
