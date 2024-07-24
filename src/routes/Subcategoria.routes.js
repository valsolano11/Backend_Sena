import { Router } from "express";
import { crearSubcategoria, getallSubcategoria, getSubcategoria, putSubcategoria } from "../controllers/Subcategoria.controller.js";
import { rutaProtegida } from "../middlewares/ValidarToken.js";
import validarSchemas from "../middlewares/ValidarSchemas.js";
import { SubcategoriaSchema } from "../schemas/Subcategoria.schemas.js";


const  SubcategoriaRouter = Router()

SubcategoriaRouter.get("/subcategoria", rutaProtegida, getallSubcategoria);
SubcategoriaRouter.get("/subcategoria/:id", rutaProtegida, getSubcategoria);
SubcategoriaRouter.post("/subcategoria", rutaProtegida, validarSchemas(SubcategoriaSchema), crearSubcategoria);
SubcategoriaRouter.put("/subcategoria/:id", rutaProtegida, putSubcategoria);

export default SubcategoriaRouter; 