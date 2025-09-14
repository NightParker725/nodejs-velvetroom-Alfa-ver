import express from "express";
import auth from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { userController } from "../controllers/user.controller";

// Rutas para gestión de usuarios
export const router = express.Router();

// Perfil propio del usuario autenticado
router.get('/me', auth, userController.me);

// CRUD solo admin puede crear, listar, ver, actualizar y eliminar usuarios
router.post('/', auth, requireRole('admin'), userController.create);
router.get('/', auth, requireRole('admin'), userController.list);
router.get('/:id', auth, requireRole('admin'), userController.getById);
router.put('/:id', auth, requireRole('admin'), userController.update);
router.delete('/:id', auth, requireRole('admin'), userController.remove);
