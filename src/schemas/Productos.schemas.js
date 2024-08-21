import { z } from "zod";

export const ProductoSchemas = z.object({
    nombre: z.string({
        required_error: "El nombre del producto es requeirdo"
    }),
    codigo: z.number({
        required_error: "El codigo del producto es requerido"
    }),
    descripcion: z.string({
        required_error: "La descripcion del producto es requerido"
    }),
    marca: z.string({
        required_error: "La marca del producto es requerido"
    }),

    UnidadMedidaId: z.number({
        required_error: "la unidad de medida del producto es requerida"
    }),
    SubcategoriaId: z.number({
        required_error: "la subcategoria del producto es requerido"
    }),
    EstadoId: z.number({
        required_error: "El estado del producto es requerido"
    })
});
