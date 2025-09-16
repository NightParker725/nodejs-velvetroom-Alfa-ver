import * as authController from '../../../src/controllers/auth.controller';
import { authService } from '../../../src/services/auth.service';

jest.mock('../../../src/services/auth.service', () => ({
  authService: { login: jest.fn() }
}));

const makeRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json  = jest.fn().mockReturnValue(res);
  return res;
};

describe('auth.controller (error paths)', () => {
  it('next(err) si login rechaza', async () => {
    (authService.login as any).mockRejectedValue(new Error('bad creds'));

    const req: any = { body: { email: 'a@b.com', password: 'x' } };
    const res = makeRes();
    const next = jest.fn();

    await authController.login(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
