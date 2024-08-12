import { z } from "zod";

export const HerramientaSchemas = z.object({
    nombre: z.string({
        required_error: "El nombre del producto es requeirdo"
    }),
    codigo: z.string({
        required_error: "El codigo del producto es requerido"
    }),
    marca: z.string({
        required_error: "La marca del producto es requerido"
    }),
    condicion: z.enum(["Bueno", "Regular", "Malo"], {
        required_error: "La condición del producto es requerida",
        invalid_type_error: "La condición debe ser 'bueno', 'regular' o 'malo'"
    }),
    observaciones: z.string({
        required_error: "La observacion del producto es requerido"
    }),


});