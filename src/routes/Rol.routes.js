import { Router } from "express";
import { crearRol, getAllRol, getRol, putRoles } from "../controllers/Rol.controller.js";
import { rutaProtegida } from "../middlewares/ValidarToken.js";
import { validarRolAdmin } from "../middlewares/ValidarRol.js";
import validarSchemas from "../middlewares/ValidarSchemas.js";
import { rolSchemas } from "../schemas/Rol.schemas.js";

const rolRouter = Router();

rolRouter.get("/roles", getAllRol);
rolRouter.get("/roles/:id",getRol);
rolRouter.post("/roles/",rutaProtegida, validarSchemas(rolSchemas), validarRolAdmin, crearRol);
rolRouter.put("/roles/:id", rutaProtegida, putRoles)


export default rolRouter;
