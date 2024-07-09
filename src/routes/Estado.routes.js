import { Router } from "express";
import { getEstado, getAllEstado } from "../controllers/Estado.controller.js";
import { rutaProtegida } from "../middlewares/ValidarToken.js";
import { validarRolAdmin } from "../middlewares/ValidarRol.js";

const EstadoRouter = Router()

//Modificaciones
EstadoRouter.get("/Estado", rutaProtegida, validarRolAdmin, getAllEstado);
EstadoRouter.get("/Estado/:id", rutaProtegida, validarRolAdmin, getEstado);

export default EstadoRouter