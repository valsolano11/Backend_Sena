import { z } from "zod";

export const PrestamoSchema = z.object({

    HerramientaId: z.number({
        required_error: "El ID de la herramienta es requerido",
    }),

    InstructorId: z.number({
        required_error: "El ID del instructor es requerido",
    }),
    FichaId: z.number({
        required_error: "El ID de la ficha es requerido",
    }),
    codigo: z.string({
        required_error: "El código es requerido",
    }),
});
