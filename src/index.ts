import express, { Express, Request, Response } from 'express';
import { db } from './config/connectionDB';
import { router as authRouter } from './routes/auth.routes';
import { router as userRouter } from './routes/user.routes';
import { router as productRouter } from './routes/product.routes';
import { router as categoryRouter } from './routes/category.routes';

// Carga variables de entorno
process.loadEnvFile();

// Crea servidor Express
const app: Express = express();
const port = Number(process.env.PORT) || 3000;

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas y endpoints
app.get('/health', (_req: Request, res: Response) => res.json({ ok: true })); // health check endpoint para monitorización, algo que hicimos opcional pero util para el testing

// Ruta por defecto al cargar la pagina, por ahora es simple ya que no tenemos frontend, pero hice alguito para que no se viera tan feo
app.get('/', (req, res) => {
    const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Power_Rangers_gang-sign_%289424418791%29.jpg/1280px-Power_Rangers_gang-sign_%289424418791%29.jpg';

    res.send(`
        <h1 style="text-align: center;">Bienvenido a VelvetRoom Alfa - por ahora no hay front, sorry :( </h1>
        <img src="${imageUrl}" alt="Yo y los panas cuando: "style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
    `);
});
// Rutas API
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);

// Inicia servidor tras conectar a BD
db.then(() => {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});
