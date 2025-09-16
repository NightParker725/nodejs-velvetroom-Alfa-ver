import { authController } from '../../../src/controllers/auth.controller';
import { authService } from '../../../src/services/auth.service';

jest.mock('../../../src/services/auth.service', () => ({
  authService: { login: jest.fn() }
}));

const resMock = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json  = jest.fn().mockReturnValue(res);
  res.send  = jest.fn().mockReturnValue(res);
  return res;
};

describe('auth.controller.login', () => {
  beforeEach(() => jest.clearAllMocks());

  it('200 ok', async () => {
    (authService.login as any).mockResolvedValue({ id: 'u1', token: 't', roles: ['admin'] });
    const req: any = { body: { email: 'a@b.com', password: '123' } };
    const res = resMock();

    await authController.login(req, res);

    expect(authService.login).toHaveBeenCalledWith({ email: 'a@b.com', password: '123' });
    expect(res.json).toHaveBeenCalledWith({ id: 'u1', token: 't', roles: ['admin'] });
  });

  it('401 si credenciales inválidas (ReferenceError)', async () => {
    (authService.login as any).mockRejectedValue(new ReferenceError('Not Authorized'));
    const req: any = { body: { email: 'bad@b.com', password: 'x' } };
    const res = resMock();

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('500 si error desconocido', async () => {
    (authService.login as any).mockRejectedValue(new Error('boom'));
    const req: any = { body: { email: 'a@b.com', password: '123' } };
    const res = resMock();

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
