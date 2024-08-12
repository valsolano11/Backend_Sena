import { Router } from "express";
import { crearPedido, getAllPedidos, getPedidos, putPedidos } from "../controllers/Pedido.controller.js";
import { rutaProtegida } from "../middlewares/ValidarToken.js";
import validarSchemas from "../middlewares/ValidarSchemas.js";
import { PedidoSchema } from "../schemas/Pedido.schemas.js";


const PedidoRouter = Router()

PedidoRouter.get("/pedido",rutaProtegida, getAllPedidos);
PedidoRouter.get("/pedido/:id", rutaProtegida, getPedidos);
PedidoRouter.post("/pedido", rutaProtegida, validarSchemas(PedidoSchema), crearPedido);
PedidoRouter.put("/pedido/:id", rutaProtegida, putPedidos);

export default PedidoRouter;