// src/app.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import { router as authRouter } from './routes/auth.routes';
import { router as userRouter } from './routes/user.routes';
import { router as productRouter } from './routes/product.routes';
import { router as categoryRouter } from './routes/category.routes';

export function createApp(): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));
  app.get('/', (_req: Request, res: Response) => res.send('Hola Mundo'));

  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/products', productRouter);
  app.use('/api/categories', categoryRouter);

  return app;
}
