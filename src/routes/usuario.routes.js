import { Router } from "express";
import { crearUsuario, getAllUsuario, getUsuario, putUsuario, deleteUsuario} from "../controllers/usuario.controller.js";
import { validarRolAdmin } from "../middlewares/ValidarRol.js";
import {rutaProtegida} from "../middlewares/ValidarToken.js";
import { usuarioSchemas } from "../schemas/Usuario.schemas.js";
import validarSchemas from "../middlewares/ValidarSchemas.js";

const usuariosRouter = Router()


usuariosRouter.get("/usuarios", rutaProtegida , validarRolAdmin, getAllUsuario);
usuariosRouter.get("/usuarios/:id", rutaProtegida, validarRolAdmin, getUsuario);
usuariosRouter.post("/usuarios", rutaProtegida, validarSchemas(usuarioSchemas), validarRolAdmin, crearUsuario);
usuariosRouter.put("/usuarios/:id", rutaProtegida, putUsuario);
usuariosRouter.delete('/usuarios/:id', rutaProtegida, validarRolAdmin,  deleteUsuario)

export default usuariosRouter