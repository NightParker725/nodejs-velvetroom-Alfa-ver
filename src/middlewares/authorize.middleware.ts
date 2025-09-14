import { NextFunction, Request, Response } from "express";

// Middleware para autorizar acceso basado en roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const decoded: any = (req as any).decodedUser;
    if (!decoded) return res.status(401).json({ message: "Not Authorized" });
    if (!roles.includes(decoded.user.role)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}
