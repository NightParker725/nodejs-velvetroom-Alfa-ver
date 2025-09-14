import express from "express";
import { authController } from "../controllers/auth.controller";

// Rutas públicas para login y registro de usuarios
export const router = express.Router();

// Login y registro de usuarios
router.post("/login", authController.login);
router.post("/register", authController.register); // público → crea client
