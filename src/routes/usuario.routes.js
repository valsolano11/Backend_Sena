import { Router } from "express";
import { crearUsuario, getAllusuario, getUsuario, Putusuario} from "../controllers/Usuarios/usuario.controller.js";
/* import { validarRolAdmin } from "../middlewares/ValidarRol.js";  *///Revisar este codigo
import {rutaProtegida} from "../middlewares/ValidarToken.js";
import { usuarioSchemas } from "../schemas/Usuario.schemas.js";
import validarSchemas from "../middlewares/ValidarSchemas.js";



const usuariosRouter = Router()


usuariosRouter.get("/usuarios", rutaProtegida,  getAllusuario);
usuariosRouter.get("/usuarios/:id", rutaProtegida,  getUsuario);
usuariosRouter.post("/usuarios", rutaProtegida,  validarSchemas(usuarioSchemas), crearUsuario);
usuariosRouter.put("/usuarios/:id", rutaProtegida, Putusuario);


export default usuariosRouter 