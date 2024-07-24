import { Router } from "express";
import { crearCategoria, getAllCategoria, getCategoria, putCategoria } from  "../controllers/Categoria.controller.js";
import validarSchemas from "../middlewares/ValidarSchemas.js";
import { rutaProtegida } from "../middlewares/ValidarToken.js";
import { CategoriaSchema } from "../schemas/Categoria.schema.js";
import { validarRolAdmin } from "../middlewares/ValidarRol.js";


const CategoriaRouter = Router()

CategoriaRouter.get("/categorias", rutaProtegida, validarRolAdmin, getAllCategoria);
CategoriaRouter.get("/categorias/:id", rutaProtegida,validarRolAdmin, getCategoria);
CategoriaRouter.post("/categorias", rutaProtegida, validarRolAdmin, validarSchemas(CategoriaSchema), crearCategoria);
CategoriaRouter.put("/categorias/:id", rutaProtegida,validarRolAdmin, putCategoria)

export default CategoriaRouter;