// rutas/auth.js
import express from "express";
import * as AuthController from "../controladores/auth.js";
import { validar } from "../middleware/validacion.js";
import { esquemaLogin } from "../esquemas-validaciones/auth.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", validar(esquemaLogin), AuthController.login);
router.post("/logout", authMiddleware, AuthController.logout);

export default router;
