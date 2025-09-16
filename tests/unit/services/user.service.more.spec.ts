import { userService } from '../../../src/services/user.service';
import { UserModel } from '../../../src/models/user.model';
import bcrypt from 'bcrypt';

jest.mock('../../../src/models/user.model', () => ({
  UserModel: {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }
}));
jest.mock('bcrypt', () => ({ hash: jest.fn() }));

describe('UserService (extras)', () => {
  beforeEach(() => jest.clearAllMocks());

  it('list: llama UserModel.find y retorna arreglo (ignora filtro)', async () => {
    (UserModel.find as any).mockReturnValue([{ id: 'u1' }]);
    const out = await userService.list({ role: 'client' } as any);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
    expect(UserModel.find).toHaveBeenCalledWith(); // sin argumentos
    expect(out).toEqual([{ id: 'u1' }]);
  });

  it('getById: llama UserModel.findById y retorna item', async () => {
    (UserModel.findById as any).mockResolvedValue({ id: 'u1', email: 'a@b.com' });
    const out = await userService.getById('u1');
    expect(UserModel.findById).toHaveBeenCalledWith('u1');
    expect(out).toEqual({ id: 'u1', email: 'a@b.com' });
  });

  it('update (sin password): NO re-hashea y llama findByIdAndUpdate', async () => {
    (UserModel.findByIdAndUpdate as any).mockResolvedValue({ id: 'u1', email: 'new@x.com' });
    const out = await userService.update('u1', { email: 'new@x.com' } as any);
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith('u1', { email: 'new@x.com' }, { new: true });
    expect(out).toEqual({ id: 'u1', email: 'new@x.com' });
  });

  it('remove: llama findByIdAndDelete y retorna true', async () => {
    (UserModel.findByIdAndDelete as any).mockResolvedValue({});
    const ok = await userService.remove('u1');
    expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith('u1');
    expect(ok).toBe(true);
  });
});
