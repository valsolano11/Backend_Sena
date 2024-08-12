import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import usuariosRouter from "./routes/usuario.routes.js";
import rolRouter from "./routes/Rol.routes.js";
import LoginRouter from "./routes/login.routes.js";
import recuperacionRouter from "./routes/olvidarContrasena.routes.js";
import EstadoRouter from "./routes/Estado.routes.js";
import FichaRouter from "./routes/Fichas.routes.js";
import InstructorRouter from "./routes/Instructores.routes.js";
import CategoriaRouter from "./routes/Categoria.routes.js";
import SubcategoriaRouter from "./routes/Subcategoria.routes.js";
import excelRouter from "./routes/excel.routes.js";

const app = express();

// Configuración de middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use(
  usuariosRouter,
  rolRouter,
  LoginRouter,
  recuperacionRouter,
  EstadoRouter,
  FichaRouter,
  InstructorRouter,
  CategoriaRouter,
  SubcategoriaRouter,
  excelRouter
);

export default app;
