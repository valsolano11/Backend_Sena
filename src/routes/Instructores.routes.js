//Proceso de prueba.

import { Router } from "express";
import validarSchemas from "../middlewares/ValidarSchemas.js";
import { InstructoresSchemas } from "../schemas/Instructores.schemas.js"; 
import { crearInstructor, getAllInstructores, getInstructor,actualizarInstructor } from "../controllers/Formacion/Instructores.controller.js";
import { rutaProtegida } from "../middlewares/ValidarToken.js";
import {validarRolAdmin} from "../middlewares/ValidarRol.js"
/* import { validacionTokenUsuario } from "../middlewares/Prueba.js";
 */
const InstructorRouter = Router()

InstructorRouter.get("/Instructor",rutaProtegida, getAllInstructores);
InstructorRouter.get("/Instructor/:id",rutaProtegida, getInstructor);
InstructorRouter.post("/Instructor",rutaProtegida,validarRolAdmin, /* validacionTokenUsuario, */ validarSchemas(InstructoresSchemas), crearInstructor);
InstructorRouter.put("/Instructor/:id", rutaProtegida, actualizarInstructor);



export default InstructorRouter;