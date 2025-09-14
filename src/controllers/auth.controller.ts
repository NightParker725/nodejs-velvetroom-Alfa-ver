import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { UserLoginInput } from "../interfaces/auth.interface";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body as UserLoginInput);
      res.json(result); // { id, email, roles, token } 
    } catch (error) {
      if (error instanceof ReferenceError) return res.status(401).json({ message: error.message });
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Registro público (rol 'client' por defecto por el momento) — se hace hash de password internamente
  public async register(req: Request, res: Response) {
    try {
      const { name, email, password, passwordHash, address } = req.body;

      if (!name || !email) return res.status(400).json({ message: "name y email son requeridos" });
      if (!password && !passwordHash) return res.status(400).json({ message: "password o passwordHash es requerido" });

      const exists = await UserModel.findOne({ email });
      if (exists) return res.status(400).json({ message: "User already exists" });

      const finalHash = password
        ? await bcrypt.hash(password, 12)    // nivel 12 por seguridad (normalmente es 10, pero aquí queremos más seguridad)
        : passwordHash;

      const created = await UserModel.create({
        name, email,
        passwordHash: finalHash!,
        role: 'client',
        address
      });

      res.status(201).json({ id: created.id, name: created.name, email: created.email, role: created.role, address: created.address });
    } catch (_e) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
export const authController = new AuthController();
