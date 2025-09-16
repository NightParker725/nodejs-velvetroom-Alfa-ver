import jwt from 'jsonwebtoken';
import auth from '../../../src/middlewares/auth.middleware';

jest.mock('jsonwebtoken', () => ({ verify: jest.fn() }));

const makeRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json  = jest.fn().mockReturnValue(res);
  return res;
};

describe('auth.middleware', () => {
  it('401 si falta Bearer', () => {
    const req: any = { headers: {} };
    const res = makeRes();
    const next = jest.fn();

    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('401 si token inválido', () => {
    (jwt.verify as any).mockImplementation(() => { throw new Error('bad'); });
    const req: any = { headers: { authorization: 'Bearer X' } };
    const res = makeRes();
    const next = jest.fn();

    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it('ok si token válido', () => {
    (jwt.verify as any).mockReturnValue({ id: 'u1', email: 'e', roles: ['admin'] });
    const req: any = { headers: { authorization: 'Bearer X' } };
    const res = makeRes();
    const next = jest.fn();

    auth(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.decoded).toBeDefined();
  });
});
