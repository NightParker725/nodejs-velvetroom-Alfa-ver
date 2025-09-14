import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { UserInput, UserUpdate } from "../interfaces/user.interface";

// Controlador para gestionar usuarios (perfil propio, listado y CRUD por admin)
class UserController {
  me(req: Request, res: Response) {
    return res.json((req as any).decoded); // { id, email, roles, iat, exp }
  }
  // Create: solo admin puede crear usuarios (con cualquier rol)
  async create(req: Request, res: Response) {
    const created = await userService.create(req.body as UserInput);
    res.status(201).json(created);
  }
  // List y GetById: solo admin puede listar y ver usuarios
  async list(_req: Request, res: Response) { res.json(await userService.list()); }
  async getById(req: Request, res: Response) {
    const u = await userService.getById(req.params.id);
    if (!u) return res.status(404).json({ message: 'Not found' });
    res.json(u);
  }
  // Update: admin puede actualizar cualquiera; usuario puede actualizar su propio perfil (esto se comprueba en el middleware ownerOrAdmin)
  async update(req: Request, res: Response) {
    const u = await userService.update(req.params.id, req.body as UserUpdate);
    res.json(u);
  }
  // Delete: solo admin puede eliminar usuarios
  async remove(_req: Request, res: Response) {
    res.status(204).send();
  }
}

export const userController = new UserController();
