import { Request, Response } from "express";
import { categoryService } from "../services/category.service";

// Controlador para gestionar categorías (listado y CRUD por admin) 
class CategoryController {
    // List: cualquiera puede listar categorías (por si queremos mostrar categorías en el frontend a futuroooo)
  async list(req: Request, res: Response) {
    const { name } = req.query;
    const filter: any = {};
    if (name) filter.name = String(name);
    const cats = await categoryService.list(filter);
    res.json(cats);
  }

  // GetById: cualquiera puede ver una categoría (por si queremos mostrar categorías en el frontend a futuroooo)
  async getById(req: Request, res: Response) {
    const c = await categoryService.getById(req.params.id);
    if (!c) return res.status(404).json({ message: "Not found" });
    res.json(c);
  }
// Create: solo admin puede crear categorías (esto se comprueba en los middlewares de la ruta)
  async create(req: Request, res: Response) {
    try {
      if (!req.body?.name) return res.status(400).json({ message: "name is required, you buffoon" });
      const created = await categoryService.create({ name: req.body.name });
      res.status(201).json(created);
    } catch (e: any) {
      // por si esta duplicado
      if (e?.code === 11000) return res.status(409).json({ message: "Category already exists lol" });
      res.status(500).json({ message: "Internal server error" });
    }
  }
// Update: admin puede actualizar categorías (esto se comprueba en los middlewares de la ruta)
  async update(req: Request, res: Response) {
    try {
      const updated = await categoryService.update(req.params.id, { name: req.body?.name });
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch (e: any) {
      if (e?.code === 11000) return res.status(409).json({ message: "Category already exists lol" });
      res.status(500).json({ message: "Internal server error" });
    }
  }
// Delete: solo admin puede eliminar categorías (esto se comprueba en los middlewares de la ruta)
  async remove(req: Request, res: Response) {
    await categoryService.remove(req.params.id);
    res.status(204).send();
  }
}

export const categoryController = new CategoryController();
