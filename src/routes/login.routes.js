import { Router } from "express";
import { login } from "../controllers/login.controller.js";
import validarSchemas from "../middlewares/ValidarSchemas.js"
import { loginSchemas } from "../schemas/Login.schemas.js";

const LoginRouter = Router();

LoginRouter.post("/login", validarSchemas(loginSchemas), login);


export default LoginRouter;
