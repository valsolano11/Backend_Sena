import { Router } from "express";
import { rutaProtegida } from "../middlewares/ValidarToken.js";
import { crearPrestamo, getAllPrestamos, getPrestamo, putPrestamos } from "../controllers/Prestamo.controller.js";
import validarSchemas from './../middlewares/ValidarSchemas.js';
import { PrestamoSchema } from "../schemas/Prestamo.schemas.js";

const PrestamoRouter = Router()

PrestamoRouter.get("/prestamo", rutaProtegida, getAllPrestamos);
PrestamoRouter.get("/prestamo/:id", rutaProtegida, getPrestamo);
PrestamoRouter.post("/prestamo", rutaProtegida, validarSchemas(PrestamoSchema),crearPrestamo);
PrestamoRouter.put("/prestamo/:id", rutaProtegida, putPrestamos);

export default PrestamoRouter;