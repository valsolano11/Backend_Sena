//Solamente van las rutas, no agregar nada mas
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import xlsx from "xlsx"
import multer from "multer";
import path from "path";
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
import UnidadMedidaRouter from "./routes/UnidadesMedidas.routes.js";
import ProductoRouter from "./routes/Productos.routes.js";
import HerramientaRouter from "./routes/Herramientas.routes.js";
import PedidoRouter from "./routes/Pedido.routes.js";
import PrestamoRouter from "./routes/Prestamo.routes.js";

const app = express();

// Una opcion para evitar errores en el frontend jejeje
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

//Cada vez que se llame por get muestre que funciona
app.get("/", (req, res) => {
  res.send("Funciona");
});

//RUTAS EN APP
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
    UnidadMedidaRouter,
    ProductoRouter,
    HerramientaRouter,
    PrestamoRouter,
    PedidoRouter

)

export default app;
