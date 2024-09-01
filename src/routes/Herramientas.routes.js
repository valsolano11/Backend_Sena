import  { Router } from 'express';
import { crearHerramienta, getAllHerramienta, getHerramienta, obtenerCodigosPorNombre, putHerramienta } from '../controllers/Herramientas.controller.js';
import validarSchemas from '../middlewares/ValidarSchemas.js';
import { HerramientaSchemas } from '../schemas/Herramientas.schemas.js';
import { rutaProtegida } from '../middlewares/ValidarToken.js';


const HerramientaRouter = Router()

HerramientaRouter.get("/herramienta", rutaProtegida, getAllHerramienta);
HerramientaRouter.get("/herramienta/:id", rutaProtegida, getHerramienta);
HerramientaRouter.get('/herramienta/:nombres', rutaProtegida, obtenerCodigosPorNombre);
HerramientaRouter.post("/herramienta", rutaProtegida, validarSchemas(HerramientaSchemas), crearHerramienta);
HerramientaRouter.put("/herramienta/:id", rutaProtegida, putHerramienta);

export default HerramientaRouter;
