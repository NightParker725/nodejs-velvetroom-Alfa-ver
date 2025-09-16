import bcrypt from 'bcrypt';
import { userService } from '../../../src/services/user.service';
import { UserModel } from '../../../src/models/user.model';

jest.mock('../../../src/models/user.model', () => ({
  UserModel: {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

jest.mock('bcrypt', () => ({ hash: jest.fn(() => 'hashed_pw') }));

describe('UserService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('create: hashea el password y crea usuario', async () => {
    (UserModel.create as any).mockResolvedValue({ id: 'u1', email: 'a@b.com', role: 'client' });

    const out = await userService.create({ name: 'A', email: 'A@B.com', password: '123456' } as any);

    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 12);
    // el service NO normaliza email, así que se envía tal cual se recibe
    expect(UserModel.create).toHaveBeenCalledWith(expect.objectContaining({
      email: 'A@B.com',
      passwordHash: 'hashed_pw'
    }));
    expect(out).toEqual({ id: 'u1', email: 'a@b.com', role: 'client' });
  });

  it('update: re-hashea si viene password', async () => {
    (UserModel.findByIdAndUpdate as any).mockResolvedValue({ id: 'u1', email: 'x@y.com' });

    const out = await userService.update('u1', { email: 'x@y.com', password: 'newpass' } as any);

    expect(bcrypt.hash).toHaveBeenCalledWith('newpass', 12);
    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      expect.objectContaining({ email: 'x@y.com', passwordHash: 'hashed_pw' }),
      { new: true }
    );
    expect(out).toEqual({ id: 'u1', email: 'x@y.com' });
  });

  it('remove: elimina y devuelve true', async () => {
    (UserModel.findByIdAndDelete as any).mockResolvedValue({});
    const ok = await userService.remove('u1');
    expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith('u1');
    expect(ok).toBe(true);
  });
});
