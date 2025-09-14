import mongoose from "mongoose";
import { UserRole } from "../interfaces/role.type";

// Modelo de Usuario en MongoDB usando Mongoose y TypeScript
export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Usuario en Mongoose definiendo los campos y sus propiedades
const userSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true },
    email:        { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role:         { type: String, enum: ['admin','seller','client'], default: 'client', index: true },
    address:      { type: String }
  },
  { timestamps: true, collection: 'users' }
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
