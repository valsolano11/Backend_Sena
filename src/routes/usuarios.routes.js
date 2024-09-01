import { Router } from "express";
import { crearUsuario, getAllusuario, getUsuario} from "../controllers/Usuarios/usuario.controller.js";
import { validarRolAdmin } from "../middlewares/ValidarRol.js"; 
import {rutaProtegida} from "../middlewares/ValidarToken.js";
import { usuarioSchemas } from "../schemas/Usuario.schemas.js";
import validarSchemas from "../middlewares/ValidarSchemas.js";


const usuariosRouter = Router()


usuariosRouter.get("/usuarios", rutaProtegida, validarRolAdmin, getAllusuario);
usuariosRouter.get("/usuarios/:id", rutaProtegida, validarRolAdmin, getUsuario);
usuariosRouter.post("/usuarios", rutaProtegida, validarSchemas(usuarioSchemas), validarRolAdmin, crearUsuario);



export default usuariosRouter