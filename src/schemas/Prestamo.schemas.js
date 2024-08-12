import { z } from "zod";

export const PrestamoSchema = z.object({

    observaciones: z.string({
        required_error: "La observacion de la herramienta es requerido",
    }),
    HerramientaId: z.number({
        required_error: "El ID de la herramienta es requerido",
    }),

    InstructorId: z.number({
        required_error: "El ID del instructor es requerido",
    }),
    fichaId: z.number({
        required_error: "El ID de la ficha es requerido",
    }),
    codigo: z.string({
        required_error: "El código es requerido",
    }),
});
