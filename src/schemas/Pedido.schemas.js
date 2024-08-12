import { z } from "zod";

export const PedidoSchema = z.object({
    cantidadSolicitada: z.number({
        required_error: "La cantidad solicitada es requerido" 
    }),
    cantidadEntregada: z.number({
        required_error: "La cantidad entregada es requerido" 
    }),
    InstructorId: z.number({
            required_error: "El Instructor es requerido" 
    }),
    fichaId: z.number({ 
        required_error: "El ficha es requerido"
    }),
    ProductoId: z.number({
        required_error: "El Producto es requerido" 
    })
});