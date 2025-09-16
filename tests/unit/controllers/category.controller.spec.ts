import { categoryController } from '../../../src/controllers/category.controller';
import { categoryService } from '../../../src/services/category.service';

jest.mock('../../../src/services/category.service', () => ({
  categoryService: {
    list: jest.fn(),
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

describe('CategoryController', () => {
  beforeEach(() => jest.clearAllMocks());

  it('list: retorna array', async () => {
    (categoryService.list as any).mockResolvedValue([{ id: 'c1', name: 'a' }]);
    const req: any = { query: {} };
    const res = resMock();
    await categoryController.list(req, res);
    expect(res.json).toHaveBeenCalledWith([{ id: 'c1', name: 'a' }]);
  });

  it('getById: 404 si no existe', async () => {
    (categoryService.getById as any).mockResolvedValue(null);
    const req: any = { params: { id: 'x' } };
    const res = resMock();
    await categoryController.getById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('create: 201 si OK', async () => {
    (categoryService.create as any).mockResolvedValue({ id: 'c1', name: 'abc' });
    const req: any = { body: { name: 'abc' } };
    const res = resMock();
    await categoryController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('remove: 204', async () => {
    const req: any = { params: { id: 'c1' } };
    const res = resMock();
    await categoryController.remove(req, res);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});
