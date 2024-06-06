import { Router } from "express";
import { login } from "../controllers/login.controller.js";


const LoginRouter = Router();

LoginRouter.post("/login",  login);


export default LoginRouter;
