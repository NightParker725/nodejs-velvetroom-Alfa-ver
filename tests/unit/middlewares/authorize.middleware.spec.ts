import { authorize } from '../../../src/middlewares/authorize.middleware';

describe('authorize middleware', () => {
  it('401 si no hay decodedUser', () => {
    const mw = authorize('admin');
    const req: any = {};
    const res: any = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
    const next = jest.fn();

    mw(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('403 si rol no permitido', () => {
    const mw = authorize('admin');
    const req: any = { decodedUser: { user: { role: 'client' } } };
    const res: any = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
    const next = jest.fn();

    mw(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('next si rol permitido', () => {
    const mw = authorize('admin');
    const req: any = { decodedUser: { user: { role: 'admin' } } };
    const res: any = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
    const next = jest.fn();

    mw(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
