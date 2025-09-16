import { validateSchema } from '../../../src/middlewares/validateSchema.middleware';

const resMock = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json  = jest.fn().mockReturnValue(res);
  return res;
};

describe('validateSchema.middleware', () => {
  it('llama next cuando el schema valida', async () => {
    const schema: any = { parseAsync: jest.fn().mockResolvedValue({}) };
    const req: any = { body: { a: 1 } };
    const res = resMock();
    const next = jest.fn();

    await validateSchema(schema)(req, res, next);

    expect(schema.parseAsync).toHaveBeenCalledWith(req.body);
    expect(next).toHaveBeenCalled();
  });

  it('400 cuando el schema rechaza', async () => {
    const schema: any = { parseAsync: jest.fn().mockRejectedValue({ issues: [{ path: ['a'], message: 'bad' }] }) };
    const req: any = { body: { a: 'x' } };
    const res = resMock();
    const next = jest.fn();

    await validateSchema(schema)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});
