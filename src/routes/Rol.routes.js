import { Router } from "express";
import { crearRol, getAllRol, getRol, putRoles } from "../controllers/Rol.controller.js";
import { rutaProtegida } from "../middlewares/ValidarToken.js";
import { validarRolAdmin } from "../middlewares/ValidarRol.js";


const rolRouter = Router();

rolRouter.get("/roles", getAllRol);
rolRouter.get("/roles/:id",getRol);
rolRouter.post("/roles/",rutaProtegida, validarRolAdmin, crearRol);
rolRouter.put("/roles/:id", rutaProtegida, putRoles)

//No se pueden eliminar los roles 
/* rolRouter.delete("/roles/:id", rutaProtegida, validarRolAdmin, deleteRol); */


export default rolRouter;
