import { productService } from '../../../src/services/product.service';
import { ProductModel } from '../../../src/models/product.model';

jest.mock('../../../src/models/product.model', () => ({
  ProductModel: {
    find: jest.fn(),
    findById: jest.fn(),
    distinct: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

describe('ProductService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('list: retorna arreglo', async () => {
    (ProductModel.find as any).mockReturnValue(['p1']);
    const out = await productService.list({ category: 'c' });
    expect(ProductModel.find).toHaveBeenCalledWith({ category: 'c' });
    expect(out).toEqual(['p1']);
  });

  it('categories: retorna distinct', async () => {
    (ProductModel.distinct as any).mockResolvedValue(['a', 'b']);
    const out = await productService.categories();
    expect(out).toEqual(['a', 'b']);
  });

  it('create/update/remove: ok', async () => {
    (ProductModel.create as any).mockResolvedValue({ id: 'p1' });
    (ProductModel.findByIdAndUpdate as any).mockResolvedValue({ id: 'p1', name: 'n2' });
    (ProductModel.findByIdAndDelete as any).mockResolvedValue({ acknowledged: true });

    const created = await productService.create({ sellerEmail:'s@test.com', name:'n', price:1, stock:1, category:'c', condition:'new' });
    expect(created.id).toBe('p1');

    const updated = await productService.update('p1', { name: 'n2' });
    expect(updated?.name).toBe('n2');

    const removed = await productService.remove('p1');
    expect(removed).toBe(true);
  });
});
