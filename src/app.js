//Solamente van las rutas, no agregar nada mas

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import usuariosRouter from "./routes/usuario.routes.js";
import rolRouter from "./routes/Rol.routes.js";
import LoginRouter from "./routes/login.routes.js";
import recuperacionRouter from "./routes/olvidarContrasena.routes.js";
import EstadoRouter from "./routes/Estado.routes.js";
import FichaRouter from"./routes/Fichas.routes.js";
import InstructorRouter from "./routes/Instructores.routes.js";

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
    InstructorRouter

)

export default app;
