import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authService } from '../../../src/services/auth.service';
import { UserModel } from '../../../src/models/user.model';

jest.mock('../../../src/models/user.model', () => ({
  UserModel: { findOne: jest.fn() }
}));
jest.mock('bcrypt', () => ({ compare: jest.fn() }));
jest.mock('jsonwebtoken', () => ({ sign: jest.fn(() => 'jwt.token.mock') }));

describe('AuthService.login', () => {
  // passwordHash estilo bcrypt para que el service use bcrypt.compare()
  const user = {
    id: 'u1',
    email: 'admin@test.com',
    passwordHash: '$2b$10$abcdefghijklmnopqrstuv', // patron bcrypt
    role: 'admin'
  } as any;

  beforeEach(() => jest.clearAllMocks());

  it('retorna token y roles si credenciales válidas', async () => {
    (UserModel.findOne as any).mockReturnValue({ select: () => user });
    (bcrypt.compare as any).mockResolvedValue(true);

    const out = await authService.login({ email: 'ADMIN@test.com', password: '123456' });
    expect(out.email).toBe('admin@test.com');
    expect(out.roles).toEqual(['admin']);
    expect(jwt.sign).toHaveBeenCalled();
  });

  it('lanza si usuario no existe', async () => {
    (UserModel.findOne as any).mockReturnValue({ select: () => null });
    await expect(authService.login({ email: 'x@test.com', password: 'x' }))
      .rejects.toThrow();
  });

  it('lanza si password no coincide', async () => {
    (UserModel.findOne as any).mockReturnValue({ select: () => user });
    (bcrypt.compare as any).mockResolvedValue(false);
    await expect(authService.login({ email: 'admin@test.com', password: 'bad' }))
      .rejects.toThrow();
  });
});
