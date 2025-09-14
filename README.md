[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/u_K3O14S)


**Velvet Room — Backend**

**Integrantes del proyecto:**

- David Henao Salazar - A00394033
- Johan Sebastián Díaz Caicedo - A00371864

**Objetivo:**

Velvet Room será una plataforma de eCommerce diseñada para satisfacer las necesidades de los consumidores de videojuegos y de merchandising de la cultura geek en general.

**Objetivos Terminales:**

- Crear una plataforma intuitiva y segura para la compra y venta de productos relacionados con videojuegos y cultura geek.
  
- Implementar autenticación robusta y gestión de roles para garantizar la seguridad del sistema.
  
- Ofrecer herramientas de generación de reportes para administradores y vendedores.

**Funcionalidades Actuales:**

**1. Autenticación de Usuarios**

  Para la seguridad al momento de registrar y loguear a los usuarios, se implementará JWT (JSON Web Tokens) como método de autenticación debido a su escalabilidad y portabilidad.
  
  Los tokens se generarán al iniciar sesión y se almacenarán en el frontend (localStorage) para su uso en solicitudes autenticadas.
  
  Endpoints Necesarios
  
  POST
  
  /api/auth/login: Para loguearse como usuario ya registrado en la web.

  /api/auth/register: Para registrarse como nuevo usuario - por defecto como cliente.

**2. Gestión de Productos:**

  Entidades Principales
  
  Producto: Representa un artículo a la venta (videojuego, figura coleccionable, ropa geek, etc.).
  
  Atributos: ID, nombre, descripción, precio, stock, categoría, imágenes, vendedor.
  
  Operaciones CRUD
  
  Crear Producto (POST /api/products): Solo accesible para vendedores y administradores.
  
  Leer Productos (GET /api/products): Accesible para todos los usuarios.
  
  Actualizar Producto (PUT /api/products/:id): Solo accesible para el vendedor que lo creó o administradores.
  
  Eliminar Producto (DELETE /api/products/:id): Solo accesible para el vendedor que lo creó o administradores.
  
  Endpoints Necesarios
  
  /api/products: Listar todos los productos.
  
  /api/products/:id: Obtener detalles de un producto específico.
  
  /api/products/categories: Listar categorías disponibles.

**3. Gestión de Usuarios:**

  Entidades Principales
  
  Usuario: Representa a un cliente, vendedor o administrador.
  
  Atributos: ID, nombre, email, contraseña, rol, dirección, historial de compras.
  
  Operaciones CRUD
  
  Registrar Usuario (POST /api/auth/register): Accesible para todos.
  
  Iniciar sesión (POST /api/auth/login): Accesible para todos.
  
  Obtener Datos del Usuario (GET /api/users/me): Accesible para usuarios autenticados.
  
  Endpoints Necesarios
  
  /api/auth/register: Registrar un nuevo usuario.
  
  /api/auth/login: Iniciar sesión y obtener token JWT.
  
  /api/users/me: Obtener datos del usuario autenticado.

**4. Gestion de categorias:**

  Entidades Principales
  
  Categoría: Representa una clasificación para agrupar productos (p. ej., Videojuegos, Figuras, Comics).
  
  Atributos: ID, nombre.
  
  Operaciones CRUD
  
  Listar Categorías (GET /api/categories): Accesible para todos.
  
  Obtener Categoría por ID (GET /api/categories/:id): Accesible para todos.
  
  Crear Categoría (POST /api/categories): Solo accesible para administradores.
  
  Actualizar Categoría (PUT /api/categories/:id): Solo accesible para administradores.
  
  Eliminar Categoría (DELETE /api/categories/:id): Solo accesible para administradores.
  
  Endpoints Necesarios
  
  /api/categories: Listar todas las categorías y crear una nueva (admin).
  
  /api/categories/:id: Obtener, actualizar (admin) o eliminar (admin) una categoría específica.


**TO DO - ¿Que falta?**

**1. Gestión de Compras y pedidos:**
   
  Entidades Principales

  Pedido: Representa una compra realizada por un cliente.
  
  Atributos: ID, fecha, estado (pendiente, completado), total, productos, cliente.
  
  Carrito: Representa los productos seleccionados por un cliente antes de realizar la compra.
  
  Atributos: ID, productos, cantidad, cliente.
  
  Operaciones CRUD
  
  Crear Pedido (POST /api/orders): Accesible para clientes.
  
  Ver Historial de Pedidos (GET /api/orders): Accesible para clientes y administradores.
  
  Actualizar Estado de Pedido (PUT /api/orders/:id): Accesible para administradores.
  
  Endpoints Necesarios
  
  /api/orders: Listar pedidos (filtrados por cliente o administrador).
  
  /api/cart: Gestionar el carrito de compras.

