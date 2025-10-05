import {
  crearDatos,
  consultarDatos,
  eliminarDatos,
  actualizarDatos,
} from "../controllers/funciones.controller";
import { Router } from "express";
const router = Router();

/* CONFIGURO LAS RUTAS */
router.post("/crear", crearDatos);
router.get("/consultar", consultarDatos);
router.delete("/eliminar", eliminarDatos);
router.put("/actualizar", actualizarDatos);

export default router;
