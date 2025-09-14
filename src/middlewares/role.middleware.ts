import { Request, Response, NextFunction } from "express";

// Middleware para verificar que el usuario tenga al menos uno de los roles requeridos
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles: string[] = (req as any).decoded?.roles ?? [];
    if (!userRoles.some(r => roles.includes(r))) return res.status(403).json({ message: 'Forbidden,  what are you doing here?' });
    next();
  };
}
