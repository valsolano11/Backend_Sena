import { Router } from "express";
import { ProductoSchemas } from "../schemas/Productos.schemas.js";
import { actualizarCantidadEntrada, crearProductos, getAllProductos, getProductos, putProductos } from "../controllers/Productos.controller.js";
import { rutaProtegida } from "../middlewares/ValidarToken.js";
import validarSchemas from "../middlewares/ValidarSchemas.js";


const ProductoRouter = Router()

ProductoRouter.get("/producto",rutaProtegida, getAllProductos);
ProductoRouter.get("/producto/:id",rutaProtegida, getProductos);
ProductoRouter.post("/producto",rutaProtegida, validarSchemas(ProductoSchemas) ,crearProductos);
ProductoRouter.put("/producto/:id",rutaProtegida, putProductos);
ProductoRouter.put("/producto/:id/cantidad", rutaProtegida, actualizarCantidadEntrada);

export default ProductoRouter;