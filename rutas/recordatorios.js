// rutas/recordatorios.js
import express from "express";
import * as RecordatorioController from "../controladores/recordatorios.js";
import { validar } from "../middleware/validacion.js";
import {
  esquemaCrearRecordatorio,
  esquemaActualizarRecordatorio,
} from "../esquemas-validaciones/recordatorios.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", RecordatorioController.listarRecordatorios);
router.get("/:id", RecordatorioController.obtenerRecordatorio);
router.post("/", validar(esquemaCrearRecordatorio), RecordatorioController.crearRecordatorio);
router.patch("/:id", validar(esquemaActualizarRecordatorio), RecordatorioController.actualizarRecordatorio);
router.delete("/:id", RecordatorioController.eliminarRecordatorio);

export default router;
