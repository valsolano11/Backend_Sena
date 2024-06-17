import { Router } from "express";
import { crearRol, deleteRol, getAllRol, getRol } from "../controllers/Rol.controller.js";
import { rutaProtegida } from "../middlewares/ValidarToken.js";
import { validarRolAdmin } from "../middlewares/ValidarRol.js";


const rolRouter = Router();

rolRouter.get("/roles",getAllRol);
rolRouter.get("/roles/:id", getRol);
rolRouter.post("/roles/",rutaProtegida, validarRolAdmin, crearRol);
rolRouter.delete("/roles/:id", rutaProtegida, validarRolAdmin, deleteRol);


export default rolRouter;
