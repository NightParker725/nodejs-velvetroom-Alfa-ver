import mongoose from "mongoose";
import { CategoryInput } from "../interfaces/category.interface";

// Modelo de Categoria en MongoDB usando Mongoose y TypeScript
export interface CategoryDocument extends CategoryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Categoria en Mongoose definiendo los campos y sus propiedades :p
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true }
  },
  { timestamps: true, collection: "categories" }
);

export const CategoryModel = mongoose.model<CategoryDocument>("Category", categorySchema);
