import { ProductInput } from "../interfaces/product.interface";
import { ProductModel } from "../models/product.model";

class ProductService {
    // Lista productos, opcionalmente filtrados por cualquier campo (category, sellerEmail, etc)
  async list(filter: any = {}) { return ProductModel.find(filter); }
  // Lista categorías únicas (distintas) de productos
  async categories() { return ProductModel.distinct('category'); }
  // Obtiene producto por id
  async getById(id: string) { return ProductModel.findById(id); }
  
  // Crea producto, actualiza producto por id, elimina producto por id
  async create(input: ProductInput) { return ProductModel.create(input); }
  async update(id: string, data: Partial<ProductInput>) { return ProductModel.findByIdAndUpdate(id, data, { new: true }); }
  async remove(id: string) { await ProductModel.findByIdAndDelete(id); return true; }
}
export const productService = new ProductService();
