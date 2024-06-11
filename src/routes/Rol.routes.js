import { Router } from "express";
import { crearRol, deleteRol, getAllRol, getRol } from "../controllers/Rol.controller.js";


const rolRouter = Router();

rolRouter.get("/roles",getAllRol);
rolRouter.get("/roles/:id", getRol);
rolRouter.post("/roles/", crearRol);
rolRouter.delete("/roles/:id", deleteRol);


export default rolRouter;
