import { CategoryInput } from "../interfaces/category.interface";
import { CategoryModel } from "../models/category.model";

class CategoryService {
    //listado de categorías, con filtro opcional
  async list(filter: any = {}) {
    return CategoryModel.find(filter).sort({ name: 1 });
  }

  // obtiene categoría por id o por name
  async getById(id: string) { return CategoryModel.findById(id); }
  async findByName(name: string) { return CategoryModel.findOne({ name }); }

  // crea, actualiza, elimina categoría (solo admin)
  async create(input: CategoryInput) { return CategoryModel.create(input); }
  async update(id: string, data: Partial<CategoryInput>) {
    return CategoryModel.findByIdAndUpdate(id, data, { new: true });
  }
  async remove(id: string) {
    await CategoryModel.findByIdAndDelete(id);
    return true;
  }
}

export const categoryService = new CategoryService();
