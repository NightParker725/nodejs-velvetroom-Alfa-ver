import * as userController from '../../../src/controllers/user.controller';
import { userService } from '../../../src/services/user.service';

jest.mock('../../../src/services/user.service', () => ({
  userService: {
    list: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }
}));

const makeRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json  = jest.fn().mockReturnValue(res);
  res.send  = jest.fn().mockReturnValue(res);
  return res;
};

describe('user.controller', () => {
  beforeEach(() => jest.clearAllMocks());

  it('list -> 200 con arreglo', async () => {
    (userService.list as any).mockResolvedValue([{ id: 'u1' }]);
    const req: any = { query: { role: 'client' } };
    const res = makeRes();
    const next = jest.fn();

    await userController.list(req, res, next);

    expect(userService.list).toHaveBeenCalledWith({ role: 'client' });
    expect(res.json).toHaveBeenCalledWith([{ id: 'u1' }]);
    expect(next).not.toHaveBeenCalled();
  });

  it('getById -> 200 con item', async () => {
    (userService.getById as any).mockResolvedValue({ id: 'u1' });
    const req: any = { params: { id: 'u1' } };
    const res = makeRes();
    const next = jest.fn();

    await userController.getById(req, res, next);

    expect(userService.getById).toHaveBeenCalledWith('u1');
    expect(res.json).toHaveBeenCalledWith({ id: 'u1' });
    expect(next).not.toHaveBeenCalled();
  });

  it('create -> 201 con creado', async () => {
    (userService.create as any).mockResolvedValue({ id: 'u2', email: 'a@b.com' });
    const req: any = { body: { name: 'A', email: 'a@b.com', password: '123' } };
    const res = makeRes();
    const next = jest.fn();

    await userController.create(req, res, next);

    expect(userService.create).toHaveBeenCalledWith({ name: 'A', email: 'a@b.com', password: '123' });
    expect(res.json).toHaveBeenCalledWith({ id: 'u2', email: 'a@b.com' });
  });

  it('update -> 200 con actualizado', async () => {
    (userService.update as any).mockResolvedValue({ id: 'u1', email: 'x@y.com' });
    const req: any = { params: { id: 'u1' }, body: { email: 'x@y.com' } };
    const res = makeRes();
    const next = jest.fn();

    await userController.update(req, res, next);

    expect(userService.update).toHaveBeenCalledWith('u1', { email: 'x@y.com' });
    expect(res.json).toHaveBeenCalledWith({ id: 'u1', email: 'x@y.com' });
  });

  it('remove -> llama service y responde (200/204)', async () => {
    (userService.remove as any).mockResolvedValue(true);
    const req: any = { params: { id: 'u1' } };
    const res = makeRes();
    const next = jest.fn();

    await userController.remove(req, res, next);

    expect(userService.remove).toHaveBeenCalledWith('u1');
    // alguna de las respuestas esperadas del controller
    expect(res.send.mock.calls.length + res.json.mock.calls.length).toBeGreaterThan(0);
  });

  it('propaga error con next en cualquier handler', async () => {
    (userService.list as any).mockRejectedValue(new Error('boom'));
    const req: any = { query: {} };
    const res = makeRes();
    const next = jest.fn();

    await userController.list(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
