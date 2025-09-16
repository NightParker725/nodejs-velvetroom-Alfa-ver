import * as categoryController from '../../../src/controllers/category.controller';
import { categoryService } from '../../../src/services/category.service';

jest.mock('../../../src/services/category.service', () => ({
  categoryService: {
    list: jest.fn(),
    create: jest.fn(),
  }
}));

const makeRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json  = jest.fn().mockReturnValue(res);
  res.send  = jest.fn().mockReturnValue(res);
  return res;
};

describe('category.controller (extras)', () => {
  beforeEach(() => jest.clearAllMocks());

  it('list -> 200 con arreglo vacío', async () => {
    (categoryService.list as any).mockResolvedValue([]);
    const req: any = { query: {} };
    const res = makeRes();
    const next = jest.fn();

    await categoryController.list(req, res, next);

    expect(res.json).toHaveBeenCalledWith([]);
    expect(next).not.toHaveBeenCalled();
  });

  it('next(err) si list lanza', async () => {
    (categoryService.list as any).mockRejectedValue(new Error('db down'));
    const req: any = { query: {} };
    const res = makeRes();
    const next = jest.fn();

    await categoryController.list(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
