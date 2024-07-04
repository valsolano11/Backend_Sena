import { Router } from "express";
import { getEstados } from "../controllers/Estado.controller.js";
import { rutaProtegida } from "../middlewares/ValidarToken.js";
import { validarRolAdmin } from "../middlewares/ValidarRol.js";

const EstadoRouter = Router()

EstadoRouter.get("/Estado", rutaProtegida, validarRolAdmin, getEstados);

export default EstadoRouter