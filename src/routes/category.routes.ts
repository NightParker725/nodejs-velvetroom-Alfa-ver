import express from "express";
import auth from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { categoryController } from "../controllers/category.controller";

export const router = express.Router();

// Públicos - listado y ver categoría
router.get("/", categoryController.list);
router.get("/:id", categoryController.getById);
 
// Solo admin - CRUD de categorías
router.post("/", auth, requireRole("admin"), categoryController.create);
router.put("/:id", auth, requireRole("admin"), categoryController.update);
router.delete("/:id", auth, requireRole("admin"), categoryController.remove);
