import mongoose from "mongoose";
import { ProductInput } from "../interfaces/product.interface";

// Modelo de Producto en MongoDB usando Mongoose y TypeScript
export interface ProductDocument extends ProductInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Producto en Mongoose definiendo los campos y sus propiedades
const productSchema = new mongoose.Schema(
  {
    sellerEmail: { type: String, required: true, index: true },
    name:        { type: String, required: true, trim: true },
    description: { type: String },
    price:       { type: Number, required: true, min: 0 },
    stock:       { type: Number, required: true, min: 0 },
    category:    { type: String, required: true, index: true },
    condition:   { type: String, enum: ['new','used','fan_made'], required: true }
  },
  { timestamps: true, collection: 'products' }
);

export const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);
