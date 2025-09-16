import { productController } from '../../../src/controllers/product.controller';
import { productService } from '../../../src/services/product.service';

jest.mock('../../../src/services/product.service', () => ({
  productService: {
    list: jest.fn(),
    categories: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }
}));

const resMock = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json  = jest.fn().mockReturnValue(res);
  res.send  = jest.fn().mockReturnValue(res);
  return res;
};

describe('ProductController', () => {
  beforeEach(() => jest.clearAllMocks());

  it('list: responde con productos', async () => {
    (productService.list as any).mockResolvedValue([{ id: 'p1' }]);
    const req: any = { query: { category: 'c', sellerEmail: 's@test.com' } };
    const res = resMock();
    await productController.list(req, res);
    expect(productService.list).toHaveBeenCalledWith({ category: 'c', sellerEmail: 's@test.com' });
    expect(res.json).toHaveBeenCalledWith([{ id: 'p1' }]);
  });

  it('getById: 404 si no existe', async () => {
    (productService.getById as any).mockResolvedValue(null);
    const req: any = { params: { id: 'x' } };
    const res = resMock();
    await productController.getById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('create: 201 con owner o admin', async () => {
    (productService.create as any).mockResolvedValue({ id: 'p1' });
    const req: any = { body: { sellerEmail: 's@test.com' }, decoded: { email: 's@test.com', roles: ['seller'] } };
    const res = resMock();
    await productController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('update: ok', async () => {
    (productService.update as any).mockResolvedValue({ id: 'p1', name: 'n' });
    const req: any = { params: { id: 'p1' }, body: { name: 'n' } };
    const res = resMock();
    await productController.update(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: 'p1', name: 'n' });
  });

  it('remove: 204', async () => {
    const req: any = { params: { id: 'p1' } };
    const res = resMock();
    await productController.remove(req, res);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});
