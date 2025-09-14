import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { ProductInput } from "../interfaces/product.interface";

// Controlador para gestionar productos (en listado público y CRUD por admin/seller)
class ProductController {
    // List público, con filtros opcionales (category, sellerEmail)
  async list(req: Request, res: Response) {
    const { category, sellerEmail } = req.query;
    const filter: any = {};
    if (category) filter.category = category;
    if (sellerEmail) filter.sellerEmail = sellerEmail;
    res.json(await productService.list(filter));
  }
  // categories públicos para filtros en el listado
  async categories(_req: Request, res: Response) { res.json(await productService.categories()); }
  // GetById público para obtener detalles de un producto
  async getById(req: Request, res: Response) {
    const p = await productService.getById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  }

  // Create: admin puede por defecto crear; seller solo si sellerEmail == email del token (esto se comprueba en el middleware ownerOrAdmin)
  async create(req: Request, res: Response) {
    const decoded = (req as any).decoded;
    if (!decoded?.roles?.includes('admin')) {
      if (!decoded?.email || decoded.email !== (req.body as ProductInput).sellerEmail) {
        return res.status(403).json({ message: 'Forbidden' });
      }
    }
    const created = await productService.create(req.body as ProductInput);
    res.status(201).json(created);
  }

  // Update: admin puede por defecto actualizar; seller solo si sellerEmail == email del token (esto se comprueba en el middleware ownerOrAdmin)
  async update(req: Request, res: Response) {
    const updated = await productService.update(req.params.id, req.body as Partial<ProductInput>);
    res.json(updated);
  }

  // Delete: admin puede por defecto eliminar; seller solo si sellerEmail == email del token (esto se comprueba en el middleware ownerOrAdmin)
  async remove(req: Request, res: Response) {
    await productService.remove(req.params.id);
    res.status(204).send();
  }
}

export const productController = new ProductController();
