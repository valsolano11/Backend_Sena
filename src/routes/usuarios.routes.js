import { Router } from "express";
import { crearUsuario, getAllUsuario, getUsuario, putUsuario} from "../controllers/Usuarios/usuario.controller.js";
import { validarRolAdmin } from "../middlewares/ValidarRol.js"; //Revisar este codigo
import {rutaProtegida} from "../middlewares/ValidarToken.js";
import { usuarioSchemas } from "../schemas/Usuario.schemas.js";
import validarSchemas from "../middlewares/ValidarSchemas.js";


const usuariosRouter = Router()


usuariosRouter.get("/usuarios", rutaProtegida, validarRolAdmin, getAllUsuario);
usuariosRouter.get("/usuarios/:id", rutaProtegida, validarRolAdmin, getUsuario);
usuariosRouter.post("/usuarios", rutaProtegida, validarSchemas(usuarioSchemas), validarRolAdmin, crearUsuario);
usuariosRouter.put("/usuarios/:id", rutaProtegida, putUsuario);


export default usuariosRouter