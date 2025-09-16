import { ProductModel } from '../../../src/models/product.model';

describe('ProductModel validation', () => {
  it('rechaza price negativo', async () => {
    const p = new ProductModel({
      sellerEmail: 's@test.com',
      name: 'x',
      price: -5,
      stock: 1,
      category: 'cat',
      condition: 'new'
    });
    const err = p.validateSync();
    expect(err?.errors?.price).toBeDefined();
  });

  it('rechaza stock negativo', async () => {
    const p = new ProductModel({
      sellerEmail: 's@test.com',
      name: 'x',
      price: 5,
      stock: -1,
      category: 'cat',
      condition: 'new'
    });
    const err = p.validateSync();
    expect(err?.errors?.stock).toBeDefined();
  });
});
