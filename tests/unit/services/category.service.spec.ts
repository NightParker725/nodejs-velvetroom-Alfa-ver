import { categoryService } from '../../../src/services/category.service';
import { CategoryModel } from '../../../src/models/category.model';

jest.mock('../../../src/models/category.model', () => ({
  CategoryModel: {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }
}));

describe('categoryService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('list llama CategoryModel.find y sort por name asc', async () => {
    const sort = jest.fn().mockReturnValue(['c1', 'c2']);
    (CategoryModel.find as any).mockReturnValue({ sort });

    const out = await categoryService.list({ active: true });

    expect(CategoryModel.find).toHaveBeenCalledWith({ active: true });
    expect(sort).toHaveBeenCalledWith({ name: 1 });
    expect(out).toEqual(['c1', 'c2']);
  });

  it('getById retorna la categoría si existe', async () => {
    (CategoryModel.findById as any).mockResolvedValue({ id: 'id1', name: 'A' });
    const out = await categoryService.getById('id1');
    expect(CategoryModel.findById).toHaveBeenCalledWith('id1');
    expect(out).toEqual({ id: 'id1', name: 'A' });
  });

  it('findByName retorna la categoría por name', async () => {
    (CategoryModel.findOne as any).mockResolvedValue({ id: 'id2', name: 'B' });
    const out = await categoryService.findByName('B');
    expect(CategoryModel.findOne).toHaveBeenCalledWith({ name: 'B' });
    expect(out).toEqual({ id: 'id2', name: 'B' });
  });

  it('create crea y devuelve la nueva categoría', async () => {
    (CategoryModel.create as any).mockResolvedValue({ id: 'id3', name: 'C' });
    const out = await categoryService.create({ name: 'C' } as any);
    expect(CategoryModel.create).toHaveBeenCalledWith({ name: 'C' });
    expect(out).toEqual({ id: 'id3', name: 'C' });
  });

  it('update actualiza y devuelve la categoría', async () => {
    (CategoryModel.findByIdAndUpdate as any).mockResolvedValue({ id: 'id4', name: 'D2' });
    const out = await categoryService.update('id4', { name: 'D2' } as any);
    expect(CategoryModel.findByIdAndUpdate).toHaveBeenCalledWith('id4', { name: 'D2' }, { new: true });
    expect(out).toEqual({ id: 'id4', name: 'D2' });
  });

  it('remove elimina por id y retorna true', async () => {
    (CategoryModel.findByIdAndDelete as any).mockResolvedValue({});
    const ok = await categoryService.remove('id5');
    expect(CategoryModel.findByIdAndDelete).toHaveBeenCalledWith('id5');
    expect(ok).toBe(true);
  });
});
