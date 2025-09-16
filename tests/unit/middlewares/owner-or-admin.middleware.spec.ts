import mongoose from 'mongoose';
import { ownerOrAdmin } from '../../../src/middlewares/owner-or-admin.middleware';
import { ProductModel } from '../../../src/models/product.model';

jest.mock('../../../src/models/product.model', () => ({
  ProductModel: { findById: jest.fn(() => ({ lean: () => ({ _id: 'p1', sellerEmail: 's@test.com' }) })) }
}));

const resMock = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('ownerOrAdmin', () => {
  it('permite admin', async () => {
    const req: any = { params: { id: new mongoose.Types.ObjectId().toString() }, decoded: { roles: ['admin'] } };
    const res = resMock(); const next = jest.fn();
    await ownerOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('permite owner (seller)', async () => {
    const req: any = { params: { id: '64b2c9f3aa2a2a2a2a2a2a22' }, decoded: { email: 's@test.com', roles: ['seller'] } };
    const res = resMock(); const next = jest.fn();
    await ownerOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('403 si no es owner', async () => {
    const req: any = { params: { id: '64b2c9f3aa2a2a2a2a2a2a22' }, decoded: { email: 'x@test.com', roles: ['seller'] } };
    const res = resMock(); const next = jest.fn();
    await ownerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});
