import { CategoryModel } from '../../../src/models/category.model';

describe('CategoryModel', () => {
  it('existe y es utilizable', () => {
    expect(CategoryModel).toBeDefined();
    // sin conectar a DB: al menos expone propiedades de modelo
    expect(typeof (CategoryModel as any).find).toBe('function');
  });
});
