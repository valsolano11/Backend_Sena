import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import usuariosRouter from "./routes/usuario.routes.js";
import rolRouter from "./routes/Rol.routes.js";
import LoginRouter from "./routes/login.routes.js";
import recuperacionRouter from "./routes/olvidarContrasena.routes.js";
import EstadoRouter from "./routes/Estado.routes.js";

const app = express();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

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
    EstadoRouter

)

export default app;
