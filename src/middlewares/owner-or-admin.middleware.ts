import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../models/product.model";

// Middleware para permitir acceso si el usuario es admin o el propietario (sellerEmail) del producto
export async function ownerOrAdmin(req: Request, res: Response, next: NextFunction) {
  const decoded = (req as any).decoded;
  if (decoded?.roles?.includes('admin')) return next();

  const userEmail = decoded?.email;
  if (!userEmail) return res.status(403).json({ message: 'Forbidden, what are you doing here?' });

  const productId = req.params.id;
  if (!productId) return res.status(400).json({ message: 'Product id is required' });

  const p = await ProductModel.findById(productId).lean();
  if (!p) return res.status(404).json({ message: 'Not found' });

  if (p.sellerEmail !== userEmail) return res.status(403).json({ message: 'Forbidden, what are you doing here?' });

  next();
}
