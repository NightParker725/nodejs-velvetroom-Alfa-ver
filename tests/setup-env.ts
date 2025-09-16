// Normaliza variables de entorno para los tests
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret';
process.env.MONGO_URI  = process.env.MONGO_URI  || 'mongodb://127.0.0.1:27017/testdb';
process.env.PORT       = process.env.PORT       || '0';
process.env.DEBUG_AUTH = process.env.DEBUG_AUTH || '';


if (typeof (process as any).loadEnvFile !== 'function') {
  (process as any).loadEnvFile = () => {};
}