**2. Módulo de Reportes:**

  Tipo de Reportes Generados
  
  Reporte de Ventas Globales:
  
  Total de ventas por mes/año.
  
  Productos más vendidos.
  
  Reporte de Actividad de Usuarios:
  
  Número de usuarios registrados por mes.
  
  Usuarios más activos (compradores frecuentes).
  
  Reporte de Inventarios:
  
  Productos con bajo stock.
  
  Categorías más populares.
  
  Formatos de Salida
  
  Gráficos (barras, líneas, pasteles) para visualización interactiva.
  
  Tablas exportables a PDF o Excel.
  
  Endpoints Necesarios
  
  /api/reports/sales: Generar reporte de ventas.
  
  /api/reports/users: Generar reporte de actividad de usuarios.
  
  /api/reports/inventory: Generar reporte de inventarios.

**3.Integración con una API Externa**

  API Seleccionada
  
  Stripe API sería una opción ideal para el procesamiento de pagos.
  
  Authentication | Stripe API Reference
  
  Descripción de los Datos
  
  Datos enviados:
  
  Monto total de la compra.
  
  Información del cliente (nombre, email, dirección).
  
  Lista de productos comprados.
  
  Datos recibidos:
  
  Confirmación del pago.
  
  ID de transacción.
  
  Estado del pago (éxito, fallido, pendiente).
  
  Endpoints Necesarios
  
  /api/payments: Procesar pagos utilizando Stripe.


**Uso de dependencias:**

- Node.js + TypeScript

- Express

- MongoDB (Mongoose)

- JWT

- bcrypt

**Requisitos de antemano:**

- Node

- MongoDB Atlas

- Postman (opcional, solo para pruebas)


**Estructura del proyecto - Endpoints**

src/

  config/connectionDB.ts
  
  controllers/ (auth, user, product, category)
  
  interfaces/  (user, product, category, auth, role)
  
  middlewares/ (auth, role, owner-or-admin)
  
  models/      (User, Product, Category)
  
  routes/      (auth.route, user.routes, product.routes, category.routes)
  
  index.ts

**Endpoints**

**Auth**

  POST /api/auth/login (público y necesario para acceder a lo demas (con excepciones))
  
  POST /api/auth/register (público -> crea client por defecto en el rol)

**Usuarios (solo admin)**

  GET /api/users/me (cualquier rol autenticado)
  
  GET /api/users (admin)
  
  GET /api/users/:id (admin)
  
  POST /api/users (admin) → admite password (se hashea a 12) o passwordHash
  
  PUT /api/users/:id (admin)→ si envías password, se re-hashea (12)
  
  DELETE /api/users/:id (admin)

**Productos**

*Públicos:*

  GET /api/products
  
  GET /api/products/categories (distintas categorías presentes en productos)
  
  GET /api/products/:id

*Protegidos:*

  POST /api/products → admin o seller (si seller, sellerEmail debe coincidir con el email del token)
  
  PUT /api/products/:id → admin o seller dueño (valida por sellerEmail)
  
  DELETE /api/products/:id → admin o seller dueño

**Categorías**

*Públicos:*

  GET /api/categories
  
  GET /api/categories/:id

*Admin:*

  POST /api/categories
  
  PUT /api/categories/:id
  
  DELETE /api/categories/:id

**Configuracion:**

1. Primero antes de iniciar el servidor, necesitaras crear un archivo llamado ".env" en el que incluiras las variables de entorno a usar en el proyecto, en este caso, para el secret del token, la expiracion, y la uri de la base de datos (en este caso mongo):

PORT="el puerto a usar"

MONGO_URI="la uri de la bd"

JWT_SECRET="la clave para el token"


En la carpeta doc, se encuentra un txt con la informacion de ejemplo y por defecto a usar en este proyecto y que debe de estar en el .env de forma obligada


2. Ahora, mediante la consola y dentro del proyecto, debemos de establecer las dependencias necesarias por el package-json, y posteriormente estableciendo el servidor:

npm install

npm run dev

y listo, si en consola ves un mensaje indicando el puerto establecido y la conexion a mongo, ya se encuentra funcionando el backend!

**POSTMAN - OPCIONAL:**

Si quieres hacer pruebas de endpoints con requests, puedes usar el postman local estableciendo un env y una coleccion con los archivos que hay en doc.

de forma resumida sería:

1. Importa Environment y selecciónala como activa.
   
3. Importa la Colección.
   
5. Dale click derecho a la colección y correla para mirar los resultados.

**Posibles problemas a tener en cuenta:**

1. 401 en login

  Verifica que MONGO_URI apunte a la BD correcta (incluye /velvet_room).
  
  Usa el password plano correspondiente al hash (p. ej. hashAdmin).

2. JWT inválido / 403

  Revisa Authorization: Bearer <token>.
  
  El token expira en ~10 minutos (por defecto).

3. Duplicados al crear

  Usuarios: email es único.
  
  Categorías: name es único (devuelve 409 si ya existe).

4. El seller no puede editar un producto

  El email en el token debe coincidir con sellerEmail del producto.

**TESTING:**

*Jest*

...
