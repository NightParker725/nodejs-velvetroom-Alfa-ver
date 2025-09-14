import { UserInput, UserUpdate } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

class UserService {
    // Crea usuario (admin puede asignar rol, por defecto 'client'), hashea password a nivel 12
  async create(input: UserInput) {
    let passwordHash = input.passwordHash;
    if (input.password) {
      passwordHash = await bcrypt.hash(input.password, 12);
    }
    if (!passwordHash) throw new ReferenceError("password o passwordHash requerido");

    return UserModel.create({
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role ?? 'client',
      address: input.address
    });
  }
// Lista usuarios (sin password) y obtiene usuario por id (sin password)
  async list() { return UserModel.find(); } // passwordHash oculto por select:false
  // Obtiene usuario por id (sin password)
  async getById(id: string) { return UserModel.findById(id); }
// Actualiza usuario (admin puede actualizar rol), si viene password se re-hashea a nivel 12
  async update(id: string, data: UserUpdate) {
    const toUpdate: any = { ...data };
// Si viene password, se re-hashea la password de nivel 12 para que quede cifrada en bd
    if (data.password) {
      toUpdate.passwordHash = await bcrypt.hash(data.password, 12);
      delete toUpdate.password;
    }
    return UserModel.findByIdAndUpdate(id, toUpdate, { new: true });
  }
// Elimina usuario por id (solo admin) 
  async remove(id: string) { await UserModel.findByIdAndDelete(id); return true; }
}

export const userService = new UserService();
