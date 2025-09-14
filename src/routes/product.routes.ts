import express from "express";
import auth from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { productController } from "../controllers/product.controller";
import { ownerOrAdmin } from "../middlewares/owner-or-admin.middleware";

// Rutas para gestión de productos
export const router = express.Router();

// Públicos (autenticación no requerida)
router.get('/', productController.list);
router.get('/categories', productController.categories);
router.get('/:id', productController.getById);

// Protegidos (autenticación requerida)
router.post('/', auth, requireRole('admin','seller'), productController.create);
router.put('/:id', auth, requireRole('admin','seller'), ownerOrAdmin, productController.update);
router.delete('/:id', auth, requireRole('admin','seller'), ownerOrAdmin, productController.remove);
