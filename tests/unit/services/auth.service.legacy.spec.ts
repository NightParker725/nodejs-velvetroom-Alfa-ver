import { authService } from '../../../src/services/auth.service';
import { UserModel } from '../../../src/models/user.model';
import jwt from 'jsonwebtoken';

jest.mock('../../../src/models/user.model', () => ({
  UserModel: { findOne: jest.fn() }
}));
jest.mock('bcrypt', () => ({ compare: jest.fn() })); // no se usa en rama legacy
jest.mock('jsonwebtoken', () => ({ sign: jest.fn(() => 'jwt.token.mock') }));

describe('AuthService.login (legacy password)', () => {
  const legacyUser = {
    id: 'u1',
    email: 'admin@test.com',
    passwordHash: '123456', // <-- NO hash bcrypt
    role: 'admin'
  } as any;

  beforeEach(() => jest.clearAllMocks());

  it('loguea cuando password coincide en texto plano', async () => {
    (UserModel.findOne as any).mockReturnValue({ select: () => legacyUser });

    const out = await authService.login({ email: 'ADMIN@test.com', password: '123456' });
    expect(out).toEqual(
      expect.objectContaining({ id: 'u1', email: 'admin@test.com', roles: ['admin'], token: 'jwt.token.mock' })
    );
    // verifica payload del JWT
    expect(jwt.sign).toHaveBeenCalled();
    const payload = (jwt.sign as jest.Mock).mock.calls[0][0];
    expect(payload).toEqual(expect.objectContaining({ id: 'u1', roles: ['admin'] }));
  });

  it('lanza cuando el password legacy no coincide', async () => {
    (UserModel.findOne as any).mockReturnValue({ select: () => legacyUser });
    await expect(authService.login({ email: 'admin@test.com', password: 'xxx' })).rejects.toThrow();
  });
});
