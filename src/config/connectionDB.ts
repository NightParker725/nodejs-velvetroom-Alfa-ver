import mongoose from 'mongoose';

// Lee la URI de conexión desde las variables de entorno
const uri = process.env.MONGO_URI || '';
const defaultDb = 'velvetroom';

let cached: typeof mongoose | null = (global as any)._mongooseCached || null;

export async function connectDB() {
  if (cached) return cached;
  const conn = await mongoose.connect(uri, { dbName: process.env.MONGO_DB || defaultDb });
  (global as any)._mongooseCached = conn;
  return (cached = conn);
}

// Conexión inicial a la base de datos al iniciar la aplicación
export const db = connectDB();
