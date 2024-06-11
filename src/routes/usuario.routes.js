import { Router } from "express";
import { crearUsuario, getAllUsuario, getUsuario, putUsuario, deleteUsuario} from "../controllers/usuario.controller.js";


const usuariosRouter = Router()


usuariosRouter.get('/usuarios',getAllUsuario)
usuariosRouter.get('/usuarios/:id',getUsuario)
usuariosRouter.post('/usuarios', crearUsuario)
usuariosRouter.put('/usuarios/:id', putUsuario)
usuariosRouter.delete('/usuarios/:id', deleteUsuario)

export default usuariosRouter