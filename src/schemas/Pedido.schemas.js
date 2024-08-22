import { z } from "zod";

export const PedidoSchema = z.object({
    cantidadSolicitada: z.number({
        required_error: "La cantidad solicitada es requerida"
    }).int(), // Debe ser un entero
    cantidadSolicitadaVolumen: z.number({
        required_error: "El volumen solicitado es requerido"
    }), // Puede ser un número entero o flotante
    cantidadEntregada: z.number({
        required_error: "La cantidad entregada es requerida"
    }).int(), // Debe ser un entero
    cantidadEntregadaVolumen: z.number({
        required_error: "El volumen entregado es requerido"
    }), // Puede ser un número entero o flotante
    unidadMedidaSolicitadaId: z.number({
        required_error: "La unidad de medida solicitada es requerida"
    }),
    unidadMedidaEntregadaId: z.number({
        required_error: "La unidad de medida entregada es requerida"
    }),
    fechaPedido: z.string({
        required_error: "La fecha del pedido es requerida"
    }), // Podría necesitar más validación de formato de fecha
    ProductoId: z.number({
        required_error: "El producto es requerido"
    }),
    UsuarioId: z.number({
        required_error: "El usuario es requerido"
    }),
    InstructorId: z.number({
        required_error: "El instructor es requerido"
    }),
    fichaId: z.number({
        required_error: "La ficha es requerida"
    }),
    EstadoId: z.number({
        required_error: "El estado es requerido"
    })
});
