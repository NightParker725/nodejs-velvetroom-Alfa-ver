// api/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import { createApp } from '../app';
import { connectDB } from '../config/connectionDB';

let handler: any;

// Prepara app y DB una sola vez por proceso
async function getHandler() {
  if (!handler) {
    await connectDB();
    const app = createApp();
    handler = serverless(app, { basePath: '/' }); // Express ya tiene /api en sus rutas
  }
  return handler;
}

export default async function (req: VercelRequest, res: VercelResponse) {
  const h = await getHandler();
  return h(req, res);
}

// opcional: desactivar el bodyParser propio de vercel si lo necesitas
export const config = { api: { bodyParser: false } };
