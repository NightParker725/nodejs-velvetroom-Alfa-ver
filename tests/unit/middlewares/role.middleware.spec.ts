import { requireRole } from '../../../src/middlewares/role.middleware';

describe('requireRole', () => {
  it('403 si NO autenticado (sin roles)', () => {
    const mw = requireRole('admin');

    const req: any = { decoded: undefined };
    const res: any = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
    const next = jest.fn();

    mw(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('403 si autenticado pero sin rol requerido', () => {
    const mw = requireRole('admin');
    const req: any = { decoded: { id: 'u1', roles: ['client'] } };
    const res: any = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
    const next = jest.fn();

    mw(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('llama next si tiene rol requerido', () => {
    const mw = requireRole('admin');
    const req: any = { decoded: { id: 'u1', roles: ['admin'] } };
    const res: any = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
    const next = jest.fn();

    mw(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
