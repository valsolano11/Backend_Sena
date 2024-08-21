import { Router } from "express";
import { getEstado, getAllEstado, getEstadosPorTipo } from "../controllers/Estado.controller.js";
import { rutaProtegida } from "../middlewares/ValidarToken.js";
import { validarRolAdmin } from "../middlewares/ValidarRol.js";

const EstadoRouter = Router()

EstadoRouter.get("/Estado", rutaProtegida, validarRolAdmin, getAllEstado);
EstadoRouter.get("/Estado/:id", rutaProtegida, validarRolAdmin, getEstado);
EstadoRouter.get("/Estado/tipo/:tipoEntidad", rutaProtegida, validarRolAdmin, getEstadosPorTipo);

export default EstadoRouter