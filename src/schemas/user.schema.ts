import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  address: z.string().optional()
  // role no se acepta en registro público, automáticamente será 'client'
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(['admin','seller','client']).optional(), // solo admin puede actualizar rol
  address: z.string().optional()
});
